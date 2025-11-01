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

  // ✅ Fonction pour parser le prix depuis les notes
  const parsePriceFromNotes = (notes: string | null): number => {
    if (!notes) return 0;
    // Rechercher le pattern "Total price: $XXX.XX" ou "Total price: XXX.XX"
    const totalPriceMatch = notes.match(/Total price:\s*\$?([\d,]+\.?\d*)/);
    if (totalPriceMatch) {
      return parseFloat(totalPriceMatch[1].replace(/,/g, ''));
    }
    return 0;
  };

  // Filtrer uniquement les bookings confirmés
  const confirmedBookings = bookingsData.filter(b => b.status === 'confirmed');
  
  // Calculer le revenu total depuis les bookings confirmés
  const totalRevenue = confirmedBookings.reduce((sum, booking) => {
    const price = parsePriceFromNotes(booking.notes);
    return sum + price;
  }, 0);

  const today = new Date().toDateString();
  const todayBookings = bookingsData.filter(
    (b) => new Date(b.date).toDateString() === today
  ).length;

  const confirmedCount = confirmedBookings.length;
  
  // Revenu du mois actuel
  const monthlyRevenue = confirmedBookings
    .filter(b => {
      const bookingDate = new Date(b.created_at);
      const now = new Date();
      return bookingDate.getMonth() === now.getMonth() && 
             bookingDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, booking) => {
      const price = parsePriceFromNotes(booking.notes);
      return sum + price;
    }, 0);

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
            <p className="text-xs text-muted-foreground mt-1">
              {confirmedCount} confirmed
            </p>
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
            <div className="text-2xl font-bold">
              {bookingsLoading ? "Loading..." : `$${totalRevenue.toFixed(2)}`}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From {confirmedCount} confirmed booking{confirmedCount !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookingsLoading ? "Loading..." : `$${monthlyRevenue.toFixed(2)}`}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Revenue this month
            </p>
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

      {/* ✅ Section Revenus Détaillés */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Details - Confirmed Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookingsLoading ? (
              <p className="text-muted-foreground text-center">Loading revenue data...</p>
            ) : confirmedBookings.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">Client</th>
                        <th className="text-left p-2 font-semibold">Service Date</th>
                        <th className="text-left p-2 font-semibold">Agent</th>
                        <th className="text-right p-2 font-semibold">Revenue</th>
                        <th className="text-left p-2 font-semibold">Date Confirmed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {confirmedBookings.slice(0, 10).map((booking) => {
                        const price = parsePriceFromNotes(booking.notes);
                        return (
                          <tr key={booking.id} className="border-b">
                            <td className="p-2">
                              <div>
                                <p className="font-medium">{booking.user_full_name}</p>
                                <p className="text-xs text-muted-foreground">{booking.user_email}</p>
                              </div>
                            </td>
                            <td className="p-2 text-sm">
                              {new Date(booking.date).toLocaleDateString()}
                            </td>
                            <td className="p-2 text-sm">
                              {booking.assigned_agent || "N/A"}
                            </td>
                            <td className="p-2 text-right font-semibold text-green-600">
                              ${price.toFixed(2)}
                            </td>
                            <td className="p-2 text-sm text-muted-foreground">
                              {new Date(booking.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 font-bold">
                        <td colSpan={3} className="p-2">Total</td>
                        <td className="p-2 text-right text-lg text-green-600">
                          ${totalRevenue.toFixed(2)}
                        </td>
                        <td className="p-2"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {confirmedBookings.length > 10 && (
                  <p className="text-sm text-muted-foreground text-center">
                    Showing 10 of {confirmedBookings.length} confirmed bookings
                  </p>
                )}
              </>
            ) : (
              <p className="text-muted-foreground text-center">No confirmed bookings yet</p>
            )}
          </div>
        </CardContent>
      </Card>

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