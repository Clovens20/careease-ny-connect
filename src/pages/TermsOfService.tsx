import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <Card>
            <CardContent className="pt-6 space-y-6 prose prose-slate max-w-none">
              <div className="text-muted-foreground">
                <p className="text-sm mb-6">
                  <strong>Effective Date:</strong> October 31, 2025<br />
                  <strong>Last Updated:</strong> October 31, 2025
                </p>
                
                <div className="border-t border-border my-8" />
                
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                  <p className="leading-relaxed">
                    These Terms of Service ("Terms," "Agreement") constitute a legally binding agreement between you ("Client," "you," or "your") and CareEase USA LLC ("CareEase," "we," "us," or "our") governing your access to and use of our website <a href="https://www.careeaseusa.com" className="text-primary hover:underline">www.careeaseusa.com</a> and home health care services (collectively, the "Services").
                  </p>
                  <p className="leading-relaxed">
                    <strong>By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.</strong> If you do not agree to these Terms, you must not access or use our Services.
                  </p>
                  <p className="leading-relaxed">
                    If you are accepting these Terms on behalf of another person or entity, you represent and warrant that you have the authority to bind that person or entity to these Terms.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">2. Services Description</h2>
                  <p className="leading-relaxed mb-4">
                    CareEase USA provides professional home health care services and housekeeping services for elderly and disabled individuals throughout the United States.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">2.1 Home Health Aide (HHA) Services</h3>
                  <p className="leading-relaxed mb-4">Our Home Health Aide services include, but are not limited to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Personal care assistance (bathing, grooming, dressing)</li>
                    <li>Assistance with activities of daily living (ADLs)</li>
                    <li>Mobility assistance and transfer support</li>
                    <li>Medication reminders (not administration unless authorized)</li>
                    <li>Vital signs monitoring and health observation</li>
                    <li>Meal preparation and feeding assistance</li>
                    <li>Companionship and emotional support</li>
                    <li>Communication with family members and healthcare providers</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">2.2 Housekeeping Services</h3>
                  <p className="leading-relaxed mb-4">Our housekeeping services are specifically adapted to support elderly and disabled individuals and may include:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Light cleaning and tidying</li>
                    <li>Laundry and linen changes</li>
                    <li>Dishwashing and kitchen maintenance</li>
                    <li>Vacuuming and floor care</li>
                    <li>Bathroom cleaning</li>
                    <li>Organizing living spaces for safety and accessibility</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">2.3 Service Limitations</h3>
                  <p className="leading-relaxed mb-4"><strong>Our services do NOT include:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Medical diagnosis, treatment, or nursing care requiring a licensed nurse</li>
                    <li>Medication administration (unless provided by appropriately licensed personnel)</li>
                    <li>Heavy lifting or moving of furniture</li>
                    <li>Outdoor maintenance or yard work</li>
                    <li>Care for other household members not specified in the care plan</li>
                    <li>Transportation services (unless specifically arranged and agreed upon)</li>
                  </ul>
                  <p className="leading-relaxed">
                    All services are provided in accordance with applicable federal, state, and local regulations, including licensing requirements for home health aides.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">3. Eligibility and Registration</h2>

                  <h3 className="text-xl font-semibold mb-3">3.1 Age Requirement</h3>
                  <p className="leading-relaxed mb-4">
                    You must be at least 18 years of age to use our Services. By using our Services, you represent and warrant that you meet this age requirement.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">3.2 Account Registration</h3>
                  <p className="leading-relaxed mb-4">To access certain features of our Services, you may be required to create an account. You agree to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Keep your account credentials confidential and secure</li>
                    <li>Notify us immediately of any unauthorized access or security breach</li>
                    <li>Accept responsibility for all activities that occur under your account</li>
                  </ul>
                  <p className="leading-relaxed">
                    We reserve the right to suspend or terminate accounts that provide false or misleading information.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">4. Booking and Scheduling</h2>

                  <h3 className="text-xl font-semibold mb-3">4.1 Service Requests</h3>
                  <p className="leading-relaxed mb-4">Service bookings may be made through:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Our website booking system</li>
                    <li>Phone: (347) 471-1520</li>
                    <li>Email: contact@careeaseusa.com</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    All bookings are subject to caregiver availability and our acceptance.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">4.2 Booking Confirmation</h3>
                  <p className="leading-relaxed mb-4">A booking is confirmed only when:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Payment is processed (for prepaid services), OR</li>
                    <li>Payment terms are agreed upon in writing, AND</li>
                    <li>You receive written confirmation from CareEase via email or other communication</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    We reserve the right to refuse service requests at our sole discretion.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">4.3 Service Schedule Changes</h3>
                  <p className="leading-relaxed mb-4">
                    We will make reasonable efforts to accommodate your preferred schedule. However, due to caregiver availability or unforeseen circumstances, we may need to propose alternative times. We will notify you promptly of any necessary schedule changes.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">4.4 Recurring Services</h3>
                  <p className="leading-relaxed">
                    For clients who book recurring services, the agreed-upon schedule will remain in effect until either party provides notice of changes in accordance with these Terms.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">5. Cancellation and Rescheduling Policy</h2>

                  <h3 className="text-xl font-semibold mb-3">5.1 Client-Initiated Cancellations</h3>
                  
                  <p className="leading-relaxed"><strong>24-Hour Notice:</strong></p>
                  <p className="leading-relaxed mb-4">
                    You may cancel or reschedule a service appointment without penalty by providing at least 24 hours' notice before the scheduled service time.
                  </p>

                  <p className="leading-relaxed"><strong>Less Than 24 Hours Notice:</strong></p>
                  <p className="leading-relaxed mb-4">
                    Cancellations or rescheduling requests made less than 24 hours before the scheduled service may be subject to a cancellation fee of up to 50% of the scheduled service cost.
                  </p>

                  <p className="leading-relaxed"><strong>Same-Day Cancellations:</strong></p>
                  <p className="leading-relaxed mb-4">
                    Cancellations made on the day of service or "no-show" situations may result in a cancellation fee of up to 100% of the scheduled service cost or forfeiture of prepaid amounts.
                  </p>

                  <p className="leading-relaxed"><strong>Exceptions:</strong></p>
                  <p className="leading-relaxed mb-4">
                    Cancellation fees may be waived in cases of documented emergencies, hospitalization, or other extenuating circumstances at CareEase's sole discretion.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">5.2 CareEase-Initiated Cancellations</h3>
                  <p className="leading-relaxed mb-4">We reserve the right to cancel or reschedule services due to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Caregiver illness or emergency</li>
                    <li>Unsafe working conditions</li>
                    <li>Inclement weather or natural disasters</li>
                    <li>Non-payment or breach of these Terms</li>
                  </ul>
                  <p className="leading-relaxed">
                    In such cases, we will provide as much advance notice as possible and work with you to reschedule services. No cancellation fees will be charged to you for CareEase-initiated cancellations.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">6. Fees and Payment</h2>

                  <h3 className="text-xl font-semibold mb-3">6.1 Service Fees</h3>
                  <p className="leading-relaxed mb-4">Service fees are determined based on:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Type and duration of services</li>
                    <li>Required qualifications of caregivers</li>
                    <li>Frequency of services</li>
                    <li>Geographic location</li>
                    <li>Special requirements or accommodations</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    Current pricing information is available on our website or by contacting us directly. All fees are quoted in U.S. Dollars (USD).
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.2 Payment Methods</h3>
                  <p className="leading-relaxed mb-4">We accept the following payment methods:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Electronic bank transfers (ACH)</li>
                    <li>Personal checks (for established clients with approved credit)</li>
                    <li>Cash App</li>
                    <li>Zelle</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">6.3 Payment Terms</h3>
                  
                  <p className="leading-relaxed"><strong>Prepayment:</strong></p>
                  <p className="leading-relaxed mb-4">
                    For new clients or one-time services, full payment may be required at the time of booking.
                  </p>

                  <p className="leading-relaxed"><strong>Invoicing:</strong></p>
                  <p className="leading-relaxed mb-4">
                    For established clients or ongoing services, we may provide invoicing with payment due within 15 days of the invoice date unless otherwise agreed in writing.
                  </p>

                  <p className="leading-relaxed"><strong>Late Payments:</strong></p>
                  <p className="leading-relaxed mb-4">
                    Late payments may be subject to a late fee of 1.5% per month (or the maximum rate permitted by law) on the outstanding balance. Services may be suspended for accounts with overdue balances.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.4 Insurance and Third-Party Payments</h3>
                  <p className="leading-relaxed mb-4">If payment is to be made by insurance or a third-party payor:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>You are responsible for verifying coverage and obtaining necessary authorizations</li>
                    <li>You agree to pay any amounts not covered by insurance or third-party payors</li>
                    <li>You remain ultimately responsible for all charges incurred</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">6.5 Refunds</h3>
                  <p className="leading-relaxed">
                    Refunds for prepaid services will be issued according to our cancellation policy (Section 5). Refund requests must be submitted in writing to contact@careeaseusa.com.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">7. Client Responsibilities</h2>
                  <p className="leading-relaxed mb-4">As a client of CareEase, you agree to:</p>

                  <h3 className="text-xl font-semibold mb-3">7.1 Safe Environment</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Provide a safe, clean, and accessible working environment for our caregivers</li>
                    <li>Inform us of any hazards, pets, or special conditions in the home</li>
                    <li>Ensure adequate lighting, heating, and ventilation</li>
                    <li>Provide access to necessary facilities (bathroom, handwashing, etc.)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">7.2 Accurate Information</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Provide complete and accurate information about care needs, medical conditions, and preferences</li>
                    <li>Disclose any communicable diseases or infectious conditions</li>
                    <li>Inform us promptly of any changes in health status or care requirements</li>
                    <li>Provide emergency contact information</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">7.3 Respectful Conduct</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Treat our caregivers with respect and courtesy</li>
                    <li>Refrain from any form of harassment, discrimination, or abuse (verbal, physical, or sexual)</li>
                    <li>Not offer additional compensation or gifts to caregivers without CareEase's prior approval</li>
                    <li>Not attempt to hire our caregivers privately during or after their employment with CareEase</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">7.4 Supervision and Directions</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Provide clear instructions regarding care preferences and household routines</li>
                    <li>Be available or designate a responsible party for communication</li>
                    <li>Review and approve care plans</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">7.5 Prohibited Conduct</h3>
                  <p className="leading-relaxed mb-4">You agree NOT to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Request caregivers to perform tasks outside the scope of agreed services</li>
                    <li>Ask caregivers to handle controlled substances or provide medical care beyond their qualifications</li>
                    <li>Engage caregivers in illegal activities</li>
                    <li>Record caregivers without their knowledge and consent (where prohibited by law)</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">8. Caregiver Background and Qualifications</h2>

                  <h3 className="text-xl font-semibold mb-3">8.1 Screening Process</h3>
                  <p className="leading-relaxed mb-4">All CareEase caregivers undergo:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Criminal background checks</li>
                    <li>Reference verification</li>
                    <li>Skills assessment and training</li>
                    <li>Verification of required licenses or certifications</li>
                    <li>Drug screening (where permitted by law)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">8.2 Caregiver Qualifications</h3>
                  <p className="leading-relaxed mb-4">
                    Our caregivers are trained and qualified to provide the services described. However, we do not guarantee that any specific caregiver will be available for your services. We reserve the right to assign and reassign caregivers based on availability and client needs.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">8.3 Independent Judgment</h3>
                  <p className="leading-relaxed mb-4">While we carefully screen our caregivers, you acknowledge that:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Caregivers exercise independent professional judgment</li>
                    <li>CareEase is not liable for the acts or omissions of caregivers beyond the scope of applicable law</li>
                    <li>You should report any concerns about caregiver performance immediately</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>

                  <h3 className="text-xl font-semibold mb-3">9.1 Service Provision</h3>
                  <p className="leading-relaxed mb-4">
                    CareEase provides home health aide and housekeeping services with reasonable care and skill. However, <strong>to the maximum extent permitted by law:</strong>
                  </p>
                  <p className="leading-relaxed mb-4"><strong>WE DO NOT GUARANTEE:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Specific outcomes or results from our services</li>
                    <li>That services will be uninterrupted or error-free</li>
                    <li>That caregivers will be available at all requested times</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">9.2 Liability Cap</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>To the fullest extent permitted by applicable law, CareEase's total liability to you for any claims arising from or related to our Services shall not exceed the amount you paid to CareEase for services in the 90 days preceding the event giving rise to liability.</strong>
                  </p>

                  <h3 className="text-xl font-semibold mb-3">9.3 Exclusion of Damages</h3>
                  <p className="leading-relaxed mb-4"><strong>CareEase shall not be liable for:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Loss of profits, revenue, data, or use</li>
                    <li>Cost of substitute services</li>
                    <li>Damages arising from third-party actions or inactions</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    This exclusion applies regardless of the theory of liability (contract, tort, negligence, strict liability, or otherwise), even if we have been advised of the possibility of such damages.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">9.4 Exceptions</h3>
                  <p className="leading-relaxed mb-4">Nothing in these Terms limits liability for:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Death or personal injury caused by our gross negligence or willful misconduct</li>
                    <li>Fraud or fraudulent misrepresentation</li>
                    <li>Any liability that cannot be limited or excluded by applicable law</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
                  <p className="leading-relaxed mb-4">
                    You agree to indemnify, defend, and hold harmless CareEase USA LLC, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any applicable laws or regulations</li>
                    <li>Your violation of any third-party rights</li>
                    <li>Any injury, damage, or loss occurring in your home (unless caused by our gross negligence or willful misconduct)</li>
                    <li>Your misuse of our Services</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">11. Insurance and Liability Coverage</h2>
                  <p className="leading-relaxed mb-4">CareEase maintains appropriate insurance coverage, including:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>General liability insurance</li>
                    <li>Professional liability insurance</li>
                    <li>Workers' compensation insurance (as required by law)</li>
                  </ul>
                  <p className="leading-relaxed">
                    Proof of insurance is available upon request.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">12. Privacy and Confidentiality</h2>

                  <h3 className="text-xl font-semibold mb-3">12.1 Privacy Policy</h3>
                  <p className="leading-relaxed mb-4">
                    Your use of our Services is subject to our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">12.2 HIPAA Compliance</h3>
                  <p className="leading-relaxed mb-4">
                    For health-related information, we comply with the Health Insurance Portability and Accountability Act (HIPAA). You will receive a separate Notice of Privacy Practices explaining your rights under HIPAA.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">12.3 Confidentiality</h3>
                  <p className="leading-relaxed mb-4">
                    Our caregivers and staff are required to maintain confidentiality of all client information. However, we may disclose information as necessary to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Provide services and coordinate care</li>
                    <li>Comply with legal obligations</li>
                    <li>Protect health and safety in emergency situations</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">13. Dispute Resolution</h2>

                  <h3 className="text-xl font-semibold mb-3">13.1 Informal Resolution</h3>
                  <p className="leading-relaxed mb-4">
                    If you have any concerns or disputes regarding our Services, please contact us first at contact@careeaseusa.com or (347) 471-1520. We will make good faith efforts to resolve disputes informally.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">13.2 Binding Arbitration</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.</strong>
                  </p>
                  <p className="leading-relaxed mb-4">
                    Any dispute, claim, or controversy arising out of or relating to these Terms or our Services (collectively, "Disputes") that cannot be resolved informally shall be resolved through binding arbitration, except as noted below.
                  </p>

                  <p className="leading-relaxed mb-4"><strong>Arbitration Agreement:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Arbitration will be conducted by the American Arbitration Association (AAA) under its Consumer Arbitration Rules</li>
                    <li>The arbitration will take place in New York County, New York, or another mutually agreed location</li>
                    <li>The arbitrator's decision will be final and binding</li>
                    <li>Each party will bear its own costs and attorneys' fees unless otherwise awarded by the arbitrator</li>
                  </ul>

                  <p className="leading-relaxed mb-4"><strong>Exceptions to Arbitration:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Claims for injunctive or equitable relief</li>
                    <li>Claims that may be brought in small claims court</li>
                    <li>Intellectual property disputes</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">13.3 Class Action Waiver</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>You agree that any arbitration or proceeding shall be conducted only on an individual basis and not in a class, consolidated, or representative action.</strong> You waive your right to participate in a class action lawsuit or class-wide arbitration.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">13.4 Opt-Out Right</h3>
                  <p className="leading-relaxed">
                    You have the right to opt out of this arbitration agreement by sending written notice to CareEase at 1510 Castle Hill Ave #1073, Bronx, NY 10462 within 30 days of accepting these Terms. Your opt-out notice must include your name, address, and a clear statement that you wish to opt out of the arbitration agreement.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">14. Governing Law and Jurisdiction</h2>
                  <p className="leading-relaxed mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
                  </p>
                  <p className="leading-relaxed">
                    For any disputes not subject to arbitration, you agree to submit to the exclusive jurisdiction of the state and federal courts located in New York County, New York.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">15. Intellectual Property</h2>

                  <h3 className="text-xl font-semibold mb-3">15.1 Ownership</h3>
                  <p className="leading-relaxed mb-4">
                    All content, features, and functionality of our website and Services, including but not limited to text, graphics, logos, images, software, and trademarks, are the exclusive property of CareEase USA LLC or its licensors and are protected by copyright, trademark, and other intellectual property laws.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">15.2 Limited License</h3>
                  <p className="leading-relaxed mb-4">
                    We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for their intended purpose. You may not:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Copy, modify, or distribute our content without permission</li>
                    <li>Use our trademarks or branding without authorization</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                    <li>Use automated systems to access our Services (scraping, bots, etc.)</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">16. Third-Party Services and Links</h2>
                  <p className="leading-relaxed">
                    Our website may contain links to third-party websites or services that are not owned or controlled by CareEase. We are not responsible for the content, privacy policies, or practices of third-party sites. You access third-party sites at your own risk.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">17. Modifications to Terms</h2>
                  <p className="leading-relaxed mb-4">
                    We reserve the right to modify these Terms at any time. When we make material changes, we will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Update the "Last Updated" date at the top of this page</li>
                    <li>Notify you via email (if you have an account) or through a prominent notice on our website</li>
                    <li>Provide at least 30 days' notice before changes take effect for existing clients</li>
                  </ul>
                  <p className="leading-relaxed">
                    Your continued use of our Services after changes become effective constitutes acceptance of the modified Terms. If you do not agree to the changes, you must discontinue using our Services.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">18. Termination</h2>

                  <h3 className="text-xl font-semibold mb-3">18.1 Termination by You</h3>
                  <p className="leading-relaxed mb-4">You may terminate your use of our Services at any time by:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Canceling all scheduled services</li>
                    <li>Closing your account (if applicable)</li>
                    <li>Providing written notice to contact@careeaseusa.com</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    You remain responsible for any outstanding payments for services already provided.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">18.2 Termination by CareEase</h3>
                  <p className="leading-relaxed mb-4">We reserve the right to suspend or terminate your access to our Services immediately, without notice, if:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>You breach these Terms</li>
                    <li>You engage in conduct that is harmful to CareEase, our caregivers, or other clients</li>
                    <li>Your account is delinquent in payment</li>
                    <li>We are required to do so by law</li>
                    <li>We decide to discontinue Services (with reasonable notice)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">18.3 Effect of Termination</h3>
                  <p className="leading-relaxed mb-4">Upon termination:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Your right to use our Services ceases immediately</li>
                    <li>You remain responsible for all outstanding payments</li>
                    <li>Provisions of these Terms that by their nature should survive termination will continue to apply (including payment obligations, indemnification, limitation of liability, and dispute resolution)</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">19. Force Majeure</h2>
                  <p className="leading-relaxed mb-4">
                    CareEase shall not be liable for any failure or delay in performing its obligations under these Terms due to circumstances beyond its reasonable control, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Natural disasters (hurricanes, earthquakes, floods, fires)</li>
                    <li>Pandemics or public health emergencies</li>
                    <li>War, terrorism, or civil unrest</li>
                    <li>Government orders or restrictions</li>
                    <li>Labor disputes or strikes</li>
                    <li>Utility failures or telecommunications outages</li>
                  </ul>
                  <p className="leading-relaxed">
                    In such events, our performance obligations will be suspended for the duration of the force majeure event.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">20. Severability</h2>
                  <p className="leading-relaxed">
                    If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">21. Waiver</h2>
                  <p className="leading-relaxed">
                    No waiver of any provision of these Terms shall be deemed a further or continuing waiver of such provision or any other provision. Our failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">22. Entire Agreement</h2>
                  <p className="leading-relaxed">
                    These Terms, together with our Privacy Policy and any other agreements referenced herein, constitute the entire agreement between you and CareEase regarding the use of our Services and supersede all prior or contemporaneous understandings and agreements, whether written or oral.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">23. Assignment</h2>
                  <p className="leading-relaxed">
                    You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations under these Terms without restriction, including in connection with a merger, acquisition, or sale of assets.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">24. Notice Requirements</h2>

                  <h3 className="text-xl font-semibold mb-3">24.1 Notices to You</h3>
                  <p className="leading-relaxed mb-4">We may provide notices to you via:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Email to the address associated with your account</li>
                    <li>Posting on our website</li>
                    <li>Mail to your registered address</li>
                  </ul>
                  <p className="leading-relaxed mb-4">Notices are deemed received when sent.</p>

                  <h3 className="text-xl font-semibold mb-3">24.2 Notices to CareEase</h3>
                  <p className="leading-relaxed mb-4">All notices to CareEase must be sent to:</p>
                  <p className="leading-relaxed mb-4"><strong>CareEase USA LLC</strong></p>
                  <ul className="list-none space-y-2 mb-4">
                    <li>1510 Castle Hill Ave #1073</li>
                    <li>Bronx, NY 10462, USA</li>
                    <li>Email: contact@careeaseusa.com</li>
                    <li>Phone: (347) 471-1520</li>
                  </ul>
                  <p className="leading-relaxed">
                    Notices must be in writing and are deemed received when we acknowledge receipt.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">25. Accessibility Commitment</h2>
                  <p className="leading-relaxed">
                    CareEase is committed to providing accessible services to all individuals, including those with disabilities. If you require accommodations or have accessibility concerns, please contact us to discuss how we can best serve your needs.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">26. Contact Information</h2>
                  <p className="leading-relaxed mb-4">
                    If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us:
                  </p>
                  <p className="leading-relaxed mb-4"><strong>CareEase USA LLC</strong></p>
                  <ul className="list-none space-y-2 mb-4">
                    <li><strong>Email:</strong> contact@careeaseusa.com</li>
                    <li><strong>Phone:</strong> (347) 471-1520</li>
                    <li><strong>Mailing Address:</strong> 1510 Castle Hill Ave #1073, Bronx, NY 10462, USA</li>
                    <li><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">27. Acknowledgment</h2>
                  <p className="leading-relaxed italic">
                    <strong>BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM.</strong>
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <p className="leading-relaxed">
                  <em>Thank you for choosing CareEase USA LLC for your home health care needs. We are committed to providing exceptional, compassionate care to you and your loved ones.</em>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
