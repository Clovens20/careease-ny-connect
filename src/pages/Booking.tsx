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
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarIcon, CheckCircle2, Clock, Calendar as CalendarIcon2 } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(searchParams.get("service") || "");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [duration, setDuration] = useState("4");
  const [startTime, setStartTime] = useState("09:00");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bookingType, setBookingType] = useState<"hourly" | "daily" | "monthly">("hourly");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("id, name, description, price_hourly, price_daily")
        .eq("is_active", true)
        .order("name");
      if (data) {
        setServices(data as Service[]);
      }
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!selectedService) return;

    const fetchUnavailableDates = async () => {
      const { data } = await supabase
        .from("unavailable_dates")
        .select("date")
        .eq("service_id", selectedService)
        .eq("is_booked", true);

      if (data) {
        setUnavailableDates(data.map(d => d.date));
      }
    };

    fetchUnavailableDates();

    const channel = supabase
      .channel('unavailable_dates_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'unavailable_dates',
          filter: `service_id=eq.${selectedService}`
        },
        () => {
          fetchUnavailableDates();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedService]);

  const selectedServiceData = services.find((s) => s.id === selectedService);

  const calculatePrice = () => {
    if (!selectedServiceData) return 0;
    const hours = parseInt(duration);
    
    if (bookingType === "monthly") {
      return selectedServiceData.price_daily * selectedDates.length;
    } else if (bookingType === "daily" || hours >= 8) {
      return selectedServiceData.price_daily;
    }
    return selectedServiceData.price_hourly * hours;
  };

  const handleSubmit = async () => {
    if (!selectedDate && selectedDates.length === 0) return;
    if (!selectedService) return;

    setIsSubmitting(true);

    try {
      const datesToBook = bookingType === "monthly" ? selectedDates : [selectedDate!];
      
      const bookings = datesToBook.map(date => ({
        service_id: selectedService,
        client_name: clientName,
        email: email,
        phone: phone,
        address: address,
        date: format(date, "yyyy-MM-dd"),
        start_time: startTime,
        duration_hours: parseInt(duration),
        total_price: bookingType === "monthly" 
          ? selectedServiceData!.price_daily
          : calculatePrice() / datesToBook.length,
        status: "pending" as const,
      }));

      const { error: bookingError } = await supabase.from("bookings").insert(bookings);
      if (bookingError) throw bookingError;

      const unavailableDatesData = datesToBook.map(date => ({
        date: format(date, "yyyy-MM-dd"),
        service_id: selectedService,
        is_booked: true,
      }));

      const { error: unavailableError } = await supabase
        .from("unavailable_dates")
        .insert(unavailableDatesData);
      
      if (unavailableError) throw unavailableError;

      toast({
        title: "Réservation Confirmée!",
        description: "Nous avons reçu votre demande de réservation. Nous vous contacterons sous peu.",
      });

      setStep(1);
      setSelectedService("");
      setSelectedDate(undefined);
      setSelectedDates([]);
      setDuration("4");
      setStartTime("09:00");
      setClientName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setBookingType("hourly");
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la réservation. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !selectedService) {
      toast({
        title: "Service Requis",
        description: "Veuillez sélectionner un service.",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && bookingType !== "monthly" && !selectedDate) {
      toast({
        title: "Date Requise",
        description: "Veuillez sélectionner une date.",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && bookingType === "monthly" && selectedDates.length === 0) {
      toast({
        title: "Dates Requises",
        description: "Veuillez sélectionner au moins une date.",
        variant: "destructive",
      });
      return;
    }
    if (step === 3 && (!clientName || !email || !phone || !address)) {
      toast({
        title: "Information Requise",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const isDateUnavailable = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return unavailableDates.includes(dateStr);
  };

  const toggleMonthlyDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const exists = selectedDates.some(d => format(d, "yyyy-MM-dd") === dateStr);
    
    if (exists) {
      setSelectedDates(selectedDates.filter(d => format(d, "yyyy-MM-dd") !== dateStr));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Réserver un Service</h1>
            <p className="text-lg text-muted-foreground">
              Complétez le formulaire pour planifier votre service d'aide à domicile
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
                {step === 1 && "Sélectionner un Service"}
                {step === 2 && "Choisir Date & Heure"}
                {step === 3 && "Vos Informations"}
                {step === 4 && "Confirmer la Réservation"}
              </CardTitle>
              <CardDescription className="text-base">
                Étape {step} sur 4
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Sélectionnez un Service</Label>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-24 bg-secondary animate-pulse rounded-lg" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {services.map((service) => (
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
                              <p className="font-bold text-xl text-primary">${service.price_hourly}/h</p>
                              <p className="text-sm text-muted-foreground">${service.price_daily}/jour</p>
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
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Type de Réservation</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-lg",
                          bookingType === "hourly" ? "border-2 border-primary bg-primary/10" : ""
                        )}
                        onClick={() => setBookingType("hourly")}
                      >
                        <CardContent className="p-6 text-center">
                          <Clock className="h-10 w-10 mx-auto mb-3 text-primary" />
                          <p className="font-bold">À l'heure</p>
                          <p className="text-sm text-muted-foreground">1-12 heures</p>
                        </CardContent>
                      </Card>
                      <Card
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-lg",
                          bookingType === "daily" ? "border-2 border-primary bg-primary/10" : ""
                        )}
                        onClick={() => setBookingType("daily")}
                      >
                        <CardContent className="p-6 text-center">
                          <CalendarIcon className="h-10 w-10 mx-auto mb-3 text-primary" />
                          <p className="font-bold">À la journée</p>
                          <p className="text-sm text-muted-foreground">8+ heures</p>
                        </CardContent>
                      </Card>
                      <Card
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-lg",
                          bookingType === "monthly" ? "border-2 border-primary bg-primary/10" : ""
                        )}
                        onClick={() => setBookingType("monthly")}
                      >
                        <CardContent className="p-6 text-center">
                          <CalendarIcon2 className="h-10 w-10 mx-auto mb-3 text-primary" />
                          <p className="font-bold">Au mois</p>
                          <p className="text-sm text-muted-foreground">Jours multiples</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {bookingType !== "monthly" && (
                    <>
                      {bookingType === "hourly" && (
                        <div className="space-y-2">
                          <Label className="text-base font-semibold">Durée (heures)</Label>
                          <Select value={duration} onValueChange={setDuration}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                                const price = h >= 8 ? selectedServiceData?.price_daily : (selectedServiceData?.price_hourly || 0) * h;
                                return (
                                  <SelectItem key={h} value={h.toString()}>
                                    {h} heure{h > 1 ? "s" : ""} - ${price?.toFixed(2)}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Sélectionner une Date</Label>
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
                              {selectedDate ? format(selectedDate, "PPP") : "Choisir une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date() || isDateUnavailable(date)}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </>
                  )}

                  {bookingType === "monthly" && (
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Sélectionner les Jours du Mois</Label>
                      <div className="grid grid-cols-7 gap-2">
                        {eachDayOfInterval({
                          start: startOfMonth(new Date()),
                          end: endOfMonth(new Date())
                        }).map((date) => {
                          const isSelected = selectedDates.some(
                            d => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                          );
                          const isPast = date < new Date();
                          const isUnavailable = isDateUnavailable(date);

                          return (
                            <Button
                              key={date.toISOString()}
                              variant={isSelected ? "default" : "outline"}
                              className={cn(
                                "h-12",
                                isPast || isUnavailable ? "opacity-50 cursor-not-allowed" : ""
                              )}
                              onClick={() => !isPast && !isUnavailable && toggleMonthlyDate(date)}
                              disabled={isPast || isUnavailable}
                            >
                              {format(date, "d")}
                            </Button>
                          );
                        })}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedDates.length} jour{selectedDates.length > 1 ? "s" : ""} sélectionné{selectedDates.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-base font-semibold">Heure de Début</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 rounded-xl border-2 border-primary/30">
                    <p className="text-2xl font-bold text-primary">Prix Total: ${calculatePrice().toFixed(2)}</p>
                    {bookingType === "monthly" && (
                      <p className="text-sm text-muted-foreground mt-2">
                        ${selectedServiceData?.price_daily.toFixed(2)} par jour × {selectedDates.length} jours
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Client Information */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="client-name" className="text-base font-semibold">Nom Complet</Label>
                    <Input
                      id="client-name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Jean Dupont"
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
                      placeholder="jean@example.com"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold">Numéro de Téléphone</Label>
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
                    <Label htmlFor="address" className="text-base font-semibold">Adresse Complète</Label>
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
                    <h3 className="font-bold text-2xl text-primary">Résumé de la Réservation</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-muted-foreground font-medium">Service:</span>
                        <span className="font-bold text-lg">{selectedServiceData?.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-muted-foreground font-medium">Type:</span>
                        <span className="font-bold text-lg">
                          {bookingType === "hourly" && "À l'heure"}
                          {bookingType === "daily" && "À la journée"}
                          {bookingType === "monthly" && "Au mois"}
                        </span>
                      </div>
                      {bookingType !== "monthly" ? (
                        <div className="flex justify-between items-center py-3 border-b">
                          <span className="text-muted-foreground font-medium">Date:</span>
                          <span className="font-bold text-lg">
                            {selectedDate && format(selectedDate, "PPP")}
                          </span>
                        </div>
                      ) : (
                        <div className="py-3 border-b">
                          <span className="text-muted-foreground font-medium block mb-2">Dates:</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedDates.map((date, i) => (
                              <span key={i} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                {format(date, "d MMM")}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-muted-foreground font-medium">Heure:</span>
                        <span className="font-bold text-lg">{startTime}</span>
                      </div>
                      {bookingType !== "monthly" && bookingType === "hourly" && (
                        <div className="flex justify-between items-center py-3 border-b">
                          <span className="text-muted-foreground font-medium">Durée:</span>
                          <span className="font-bold text-lg">{duration} heures</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-muted-foreground font-medium text-xl">Prix Total:</span>
                        <span className="font-bold text-primary text-3xl">
                          ${calculatePrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-8 rounded-xl space-y-4">
                    <h3 className="font-bold text-xl">Informations Client</h3>
                    <div className="space-y-3">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Nom:</span>
                        <span className="font-semibold">{clientName}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-semibold">{email}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Téléphone:</span>
                        <span className="font-semibold">{phone}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Adresse:</span>
                        <span className="font-semibold text-right">{address}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground text-center italic">
                    En confirmant cette réservation, vous acceptez nos conditions de service.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 gap-4">
                {step > 1 && (
                  <Button variant="outline" onClick={prevStep} className="h-12 px-8">
                    Précédent
                  </Button>
                )}
                {step < 4 ? (
                  <Button onClick={nextStep} className="ml-auto h-12 px-8 text-lg">
                    Suivant
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="ml-auto h-12 px-8 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Confirmation..." : "Confirmer la Réservation"}
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
