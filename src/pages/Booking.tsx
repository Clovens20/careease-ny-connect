import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(searchParams.get("service") || "");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [duration, setDuration] = useState("4");
  const [startTime, setStartTime] = useState("09:00");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, description, price_hourly, price_daily")
        .order("name");
      if (error) throw error;
      return data as Array<{
        id: string;
        name: string;
        description: string | null;
        price_hourly: number | null;
        price_daily: number | null;
      }>;
    },
  });

  const selectedServiceData = services?.find((s) => s.id === selectedService);

  const calculatePrice = () => {
    if (!selectedServiceData) return 0;
    const hours = parseInt(duration);
    if (hours >= 8) {
      return selectedServiceData.price_daily || 0;
    }
    return (selectedServiceData.price_hourly || 0) * hours;
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedService) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("bookings").insert({
        service_id: selectedService,
        client_name: clientName,
        email: email,
        phone: phone,
        address: address,
        date: format(selectedDate, "yyyy-MM-dd"),
        start_time: startTime,
        duration_hours: parseInt(duration),
        total_price: calculatePrice(),
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Booking Confirmed!",
        description: "We've received your booking request. We'll contact you shortly to confirm.",
      });

      // Reset form
      setStep(1);
      setSelectedService("");
      setSelectedDate(undefined);
      setDuration("4");
      setStartTime("09:00");
      setClientName("");
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !selectedService) {
      toast({
        title: "Service Required",
        description: "Please select a service to continue.",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && !selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a date to continue.",
        variant: "destructive",
      });
      return;
    }
    if (step === 3 && (!clientName || !email || !phone || !address)) {
      toast({
        title: "Information Required",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book a Service</h1>
            <p className="text-lg text-muted-foreground">
              Complete the form below to schedule your home health aide service
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12 max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all",
                    step >= s
                      ? "bg-primary text-primary-foreground scale-110"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={cn(
                      "flex-1 h-2 mx-2 rounded-full transition-all",
                      step > s ? "bg-primary" : "bg-secondary"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-8">
              <CardTitle className="text-2xl">
                {step === 1 && "Select a Service"}
                {step === 2 && "Choose Date & Time"}
                {step === 3 && "Your Information"}
                {step === 4 && "Confirm Booking"}
              </CardTitle>
              <CardDescription className="text-base">
                Step {step} of 4
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Select a Service</Label>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-24 bg-secondary animate-pulse rounded-lg" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {services?.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={cn(
                            "border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-xl",
                            selectedService === service.id
                              ? "border-primary bg-primary/10 shadow-lg scale-105"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                              <p className="text-muted-foreground">{service.description}</p>
                            </div>
                            <div className="text-right ml-4">
                              <p className="font-bold text-xl text-primary">${service.price_hourly}/hr</p>
                              <p className="text-sm text-muted-foreground">${service.price_daily}/day</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Duration (hours)</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                          <SelectItem key={h} value={h.toString()}>
                            {h} hour{h > 1 ? "s" : ""} - ${(parseInt(h.toString()) >= 8 ? selectedServiceData?.price_daily : (selectedServiceData?.price_hourly || 0) * parseInt(h.toString())).toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-base font-semibold">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 rounded-xl border-2 border-primary/30">
                    <p className="text-2xl font-bold text-primary">Total Price: ${calculatePrice().toFixed(2)}</p>
                  </div>
                </div>
              )}

              {/* Step 3: Client Information */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="client-name" className="text-base font-semibold">Full Name</Label>
                    <Input
                      id="client-name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="John Doe"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base font-semibold">Full Address</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, Apt 4B, New York, NY 10001"
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-xl border-2 border-primary/20 space-y-6">
                    <h3 className="font-bold text-2xl text-primary">Booking Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-muted-foreground font-medium">Service:</span>
                        <span className="font-bold text-lg">{selectedServiceData?.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-muted-foreground font-medium">Date:</span>
                        <span className="font-bold text-lg">
                          {selectedDate && format(selectedDate, "PPP")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-muted-foreground font-medium">Time:</span>
                        <span className="font-bold text-lg">{startTime}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-muted-foreground font-medium">Duration:</span>
                        <span className="font-bold text-lg">{duration} hours</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-muted-foreground font-medium text-xl">Total Price:</span>
                        <span className="font-bold text-primary text-3xl">
                          ${calculatePrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-8 rounded-xl space-y-4">
                    <h3 className="font-bold text-xl">Client Information</h3>
                    <div className="space-y-3">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-semibold">{clientName}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-semibold">{email}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-semibold">{phone}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="font-semibold text-right">{address}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground text-center italic">
                    By confirming this booking, you agree to our terms of service. We'll send you a confirmation email shortly.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 gap-4">
                {step > 1 && (
                  <Button variant="outline" onClick={prevStep} className="h-12 px-8">
                    Previous
                  </Button>
                )}
                {step < 4 ? (
                  <Button onClick={nextStep} className="ml-auto h-12 px-8 text-lg">
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="ml-auto h-12 px-8 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Confirming..." : "Confirm Booking"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
