import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type PaymentMethod = {
  id: string;
  name: string;
  description: string | null;
  payment_type: string | null;
  payment_details: Record<string, any> | null;
  is_active: boolean;
  display_order: number;
};

const PAYMENT_TYPES = [
  { value: 'cash', label: 'Cash' },
  { value: 'check', label: 'Check' },
  { value: 'bank_account', label: 'Bank Account' },
  { value: 'zelle', label: 'Zelle' },
  { value: 'cash_app', label: 'Cash App' },
  { value: 'other', label: 'Other' },
] as const;

const AdminPaymentMethods = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({});
  const [displayOrder, setDisplayOrder] = useState(0);

  const { data: methods, isLoading } = useQuery<PaymentMethod[]>({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_methods")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  // Fonction pour obtenir les champs dynamiques selon le type
  const getPaymentFields = (type: string) => {
    switch (type) {
      case 'bank_account':
        return {
          account_name: { label: 'Account Holder Name', placeholder: 'John Doe' },
          account_number: { label: 'Account Number', placeholder: '123456789' },
          routing_number: { label: 'Routing Number', placeholder: '021000021' },
          bank_name: { label: 'Bank Name', placeholder: 'Bank of America' },
        };
      case 'zelle':
        return {
          zelle_email: { label: 'Zelle Email', placeholder: 'payments@careeaseusa.com' },
          zelle_phone: { label: 'Zelle Phone (optional)', placeholder: '+1234567890' },
        };
      case 'cash_app':
        return {
          cashapp_tag: { label: 'Cash App Tag', placeholder: '$CareEaseUSA' },
          cashapp_email: { label: 'Cash App Email (optional)', placeholder: 'payments@careeaseusa.com' },
        };
      default:
        return {};
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPaymentType("");
    setPaymentDetails({});
    setDisplayOrder(0);
    setEditing(null);
  };

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("payment_methods")
        .insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      toast({ title: "Payment method added successfully" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PaymentMethod> }) => {
      const { error } = await supabase
        .from("payment_methods")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      toast({ title: "Payment method updated successfully" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("payment_methods")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
      toast({ title: "Payment method deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from("payment_methods")
        .update({ is_active: isActive })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
    },
  });

  const handleEdit = (method: PaymentMethod) => {
    setEditing(method.id);
    setName(method.name);
    setDescription(method.description || "");
    setPaymentType(method.payment_type || "");
    setPaymentDetails(method.payment_details || {});
    setDisplayOrder(method.display_order);
  };

  const handleSave = () => {
    if (editing) {
      updateMutation.mutate({
        id: editing,
        data: {
          name,
          description: description || null,
          payment_type: paymentType || null,
          payment_details: Object.keys(paymentDetails).length > 0 ? paymentDetails : null,
          display_order: displayOrder,
        },
      });
    }
  };

  const handleCreate = () => {
    createMutation.mutate({
      name,
      description: description || null,
      payment_type: paymentType || null,
      payment_details: Object.keys(paymentDetails).length > 0 ? paymentDetails : null,
      display_order: displayOrder,
    });
  };

  const paymentFields = paymentType ? getPaymentFields(paymentType) : {};

  if (isLoading) return <p className="text-center p-8">Loading payment methods...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payment Methods Management</h1>
        <Badge variant="outline" className="text-sm">
          {methods?.filter(m => m.is_active).length || 0} Active
        </Badge>
      </div>

      {/* Add new payment method */}
      {!editing && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Payment Method Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Bank Account, Zelle"
                />
              </div>
              <div>
                <Label htmlFor="type">Payment Type *</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description for clients"
              />
            </div>

            {/* Champs dynamiques selon le type */}
            {paymentType && Object.keys(paymentFields).length > 0 && (
              <div className="p-4 bg-muted rounded-lg space-y-4">
                <Label className="text-base font-semibold">Payment Details (will appear in contract)</Label>
                {Object.entries(paymentFields).map(([key, field]) => (
                  <div key={key}>
                    <Label htmlFor={key}>{field.label}</Label>
                    <Input
                      id={key}
                      value={paymentDetails[key] || ""}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, [key]: e.target.value })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>

            <Button
              onClick={handleCreate}
              disabled={!name.trim() || !paymentType || createMutation.isPending}
              className="w-full md:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      )}

      {/* List payment methods */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Payment Methods</h2>
        {methods && methods.length > 0 ? (
          methods.map((method) => (
            <Card key={method.id} className={!method.is_active ? "opacity-60" : ""}>
              <CardContent className="pt-6">
                {editing === method.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Payment Method Name *</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div>
                        <Label>Payment Type *</Label>
                        <Select value={paymentType} onValueChange={setPaymentType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {PAYMENT_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    {/* Champs dynamiques en mode édition */}
                    {paymentType && Object.keys(getPaymentFields(paymentType)).length > 0 && (
                      <div className="p-4 bg-muted rounded-lg space-y-4">
                        <Label className="text-base font-semibold">Payment Details</Label>
                        {Object.entries(getPaymentFields(paymentType)).map(([key, field]) => (
                          <div key={key}>
                            <Label htmlFor={`edit-${key}`}>{field.label}</Label>
                            <Input
                              id={`edit-${key}`}
                              value={paymentDetails[key] || ""}
                              onChange={(e) => setPaymentDetails({ ...paymentDetails, [key]: e.target.value })}
                              placeholder={field.placeholder}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Display Order</Label>
                        <Input
                          type="number"
                          value={displayOrder}
                          onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSave} disabled={updateMutation.isPending}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={resetForm}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{method.name}</h3>
                          {method.payment_type && (
                            <Badge variant="secondary" className="text-xs">
                              {PAYMENT_TYPES.find(t => t.value === method.payment_type)?.label || method.payment_type}
                            </Badge>
                          )}
                          <Badge variant={method.is_active ? "default" : "outline"} className="text-xs">
                            {method.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        {method.description && (
                          <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        )}
                        {method.payment_details && Object.keys(method.payment_details).length > 0 && (
                          <div className="mt-3 p-3 bg-muted rounded-md space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Payment Details:</p>
                            {Object.entries(method.payment_details).map(([key, value]) => (
                              <p key={key} className="text-xs">
                                <span className="font-medium">{getPaymentFields(method.payment_type || '')[key]?.label || key}:</span> {value}
                              </p>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">Display Order: {method.display_order}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleActiveMutation.mutate({ id: method.id, isActive: !method.is_active })}
                        >
                          {method.is_active ? "Deactivate" : "Activate"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(method)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMutation.mutate(method.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No payment methods found. Add one above.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPaymentMethods;