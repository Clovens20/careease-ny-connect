import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Users, Star, Award, Home, Shield, Clock } from "lucide-react";

type Stat = {
  id: string;
  icon_name: string;
  value: string;
  label: string;
  display_order: number;
  is_active: boolean;
};

const iconOptions = [
  { value: "Heart", label: "Heart", icon: Heart },
  { value: "Users", label: "Users", icon: Users },
  { value: "Star", label: "Star", icon: Star },
  { value: "Award", label: "Award", icon: Award },
  { value: "Home", label: "Home", icon: Home },
  { value: "Shield", label: "Shield", icon: Shield },
  { value: "Clock", label: "Clock", icon: Clock },
];

const AdminHomepageStats = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Stat>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newStat, setNewStat] = useState<Partial<Stat>>({
    icon_name: "Heart",
    value: "",
    label: "",
    display_order: 0,
    is_active: true,
  });

  const { data: stats, isLoading } = useQuery<Stat[]>({
    queryKey: ["homepage-stats", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_stats")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Stat> }) => {
      const { error } = await supabase
        .from("homepage_stats")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homepage-stats"] });
      setEditingId(null);
      toast({
        title: "Success",
        description: "Statistic updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update statistic",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("homepage_stats")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homepage-stats"] });
      toast({
        title: "Success",
        description: "Statistic deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete statistic",
        variant: "destructive",
      });
    },
  });

  const addMutation = useMutation({
    mutationFn: async (stat: Partial<Stat>) => {
      const { error } = await supabase
        .from("homepage_stats")
        .insert([stat]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homepage-stats"] });
      setIsAdding(false);
      setNewStat({
        icon_name: "Heart",
        value: "",
        label: "",
        display_order: 0,
        is_active: true,
      });
      toast({
        title: "Success",
        description: "Statistic added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add statistic",
        variant: "destructive",
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("homepage_stats")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homepage-stats"] });
      toast({
        title: "Success",
        description: "Statistic status updated",
      });
    },
  });

  const startEdit = (stat: Stat) => {
    setEditingId(stat.id);
    setEditForm(stat);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = () => {
    if (!editingId || !editForm.icon_name || !editForm.value || !editForm.label) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    updateMutation.mutate({ id: editingId, updates: editForm });
  };

  const handleAdd = () => {
    if (!newStat.icon_name || !newStat.value || !newStat.label) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    addMutation.mutate(newStat);
  };

  if (isLoading) return <p className="text-center p-8">Loading statistics...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Homepage Statistics</h1>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Statistic
        </Button>
      </div>

      {/* Add New Statistic Dialog */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Statistic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Icon</Label>
                <Select
                  value={newStat.icon_name}
                  onValueChange={(value) => setNewStat({ ...newStat, icon_name: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Value</Label>
                <Input
                  placeholder="e.g., 50+, 4.9"
                  value={newStat.value}
                  onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Label</Label>
              <Input
                placeholder="e.g., Professional HHA"
                value={newStat.label}
                onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
              />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input
                type="number"
                value={newStat.display_order}
                onChange={(e) => setNewStat({ ...newStat, display_order: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} disabled={addMutation.isPending}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics List */}
      <div className="grid gap-4">
        {stats?.map((stat) => (
          <Card key={stat.id} className={!stat.is_active ? "opacity-50" : ""}>
            <CardContent className="p-4">
              {editingId === stat.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Icon</Label>
                      <Select
                        value={editForm.icon_name}
                        onValueChange={(value) => setEditForm({ ...editForm, icon_name: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Value</Label>
                      <Input
                        value={editForm.value}
                        onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={editForm.label}
                      onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      value={editForm.display_order}
                      onChange={(e) => setEditForm({ ...editForm, display_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={updateMutation.isPending}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {(() => {
                        const Icon = iconOptions.find((opt) => opt.value === stat.icon_name)?.icon || Heart;
                        return <Icon className="h-8 w-8" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                    <Badge variant={stat.is_active ? "default" : "secondary"}>
                      {stat.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Order: {stat.display_order}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActiveMutation.mutate({ id: stat.id, is_active: !stat.is_active })}
                    >
                      {stat.is_active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => startEdit(stat)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this statistic?")) {
                          deleteMutation.mutate(stat.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {stats && stats.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No statistics found. Add your first one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminHomepageStats;