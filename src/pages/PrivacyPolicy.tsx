import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <Card>
            <CardContent className="pt-6 space-y-6 prose prose-slate max-w-none">
              <div className="text-muted-foreground">
                <p className="text-sm mb-6">
                  <strong>Effective Date:</strong> October 31, 2025<br />
                  <strong>Last Updated:</strong> October 31, 2025
                </p>
                
                <div className="border-t border-border my-8" />
                
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                  <p className="leading-relaxed">
                    CareEase USA LLC ("CareEase," "we," "us," or "our") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard information obtained through our website <a href="https://www.careeaseusa.com" className="text-primary hover:underline">www.careeaseusa.com</a> and in connection with our home health care services (collectively, the "Services").
                  </p>
                  <p className="leading-relaxed">
                    By using our Services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
                  <p className="leading-relaxed mb-4">We collect personal information that you voluntarily provide when you:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Register for our Services or create an account</li>
                    <li>Book home health aide or housekeeping services</li>
                    <li>Contact us via email, phone, or our website</li>
                    <li>Subscribe to newsletters or promotional communications</li>
                    <li>Participate in surveys or feedback requests</li>
                  </ul>
                  <p className="leading-relaxed mb-4"><strong>Types of personal information collected may include:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Full name and contact information (email address, phone number, mailing address)</li>
                    <li>Date of birth and emergency contact information</li>
                    <li>Payment and billing information</li>
                    <li>Service preferences and scheduling details</li>
                    <li>Any other information you choose to provide</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">2.2 Protected Health Information (PHI)</h3>
                  <p className="leading-relaxed mb-4">
                    As a home health care provider, we may collect health-related information necessary to provide appropriate care, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Medical history and current health conditions</li>
                    <li>Medication information</li>
                    <li>Physician contact information</li>
                    <li>Insurance information</li>
                    <li>Care plans and treatment notes</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    <strong>HIPAA Compliance:</strong> We comply with the Health Insurance Portability and Accountability Act (HIPAA) and maintain strict confidentiality standards for all Protected Health Information (PHI). For detailed information about how we handle PHI, please refer to our separate Notice of Privacy Practices provided at the time of service enrollment.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">2.3 Automatically Collected Information</h3>
                  <p className="leading-relaxed mb-4">
                    When you visit our website, we may automatically collect certain information, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies (see Section 8)</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                  <p className="leading-relaxed mb-4">We use the information we collect for the following purposes:</p>
                  
                  <p className="leading-relaxed"><strong>Service Delivery:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Provide, maintain, and improve our home health care services</li>
                    <li>Process service bookings and manage your account</li>
                    <li>Coordinate care with healthcare providers and caregivers</li>
                    <li>Schedule appointments and manage service delivery</li>
                  </ul>

                  <p className="leading-relaxed"><strong>Communication:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send service-related notifications and updates</li>
                    <li>Provide appointment reminders and care coordination communications</li>
                  </ul>

                  <p className="leading-relaxed"><strong>Business Operations:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Process payments and manage billing</li>
                    <li>Prevent fraud and enhance security</li>
                    <li>Comply with legal and regulatory obligations</li>
                    <li>Enforce our Terms of Service and protect our rights</li>
                  </ul>

                  <p className="leading-relaxed"><strong>Marketing (with your consent):</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Send newsletters, promotional materials, and special offers</li>
                    <li>Conduct surveys and gather feedback to improve our Services</li>
                  </ul>

                  <p className="leading-relaxed mb-4">
                    You may opt out of marketing communications at any time by following the unsubscribe instructions in our emails or contacting us directly.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
                  <p className="leading-relaxed mb-4">
                    <strong>We do not sell, rent, or trade your personal information.</strong> We may share your information only in the following limited circumstances:
                  </p>

                  <h3 className="text-xl font-semibold mb-3">4.1 Service Providers</h3>
                  <p className="leading-relaxed mb-4">
                    We may share information with trusted third-party service providers who assist us in operating our business, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Payment processors and billing services</li>
                    <li>Cloud storage and IT infrastructure providers</li>
                    <li>Marketing and communication platforms</li>
                    <li>Background check services for caregiver screening</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">4.2 Healthcare Providers</h3>
                  <p className="leading-relaxed mb-4">With your explicit consent, we may share health information with:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Licensed healthcare providers involved in your care</li>
                    <li>Physicians, nurses, and other medical professionals</li>
                    <li>Insurance companies for billing and coverage verification</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">4.3 Legal Requirements</h3>
                  <p className="leading-relaxed mb-4">We may disclose information when required by law or when we believe disclosure is necessary to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Comply with legal processes, court orders, or government requests</li>
                    <li>Protect the rights, property, or safety of CareEase, our clients, or others</li>
                    <li>Detect, prevent, or address fraud, security, or technical issues</li>
                    <li>Enforce our Terms of Service and other agreements</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">4.4 Business Transfers</h3>
                  <p className="leading-relaxed">
                    In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change and any choices you may have regarding your information.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                  <p className="leading-relaxed mb-4">
                    We implement appropriate technical, administrative, and physical security measures designed to protect your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Encryption of sensitive data in transit and at rest</li>
                    <li>Secure server infrastructure and firewalls</li>
                    <li>Regular security assessments and audits</li>
                    <li>Access controls and authentication procedures</li>
                    <li>Employee training on privacy and security practices</li>
                  </ul>
                  <p className="leading-relaxed">
                    However, no method of transmission over the Internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">6. Your Privacy Rights</h2>
                  <p className="leading-relaxed mb-4">
                    Depending on your location and applicable law, you may have the following rights:
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.1 Access and Portability</h3>
                  <p className="leading-relaxed mb-4">
                    Request access to the personal information we hold about you and receive a copy in a portable format.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.2 Correction</h3>
                  <p className="leading-relaxed mb-4">
                    Request correction of inaccurate or incomplete personal information.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.3 Deletion</h3>
                  <p className="leading-relaxed mb-4">
                    Request deletion of your personal information, subject to legal and contractual obligations.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.4 Restriction</h3>
                  <p className="leading-relaxed mb-4">
                    Request that we restrict the processing of your personal information in certain circumstances.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.5 Objection</h3>
                  <p className="leading-relaxed mb-4">
                    Object to our processing of your personal information for direct marketing purposes.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.6 Opt-Out</h3>
                  <p className="leading-relaxed mb-4">
                    Unsubscribe from marketing communications at any time.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.7 HIPAA Rights</h3>
                  <p className="leading-relaxed mb-4">
                    For health information, you have additional rights under HIPAA, including the right to request restrictions on disclosures and receive an accounting of disclosures. Please see our Notice of Privacy Practices for complete details.
                  </p>

                  <p className="leading-relaxed mb-4">
                    <strong>To exercise any of these rights, please contact us at:</strong>
                  </p>
                  <ul className="list-none space-y-2 mb-4">
                    <li><strong>Email:</strong> contact@careeaseusa.com</li>
                    <li><strong>Phone:</strong> (347) 471-1520</li>
                    <li><strong>Mail:</strong> 1510 Castle Hill Ave #1073, Bronx, NY 10462, USA</li>
                  </ul>

                  <p className="leading-relaxed">
                    We will respond to your request within 30 days, or as required by applicable law.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
                  <p className="leading-relaxed mb-4">
                    We retain your personal information for as long as necessary to provide our Services, comply with legal obligations, resolve disputes, and enforce our agreements. Specific retention periods vary based on:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>The nature of the information</li>
                    <li>Legal and regulatory requirements (including HIPAA record retention requirements)</li>
                    <li>Business and operational needs</li>
                  </ul>
                  <p className="leading-relaxed">
                    When information is no longer needed, we securely delete or anonymize it in accordance with our data retention policies.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking Technologies</h2>
                  <p className="leading-relaxed mb-4">
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.
                  </p>

                  <p className="leading-relaxed mb-4"><strong>Types of cookies we use:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Essential cookies:</strong> Necessary for website functionality</li>
                    <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
                    <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
                  </ul>

                  <p className="leading-relaxed mb-4">
                    You can control cookie preferences through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.
                  </p>

                  <p className="leading-relaxed">
                    For more detailed information, please review our <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a>.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links</h2>
                  <p className="leading-relaxed">
                    Our website may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
                  <p className="leading-relaxed mb-4">
                    Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete that information promptly.
                  </p>
                  <p className="leading-relaxed">
                    If you believe we have collected information from a child, please contact us immediately.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">11. State-Specific Privacy Rights</h2>

                  <h3 className="text-xl font-semibold mb-3">11.1 California Residents (CCPA/CPRA)</h3>
                  <p className="leading-relaxed mb-4">
                    If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Right to know what personal information we collect, use, and share</li>
                    <li>Right to delete personal information (with certain exceptions)</li>
                    <li>Right to opt out of the sale of personal information (we do not sell personal information)</li>
                    <li>Right to non-discrimination for exercising your privacy rights</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    To submit a request, contact us at contact@careeaseusa.com or call (347) 471-1520.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">11.2 Other State Privacy Laws</h3>
                  <p className="leading-relaxed">
                    Residents of other states with specific privacy laws (such as Virginia, Colorado, or Connecticut) may have similar rights. Please contact us to exercise your rights under applicable state law.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">12. International Data Transfers</h2>
                  <p className="leading-relaxed">
                    Our Services are based in the United States. If you access our Services from outside the United States, your information will be transferred to, stored, and processed in the United States, where privacy laws may differ from those in your jurisdiction.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
                  <p className="leading-relaxed mb-4">
                    We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Posting the updated Privacy Policy on our website with a new "Last Updated" date</li>
                    <li>Sending an email notification to the address associated with your account (for significant changes)</li>
                  </ul>
                  <p className="leading-relaxed">
                    Your continued use of our Services after changes become effective constitutes acceptance of the updated Privacy Policy. We encourage you to review this Privacy Policy periodically.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
                  <p className="leading-relaxed mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <p className="leading-relaxed mb-4"><strong>CareEase USA LLC</strong></p>
                  <ul className="list-none space-y-2 mb-4">
                    <li><strong>Email:</strong> contact@careeaseusa.com</li>
                    <li><strong>Phone:</strong> (347) 471-1520</li>
                    <li><strong>Mailing Address:</strong> 1510 Castle Hill Ave #1073, Bronx, NY 10462, USA</li>
                  </ul>
                  <p className="leading-relaxed">
                    <strong>Privacy Officer:</strong> For privacy-specific inquiries, you may direct your communication to our Privacy Officer at the contact information above.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <p className="leading-relaxed italic">
                  <strong>By using our Services, you acknowledge that you have read and understood this Privacy Policy.</strong>
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

export default PrivacyPolicy;
