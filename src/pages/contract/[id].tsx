// pages/contract/[id].tsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";

type Contract = {
  id: string;
  client_name: string;
  client_email: string;
  services: string;
  start_date: string;
  contract_pdf_url: string | null;
  client_signature: string | null;
  admin_signature: string | null;
  status: "pending" | "signed_by_client" | "signed_by_admin" | "completed";
};

const ContractPage = () => {
  const { id } = useParams();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  // Charger le contrat depuis Supabase
  useEffect(() => {
    if (!id) return;
    const fetchContract = async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Erreur chargement contrat:", error);
        return;
      }
      setContract(data);
      setLoading(false);
    };
    fetchContract();
  }, [id]);

  // Sauvegarder signature client
  const handleClientSign = async () => {
    if (!sigCanvasRef.current || !contract) return;
    const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
    setSaving(true);
    const { error } = await supabase
      .from("contracts")
      .update({
        client_signature: signature,
        status: "signed_by_client",
      })
      .eq("id", contract.id);
    if (error) {
      console.error("Erreur sauvegarde signature:", error);
    } else {
      alert("Signature enregistrée. Care Ease sera notifié !");
    }
    setSaving(false);
  };

  if (loading) return <p>Chargement du contrat...</p>;
  if (!contract) return <p>Contrat introuvable</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Contrat Care Ease USA LLC</h1>

      <div className="border p-4 rounded space-y-2">
        <p><strong>Nom Client:</strong> {contract.client_name}</p>
        <p><strong>Email Client:</strong> {contract.client_email}</p>
        <p><strong>Services:</strong> {contract.services}</p>
        <p><strong>Date de début:</strong> {contract.start_date}</p>
      </div>

      <h2 className="text-lg font-semibold">Votre Signature</h2>
      {contract.client_signature ? (
        <img src={contract.client_signature} alt="Signature client" className="border" />
      ) : (
        <div>
          <SignatureCanvas
            ref={sigCanvasRef}
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: "border" }}
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={() => sigCanvasRef.current?.clear()}>Effacer</Button>
            <Button onClick={handleClientSign} disabled={saving}>
              {saving ? "Enregistrement..." : "Signer"}
            </Button>
          </div>
        </div>
      )}

      {contract.admin_signature && (
        <div>
          <h2 className="text-lg font-semibold mt-4">Signature Admin</h2>
          <img src={contract.admin_signature} alt="Signature admin" className="border" />
        </div>
      )}
    </div>
  );
};

export default ContractPage;