import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Disclaimer from "./pages/Disclaimer";
import AdminLogin from "./pages/admin/Login";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminContact from "./pages/admin/AdminContact";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import AdminContracts from "./pages/admin/AdminContracts";
import AdminPaymentMethods from "./pages/admin/AdminPaymentMethods";
import ContractPage from "./pages/contract/[id]";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - données considérées fraîches
      cacheTime: 10 * 60 * 1000, // 10 minutes - données en cache
      refetchOnWindowFocus: false, // Évite les refetch inutiles
      refetchOnMount: false, // Utilise le cache si disponible
      retry: 1, // Moins de tentatives en cas d'erreur
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contract/:id" element={<ContractPage />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="contracts" element={<AdminContracts />} />
              <Route path="payment-methods" element={<AdminPaymentMethods />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;