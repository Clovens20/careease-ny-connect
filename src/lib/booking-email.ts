import { Resend } from 'resend';
import jsPDF from 'jspdf';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export interface BookingEmailData {
  bookingId: string;
  clientName: string;
  clientEmail: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  agentName: string;
  notes: string;
  city?: string;
  // Nouveaux champs pour le contrat
  clientPhone?: string;
  clientAddress?: string;
  totalPrice?: string;
}

export async function generateBookingContract(data: BookingEmailData): Promise<Uint8Array> {
  const doc = new jsPDF();
  
  // ========================================
  // 📄 EN-TÊTE
  // ========================================
  doc.setFontSize(18);
  doc.text('CARE EASE USA LLC – SERVICE AGREEMENT', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Contract No.: ${data.bookingId.substring(0, 8)}`, 105, 28, { align: 'center' });
  doc.text(`Date: ${new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 105, 35, { align: 'center' });
  
  // ========================================
  // 1. CLIENT INFORMATION
  // ========================================
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
    doc.text(`Service Address: ${data.clientAddress}`, 20, y);
  }
  
  // ========================================
  // 2. SCOPE OF SERVICES
  // ========================================
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('2. Scope of Services', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Care Ease USA LLC agrees to provide the following services to the Client:', 20, y);
  
  y += 8;
  doc.text(`Service(s) Description: ${data.serviceName}`, 20, y);
  
  y += 8;
  doc.text(`Services will be provided starting on ${new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and are expected to continue until completion or termination as outlined in this Agreement.`, 20, y);
  
  // ========================================
  // 3. PAYMENT TERMS
  // ========================================
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('3. Payment Terms', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  if (data.totalPrice) {
    doc.text(`Service Fee: $${data.totalPrice} USD`, 20, y);
    y += 7;
  }
  doc.text(`Payment Method: To be determined`, 20, y);
  
  y += 7;
  const dueDate = new Date(data.date);
  dueDate.setDate(dueDate.getDate() + 7); // 7 jours après la date de service
  doc.text(`Payment Due Date: ${dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, y);
  
  y += 10;
  doc.text('Late payments may incur additional fees in accordance with Care Ease USA LLC\'s policy.', 20, y);
  
  // ========================================
  // 4. RESPONSIBILITIES
  // ========================================
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('4. Responsibilities', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Care Ease USA LLC agrees to perform services with professional care, diligence, and in compliance with applicable laws and regulations.', 20, y);
  
  y += 10;
  doc.text('Client agrees to:', 20, y);
  
  y += 7;
  doc.text('• Provide accurate information and access necessary for service delivery.', 20, y);
  
  y += 7;
  doc.text('• Pay agreed fees on time.', 20, y);
  
  y += 7;
  doc.text('• Communicate promptly regarding any issues or changes.', 20, y);
  
  // ========================================
  // 5. TERMINATION
  // ========================================
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('5. Termination', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Either Party may terminate this Agreement with a written notice of 7 days.', 20, y);
  
  y += 8;
  doc.text('In case of termination, the Client shall pay for services rendered up to the date of termination.', 20, y);
  
  // ========================================
  // 6. LIABILITY
  // ========================================
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('6. Liability', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Care Ease USA LLC shall not be liable for any indirect, incidental, or consequential damages. Liability shall not exceed the total amount paid by the Client for services rendered under this Agreement.', 20, y);
  
  // ========================================
  // 7. CONFIDENTIALITY
  // ========================================
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('7. Confidentiality', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Both Parties agree to keep all confidential information private and to not disclose it to any third party without prior written consent.', 20, y);
  
  // ========================================
  // 8. GOVERNING LAW
  // ========================================
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('8. Governing Law', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('This Agreement shall be governed by and construed in accordance with the laws of the State of New York, United States.', 20, y);
  
  // ========================================
  // 9. SIGNATURES
  // ========================================
  y += 25;
  doc.setFont('helvetica', 'bold');
  doc.text('9. Signatures', 20, y);
  
  y += 10;
  doc.text('Client Signature', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('By signing below, the Client acknowledges having read, understood, and agreed to all terms of this Agreement.', 20, y);
  
  y += 8;
  doc.text(`Client Name: ${data.clientName}`, 20, y);
  
  y += 7;
  doc.text(`Date: _________________`, 20, y);
  
  y += 7;
  doc.text('Signature:', 20, y);
  
  y += 15;
  doc.setLineWidth(0.5);
  doc.line(20, y, 100, y);
  
  // Service Provider Signature
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
  
  // ========================================
  // 10. AGREEMENT CONFIRMATION
  // ========================================
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('10. Agreement Confirmation', 20, y);
  
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Upon completion of signatures by both parties:', 20, y);
  
  y += 7;
  doc.text(`• A signed copy will be automatically sent to the Client's email (${data.clientEmail}).`, 20, y);
  
  y += 7;
  doc.text('• The signed document will be securely stored in the Care Ease USA LLC database.', 20, y);
  
  y += 7;
  doc.text('• Both parties may request an additional copy at any time.', 20, y);
  
  // Footer
  y = 280;
  doc.setFontSize(8);
  doc.text('CareEase USA - Professional Home Health Care', 105, y, { align: 'center' });
  doc.text('Contact: contact@careeaseusa.com | Phone: 3474711520', 105, y + 7, { align: 'center' });
  
  return doc.output('arraybuffer');
}

export async function sendBookingConfirmationEmail(data: BookingEmailData): Promise<void> {
  // Generate PDF
  const pdfBuffer = await generateBookingContract(data);
  const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
  
  // Send email with PDF attachment
  await resend.emails.send({
    from: 'CareEase USA <contact@careeaseusa.com>',
    to: data.clientEmail,
    subject: `Your ${data.serviceName} Service is Confirmed`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Service Confirmed!</h2>
        <p>Dear ${data.clientName},</p>
        <p>Your service request has been confirmed. Here are the details:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Service Details</h3>
          <p><strong>Service:</strong> ${data.serviceName}</p>
          <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${data.startTime} - ${data.endTime}</p>
          <p><strong>Assigned Agent:</strong> ${data.agentName}</p>
        </div>
        
        <p>Your service agreement is attached to this email. Please review it carefully.</p>
        
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
        filename: `service-agreement-${data.bookingId}.pdf`,
        content: pdfBase64,
      },
    ],
  });
}

export async function sendBookingRejectionEmail(data: {
  bookingId: string;
  clientName: string;
  clientEmail: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
}): Promise<void> {
  await resend.emails.send({
    from: 'CareEase USA <contact@careeaseusa.com>',
    to: data.clientEmail,
    subject: `Booking Update - ${data.serviceName} Service`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Booking Update</h2>
        <p>Dear ${data.clientName},</p>
        <p>We regret to inform you that your booking request has been cancelled.</p>
        
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <h3 style="margin-top: 0; color: #dc2626;">Booking Details</h3>
          <p><strong>Service:</strong> ${data.serviceName}</p>
          <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${data.startTime} - ${data.endTime}</p>
        </div>
        
        <p>We sincerely apologize for any inconvenience this may cause. If you have any questions or would like to book a different date, please don't hesitate to contact us:</p>
        <p>Phone: 3474711520<br>Email: contact@careeaseusa.com</p>
        
        <p style="margin-top: 30px;">Thank you for your understanding.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    `,
  });
}