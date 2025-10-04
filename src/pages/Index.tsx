import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Users, Utensils, Pill, Home, Car, Shield, Clock, Award, Star } from "lucide-react";

const Index = () => {
  const services = [
    { icon: Heart, title: "Personal Care", description: "Assistance with daily living activities including bathing, dressing, and grooming" },
    { icon: Users, title: "Companionship", description: "Friendly support and social interaction to combat loneliness" },
    { icon: Utensils, title: "Meal Preparation", description: "Nutritious meal planning and preparation tailored to dietary needs" },
    { icon: Pill, title: "Medication Reminders", description: "Timely medication administration and health monitoring" },
    { icon: Home, title: "Light Housekeeping", description: "Maintaining a clean, safe, and comfortable living environment" },
    { icon: Car, title: "Transportation", description: "Safe transportation to appointments and activities" },
  ];

  const reasons = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "All our caregivers are fully licensed, insured, and background-checked for your peace of mind.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Flexible scheduling with hourly or daily rates to fit your unique needs and budget.",
    },
    {
      icon: Award,
      title: "Experienced Team",
      description: "Years of expertise providing compassionate, professional care to families across New York.",
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
        {/* Hero Section with Purple Gradient */}
        <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary-light py-20 md:py-32 overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side: Text and Stats */}
                <div className="text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Professional Home Health Aide Services
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-white/90">
                    Compassionate, reliable care for you or your loved ones. Available 24/7 to help you maintain independence and quality of life at home.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
                      <Link to="/booking">Book a Service</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                      <Link to="/services">View Services</Link>
                    </Button>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
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

                {/* Right side: Visual space */}
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-3xl"></div>
                    <div className="h-[500px] rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <div className="text-center text-white/40">
                        <Heart className="h-32 w-32 mx-auto mb-4 opacity-20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive home health aide services tailored to your needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const isPurple = index % 2 === 0;
                return (
                  <Card 
                    key={index} 
                    className={`hover:shadow-xl hover:scale-105 transition-all ${
                      isPurple ? 'bg-primary text-white border-primary' : 'bg-white'
                    }`}
                  >
                    <CardContent className="pt-8 pb-6">
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${
                        isPurple ? 'bg-white/20' : 'bg-primary/10'
                      }`}>
                        <service.icon className={`h-8 w-8 ${isPurple ? 'text-white' : 'text-primary'}`} />
                      </div>
                      <h3 className={`font-semibold text-xl mb-3 ${isPurple ? 'text-white' : 'text-foreground'}`}>
                        {service.title}
                      </h3>
                      <p className={`text-sm ${isPurple ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the difference of truly personalized care
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((reason, index) => (
                <Card key={index} className="hover:shadow-2xl hover:scale-105 transition-all border-0 shadow-lg">
                  <CardContent className="pt-8 pb-6">
                    <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <reason.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real stories from families we've helped
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-xl transition-all border-primary/20">
                  <CardContent className="pt-8 pb-6">
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <p className="font-semibold text-lg">{testimonial.author}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Book a service today and experience the care your family deserves
              </p>
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
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