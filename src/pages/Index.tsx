import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Heart, Users, Home, Shield, Clock, Award, Star, LucideIcon } from "lucide-react";
import heroImage from "@/assets/hero-careease.jpg";

/* Images */
import companionImage from "@/assets/service-companion.jpg";

import personalCareNew from "@/assets/personalCareNew.png";
import personalCareNew1 from "@/assets/personalCareNew1.png";
import personalCareNew2 from "@/assets/personalCareNew2.png";

import hkImg1 from "@/assets/housekeepingImage1.png";
import hkImg2 from "@/assets/housekeepingImage2.png";
import hkImg3 from "@/assets/housekeepingImage3.png";
import hkImg4 from "@/assets/housekeepingImage4.png";
import hkImg5 from "@/assets/housekeepingImage5.png";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    testimonial: "",
    rating: 5,
  });

  // ✅ Map des icônes disponibles
  const iconMap: Record<string, LucideIcon> = {
    Users,
    Heart,
    Star,
    Award,
    Home,
    Shield,
    Clock,
  };

  /* Images groupées par catégorie */
  const personalCareImages = [
    { src: personalCareNew1, alt: "Personal Care caregiver supporting senior" },
    { src: personalCareNew, alt: "Personal Care assistance at home" },
    { src: personalCareNew2, alt: "Personal Care home support" },
  ];

  const companionshipImages = [
    { src: companionImage, alt: "Companionship and friendly conversation" },
  ];

  const housekeepingImages = [
    { src: hkImg4, alt: "Window cleaning while senior is nearby" },
    { src: hkImg1, alt: "Vacuuming near senior at home" },
    { src: hkImg2, alt: "Dusting shelves during housekeeping" },
    { src: hkImg3, alt: "Vacuuming living room" },
    { src: hkImg5, alt: "Team performing housekeeping tasks" },
  ];

  /* Services à afficher (3 seulement) */
  const services = [
    {
      key: "personal",
      icon: Heart,
      title: "Personal Care",
      description:
        "Daily assistance with hygiene (bathing, dressing), mobility, meals, and overall well‑being to help maintain independence at home.",
      cover: personalCareNew1,
      gallery: personalCareImages,
    },
    {
      key: "companionship",
      icon: Users,
      title: "Companionship",
      description:
        "Friendly presence, conversation, and accompaniment to activities that reduce isolation and encourage social engagement.",
      cover: companionImage,
      gallery: companionshipImages,
    },
    {
      key: "housekeeping",
      icon: Home,
      title: "Light Housekeeping",
      description:
        "Light cleaning (dusting, floors), tidying, laundry, and routine home upkeep to ensure a clean and comfortable environment.",
      cover: hkImg4,
      gallery: housekeepingImages,
    },
  ];

  const reasons = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description:
        "All our caregivers are fully licensed, insured, and background‑checked for your peace of mind.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Flexible scheduling with hourly or daily rates to fit your unique needs and budget.",
    },
    {
      icon: Award,
      title: "Experienced Team",
      description:
        "Years of expertise providing compassionate, professional care to families across New York.",
    },
  ];

  // ✅ Récupérer les testimonials depuis Supabase
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials", "homepage"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data ?? [];
    },
  });

  // ✅ Récupérer les statistiques depuis Supabase
  const { data: statsData = [] } = useQuery({
    queryKey: ["homepage-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_stats")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  // ✅ Transformer les données pour utiliser les icônes
  const stats = statsData.map((stat) => {
    const Icon = iconMap[stat.icon_name] || Heart;
    return {
      icon: Icon,
      value: stat.value,
      label: stat.label,
    };
  });

  // ✅ Mutation pour créer un témoignage
  const createTestimonial = useMutation({
    mutationFn: async (payload: { author: string; text: string; rating: number; email?: string }) => {
      // Vérifier si l'email a fait une réservation (optionnel mais recommandé)
      if (payload.email) {
        const { data: bookings, error: bookingError } = await supabase
          .from("bookings")
          .select("id")
          .eq("email", payload.email.toLowerCase())
          .limit(1);
        
        if (bookingError) {
          console.warn("Could not verify booking:", bookingError);
        }
        
        // Si aucun booking trouvé, on peut quand même accepter (ou rejeter selon votre politique)
        // Pour l'instant, on accepte même sans booking pour simplifier
      }

      // Insérer le témoignage (is_active sera false par défaut pour modération admin)
      const { error } = await supabase
        .from("testimonials")
        .insert([{
          author: payload.author,
          text: payload.text,
          rating: payload.rating,
          is_active: false, // ✅ Nécessite approbation admin
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials", "homepage"] });
      toast({
        title: "Thank you!",
        description: "Your testimonial has been submitted. It will be reviewed and published soon.",
      });
      setFormData({
        name: "",
        email: "",
        testimonial: "",
        rating: 5,
      });
      setShowForm(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.testimonial.trim()) {
      toast({
        title: "Fields Required",
        description: "Please provide both your name and testimonial.",
        variant: "destructive",
      });
      return;
    }
    createTestimonial.mutate({
      author: formData.name.trim(),
      text: formData.testimonial.trim(),
      rating: formData.rating,
      email: formData.email.trim() || undefined,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Image Background */}
        <section className="relative py-0 overflow-hidden">
          <div className="relative h-[600px] md:h-[700px]">
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt="CareEase USA - Professional Home Health Care for Elderly and Disabled"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full">
              <div className="max-w-6xl mx-auto h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="text-white py-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                      Your well-being, our daily priority
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                      Compassionate and reliable care for elderly and disabled individuals. Available 24/7 to help you maintain independence and quality of life at home.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                      <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90 shadow-xl">
                        <Link to="/booking">Book Now</Link>
                      </Button>
                      <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90 shadow-xl">
                        <Link to="/services?filter=Home%20Health%20Aide%20(HHA)">Home Health Aide (HHA)</Link>
                      </Button>
                      <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90 shadow-xl">
                        <Link to="/services?filter=Housekeeping">Housekeeping</Link>
                      </Button>
                    </div>

                    {/* ✅ Statistiques dynamiques */}
                    {stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                          <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all shadow-xl">
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                  <stat.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                                  <div className="text-xs text-white/80">{stat.label}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section (3 services + galeries associées) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Personalized home care services focused on dignity, comfort, and independence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.key} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                  <figure className="relative h-48 overflow-hidden">
                    <img
                      src={service.cover}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs md:text-sm px-3 py-2">
                      {service.title}
                    </figcaption>
                  </figure>
                  <CardContent className="pt-6 pb-6">
                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>

                    {/* Mini-galerie associée à la catégorie */}
                    {service.gallery?.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {service.gallery.map((img, idx) => (
                          <img
                            key={idx}
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-24 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild className="shadow-lg">
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the difference of truly personalized care
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reasons.map((reason, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-primary/5">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300">
                      <reason.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-2xl mb-4">{reason.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real stories from families we've helped
              </p>
            </div>
            
            {/* Existing Testimonials */}
            {testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-primary/20 bg-white">
                    <CardContent className="pt-8 pb-8">
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-primary fill-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic leading-relaxed text-center">
                        "{testimonial.text}"
                      </p>
                      <p className="font-bold text-lg text-center text-primary">{testimonial.author}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* ✅ Formulaire de témoignage */}
            <div className="max-w-2xl mx-auto">
              {!showForm ? (
                <Card className="border-primary/30">
                  <CardContent className="pt-8 pb-8 text-center">
                    <p className="text-lg text-muted-foreground mb-6">
                      Have you used our services? Share your experience with us!
                    </p>
                    <Button onClick={() => setShowForm(true)} variant="outline" size="lg">
                      Write a Testimonial
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold">Share Your Experience</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                        ✕
                      </Button>
                    </div>
                    <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Your Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                          />
                          <p className="text-xs text-muted-foreground">
                            Optional: Helps us verify you're a client
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Rating *</Label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormData({ ...formData, rating: star })}
                              className="focus:outline-none transition-transform hover:scale-110"
                            >
                              <Star
                                className={`h-8 w-8 ${
                                  star <= formData.rating
                                    ? "text-primary fill-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="testimonial">Your Testimonial *</Label>
                        <Textarea
                          id="testimonial"
                          value={formData.testimonial}
                          onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                          placeholder="Share your experience with CareEase USA..."
                          rows={5}
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={createTestimonial.isPending}
                        >
                          {createTestimonial.isPending ? "Submitting..." : "Submit Testimonial"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Your testimonial will be reviewed before being published. No account required!
                      </p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Book a service today and experience the care your family deserves
              </p>
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90 shadow-2xl text-lg px-8 py-6 h-auto">
                <Link to="/booking">Book Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;