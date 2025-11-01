import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contracts, isLoading, error } = useQuery<Contract[]>({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*");
      if (error) throw error;
      
      // Trier : contrats signés par client mais pas par admin en premier, puis par date
      return (data || []).sort((a, b) => {
        // Priorité 1: Contrats signés par client mais pas par admin
        if (a.status === "signed_by_client" && !a.admin_signature && 
            !(b.status === "signed_by_client" && !b.admin_signature)) {
          return -1;
        }
        if (b.status === "signed_by_client" && !b.admin_signature && 
            !(a.status === "signed_by_client" && !a.admin_signature)) {
          return 1;
        }
        // Priorité 2: Autres contrats triés par date décroissante
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      });
    },
  });

  const handleAdminSign = async (contractId: string) => {
    if (!sigCanvasRef.current) {
      toast({
        title: "Error",
        description: "Please provide a signature",
        variant: "destructive",
      });
      return;
    }

    const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
    
    if (!signature || signature.length < 100) {
      toast({
        title: "Error",
        description: "Signature is too short. Please sign properly.",
        variant: "destructive",
      });
      return;
    }

    setSaving(contractId);
    
    // 1. D'abord sauvegarder la signature
    const { error: updateError } = await supabase
      .from("contracts")
      .update({ admin_signature: signature, status: "completed" })
      .eq("id", contractId);
    
    if (updateError) {
      console.error("Error saving signature:", updateError);
      toast({
        title: "Error",
        description: "Failed to save signature: " + updateError.message,
        variant: "destructive",
      });
      setSaving(null);
      return;
    }

    console.log("✅ Signature saved successfully. Now sending email...");
    
    // 2. Ensuite envoyer l'email avec le contrat final signé
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      if (!supabaseUrl) {
        throw new Error("VITE_SUPABASE_URL is not configured");
      }

      console.log("Calling Edge Function:", `${supabaseUrl}/functions/v1/send-signed-contract`);
      console.log("Contract ID:", contractId);
      
      const response = await fetch(`${supabaseUrl}/functions/v1/send-signed-contract`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || '',
        },
        body: JSON.stringify({ contractId }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { error: responseText };
        }
        
        console.error("❌ Email edge function error:", errorData);
        toast({
          title: "Contract Signed",
          description: `Signature saved, but email failed: ${errorData.error || 'Unknown error'}. Check console for details.`,
          variant: "default",
        });
      } else {
        let result;
        try {
          result = JSON.parse(responseText);
        } catch {
          result = { success: true, message: responseText };
        }
        
        console.log("✅ Signed contract email sent successfully:", result);
        toast({
          title: "Contract Signed Successfully",
          description: `The fully signed contract has been sent to the client's email (${contracts?.find(c => c.id === contractId)?.client_email || 'N/A'}).`,
        });
      }
    } catch (error: any) {
      console.error("❌ Failed to send signed contract email:", error);
      console.error("Error details:", {
        message: error?.message,
        stack: error?.stack,
        name: error?.name,
      });
      toast({
        title: "Contract Signed",
        description: `Signature saved, but email notification failed: ${error?.message || 'Network error'}. Please check console and try again.`,
        variant: "default",
      });
    }
    
    // Rafraîchir la liste des contrats
    queryClient.invalidateQueries({ queryKey: ["contracts"] });
    setSaving(null);
    
    // Réinitialiser le canvas
    sigCanvasRef.current?.clear();
  };

  if (isLoading) return <p className="text-center p-8">Loading contracts...</p>;
  if (error) return <p className="text-red-500 text-center p-8">Error loading contracts: {(error as Error).message}</p>;

  // Séparer les contrats : en attente de signature admin vs complétés
  const pendingAdminSignature = contracts?.filter(c => c.status === "signed_by_client" && !c.admin_signature) || [];
  const completed = contracts?.filter(c => c.status === "completed" || c.admin_signature) || [];
  const pending = contracts?.filter(c => c.status === "pending" && !c.client_signature) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contracts Management</h1>
        <div className="flex gap-2">
          <Badge variant="outline">{pendingAdminSignature.length} Awaiting Your Signature</Badge>
          <Badge variant="secondary">{completed.length} Completed</Badge>
        </div>
      </div>

      {/* Contrats en attente de signature admin */}
      {pendingAdminSignature.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-amber-600">Awaiting Admin Signature</h2>
          <div className="grid gap-4">
            {pendingAdminSignature.map((contract) => (
              <Card key={contract.id} className="border-amber-500 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{contract.client_name}</span>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      Awaiting Your Signature
                    </Badge>
                  </CardTitle>
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
                      <p className="font-medium">{new Date(contract.start_date).toLocaleDateString()}</p>
                    </div>

                    {contract.client_signature && (
                      <div>
                        <p className="text-sm font-medium mb-2">Client Signature:</p>
                        <img src={contract.client_signature} alt="Client signature" className="border rounded max-w-xs" />
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium mb-2">Your Signature:</p>
                      <SignatureCanvas
                        ref={sigCanvasRef}
                        penColor="black"
                        canvasProps={{ width: 500, height: 200, className: "border rounded" }}
                      />
                      <div className="mt-2 flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => sigCanvasRef.current?.clear()}
                        >
                          Clear
                        </Button>
                        <Button 
                          onClick={() => handleAdminSign(contract.id)} 
                          disabled={saving === contract.id}
                        >
                          {saving === contract.id ? "Signing & Sending..." : "Sign & Send to Client"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Contrats complétés */}
      {completed.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-green-600">Completed Contracts</h2>
          <div className="grid gap-4">
            {completed.map((contract) => (
              <Card key={contract.id} className="opacity-75">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{contract.client_name}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Completed
                    </Badge>
                  </CardTitle>
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
                      <p className="font-medium">{new Date(contract.start_date).toLocaleDateString()}</p>
                    </div>

                    {contract.client_signature && (
                      <div>
                        <p className="text-sm font-medium mb-2">Client Signature:</p>
                        <img src={contract.client_signature} alt="Client signature" className="border rounded max-w-xs" />
                      </div>
                    )}

                    {contract.admin_signature && (
                      <div>
                        <p className="text-sm font-medium mb-2">Admin Signature:</p>
                        <img src={contract.admin_signature} alt="Admin signature" className="border rounded max-w-xs" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Contrats en attente de signature client */}
      {pending.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-600">Pending Client Signature</h2>
          <div className="grid gap-4">
            {pending.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <CardTitle>{contract.client_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Awaiting client signature</p>
                    <p className="text-sm font-medium">Email: {contract.client_email}</p>
                    <p className="text-sm font-medium">Service: {contract.services}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {contracts && contracts.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No contracts found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminContracts;