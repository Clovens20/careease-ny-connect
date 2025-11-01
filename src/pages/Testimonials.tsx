import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

type Testimonial = {
  id: string;
  author: string;
  text: string;
  rating: number;
  created_at: string;
};

const Testimonials = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials", "active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const createTestimonial = useMutation({
    mutationFn: async (payload: { author: string; text: string; rating: number }) => {
      const { error } = await supabase.from("testimonials").insert([payload]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials", "active"] });
      toast({
        title: "Thank you!",
        description: "Your testimonial has been submitted. It will be reviewed before being published.",
      });
      setName("");
      setText("");
      setRating(5);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast({
        title: "Fields Required",
        description: "Please provide both your name and testimonial.",
        variant: "destructive",
      });
      return;
    }
    createTestimonial.mutate({ author: name.trim(), text: text.trim(), rating });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h1>
              <p className="text-lg text-white/90">
                Real feedback from families we've helped
              </p>
            </div>
          </div>
        </section>

        {/* Existing Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading testimonials...</p>
            ) : testimonials && testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="hover:shadow-2xl transition-all">
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
            ) : (
              <Card className="p-12 text-center mb-16">
                <p className="text-muted-foreground text-lg">No testimonials yet. Be the first!</p>
              </Card>
            )}

            {/* Submit Testimonial Form */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Share Your Experience</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= rating
                                ? "text-primary fill-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonial">Your Testimonial</Label>
                    <Textarea
                      id="testimonial"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Share your experience with CareEase USA..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={createTestimonial.isPending}>
                    {createTestimonial.isPending ? "Submitting..." : "Submit Testimonial"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;