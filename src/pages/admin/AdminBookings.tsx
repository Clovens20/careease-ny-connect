import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Calendar, Clock, User, MapPin, Phone, Mail, ChevronLeft, ChevronRight, X } from "lucide-react";
import { sendBookingConfirmationEmail, sendBookingRejectionEmail } from '@/lib/booking-email';
import { Resend } from 'resend';
import jsPDF from 'jspdf';

const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
if (!resendApiKey) {
  console.error("VITE_RESEND_API_KEY is not defined!");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Helper function pour parser les notes
const parseNotes = (notes: string | null) => {
  if (!notes) return { phone: '', address: '', hoursPerDay: '', recipientName: '', recipientType: '', totalPrice: '' };
  
  const phoneMatch = notes.match(/Phone:\s*(.+)/);
  const addressMatch = notes.match(/Address:\s*(.+)/);
  const hoursMatch = notes.match(/Hours per day:\s*(.+)/);
  const recipientMatch = notes.match(/Recipient:\s*(.+)/);
  const recipientTypeMatch = notes.match(/Recipient Type:\s*(.+)/);
  const totalPriceMatch = notes.match(/Total price:\s*(.+)/);
  
  return {
    phone: phoneMatch ? phoneMatch[1].split('\n')[0].trim() : '',
    address: addressMatch ? addressMatch[1].split('\n')[0].trim() : '',
    hoursPerDay: hoursMatch ? hoursMatch[1].split('\n')[0].trim() : '',
    recipientName: recipientMatch ? recipientMatch[1].split('\n')[0].trim() : '',
    recipientType: recipientTypeMatch ? recipientTypeMatch[1].split('\n')[0].trim() : '',
    totalPrice: totalPriceMatch ? totalPriceMatch[1].split('\n')[0].trim() : '',
  };
};

const AdminBookings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [agentName, setAgentName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ["admin-all-bookings", page],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from("bookings")
        .select("id, user_full_name, user_email, date, start_time, end_time, status, notes, city, assigned_agent, created_at, service_id, services(name), date_range_start, date_range_end", { count: 'exact' })
        .order("created_at", { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);
      if (error) throw error;
      return { data, count };
    },
  });

  const totalPages = bookingsData?.count ? Math.ceil(bookingsData.count / pageSize) : 0;
  const bookings = bookingsData?.data || [];

  const assignAgentMutation = useMutation({
    mutationFn: async ({ bookingId, agentName }: { bookingId: string; agentName: string }) => {
      const { error } = await supabase
        .from("bookings")
        .update({
          assigned_agent: agentName,
          status: "confirmed",
        })
        .eq("id", bookingId);
      if (error) throw error;

      // ✅ AJOUTER: Envoyer l'email de confirmation avec tous les détails
      const bookingData = bookings?.find(b => b.id === bookingId);
      if (bookingData) {
        const parsedNotes = parseNotes(bookingData.notes);
        console.log("Sending email to:", bookingData.user_email);
        await sendBookingConfirmationEmail({
          bookingId,
          clientName: bookingData.user_full_name,
          clientEmail: bookingData.user_email,
          serviceName: bookingData.services?.name || 'Service',
          date: bookingData.date,
          startTime: bookingData.start_time,
          endTime: bookingData.end_time,
          agentName,
          notes: bookingData.notes || '',
          city: bookingData.city || undefined,
          // ✅ NOUVEAUX CHAMPS
          clientPhone: parsedNotes.phone || undefined,
          clientAddress: parsedNotes.address || undefined,
          totalPrice: parsedNotes.totalPrice || undefined,
        });
      } else {
        console.error("Booking data not found for ID:", bookingId);
        throw new Error("Booking data not found");
      }
    },
    onSuccess: () => {
      toast({
        title: "Agent Assigned Successfully",
        description: "The booking has been confirmed and the client will be notified.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-all-bookings"] });
      setIsDialogOpen(false);
      setSelectedBooking(null);
      setAgentName("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to assign agent. Please try again.",
        variant: "destructive",
      });
    },
  });

  const rejectBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId);
      if (error) throw error;

      // ✅ AJOUTER: Envoyer l'email de rejet
      const bookingData = bookings?.find(b => b.id === bookingId);
      if (bookingData) {
        const parsedNotes = parseNotes(bookingData.notes);
        await sendBookingRejectionEmail({
          bookingId,
          clientName: bookingData.user_full_name,
          clientEmail: bookingData.user_email,
          serviceName: bookingData.services?.name || 'Service',
          date: bookingData.date,
          startTime: bookingData.start_time,
          endTime: bookingData.end_time,
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Booking Rejected",
        description: "The booking has been rejected and the client has been notified.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-all-bookings"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reject booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRejectBooking = (bookingId: string) => {
    rejectBookingMutation.mutate(bookingId);
  };

  const handleAssignAgent = (booking: any) => {
    setSelectedBooking(booking);
    setAgentName(booking.assigned_agent || "");
    setIsDialogOpen(true);
  };

  const handleConfirmAssignment = () => {
    if (!agentName.trim()) {
      toast({
        title: "Agent Name Required",
        description: "Please enter the agent's name.",
        variant: "destructive",
      });
      return;
    }
    assignAgentMutation.mutate({ bookingId: selectedBooking.id, agentName });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const calculateEndTime = (startTime: string, durationHours: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours + durationHours, minutes, 0, 0);
    return `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
  };

  const formatDates = (booking: any) => {
    if (booking.date_range_start && booking.date_range_end) {
      const start = new Date(booking.date_range_start);
      const end = new Date(booking.date_range_end);
      const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return `${format(start, "MMM dd")} - ${format(end, "MMM dd, yyyy")} (${duration} ${duration > 1 ? 'days' : 'day'})`;
    } else if (booking.selected_dates && booking.selected_dates.length > 0) {
      return `${booking.selected_dates.length} day${booking.selected_dates.length > 1 ? "s" : ""} selected`;
    } else if (booking.date) {
      return format(new Date(booking.date), "MMM dd, yyyy");
    }
    return "No dates specified";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bookings Management</h1>
      <div className="grid gap-4">
        {isLoading && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">Loading bookings...</p>
          </Card>
        )}

        {!isLoading && bookings?.map((booking: any) => (
          <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header: Service and Status */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl mb-1">{booking.services?.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    {booking.assigned_agent && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {booking.assigned_agent}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {booking.hours_per_day && (
                    <p className="text-sm text-muted-foreground">
                      {booking.hours_per_day} hrs/day
                    </p>
                  )}
                  {booking.start_time && booking.duration_hours && (
                    <p className="text-sm text-muted-foreground">
                      {booking.start_time} - {calculateEndTime(booking.start_time, booking.duration_hours)}
                    </p>
                  )}
                </div>
              </div>

              {/* Client Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase">Client Information</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{booking.user_full_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.user_email}</span>
                    </div>
                    {(() => {
                      const parsed = parseNotes(booking.notes);
                      return (
                        <>
                          {parsed.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{parsed.phone}</span>
                            </div>
                          )}
                          {parsed.address && (
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <span>{parsed.address}</span>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Care Recipient Information */}
                {parseNotes(booking.notes).recipientName && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Care Recipient</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{parseNotes(booking.notes).recipientName}</span>
                      </div>
                      {parseNotes(booking.notes).recipientType && (
                        <div className="text-sm">
                          <Badge variant="secondary">
                            {parseNotes(booking.notes).recipientType === "elderly" && "Elderly"}
                            {parseNotes(booking.notes).recipientType === "disabled" && "Disabled"}
                            {parseNotes(booking.notes).recipientType === "both" && "Elderly & Disabled"}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dates */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatDates(booking)}</span>
                  {booking.start_time && (
                    <>
                      <Clock className="h-4 w-4 text-muted-foreground ml-4" />
                      <span>{booking.start_time}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Button */}
              {booking.status === "pending" && (
                <div className="pt-4 border-t flex gap-2">
                  <Button
                    onClick={() => handleAssignAgent(booking)}
                    className="flex-1 md:flex-none"
                    size="lg"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept & Assign Agent
                  </Button>
                  <Button
                    onClick={() => handleRejectBooking(booking.id)}
                    variant="destructive"
                    className="flex-1 md:flex-none"
                    size="lg"
                    disabled={rejectBookingMutation.isPending}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}

        {!isLoading && bookings?.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">No bookings yet.</p>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages} ({bookingsData?.count || 0} total bookings)
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0 || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1 || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Assign Agent Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assign Agent to Booking</DialogTitle>
            <DialogDescription>
              Review all booking details and assign an agent. The client will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedBooking && (() => {
              const parsedNotes = parseNotes(selectedBooking.notes);
              return (
                <div className="space-y-4">
                  {/* Booking Summary */}
                  <div className="space-y-3 p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">Booking Summary</h4>
                      <Badge className={getStatusColor(selectedBooking.status)}>
                        {selectedBooking.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Service</p>
                        <p className="font-medium">{selectedBooking.services?.name || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-medium">{format(new Date(selectedBooking.date), "MMM dd, yyyy")}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="font-medium">
                          {selectedBooking.start_time} - {selectedBooking.end_time}
                        </p>
                      </div>
                      {selectedBooking.city && (
                        <div>
                          <p className="text-xs text-muted-foreground">City</p>
                          <p className="font-medium">{selectedBooking.city}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Client Details */}
                  <div className="space-y-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold text-base mb-3">Client Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Name</p>
                          <p className="font-medium">{selectedBooking.user_full_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="font-medium">{selectedBooking.user_email}</p>
                        </div>
                      </div>
                      {parsedNotes.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Phone</p>
                            <p className="font-medium">{parsedNotes.phone}</p>
                          </div>
                        </div>
                      )}
                      {parsedNotes.address && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">Address</p>
                            <p className="font-medium">{parsedNotes.address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Care Recipient Details */}
                  {parsedNotes.recipientName && (
                    <div className="space-y-2 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <h4 className="font-semibold text-base mb-3">Care Recipient</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Name</p>
                            <p className="font-medium">{parsedNotes.recipientName}</p>
                          </div>
                        </div>
                        {parsedNotes.recipientType && (
                          <div>
                            <Badge variant="secondary" className="mt-1">
                              {parsedNotes.recipientType === "Elderly Person" && "Elderly"}
                              {parsedNotes.recipientType === "Disabled Person" && "Disabled"}
                              {parsedNotes.recipientType === "Elderly and Disabled" && "Both"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Info from Notes */}
                  {parsedNotes.hoursPerDay && (
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Hours per Day</p>
                          <p className="font-medium">{parsedNotes.hoursPerDay} hours/day</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Full Notes (for any extra info) */}
                  {selectedBooking.notes && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">Full Details</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {selectedBooking.notes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Agent Assignment Input */}
            <div className="space-y-2 pt-4 border-t">
              <Label htmlFor="agent-name" className="text-base font-semibold">Assign Agent</Label>
              <Input
                id="agent-name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Enter agent's full name"
                className="h-12 text-base"
              />
              <p className="text-xs text-muted-foreground">
                This agent will be assigned to handle this booking
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAssignment}
              disabled={assignAgentMutation.isPending || !agentName.trim()}
            >
              {assignAgentMutation.isPending ? "Assigning..." : "Confirm & Assign Agent"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;