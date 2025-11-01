import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Package,
  MessageSquare,
  Info,
  Phone,
  Palette,
  FileText,
  CreditCard
} from "lucide-react";
import logo from "@/assets/logo-careease-usa.png";
import { Session } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/admin/login");
      } else {
        verifyAdmin(session.user.email!);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/admin/login");
      } else if (session?.user?.email) {
        verifyAdmin(session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const verifyAdmin = async (email: string) => {
    try {
      // Vérifier dans la table profiles avec role='admin'
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("email", email.toLowerCase())
        .eq("role", "admin")
        .maybeSingle();
      
      if (error) {
        logger.error("Error checking admin status:", error);
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }

      if (!profileData) {
        logger.error("User is not an admin:", email);
        await supabase.auth.signOut();
        navigate("/admin/login");
      }
    } catch (error) {
      logger.error("Error in verifyAdmin:", error);
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/testimonials", icon: MessageSquare, label: "Testimonials" },
    { to: "/admin/services", icon: Package, label: "Services" },
    { to: "/admin/about", icon: Info, label: "About / Mission" },
    { to: "/admin/contact", icon: Phone, label: "Contact Info" },
    { to: "/admin/settings", icon: Palette, label: "Site Settings" },
    { to: "/admin/bookings", icon: Calendar, label: "Bookings" },
    { to: "/admin/contracts", icon: FileText, label: "Contracts" },
    { to: "/admin/payment-methods", icon: CreditCard, label: "Payment Methods" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 bg-secondary border-r flex-col">
        <div className="p-6 border-b">
          <Link to="/admin" className="flex items-center space-x-2">
            <img src={logo} alt="CareEase USA" className="h-10 w-10" />
            <div>
              <p className="font-bold">CareEase USA</p>
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-background"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start">
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar - Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-background">
          <Link to="/admin" className="flex items-center space-x-2">
            <img src={logo} alt="CareEase USA" className="h-8 w-8" />
            <span className="font-bold">Admin</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-secondary border-b p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-background"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};