import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Pencil, Trash2 } from "lucide-react";

const AdminServices = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Button>Add Service</Button>
      </div>
      <div className="grid gap-4">
        {services?.map((service) => (
          <Card key={service.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <div className="mt-2 flex gap-4 text-sm">
                  <span>Hourly: ${service.price_hourly}</span>
                  <span>Daily: ${service.price_daily}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline"><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="outline"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;