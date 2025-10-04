import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Heart, Users, Utensils, Pill, Home, Car } from "lucide-react";

const iconMap: { [key: string]: any } = {
  "Personal Care": Heart,
  "Companionship": Users,
  "Meal Preparation": Utensils,
  "Medication Reminders": Pill,
  "Light Housekeeping": Home,
  "Transportation": Car,
};

const Services = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Services
              </h1>
              <p className="text-lg text-white/90">
                Comprehensive home health aide services tailored to your needs. We provide professional, compassionate care to help you maintain independence and quality of life.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-12 w-12 bg-secondary rounded-full mb-4" />
                      <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                      <div className="h-4 bg-secondary rounded w-full" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services?.map((service) => {
                  const Icon = iconMap[service.name] || Heart;
                  return (
                    <Card key={service.id} className="hover:shadow-xl hover:scale-105 transition-all">
                      <CardHeader>
                        <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                            <span className="text-sm font-medium">Hourly Rate:</span>
                            <span className="font-bold text-primary text-lg">
                              ${service.price_hourly}/hr
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                            <span className="text-sm font-medium">Daily Rate:</span>
                            <span className="font-bold text-primary text-lg">
                              ${service.price_daily}/day
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link to={`/booking?service=${service.id}`}>Book This Service</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;