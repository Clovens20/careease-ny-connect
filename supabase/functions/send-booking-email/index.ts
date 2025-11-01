import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @deno-types="https://esm.sh/jspdf@2.5.1/dist/jspdf.deno.d.ts"
import jsPDF from "https://esm.sh/jspdf@2.5.1";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "https://www.careeaseusa.com";

interface BookingData {
  id: string;
  user_full_name: string;
  user_email: string;
  date: string;
  start_time: string;
  end_time: string;
  notes: string | null;
  city: string | null;
  services: { name: string } | null;
}

type PaymentMethod = {
  id: string;
  name: string;
  description: string | null;
  payment_details: Record<string, any> | null;
};

function generateContractPDF(data: {
  bookingId: string;
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
}): Uint8Array {
  const doc = new jsPDF();
  let pageHeight = doc.internal.pageSize.height;
  
  // Header
  doc.setFontSize(18);
  doc.text('CARE EASE USA LLC – SERVICE AGREEMENT', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Contract No.: ${data.bookingId.substring(0, 8)}`, 105, 28, { align: 'center' });
  doc.text(`Date: ${new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 105, 35, { align: 'center' });
  
  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - 20) {
      doc.addPage();
      y = 20;
      return true;
    }
    return false;
  };

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
  const scopeText = 'Care Ease USA LLC agrees to provide the following services to the Client:';
  const scopeLines = doc.splitTextToSize(scopeText, 170);
  scopeLines.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 6;
  });
  
  y += 3;
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
    // Remove $ sign if present in totalPrice
    const cleanPrice = data.totalPrice.replace('$', '').trim();
    doc.text(`Service Fee: $${cleanPrice} USD`, 20, y);
    y += 7;
  }
  
  // Payment Methods (dynamic with details)
  if (data.paymentMethods && data.paymentMethods.length > 0) {
    doc.text('Payment Methods Accepted:', 20, y);
    y += 7;
    
    data.paymentMethods.forEach((method) => {
      // Nom de la méthode
      let methodText = `• ${method.name}`;
      if (method.description) {
        methodText += ` - ${method.description}`;
      }
      
      // Ajouter les détails si présents
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
      y += 2; // Espace entre les méthodes
    });
  } else {
    doc.text(`Payment Method: To be determined`, 20, y);
    y += 7;
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
  
  // 4. Responsibilities
  checkPageBreak(50);
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('4. Responsibilities', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  const respText1 = 'Care Ease USA LLC agrees to perform services with professional care, diligence, and in compliance with applicable laws and regulations.';
  const respLines1 = doc.splitTextToSize(respText1, 170);
  respLines1.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 6;
  });
  
  y += 7;
  doc.text('Client agrees to:', 20, y);
  
  y += 7;
  doc.text('• Provide accurate information and access necessary for service delivery.', 20, y);
  
  y += 7;
  doc.text('• Pay agreed fees on time.', 20, y);
  
  y += 7;
  doc.text('• Communicate promptly regarding any issues or changes.', 20, y);
  
  // 5. Termination
  checkPageBreak(30);
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('5. Termination', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Either Party may terminate this Agreement with a written notice of 7 days.', 20, y);
  
  y += 8;
  const termText = 'In case of termination, the Client shall pay for services rendered up to the date of termination.';
  const termLines = doc.splitTextToSize(termText, 170);
  termLines.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 6;
  });
  
  // 6. Liability
  checkPageBreak(25);
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('6. Liability', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  const liabilityText = 'Care Ease USA LLC shall not be liable for any indirect, incidental, or consequential damages. Liability shall not exceed the total amount paid by the Client for services rendered under this Agreement.';
  const liabilityLines = doc.splitTextToSize(liabilityText, 170);
  liabilityLines.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 6;
  });
  
  // 7. Confidentiality
  checkPageBreak(25);
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('7. Confidentiality', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  const confText = 'Both Parties agree to keep all confidential information private and to not disclose it to any third party without prior written consent.';
  const confLines = doc.splitTextToSize(confText, 170);
  confLines.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 6;
  });
  
  // 8. Governing Law
  checkPageBreak(25);
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('8. Governing Law', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  const govText = 'This Agreement shall be governed by and construed in accordance with the laws of the State of New York, United States.';
  const govLines = doc.splitTextToSize(govText, 170);
  govLines.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 6;
  });
  
  // 9. Signatures
  checkPageBreak(60);
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
  doc.text(`Date: _________________`, 20, y);
  
  y += 7;
  doc.text('Signature:', 20, y);
  
  y += 15;
  doc.setLineWidth(0.5);
  doc.line(20, y, 100, y);
  
  // Service Provider Signature
  checkPageBreak(40);
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
  doc.text(`Date: ${new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, y);
  
  y += 7;
  doc.text('Signature:', 20, y);
  
  y += 15;
  doc.setLineWidth(0.5);
  doc.line(20, y, 100, y);
  
  // 10. Agreement Confirmation
  checkPageBreak(35);
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('10. Agreement Confirmation', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Upon completion of signatures by both parties:', 20, y);
  
  y += 7;
  const conf1 = `• A signed copy will be automatically sent to the Client's email (${data.clientEmail}).`;
  const conf1Lines = doc.splitTextToSize(conf1, 170);
  conf1Lines.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 5;
  });
  
  y += 2;
  doc.text('• The signed document will be securely stored in the Care Ease USA LLC database.', 20, y);
  
  y += 5;
  doc.text('• Both parties may request an additional copy at any time.', 20, y);
  
  // Footer
  y = pageHeight - 15;
  doc.setFontSize(8);
  doc.text('CareEase USA - Professional Home Health Care', 105, y, { align: 'center' });
  doc.text('Contact: contact@careeaseusa.com | Phone: 3474711520', 105, y + 7, { align: 'center' });
  
  return new Uint8Array(doc.output('arraybuffer'));
}

