import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, Calendar, Package, TrendingUp } from "lucide-react";

type Booking = {
  id: string;
  user_full_name: string;
  user_email: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string | null;
  assigned_agent: string | null;
  created_at: string;
};

const AdminDashboard = () => {
  // --- Bookings ---
  const {
    data: bookings,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useQuery<Booking[], Error>({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          "id, user_full_name, user_email, date, start_time, end_time, status, notes, assigned_agent, created_at"
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Booking[];
    },
  });

  // --- Services Count ---
  const {
    data: servicesCount,
    isLoading: servicesLoading,
    error: servicesError,
  } = useQuery<number, Error>({
    queryKey: ["services-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count || 0;
    },
  });

  // --- Calculs ---
  const bookingsData = bookings || [];
  const servicesCountData = servicesCount ?? 0;

  const totalRevenue = "N/A"; // pas de colonne total_price pour l'instant

  const today = new Date().toDateString();
  const todayBookings = bookingsData.filter(
    (b) => new Date(b.date).toDateString() === today
  ).length;

  // --- Gestion erreurs ---
  if (bookingsError) {
    return (
      <p className="text-red-500">
        Error loading bookings: {bookingsError.message}
      </p>
    );
  }

  if (servicesError) {
    return (
      <p className="text-red-500">
        Error loading services: {servicesError.message}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bookings */}
        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookingsLoading ? "Loading..." : bookingsData.length}
            </div>
          </CardContent>
        </Card>

        {/* Today's Bookings */}
        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookingsLoading ? "Loading..." : todayBookings}
            </div>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue}</div>
            <p className="text-xs text-muted-foreground">Not available</p>
          </CardContent>
        </Card>

        {/* Services Count */}
        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {servicesLoading ? "Loading..." : servicesCountData}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookingsLoading ? (
              <p className="text-muted-foreground text-center">Loading bookings...</p>
            ) : bookingsData.length > 0 ? (
              bookingsData.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{booking.user_full_name}</p>
                    <p className="text-sm text-muted-foreground">{booking.user_email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{booking.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">No bookings yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;