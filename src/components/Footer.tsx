import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Footer = () => {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });

  return (
    <footer className="bg-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="CareEase NY" className="h-10 w-10" />
              <span className="text-xl font-bold text-foreground">CareEase NY</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Professional home health aide services in New York. Providing quality care and support to help you or your loved ones live comfortably at home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Book Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              {settings?.phone_admin && (
                <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <Phone size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{settings.phone_admin}</span>
                </li>
              )}
              {settings?.email_admin && (
                <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <Mail size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{settings.email_admin}</span>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{settings.address}</span>
                </li>
              )}
            </ul>
            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>{settings?.footer_text || "© 2025 CareEase NY. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
};