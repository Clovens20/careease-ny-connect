import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @deno-types="https://esm.sh/jspdf@2.5.1/dist/jspdf.deno.d.ts"
import jsPDF from "https://esm.sh/jspdf@2.5.1";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

type PaymentMethod = {
  id: string;
  name: string;
  description: string | null;
  payment_details: Record<string, any> | null;
};

function generateSignedContractPDF(data: {
  contractId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  agentName: string;
  totalPrice?: string;
  city?: string;
  paymentMethods: PaymentMethod[];
  clientSignature: string;
  adminSignature: string;
}): Uint8Array {
  const doc = new jsPDF();
  let pageHeight = doc.internal.pageSize.height;
  
  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - 20) {
      doc.addPage();
      y = 20;
      return true;
    }
    return false;
  };

  // Header
  doc.setFontSize(18);
  doc.text('CARE EASE USA LLC – SERVICE AGREEMENT', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Contract No.: ${data.contractId.substring(0, 8)}`, 105, 28, { align: 'center' });
  doc.text(`Date: ${new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 105, 35, { align: 'center' });
  
  // 1. Client Information
  let y = 55;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Client Information', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Client Full Name: ${data.clientName}`, 20, y);
  
  y += 7;
  doc.text(`Client Email: ${data.clientEmail}`, 20, y);
  
  if (data.clientPhone) {
    y += 7;
    doc.text(`Client Phone: ${data.clientPhone}`, 20, y);
  }
  
  if (data.clientAddress) {
    y += 7;
    const addressLines = doc.splitTextToSize(`Service Address: ${data.clientAddress}`, 170);
    addressLines.forEach((line: string) => {
      doc.text(line, 20, y);
      y += 6;
    });
    y -= 6;
  }
  
  // 2. Scope of Services
  checkPageBreak(30);
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('2. Scope of Services', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Care Ease USA LLC agrees to provide the following services to the Client:', 20, y);
  
  y += 8;
  doc.text(`Service(s) Description: ${data.serviceName}`, 20, y);
  
  y += 8;
  const serviceDate = new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const serviceContText = `Services will be provided starting on ${serviceDate} and are expected to continue until completion or termination as outlined in this Agreement.`;
  const serviceContLines = doc.splitTextToSize(serviceContText, 170);
  serviceContLines.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 6;
  });
  
  // 3. Payment Terms
  checkPageBreak(60);
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('3. Payment Terms', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  if (data.totalPrice) {
    const cleanPrice = data.totalPrice.replace('$', '').trim();
    doc.text(`Service Fee: $${cleanPrice} USD`, 20, y);
    y += 7;
  }
  
  if (data.paymentMethods && data.paymentMethods.length > 0) {
    doc.text('Payment Methods Accepted:', 20, y);
    y += 7;
    data.paymentMethods.forEach((method) => {
      let methodText = `• ${method.name}`;
      if (method.description) {
        methodText += ` - ${method.description}`;
      }
      if (method.payment_details && typeof method.payment_details === 'object') {
        const details: string[] = [];
        const labelMap: Record<string, string> = {
          account_name: 'Account Holder',
          account_number: 'Account Number',
          routing_number: 'Routing Number',
          bank_name: 'Bank Name',
          zelle_email: 'Zelle Email',
          zelle_phone: 'Zelle Phone',
          cashapp_tag: 'Cash App Tag',
          cashapp_email: 'Cash App Email',
        };
        Object.entries(method.payment_details).forEach(([key, value]) => {
          if (value && value.toString().trim()) {
            const label = labelMap[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            details.push(`${label}: ${value}`);
          }
        });
        if (details.length > 0) {
          methodText += ` (${details.join(', ')})`;
        }
      }
      const methodLines = doc.splitTextToSize(methodText, 170);
      methodLines.forEach((line: string) => {
        doc.text(line, 20, y);
        y += 6;
      });
      y += 2;
    });
  }
  
  y += 4;
  const dueDate = new Date(data.date);
  dueDate.setDate(dueDate.getDate() + 7);
  doc.text(`Payment Due Date: ${dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, y);
  
  y += 10;
  const latePayText = 'Late payments may incur additional fees in accordance with Care Ease USA LLC\'s policy.';
  const latePayLines = doc.splitTextToSize(latePayText, 170);
  latePayLines.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 6;
  });
  
  // 9. Signatures with images
  checkPageBreak(100);
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('9. Signatures', 20, y);
  
  y += 10;
  doc.text('Client Signature', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const sigNote = 'By signing below, the Client acknowledges having read, understood, and agreed to all terms of this Agreement.';
  const sigNoteLines = doc.splitTextToSize(sigNote, 170);
  sigNoteLines.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 5;
  });
  
  y += 3;
  doc.text(`Client Name: ${data.clientName}`, 20, y);
  
  y += 7;
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, y);
  
  y += 7;
  doc.text('Signature:', 20, y);
  
  // Add client signature image
  try {
    const clientSigImg = new Image();
    clientSigImg.src = data.clientSignature;
    doc.addImage(data.clientSignature, 'PNG', 20, y + 5, 80, 30);
    y += 40;
  } catch (e) {
    y += 15;
    doc.setLineWidth(0.5);
    doc.line(20, y, 100, y);
    y += 5;
  }
  
  // Service Provider Signature
  checkPageBreak(60);
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('Service Provider Signature', 20, y);
  
  y += 10;
  doc.text('On behalf of Care Ease USA LLC', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text(`Authorized Representative: ${data.agentName}`, 20, y);
  
  y += 7;
  doc.text('Title: Administrator', 20, y);
  
  y += 7;
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, y);
  
  y += 7;
  doc.text('Signature:', 20, y);
  
  // Add admin signature image
  try {
    doc.addImage(data.adminSignature, 'PNG', 20, y + 5, 80, 30);
    y += 40;
  } catch (e) {
    y += 15;
    doc.setLineWidth(0.5);
    doc.line(20, y, 100, y);
    y += 5;
  }
  
  // Footer
  y = pageHeight - 15;
  doc.setFontSize(8);
  doc.text('CareEase USA - Professional Home Health Care', 105, y, { align: 'center' });
  doc.text('Contact: contact@careeaseusa.com | Phone: 3474711520', 105, y + 7, { align: 'center' });
  
  return new Uint8Array(doc.output('arraybuffer'));
}

serve(async (req) => {
  try {
    const { contractId } = await req.json();

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Récupérer le contrat avec ses signatures
    const { data: contract, error: contractError } = await supabase
      .from("contracts")
      .select(`
        id,
        booking_id,
        client_name,
        client_email,
        services,
        start_date,
        client_signature,
        admin_signature,
        bookings(
          id,
          start_time,
          end_time,
          notes,
          city,
          assigned_agent,
          services(name)
        )
      `)
      .eq("id", contractId)
      .single();

    if (contractError || !contract) {
      throw new Error(`Contract not found: ${contractError?.message}`);
    }

    if (!contract.client_signature || !contract.admin_signature) {
      throw new Error("Contract is not fully signed by both parties");
    }

    const booking = contract.bookings;

    // Récupérer les méthodes de paiement
    const { data: paymentMethods } = await supabase
      .from("payment_methods")
      .select("id, name, description, payment_details")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    // Parser les notes
    const parseNotes = (notes: string | null) => {
      if (!notes) return { phone: '', address: '', totalPrice: '' };
      const phoneMatch = notes.match(/Phone:\s*(.+)/);
      const addressMatch = notes.match(/Address:\s*(.+)/);
      const totalPriceMatch = notes.match(/Total price:\s*(.+)/);
      return {
        phone: phoneMatch ? phoneMatch[1].split('\n')[0].trim() : '',
        address: addressMatch ? addressMatch[1].split('\n')[0].trim() : '',
        totalPrice: totalPriceMatch ? totalPriceMatch[1].split('\n')[0].trim() : '',
      };
    };

    const parsedNotes = parseNotes(booking?.notes || null);

    // Générer le PDF avec les deux signatures
    const pdfBuffer = generateSignedContractPDF({
      contractId: contract.id,
      clientName: contract.client_name,
      clientEmail: contract.client_email,
      clientPhone: parsedNotes.phone || undefined,
      clientAddress: parsedNotes.address || undefined,
      serviceName: contract.services || booking?.services?.name || 'Service',
      date: contract.start_date,
      startTime: booking?.start_time || '09:00',
      endTime: booking?.end_time || '17:00',
      agentName: booking?.assigned_agent || 'Administrator',
      totalPrice: parsedNotes.totalPrice || undefined,
      city: booking?.city || undefined,
      paymentMethods: paymentMethods || [],
      clientSignature: contract.client_signature,
      adminSignature: contract.admin_signature,
    });

    const pdfBase64 = btoa(String.fromCharCode(...pdfBuffer));

    // Envoyer l'email avec le PDF signé
    const resend = new Resend(RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: "CareEase USA <contact@careeaseusa.com>",
      to: contract.client_email,
      subject: `Your Service Agreement is Fully Executed - ${contract.services}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Contract Fully Executed!</h2>
          <p>Dear ${contract.client_name},</p>
          <p>Great news! Your service agreement has been fully executed with both signatures.</p>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h3 style="margin-top: 0; color: #16a34a;">Contract Details</h3>
            <p><strong>Service:</strong> ${contract.services}</p>
            <p><strong>Start Date:</strong> ${new Date(contract.start_date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> Fully Executed (Both Parties Signed)</p>
          </div>
          
          <p>The fully signed contract is attached to this email. Please keep this document for your records.</p>
          
          <p>If you have any questions or need assistance, please contact us:</p>
          <p>Phone: 3474711520<br>Email: contact@careeaseusa.com</p>
          
          <p style="margin-top: 30px;">Thank you for choosing CareEase USA!</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `fully-signed-contract-${contractId}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResult.data?.id 
      }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error: any) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});