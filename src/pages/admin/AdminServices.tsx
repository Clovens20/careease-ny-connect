// src/pages/admin/AdminServices.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Pencil, Trash2, ToggleLeft, ToggleRight, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type Service = {
  id: string;
  name: string;
  description: string | null;
  price_hourly: number | null;
  price_daily: number | null;
  image_url: string | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
};

function useAllServices() {
  return useQuery({
    queryKey: ["services", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Service[];
    },
  });
}

function useCreateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      description?: string | null;
      price_hourly?: number | null;
      price_daily?: number | null;
      image_url?: string | null;
      is_active?: boolean;
    }) => {
      const { error } = await supabase.from("services").insert([payload]);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services", "all"] }),
  });
}

function useUpdateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      name?: string;
      description?: string | null;
      price_hourly?: number | null;
      price_daily?: number | null;
      image_url?: string | null;
      is_active?: boolean;
    }) => {
      const { id, ...rest } = payload;
      const { error } = await supabase.from("services").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services", "all"] }),
  });
}

function useToggleServiceActive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("services").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services", "all"] }),
  });
}

const AdminServices = () => {
  const { toast } = useToast();
  const { data: services, isLoading } = useAllServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const toggleService = useToggleServiceActive();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<{
    name: string;
    description: string;
    price_hourly: string;
    price_daily: string;
    image_url: string;
    is_active: boolean;
  }>({
    name: "",
    description: "",
    price_hourly: "",
    price_daily: "",
    image_url: "",
    is_active: true,
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      description: "",
      price_hourly: "",
      price_daily: "",
      image_url: "",
      is_active: true,
    });
    setIsFormOpen(true);
  };

  const openEdit = (svc: Service) => {
    setEditing(svc);
    setForm({
      name: svc.name ?? "",
      description: svc.description ?? "",
      price_hourly: svc.price_hourly != null ? String(svc.price_hourly) : "",
      price_daily: svc.price_daily != null ? String(svc.price_daily) : "",
      image_url: svc.image_url ?? "",
      is_active: Boolean(svc.is_active),
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditing(null);
  };

  const onSubmit = async () => {
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price_hourly: form.price_hourly !== "" ? Number(form.price_hourly) : null,
        price_daily: form.price_daily !== "" ? Number(form.price_daily) : null,
        image_url: form.image_url.trim() || null,
        is_active: form.is_active,
      };

      if (!payload.name) {
        toast({ title: "Name required", description: "Please provide a service name." });
        return;
      }

      if (editing) {
        await updateService.mutateAsync({ id: editing.id, ...payload });
        toast({ title: "Service Updated", description: "The service was updated successfully." });
      } else {
        await createService.mutateAsync(payload);
        toast({ title: "Service Created", description: "The service was created successfully." });
      }
      closeForm();
    } catch (e: any) {
      toast({ title: "Error", description: e.message ?? "Failed to save service." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" />Add Service</Button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{editing ? "Edit Service" : "Create Service"}</h2>
            <Button variant="ghost" onClick={closeForm}><X className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Service name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.image_url}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Hourly Price</label>
              <input
                type="number"
                step="0.01"
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.price_hourly}
                onChange={(e) => setForm((f) => ({ ...f, price_hourly: e.target.value }))}
                placeholder="e.g., 30.00"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Daily Price</label>
              <input
                type="number"
                step="0.01"
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.price_daily}
                onChange={(e) => setForm((f) => ({ ...f, price_daily: e.target.value }))}
                placeholder="optional"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="is_active"
                type="checkbox"
                className="h-4 w-4"
                checked={form.is_active}
                onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
              />
              <label htmlFor="is_active" className="text-sm font-medium">Active</label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={onSubmit} disabled={createService.isPending || updateService.isPending}>
              {editing ? "Save Changes" : "Create Service"}
            </Button>
            <Button variant="outline" onClick={closeForm}>Cancel</Button>
          </div>
        </Card>
      )}

      {/* List */}
      <div className="grid gap-4">
        {isLoading ? (
          <Card className="p-4">Loading services...</Card>
        ) : (
          services?.map((service) => (
            <Card key={service.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <Badge variant={service.is_active ? "default" : "secondary"}>
                      {service.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                  <div className="flex gap-4 text-sm">
                    <span className="font-medium">Hourly: ${service.price_hourly ?? "-"}</span>
                    <span className="font-medium">Daily: ${service.price_daily ?? "-"}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={service.is_active ? "outline" : "default"}
                    onClick={() => toggleService.mutate({ id: service.id, is_active: !Boolean(service.is_active) })}
                    disabled={toggleService.isPending}
                    title={service.is_active ? "Deactivate" : "Activate"}
                  >
                    {service.is_active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => openEdit(service)} title="Edit">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" disabled title="Delete (disabled)">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminServices;