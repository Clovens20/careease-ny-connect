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
import { CheckCircle, Calendar, Clock, User, MapPin, Phone, Mail } from "lucide-react";

const AdminBookings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [agentName, setAgentName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: bookings } = useQuery({
    queryKey: ["admin-all-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, services(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const assignAgentMutation = useMutation({
    mutationFn: async ({ bookingId, agentName }: { bookingId: string; agentName: string }) => {
      const { error } = await supabase
        .from("bookings")
        .update({
          assigned_agent: agentName,
          status: "confirmed",
        } as any)
        .eq("id", bookingId);
      if (error) throw error;
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

  const formatDates = (booking: any) => {
    if (booking.date_range_start && booking.date_range_end) {
      return `${format(new Date(booking.date_range_start), "MMM dd")} - ${format(new Date(booking.date_range_end), "MMM dd, yyyy")}`;
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
        {bookings?.map((booking: any) => (
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
                  <p className="font-bold text-2xl text-primary">${Number(booking.total_price).toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.hours_per_day ? `${booking.hours_per_day} hrs/day` : ""}
                  </p>
                </div>
              </div>

              {/* Client Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase">Client Information</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{booking.client_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{booking.address}</span>
                    </div>
                  </div>
                </div>

                {/* Care Recipient Information */}
                {booking.recipient_name && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase">Care Recipient</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{booking.recipient_name}</span>
                      </div>
                      {booking.recipient_type && (
                        <div className="text-sm">
                          <Badge variant="secondary">
                            {booking.recipient_type === "elderly" && "Elderly"}
                            {booking.recipient_type === "disabled" && "Disabled"}
                            {booking.recipient_type === "both" && "Elderly & Disabled"}
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
                {booking.selected_dates && booking.selected_dates.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {booking.selected_dates.map((date: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {format(new Date(date), "MMM dd, yyyy")}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              {booking.status === "pending" && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => handleAssignAgent(booking)}
                    className="w-full md:w-auto"
                    size="lg"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept & Assign Agent
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}

        {bookings?.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">No bookings yet.</p>
          </Card>
        )}
      </div>

      {/* Assign Agent Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Agent to Booking</DialogTitle>
            <DialogDescription>
              Enter the name of the agent who will handle this booking. The client will be notified with the agent's details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedBooking && (
              <div className="space-y-2 p-4 bg-secondary rounded-lg">
                <p className="text-sm font-medium">
                  Client: <span className="font-bold">{selectedBooking.client_name}</span>
                </p>
                <p className="text-sm font-medium">
                  Service: <span className="font-bold">{selectedBooking.services?.name}</span>
                </p>
                <p className="text-sm font-medium">
                  Dates: <span className="font-bold">{formatDates(selectedBooking)}</span>
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Enter agent's full name"
                className="h-12"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAssignment}
              disabled={assignAgentMutation.isPending}
            >
              {assignAgentMutation.isPending ? "Assigning..." : "Confirm Assignment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
