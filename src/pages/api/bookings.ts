import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // clé serveur uniquement
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const bookingData = req.body;

  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ ...bookingData, status: "pending" }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "Réservation envoyée avec succès !", data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Erreur serveur inattendue" });
  }
}
