import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Users, Utensils, Pill, Home, Car, Shield, Clock, Award, CheckCircle2 } from "lucide-react";

const Index = () => {
  const services = [
    { icon: Heart, title: "Personal Care", desc: "Daily living assistance" },
    { icon: Users, title: "Companionship", desc: "Friendly support" },
    { icon: Utensils, title: "Meal Preparation", desc: "Nutritious meals" },
    { icon: Pill, title: "Medication Reminders", desc: "Timely reminders" },
    { icon: Home, title: "Light Housekeeping", desc: "Clean environment" },
    { icon: Car, title: "Transportation", desc: "Safe travel" },
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "All our caregivers are fully licensed, insured, and background-checked.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "24/7 availability with hourly or daily rates to fit your needs.",
    },
    {
      icon: Award,
      title: "Experienced Team",
      description: "Years of expertise providing compassionate, professional care.",
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Custom care plans tailored to your unique requirements.",
    },
  ];

  const testimonials = [
    {
      name: "Maria S.",
      text: "CareEase NY has been a blessing for our family. Their caregivers are professional, kind, and truly care about my mother's well-being.",
      rating: 5,
    },
    {
      name: "John D.",
      text: "The flexibility and quality of service is outstanding. They've made it possible for my father to continue living independently at home.",
      rating: 5,
    },
    {
      name: "Sarah L.",
      text: "From the first consultation to ongoing care, the team has been exceptional. Highly recommend their services!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Professional Home Health Care in{" "}
                <span className="text-primary">New York</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Compassionate, reliable, and professional home health aide services tailored to your needs. Quality care that brings peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/booking">Book a Service Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8">
                  <Link to="/services">View Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive home health aide services designed to support independence and enhance quality of life
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="pt-6 text-center">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/services">View All Services →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CareEase NY?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by families across New York for our commitment to excellence and compassionate care
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="h-16 w-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real experiences from families who trust CareEase NY
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <CheckCircle2 key={i} className="h-5 w-5 text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-semibold">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Book your first service today and experience the CareEase NY difference. Professional care, peace of mind.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/booking">Book Now →</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;