serve(async (req) => {
  // Gérer CORS pour les requêtes preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  // En-têtes CORS pour toutes les réponses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  try {
    const { bookingId, agentName } = await req.json();

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Récupérer les données du booking depuis Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select(`
        id,
        user_full_name,
        user_email,
        date,
        start_time,
        end_time,
        notes,
        city,
        service_id,
        services(name)
      `)
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      throw new Error(`Booking not found: ${bookingError?.message}`);
    }

    // Récupérer les méthodes de paiement actives avec leurs détails
    const { data: paymentMethods, error: paymentError } = await supabase
      .from("payment_methods")
      .select("id, name, description, payment_details")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (paymentError) {
      console.warn("Error fetching payment methods:", paymentError);
    }

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

    const parsedNotes = parseNotes(booking.notes);

    // Générer le PDF
    const pdfBuffer = generateContractPDF({
      bookingId: booking.id,
      clientName: booking.user_full_name,
      clientEmail: booking.user_email,
      clientPhone: parsedNotes.phone || undefined,
      clientAddress: parsedNotes.address || undefined,
      serviceName: booking.services?.name || 'Service',
      date: booking.date,
      startTime: booking.start_time,
      endTime: booking.end_time,
      agentName,
      totalPrice: parsedNotes.totalPrice || undefined,
      city: booking.city || undefined,
      paymentMethods: paymentMethods || [],
    });

    const pdfBase64 = btoa(String.fromCharCode(...pdfBuffer));

    // Créer un contrat dans la table contracts
    const { data: contract, error: contractError } = await supabase
      .from("contracts")
      .insert({
        booking_id: booking.id,
        client_name: booking.user_full_name,
        client_email: booking.user_email,
        services: booking.services?.name || 'Service',
        start_date: booking.date,
        status: "pending",
      })
      .select()
      .single();

    if (contractError) {
      console.error("Error creating contract:", contractError);
      // Continue même si la création du contrat échoue
    }

    // URL de signature du contrat
    const contractSignUrl = contract 
      ? `${FRONTEND_URL}/contract/${contract.id}`
      : `${FRONTEND_URL}/contract/error`;

    // Envoyer l'email avec PDF et lien de signature
    const resend = new Resend(RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: "CareEase USA <contact@careeaseusa.com>",
      to: booking.user_email,
      subject: `Your ${booking.services?.name || 'Service'} Service is Confirmed`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Service Confirmed!</h2>
          <p>Dear ${booking.user_full_name},</p>
          <p>Your service request has been confirmed. Here are the details:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Service Details</h3>
            <p><strong>Service:</strong> ${booking.services?.name || 'Service'}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.start_time} - ${booking.end_time}</p>
            <p><strong>Assigned Agent:</strong> ${agentName}</p>
            ${booking.city ? `<p><strong>Location:</strong> ${booking.city}</p>` : ''}
          </div>
          
          <p>Your service agreement is attached to this email. Please review it carefully.</p>
          
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="margin-top: 0; color: #0369a1;">Sign Your Contract Online</h3>
            <p style="margin-bottom: 15px;">Click the button below to review and sign your contract digitally:</p>
            <a href="${contractSignUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Sign Contract Now</a>
            <p style="margin-top: 15px; font-size: 12px; color: #64748b;">Or copy this link: ${contractSignUrl}</p>
          </div>
          
          <p>If you have any questions or need to make changes, please contact us:</p>
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
          filename: `service-agreement-${bookingId}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResult.data?.id,
        contractId: contract?.id 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }, 
        status: 200 
      }
    );
  } catch (error: any) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }, 
        status: 500 
      }
    );
  }
});