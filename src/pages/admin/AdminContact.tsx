import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

function useSettings() {
  return useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });
}

function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      email_admin?: string;
      phone_admin?: string;
      address?: string;
      facebook_url?: string;
      instagram_url?: string;
    }) => {
      // Utiliser upsert pour créer ou mettre à jour
      const { error } = await supabase
        .from("settings")
        .upsert(payload, {
          onConflict: "id",
        });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["settings"] }); // Invalider aussi la query publique
    },
  });
}

const AdminContact = () => {
  const { toast } = useToast();
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  const [form, setForm] = useState({
    email_admin: "",
    phone_admin: "",
    address: "",
    facebook_url: "",
    instagram_url: "",
  });

  // Initialiser le formulaire avec les données existantes
  useEffect(() => {
    if (settings) {
      setForm({
        email_admin: settings.email_admin || "",
        phone_admin: settings.phone_admin || "",
        address: settings.address || "",
        facebook_url: settings.facebook_url || "",
        instagram_url: settings.instagram_url || "",
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings.mutateAsync(form);
      toast({
        title: "Contact Information Updated",
        description: "The contact information has been saved successfully.",
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message ?? "Failed to update contact information.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Contact Information</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold">Contact Information Management</h1>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email_admin">Admin Email</Label>
                <Input
                  id="email_admin"
                  type="email"
                  value={form.email_admin}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email_admin: e.target.value }))
                  }
                  placeholder="contact@careeaseusa.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_admin">Phone Number</Label>
                <Input
                  id="phone_admin"
                  type="tel"
                  value={form.phone_admin}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone_admin: e.target.value }))
                  }
                  placeholder="(212) 555-0100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                placeholder="123 Main Street, New York, NY 10001"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  type="url"
                  value={form.facebook_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, facebook_url: e.target.value }))
                  }
                  placeholder="https://facebook.com/careeaseusa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                  id="instagram_url"
                  type="url"
                  value={form.instagram_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, instagram_url: e.target.value }))
                  }
                  placeholder="https://instagram.com/careeaseusa"
                />
              </div>
            </div>

            <Button type="submit" disabled={updateSettings.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {updateSettings.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AdminContact;