import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Clock, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every client with dignity, respect, and genuine care.",
    },
    {
      icon: Shield,
      title: "Trusted & Reliable",
      description: "Our caregivers are thoroughly vetted, trained, and insured.",
    },
    {
      icon: Clock,
      title: "Available 24/7",
      description: "Flexible scheduling to meet your needs, day or night.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Years of experience providing top-tier home health aide services.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About CareEase NY</h1>
              <p className="text-lg text-white/90">
                Dedicated to providing exceptional home health aide services across New York
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    At CareEase NY, our mission is to enhance the quality of life for individuals who need assistance with daily activities. We believe that everyone deserves to live with dignity and independence in the comfort of their own home. Our team of professional home health aides is committed to providing personalized, compassionate care that meets the unique needs of each client.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-xl hover:scale-105 transition-all">
                  <CardContent className="pt-8 pb-6">
                    <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Founded in New York, CareEase NY was born from a simple yet powerful vision: to provide families with reliable, professional home health aide services they can trust. Our founders recognized the growing need for quality in-home care and set out to create a service that would truly make a difference in people's lives.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, we serve hundreds of families across New York, providing everything from personal care to companionship, meal preparation, and medication reminders. Our team of dedicated caregivers undergoes rigorous training and background checks to ensure we deliver the highest standard of care.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We understand that choosing a home health aide is a deeply personal decision. That's why we work closely with each family to understand their unique needs and preferences, creating customized care plans that promote independence, dignity, and quality of life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;