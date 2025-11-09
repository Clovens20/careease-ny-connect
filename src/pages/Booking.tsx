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
import { CalendarIcon, CheckCircle2, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type ServiceRow = {
  id: string;
  name?: string | null;
  price_hourly?: number | null;
  price_daily?: number | null;
  title?: string | null;
  hourly_rate?: number | null;
  daily_rate?: number | null;
  description?: string | null;
  is_active?: boolean | null;
};

const AVAILABLE_CITIES = [
  "Freeport",
  "Baldwin",
  "Oceanside",
  "Rockville Centre",
  "Lynbrook",
  "Hempstead",
  "Uniondale",
  "Garden City",
  "Roosevelt",
  "Long Beach",
  "Massapequa",
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  // Service & Date Selection
  const [selectedService, setSelectedService] = useState(searchParams.get("service") || "");
  const [recipientType, setRecipientType] = useState(""); // ✅ DÉPLACÉ ICI
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dateRangeStart, setDateRangeStart] = useState<Date>();
  const [dateRangeEnd, setDateRangeEnd] = useState<Date>();
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [hoursPerDay, setHoursPerDay] = useState("4");

  // Client Information
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [city, setCity] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: services, isLoading } = useQuery({
    queryKey: ["services", "active", "booking"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ServiceRow[];
    },
  });

  // Helpers pour supporter les deux schémas
  const getServiceName = (s?: ServiceRow) => (s?.name ?? s?.title ?? "");
  const getHourly = (s?: ServiceRow) => (s?.price_hourly ?? s?.hourly_rate ?? 0);

  const selectedServiceData = services?.find((s) => s.id === selectedService);

  const calculateTotalPrice = () => {
    if (!selectedServiceData) return 0;
    const hours = parseInt(hoursPerDay || "0", 10) || 0;
    const pricePerDay = (getHourly(selectedServiceData) || 0) * hours;

    if (isRangeMode && dateRangeStart && dateRangeEnd) {
      const days = Math.ceil((dateRangeEnd.getTime() - dateRangeStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return pricePerDay * days;
    }

    return pricePerDay * selectedDates.length;
  };

  const getDaysCount = () => {
    if (isRangeMode && dateRangeStart && dateRangeEnd) {
      return Math.ceil((dateRangeEnd.getTime() - dateRangeStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }
    return selectedDates.length;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (isRangeMode) {
      if (!dateRangeStart) {
        setDateRangeStart(date);
      } else if (!dateRangeEnd) {
        if (date > dateRangeStart) {
          setDateRangeEnd(date);
        } else {
          setDateRangeStart(date);
          setDateRangeEnd(undefined);
        }
      } else {
        setDateRangeStart(date);
        setDateRangeEnd(undefined);
      }
    } else {
      const dateString = date.toDateString();
      const exists = selectedDates.some(d => d.toDateString() === dateString);
      if (exists) {
        setSelectedDates(selectedDates.filter(d => d.toDateString() !== dateString));
      } else {
        setSelectedDates([...selectedDates, date].sort((a, b) => a.getTime() - b.getTime()));
      }
    }
  };

  const getDatesInRange = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    const current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const calculateTotalPriceFromDates = (numDates: number) => {
    if (!selectedServiceData) return 0;
    const hours = parseInt(hoursPerDay || "0", 10) || 0;
    const pricePerDay = (getHourly(selectedServiceData) || 0) * hours;
    return pricePerDay * numDates;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!city) {
        toast({
          title: "City Required",
          description: "Please select your city before confirming the booking.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const startTime = "09:00";
      const hours = parseInt(hoursPerDay || "0", 10);
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const endHour = startHour + hours;
      const endTime = `${endHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;

      const datesToBook: Date[] = isRangeMode && dateRangeStart && dateRangeEnd
        ? getDatesInRange(dateRangeStart, dateRangeEnd)
        : selectedDates;

      if (datesToBook.length === 0) {
        toast({
          title: "Date Required",
          description: "Please select at least one date.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const totalPrice = calculateTotalPriceFromDates(datesToBook.length);

      const notesContent = [
        `Client: ${clientName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Address: ${address}`,
        `City: ${city}`,
        `Recipient: ${recipientName}`,
        `Recipient Type: ${recipientType === "elderly" ? "Elderly Person" : recipientType === "disabled" ? "Disabled Person" : "Elderly and Disabled"}`,
        `Hours per day: ${hoursPerDay}`,
        `Total days: ${datesToBook.length}`,
        `Total price: $${totalPrice.toFixed(2)}`
      ].join('\n');

      const bookingToInsert = {
        user_full_name: clientName,
        user_email: email,
        service_id: selectedService,
        date: isRangeMode && dateRangeStart ? format(dateRangeStart, "yyyy-MM-dd") : format(datesToBook[0], "yyyy-MM-dd"),
        start_time: startTime,
        end_time: endTime,
        notes: notesContent,
        status: "pending" as const,
        city: city,
        total_price: totalPrice,
        ...(isRangeMode && dateRangeStart && dateRangeEnd ? {
          date_range_start: format(dateRangeStart, "yyyy-MM-dd"),
          date_range_end: format(dateRangeEnd, "yyyy-MM-dd"),
        } : {}),
      };

      const { error } = await supabase.from("bookings").insert(bookingToInsert);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast({
        title: "Booking Request Sent!",
        description: `We've received your booking for ${datesToBook.length} day${datesToBook.length > 1 ? 's' : ''}. We'll contact you shortly with confirmation and agent assignment.`,
      });

      // Reset form
      setStep(1);
      setSelectedService("");
      setRecipientType(""); // ✅ RESET
      setSelectedDates([]);
      setDateRangeStart(undefined);
      setDateRangeEnd(undefined);
      setIsRangeMode(false);
      setHoursPerDay("4");
      setClientName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setRecipientName("");
      setCity("");
    } catch (error: any) {
      console.error("Error details:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to create booking. Please try again.",
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
    // ✅ VALIDATION MODIFIÉE : Vérifier recipientType au step 1
    if (step === 1 && !recipientType) {
      toast({
        title: "Recipient Type Required",
        description: "Please select the type of care recipient to continue.",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && selectedDates.length === 0 && (!dateRangeStart || !dateRangeEnd)) {
      toast({
        title: "Dates Required",
        description: "Please select at least one date or a date range.",
        variant: "destructive",
      });
      return;
    }
    if (step === 3 && (!clientName || !email || !phone || !address || !recipientName || !city)) {
      toast({
        title: "Information Required",
        description: "Please fill in all fields to continue, including your city.",
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
              Complete the form below to schedule your care service
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
                {step === 1 && "Select Service & Recipient Type"}
                {step === 2 && "Choose Dates & Hours"}
                {step === 3 && "Your Information"}
                {step === 4 && "Confirm Booking"}
              </CardTitle>
              <CardDescription className="text-base">
                Step {step} of 4
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {/* ✅ Step 1: Service Selection + Type of Care Recipient */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Service Selection */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Select a Service</Label>
                    {isLoading ? (
                      <div className="space-y-3">
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="h-24 bg-secondary animate-pulse rounded-lg" />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {services?.map((service) => {
                          const displayName = getServiceName(service);
                          const displayHourly = getHourly(service);
                          return (
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
                                  <h3 className="font-bold text-xl mb-2">{displayName}</h3>
                                  <p className="text-muted-foreground">{service.description}</p>
                                </div>
                                {/* ✅ PRIX CACHÉ si recipientType n'est pas sélectionné */}
                                {recipientType && (
                                  <div className="text-right ml-4">
                                    <p className="font-bold text-xl text-primary">${displayHourly}/hr</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {services?.length === 0 && (
                          <p className="text-muted-foreground">No active services available.</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ✅ Type of Care Recipient - DÉPLACÉ ICI */}
                  {selectedService && (
                    <div className="space-y-2 pt-4 border-t">
                      <Label htmlFor="recipient-type" className="text-lg font-semibold">
                        Type of Care Recipient
                      </Label>
                      <Select value={recipientType} onValueChange={setRecipientType}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="elderly">Elderly Person</SelectItem>
                          <SelectItem value="disabled">Disabled Person</SelectItem>
                          <SelectItem value="both">Both Elderly and Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                      {!recipientType && (
                        <p className="text-sm text-muted-foreground italic">
                          Please select the type of care recipient to see pricing
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Date & Hours Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex gap-4 mb-4">
                    <Button
                      variant={!isRangeMode ? "default" : "outline"}
                      onClick={() => {
                        setIsRangeMode(false);
                        setDateRangeStart(undefined);
                        setDateRangeEnd(undefined);
                      }}
                      className="flex-1"
                    >
                      Multiple Days
                    </Button>
                    <Button
                      variant={isRangeMode ? "default" : "outline"}
                      onClick={() => {
                        setIsRangeMode(true);
                        setSelectedDates([]);
                      }}
                      className="flex-1"
                    >
                      Date Range
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      {isRangeMode ? "Select Date Range" : "Select Multiple Dates"}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
                            selectedDates.length === 0 && !dateRangeStart && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {isRangeMode
                            ? (dateRangeStart && dateRangeEnd
                                ? `${format(dateRangeStart, "PP")} - ${format(dateRangeEnd, "PP")}`
                                : dateRangeStart
                                ? `Start: ${format(dateRangeStart, "PP")}`
                                : "Pick date range")
                            : selectedDates.length > 0
                            ? `${selectedDates.length} day${selectedDates.length > 1 ? "s" : ""} selected`
                            : "Pick dates"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={isRangeMode ? dateRangeStart : selectedDates[0]}
                          onSelect={handleDateSelect}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {!isRangeMode && selectedDates.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Selected Dates:</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedDates.map((date, index) => (
                          <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                            {format(date, "MMM dd, yyyy")}
                            <X
                              className="ml-2 h-3 w-3 cursor-pointer"
                              onClick={() => setSelectedDates(selectedDates.filter((_, i) => i !== index))}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Hours per Day</Label>
                    <Input
                      type="number"
                      min="1"
                      max="24"
                      value={hoursPerDay}
                      onChange={(e) => setHoursPerDay(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 rounded-xl border-2 border-primary/30">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {getDaysCount()} day{getDaysCount() > 1 ? "s" : ""} × {hoursPerDay} hour{parseInt(hoursPerDay || "0", 10) > 1 ? "s" : ""}/day × ${getHourly(selectedServiceData)}/hr
                      </p>
                      <p className="text-2xl font-bold text-primary">Total: ${calculateTotalPrice().toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Client Information (recipientType RETIRÉ d'ici) */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="client-name" className="text-base font-semibold">Your Full Name</Label>
                    <Input
                      id="client-name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="John Doe"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold">Your Email</Label>
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
                    <Label htmlFor="phone" className="text-base font-semibold">Your Phone Number</Label>
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
                    <Label htmlFor="city" className="text-base font-semibold">Select Your City</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your city..." />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_CITIES.map((cityName) => (
                          <SelectItem key={cityName} value={cityName}>
                            {cityName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base font-semibold">Service Address</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, Apt 4B, New York, NY 10001"
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-semibold text-lg mb-4">Care Recipient Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient-name" className="text-base font-semibold">
                          Full Name of Person Receiving Care
                        </Label>
                        <Input
                          id="recipient-name"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="Jane Doe"
                          className="h-12"
                        />
                      </div>
                      {/* ✅ Type déjà sélectionné - affichage seulement */}
                      <div className="space-y-2">
                        <Label className="text-base font-semibold">Type of Care Recipient</Label>
                        <div className="h-12 px-4 py-3 border rounded-md bg-secondary/50 flex items-center">
                          <span className="font-medium">
                            {recipientType === "elderly" && "Elderly Person"}
                            {recipientType === "disabled" && "Disabled Person"}
                            {recipientType === "both" && "Both Elderly and Disabled"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          Selected in Step 1. Go back if you need to change this.
                        </p>
                      </div>
                    </div>
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
                        <span className="font-bold text-lg">{getServiceName(selectedServiceData)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-muted-foreground font-medium">Dates:</span>
                        <span className="font-bold text-lg text-right">
                          {isRangeMode && dateRangeStart && dateRangeEnd
                            ? `${format(dateRangeStart, "MMM dd")} - ${format(dateRangeEnd, "MMM dd, yyyy")}`
                            : selectedDates.length > 0
                            ? `${selectedDates.length} day${selectedDates.length > 1 ? "s" : ""}`
                            : "No dates selected"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-muted-foreground font-medium">Hours per Day:</span>
                        <span className="font-bold text-lg">{hoursPerDay} hours</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-muted-foreground font-medium text-xl">Total Price:</span>
                        <span className="font-bold text-primary text-3xl">
                          ${calculateTotalPrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-8 rounded-xl space-y-4">
                    <h3 className="font-bold text-xl">Contact Information</h3>
                    <div className="space-y-3">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Your Name:</span>
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
                        <span className="text-muted-foreground">City:</span>
                        <span className="font-semibold">{city}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="font-semibold text-right max-w-xs">{address}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-8 rounded-xl space-y-4">
                    <h3 className="font-bold text-xl">Care Recipient</h3>
                    <div className="space-y-3">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-semibold">{recipientName}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-semibold">
                          {recipientType === "elderly" && "Elderly Person"}
                          {recipientType === "disabled" && "Disabled Person"}
                          {recipientType === "both" && "Elderly and Disabled"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground text-center italic">
                    By confirming this booking, you agree to our terms of service. We'll contact you to assign an agent and confirm your booking.
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
                    {isSubmitting ? "Sending..." : "Confirm Booking"}
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