import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const { data: settings } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("settings").select("*").single();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Admin Email</Label><Input defaultValue={settings?.email_admin || ""} /></div>
            <div><Label>Phone</Label><Input defaultValue={settings?.phone_admin || ""} /></div>
          </div>
          <div><Label>Address</Label><Textarea defaultValue={settings?.address || ""} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Facebook URL</Label><Input defaultValue={settings?.facebook_url || ""} /></div>
            <div><Label>Instagram URL</Label><Input defaultValue={settings?.instagram_url || ""} /></div>
          </div>
          <div><Label>Footer Text</Label><Textarea defaultValue={settings?.footer_text || ""} /></div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;