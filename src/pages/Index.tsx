import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Users, Home, Shield, Clock, Award, Star } from "lucide-react";
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

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
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

  // ✅ REMPLACER les testimonials hardcodés par une query Supabase
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

  const stats = [
    { icon: Users, value: "846+", label: "Happy Patients" },
    { icon: Award, value: "12+", label: "Years of Experience" },
    { icon: Heart, value: "150+", label: "Professional Nurses" },
    { icon: Star, value: "4.9", label: "Rating" },
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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