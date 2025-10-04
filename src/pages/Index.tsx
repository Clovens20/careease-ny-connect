import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Users, Utensils, Pill, Home, Car, Shield, Clock, Award, Star } from "lucide-react";
import heroImage from "@/assets/hero-careease.jpg";
import companionImage from "@/assets/service-companion.jpg";
import housekeepingImage from "@/assets/service-housekeeping.jpg";
import activitiesImage from "@/assets/service-activities.jpg";
import personalCareImage from "@/assets/service-personal-care.jpg";

const Index = () => {
  const services = [
    { icon: Heart, title: "Soins Personnels", description: "Assistance pour les activités quotidiennes : bain, habillage, hygiène", image: personalCareImage },
    { icon: Users, title: "Compagnie", description: "Soutien amical et interaction sociale contre l'isolement", image: companionImage },
    { icon: Utensils, title: "Préparation Repas", description: "Planification et préparation de repas nutritifs adaptés", image: null },
    { icon: Pill, title: "Rappel Médicaments", description: "Administration ponctuelle et suivi de santé", image: null },
    { icon: Home, title: "Entretien Ménager", description: "Maintien d'un environnement propre et sécuritaire", image: housekeepingImage },
    { icon: Car, title: "Transport", description: "Transport sécuritaire vers rendez-vous et activités", image: null },
  ];

  const reasons = [
    {
      icon: Shield,
      title: "Licencié & Assuré",
      description: "Tous nos soignants sont pleinement licenciés, assurés et vérifiés pour votre tranquillité d'esprit.",
    },
    {
      icon: Clock,
      title: "Disponibilité 24/7",
      description: "Horaires flexibles avec tarifs horaires ou journaliers adaptés à vos besoins et votre budget.",
    },
    {
      icon: Award,
      title: "Équipe Expérimentée",
      description: "Des années d'expertise pour fournir des soins compassionnels et professionnels aux familles de New York.",
    },
  ];

  const testimonials = [
    {
      author: "Maria S.",
      text: "CareEase NY has been a blessing for our family. Their caregivers are professional, kind, and truly care about my mother's well-being.",
      rating: 5,
    },
    {
      author: "John D.",
      text: "The flexibility and quality of service is outstanding. They've made it possible for my father to continue living independently at home.",
      rating: 5,
    },
    {
      author: "Sarah L.",
      text: "From the first consultation to ongoing care, the team has been exceptional. Highly recommend their services!",
      rating: 5,
    },
  ];

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
          {/* Hero Image with Overlay */}
          <div className="relative h-[600px] md:h-[700px]">
            <div className="absolute inset-0">
              <img 
                src={heroImage} 
                alt="CareEase NY - Professional Home Health Care" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10 h-full">
              <div className="max-w-6xl mx-auto h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  {/* Left side: Text and CTA */}
                  <div className="text-white py-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                      Votre bien-être, notre priorité au quotidien
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                      Soins compassionnels et fiables pour vous ou vos proches. Disponible 24/7 pour vous aider à maintenir votre indépendance et qualité de vie à domicile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                      <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90 shadow-xl">
                        <Link to="/booking">Réserver Maintenant</Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm">
                        <Link to="/services">Nos Services</Link>
                      </Button>
                    </div>
                    
                    {/* Stats Cards */}
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

        {/* Services Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Nos Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Services complets d'aide à domicile adaptés à vos besoins
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 shadow-lg"
                >
                  {service.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  )}
                  <CardContent className="pt-6 pb-6">
                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" asChild className="shadow-lg">
                <Link to="/services">Voir Tous Les Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Pourquoi Nous Choisir</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez la différence de soins vraiment personnalisés
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
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Ce Que Disent Nos Clients</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Témoignages réels de familles que nous avons aidées
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
                Prêt à Commencer?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Réservez un service aujourd'hui et découvrez les soins que votre famille mérite
              </p>
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90 shadow-2xl text-lg px-8 py-6 h-auto">
                <Link to="/booking">Réserver Maintenant</Link>
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