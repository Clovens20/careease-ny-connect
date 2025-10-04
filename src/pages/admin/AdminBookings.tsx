import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminBookings = () => {
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bookings Management</h1>
      <div className="space-y-4">
        {bookings?.map((booking: any) => (
          <Card key={booking.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-semibold">{booking.client_name}</h3>
                <p className="text-sm text-muted-foreground">{booking.services?.name}</p>
                <p className="text-sm">{new Date(booking.date).toLocaleDateString()} at {booking.start_time}</p>
                <p className="text-sm">{booking.email} • {booking.phone}</p>
              </div>
              <div className="text-right space-y-2">
                <Badge>{booking.status}</Badge>
                <p className="font-semibold">${Number(booking.total_price).toFixed(2)}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;