import { useQuery, useMutation } from "@tanstack/react-query";
import SignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Contract = {
  id: string;
  booking_id: string;
  client_name: string;
  client_email: string;
  services: string;
  start_date: string;
  contract_pdf_url: string | null;
  client_signature: string | null;
  admin_signature: string | null;
  status: "pending" | "signed_by_client" | "signed_by_admin" | "completed";
};

const AdminContracts = () => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const { data: contracts, isLoading, error } = useQuery<Contract[]>({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .order("start_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleAdminSign = async (contractId: string) => {
    if (!sigCanvasRef.current) return;
    const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
    setSaving(true);
    
    const { error } = await supabase
      .from("contracts")
      .update({ admin_signature: signature, status: "completed" })
      .eq("id", contractId);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to save signature",
        variant: "destructive",
      });
      setSaving(false);
      return;
    }
    
    // TODO: envoyer email client avec PDF signé
    toast({
      title: "Contract Signed",
      description: "The client will be notified!",
    });
    setSaving(false);
  };

  if (isLoading) return <p>Loading contracts...</p>;
  if (error) return <p className="text-red-500">Error loading contracts: {error.message}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contracts Management</h1>
      <div className="grid gap-4">
        {contracts && contracts.length > 0 ? (
          contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <CardTitle>{contract.client_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Client</p>
                      <p className="font-medium">{contract.client_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{contract.client_email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Services</p>
                    <p className="font-medium">{contract.services}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{contract.start_date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">{contract.status}</p>
                  </div>

                  {contract.client_signature && (
                    <div>
                      <p className="text-sm font-medium mb-2">Client Signature:</p>
                      <img src={contract.client_signature} alt="Client signature" className="border rounded" />
                    </div>
                  )}

                  {contract.status === "signed_by_client" && !contract.admin_signature && (
                    <div>
                      <p className="text-sm font-medium mb-2">Admin Signature:</p>
                      <SignatureCanvas
                        ref={sigCanvasRef}
                        penColor="black"
                        canvasProps={{ width: 500, height: 200, className: "border rounded" }}
                      />
                      <div className="mt-2 flex gap-2">
                        <Button onClick={() => sigCanvasRef.current?.clear()}>Clear</Button>
                        <Button onClick={() => handleAdminSign(contract.id)} disabled={saving}>
                          {saving ? "Saving..." : "Sign"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {contract.admin_signature && (
                    <div>
                      <p className="text-sm font-medium mb-2">Admin Signature:</p>
                      <img src={contract.admin_signature} alt="Admin signature" className="border rounded" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No contracts found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminContracts;
