import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Legal Disclaimer</h1>
          <Card>
            <CardContent className="pt-6 space-y-6 prose prose-slate max-w-none">
              <div className="text-muted-foreground">
                <p className="text-sm mb-6">
                  <strong>Last Updated:</strong> October 31, 2025
                </p>
                
                <div className="border-t border-border my-8" />
                
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">Important Notice</h2>
                  <p className="leading-relaxed">
                    <strong>Please read this Disclaimer carefully before using the CareEase USA LLC website or services.</strong>
                  </p>
                  <p className="leading-relaxed">
                    This Legal Disclaimer ("Disclaimer") applies to the CareEase USA LLC website <a href="https://www.careeaseusa.com" className="text-primary hover:underline">www.careeaseusa.com</a> and all services provided by CareEase USA LLC ("CareEase," "we," "us," or "our"). By accessing our website or using our services, you acknowledge that you have read, understood, and agree to be bound by this Disclaimer.
                  </p>
                  <p className="leading-relaxed">
                    This Disclaimer should be read in conjunction with our <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">1. General Website Disclaimer</h2>

                  <h3 className="text-xl font-semibold mb-3">1.1 "As Is" Basis</h3>
                  <p className="leading-relaxed mb-4">
                    The information, content, and services provided on this website are offered on an <strong>"as is" and "as available" basis</strong> without any warranties or representations of any kind, either express or implied.
                  </p>
                  <p className="leading-relaxed mb-4">
                    To the fullest extent permitted by applicable law, CareEase USA disclaims all warranties, express or implied, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Implied warranties of merchantability:</strong> Fitness for a particular purpose</li>
                    <li><strong>Non-infringement:</strong> That the website or services will be error-free or uninterrupted</li>
                    <li><strong>Accuracy or completeness:</strong> Of information provided on the website</li>
                    <li><strong>Currentness:</strong> That information is up-to-date or reflects the most recent developments</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">1.2 No Guarantee of Service Availability</h3>
                  <p className="leading-relaxed mb-4">While we strive to maintain continuous service, we do not guarantee that:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Our website will be available at all times or without interruption</li>
                    <li>The website will be free from viruses, malware, or other harmful components</li>
                    <li>Defects or errors will be corrected promptly</li>
                    <li>The website or server is free from bugs or technical issues</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">1.3 Use at Your Own Risk</h3>
                  <p className="leading-relaxed">
                    Your use of our website and services is entirely at your own risk. You are responsible for implementing sufficient procedures and safeguards to protect your device and data.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">2. Medical and Health Care Disclaimer</h2>

                  <h3 className="text-xl font-semibold mb-3">2.1 Not a Substitute for Medical Care</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>CRITICAL NOTICE: Our home health aide services are NOT a substitute for professional medical care, diagnosis, or treatment.</strong>
                  </p>
                  <p className="leading-relaxed mb-4">
                    CareEase USA provides <strong>non-medical home care services</strong> including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Personal care assistance</li>
                    <li>Activities of daily living (ADL) support</li>
                    <li>Companionship</li>
                    <li>Light housekeeping</li>
                    <li>Medication reminders (not administration)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">2.2 Limitations of Our Caregivers</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>Our caregivers are NOT licensed medical professionals</strong> and are NOT authorized to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Diagnose medical conditions or diseases</li>
                    <li>Prescribe medications or treatments</li>
                    <li>Administer medications (unless specifically licensed and authorized)</li>
                    <li>Perform medical procedures or treatments</li>
                    <li>Provide skilled nursing care</li>
                    <li>Interpret medical test results</li>
                    <li>Make medical decisions on your behalf</li>
                    <li>Provide physical therapy, occupational therapy, or speech therapy</li>
                    <li>Perform wound care beyond basic first aid</li>
                    <li>Operate medical equipment requiring specialized training</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">2.3 Medical Emergencies</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>FOR MEDICAL EMERGENCIES, CALL 911 IMMEDIATELY.</strong>
                  </p>
                  <p className="leading-relaxed mb-4">
                    Do not rely on our caregivers or website for emergency medical situations. Examples of medical emergencies include:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Chest pain or difficulty breathing</li>
                    <li>Severe bleeding or trauma</li>
                    <li>Loss of consciousness</li>
                    <li>Stroke symptoms (face drooping, arm weakness, speech difficulty)</li>
                    <li>Severe allergic reactions</li>
                    <li>Suspected poisoning or overdose</li>
                    <li>Any life-threatening situation</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">2.4 Seek Professional Medical Advice</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>Always consult with a qualified healthcare provider</strong> for:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Medical diagnosis and treatment</li>
                    <li>Questions about medical conditions or symptoms</li>
                    <li>Medication management and prescriptions</li>
                    <li>Changes in health status</li>
                    <li>Development of care plans</li>
                    <li>Medical equipment or procedures</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    Nothing on our website or communicated by our caregivers should be construed as medical advice. Never disregard professional medical advice or delay seeking it because of information you received from CareEase USA or our website.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">2.5 No Doctor-Patient Relationship</h3>
                  <p className="leading-relaxed mb-4">
                    No doctor-patient, nurse-patient, or other healthcare provider-patient relationship is created through:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Use of our website</li>
                    <li>Communication with our caregivers</li>
                    <li>Use of our home health aide services</li>
                    <li>Any information provided by CareEase USA</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">2.6 Medication Reminders</h3>
                  <p className="leading-relaxed mb-4">When our caregivers provide medication reminders:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>They are reminding you to take medications as prescribed by your doctor</li>
                    <li>They are NOT administering, managing, or making decisions about medications</li>
                    <li>You or your authorized representative remain responsible for medication decisions</li>
                    <li>You should consult your physician about any medication questions or concerns</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">2.7 Health Information on Website</h3>
                  <p className="leading-relaxed mb-4">Any health-related information on our website is:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>For general informational purposes only</li>
                    <li>Not intended as medical advice or diagnosis</li>
                    <li>Not a substitute for professional medical consultation</li>
                    <li>Not comprehensive or complete</li>
                    <li>May not reflect the most current research or medical developments</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">3. Limitation of Liability</h2>

                  <h3 className="text-xl font-semibold mb-3">3.1 Scope of Limitation</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>TO THE FULLEST EXTENT PERMITTED BY LAW, CAREEASE USA SHALL NOT BE LIABLE FOR:</strong>
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Indirect Damages:</strong> Loss of profits, revenue, or business opportunities; Loss of data or information; Loss of goodwill or reputation; Cost of substitute services or products</li>
                    <li><strong>Incidental Damages:</strong> Consequential or secondary damages arising from use of services; Damages resulting from third-party actions or failures</li>
                    <li><strong>Special Damages:</strong> Damages unique to your particular circumstances</li>
                    <li><strong>Consequential Damages:</strong> Future damages or losses resulting from use of our services</li>
                    <li><strong>Punitive Damages:</strong> Damages intended to punish or deter</li>
                  </ul>
                  <p className="leading-relaxed mb-4">This limitation applies regardless of:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>The legal theory (contract, tort, negligence, strict liability, or otherwise)</li>
                    <li>Whether we were advised of the possibility of such damages</li>
                    <li>Whether such damages were foreseeable</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">3.2 Maximum Liability</h3>
                  <p className="leading-relaxed mb-4">
                    To the extent permitted by law, our maximum aggregate liability for any claims arising from your use of our services shall not exceed the amount you actually paid to CareEase USA for services in the 90 days immediately preceding the event giving rise to liability.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">3.3 Exceptions</h3>
                  <p className="leading-relaxed mb-4">Nothing in this Disclaimer limits our liability for:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Death or personal injury caused by our gross negligence or willful misconduct</li>
                    <li>Fraud or fraudulent misrepresentation</li>
                    <li>Any liability that cannot be excluded or limited under applicable law</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">3.4 State-Specific Limitations</h3>
                  <p className="leading-relaxed">
                    Some states do not allow the exclusion or limitation of incidental or consequential damages. In such jurisdictions, our liability is limited to the maximum extent permitted by law.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">4. External Links and Third-Party Content</h2>

                  <h3 className="text-xl font-semibold mb-3">4.1 Third-Party Websites</h3>
                  <p className="leading-relaxed mb-4">
                    Our website may contain links to third-party websites, resources, or services that are not owned, controlled, or maintained by CareEase USA.
                  </p>
                  <p className="leading-relaxed mb-4"><strong>We are NOT responsible for:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>The content, accuracy, or opinions expressed on third-party websites</li>
                    <li>Privacy practices or policies of external sites</li>
                    <li>Products or services offered by third parties</li>
                    <li>Any damages or losses arising from your use of third-party websites</li>
                    <li>The availability or functionality of linked websites</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">4.2 No Endorsement</h3>
                  <p className="leading-relaxed mb-4">The inclusion of any link does not imply:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Endorsement of the linked website or its content</li>
                    <li>Affiliation with the third-party website owner</li>
                    <li>Verification or approval of third-party information</li>
                    <li>Responsibility for third-party products or services</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">4.3 Use Third-Party Sites at Your Own Risk</h3>
                  <p className="leading-relaxed mb-4">
                    You access and use third-party websites entirely at your own risk. We strongly recommend:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Reviewing the privacy policies and terms of service of any third-party website</li>
                    <li>Exercising caution when providing personal information to third parties</li>
                    <li>Using appropriate security measures when accessing external links</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">4.4 Broken or Outdated Links</h3>
                  <p className="leading-relaxed">
                    We make reasonable efforts to maintain accurate links, but we cannot guarantee that all links will remain functional or current. Please notify us of any broken links at contact@careeaseusa.com.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">5. Information Accuracy and Completeness</h2>

                  <h3 className="text-xl font-semibold mb-3">5.1 Reasonable Efforts</h3>
                  <p className="leading-relaxed mb-4">
                    While we strive to provide accurate, current, and complete information on our website, we make <strong>no warranties, representations, or guarantees</strong> regarding:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Accuracy:</strong> Information may contain errors, inaccuracies, or omissions</li>
                    <li><strong>Completeness:</strong> Information may not be comprehensive or cover all aspects</li>
                    <li><strong>Currentness:</strong> Information may be outdated or not reflect recent changes</li>
                    <li><strong>Reliability:</strong> Information may change without notice</li>
                    <li><strong>Applicability:</strong> Information may not apply to your specific situation</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">5.2 Information Changes</h3>
                  <p className="leading-relaxed mb-4">Information on our website may be:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Updated, modified, or removed without notice</li>
                    <li>Subject to change based on new regulations, laws, or industry standards</li>
                    <li>Affected by circumstances beyond our control</li>
                    <li>Dependent on information provided by third parties</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">5.3 Typographical Errors</h3>
                  <p className="leading-relaxed mb-4">Our website may contain typographical errors, technical inaccuracies, or other mistakes. We reserve the right to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Correct errors, inaccuracies, or omissions at any time</li>
                    <li>Change or update information without prior notice</li>
                    <li>Make improvements to the website at any time</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">5.4 No Reliance</h3>
                  <p className="leading-relaxed mb-4">You should not rely solely on information from our website for important decisions. We recommend:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Verifying information independently</li>
                    <li>Consulting with qualified professionals (lawyers, accountants, healthcare providers)</li>
                    <li>Reviewing official sources and documentation</li>
                    <li>Contacting us directly for clarification or confirmation</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">6. Service-Specific Disclaimers</h2>

                  <h3 className="text-xl font-semibold mb-3">6.1 Caregiver Availability</h3>
                  <p className="leading-relaxed mb-4">We do not guarantee:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Availability of specific caregivers for scheduled services</li>
                    <li>Continuous availability of services without interruption</li>
                    <li>That caregivers will arrive at the exact scheduled time</li>
                    <li>That all service requests can be accommodated</li>
                  </ul>
                  <p className="leading-relaxed mb-4">Caregiver availability is subject to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Staff scheduling and availability</li>
                    <li>Emergency situations and unforeseen circumstances</li>
                    <li>Client needs and priorities</li>
                    <li>Geographic service areas</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">6.2 Service Outcomes</h3>
                  <p className="leading-relaxed mb-4">We cannot guarantee specific outcomes or results from our services, including:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Health improvements or maintenance</li>
                    <li>Prevention of accidents, falls, or injuries</li>
                    <li>Satisfaction with services provided</li>
                    <li>Resolution of specific care challenges</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    Outcomes depend on numerous factors beyond our control, including client health status, cooperation, home environment, and compliance with care plans.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.3 Background Checks</h3>
                  <p className="leading-relaxed mb-4">While we conduct background checks on our caregivers, we cannot guarantee:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>The completeness or accuracy of background check information</li>
                    <li>The absence of any undiscovered issues or concerns</li>
                    <li>Future behavior or actions of caregivers</li>
                    <li>Detection of all potential problems</li>
                  </ul>
                  <p className="leading-relaxed">
                    Background checks are limited to available records and may not reveal all relevant information.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">7. User-Generated Content Disclaimer</h2>

                  <h3 className="text-xl font-semibold mb-3">7.1 Testimonials and Reviews</h3>
                  <p className="leading-relaxed mb-4">Testimonials, reviews, or user comments on our website:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Represent the opinions of individual users, not CareEase USA</li>
                    <li>May not reflect typical results or experiences</li>
                    <li>Are not verified or endorsed by us (unless explicitly stated)</li>
                    <li>Should not be considered as guarantees of specific outcomes</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">7.2 User Responsibility</h3>
                  <p className="leading-relaxed mb-4">Users who submit content are solely responsible for:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>The accuracy and legality of their submissions</li>
                    <li>Compliance with applicable laws and regulations</li>
                    <li>Not violating third-party rights (copyright, privacy, etc.)</li>
                    <li>The consequences of their submissions</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">7.3 Right to Remove Content</h3>
                  <p className="leading-relaxed mb-4">We reserve the right to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Remove any user-generated content at our discretion</li>
                    <li>Refuse to post or publish user submissions</li>
                    <li>Edit or modify content for clarity or compliance</li>
                    <li>Monitor and review user-generated content</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">8. Geographic Limitations</h2>

                  <h3 className="text-xl font-semibold mb-3">8.1 U.S. Services Only</h3>
                  <p className="leading-relaxed mb-4">
                    Our services are provided exclusively in the United States. Information on our website is directed to U.S. residents and is:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Compliant with U.S. federal and state laws</li>
                    <li>Subject to U.S. regulations and standards</li>
                    <li>May not be applicable or legal in other jurisdictions</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">8.2 State-Specific Variations</h3>
                  <p className="leading-relaxed mb-4">Home health care regulations vary by state. Information on our website may not reflect:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Specific state licensing requirements</li>
                    <li>State-specific regulations or restrictions</li>
                    <li>Local ordinances or requirements</li>
                    <li>Regional variations in standards of care</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">8.3 Service Availability</h3>
                  <p className="leading-relaxed mb-4">We may not provide services in all states or regions. Service availability is determined by:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>State licensing and certification requirements</li>
                    <li>Geographic coverage areas</li>
                    <li>Staffing availability</li>
                    <li>Business operations decisions</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">9. Professional Advice Disclaimer</h2>

                  <h3 className="text-xl font-semibold mb-3">9.1 Not Legal, Financial, or Tax Advice</h3>
                  <p className="leading-relaxed mb-4">Information on our website is NOT:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Legal advice about contracts, regulations, or rights</li>
                    <li>Financial advice about insurance, payments, or benefits</li>
                    <li>Tax advice about deductions or tax treatment</li>
                    <li>Professional advice of any kind requiring licensure</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">9.2 Consult Qualified Professionals</h3>
                  <p className="leading-relaxed mb-4">You should consult with licensed professionals for:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Legal matters:</strong> Attorneys licensed in your jurisdiction</li>
                    <li><strong>Financial matters:</strong> Financial advisors or accountants</li>
                    <li><strong>Tax matters:</strong> Certified public accountants or tax professionals</li>
                    <li><strong>Medical matters:</strong> Physicians or licensed healthcare providers</li>
                    <li><strong>Insurance matters:</strong> Insurance agents or brokers</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">9.3 No Professional Relationship</h3>
                  <p className="leading-relaxed">No attorney-client, accountant-client, or other professional relationship is created through:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Use of our website</li>
                    <li>Communication with CareEase USA</li>
                    <li>Receipt of information from our website or staff</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">10. Technical Disclaimer</h2>

                  <h3 className="text-xl font-semibold mb-3">10.1 Security</h3>
                  <p className="leading-relaxed mb-4">While we implement reasonable security measures, we cannot guarantee:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Absolute security of data transmitted through our website</li>
                    <li>Prevention of unauthorized access or hacking</li>
                    <li>Protection against all viruses, malware, or harmful code</li>
                    <li>Security of communications over the internet</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">10.2 Compatibility</h3>
                  <p className="leading-relaxed mb-4">We do not warrant that our website will:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Function properly on all devices or browsers</li>
                    <li>Be compatible with your specific hardware or software</li>
                    <li>Display correctly on all screen sizes or resolutions</li>
                    <li>Work with all internet connections or speeds</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">10.3 Data Loss</h3>
                  <p className="leading-relaxed">We are not responsible for:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Loss of data due to technical failures</li>
                    <li>Corruption of transmitted information</li>
                    <li>Interruption of service due to technical issues</li>
                    <li>Consequences of your failure to back up data</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">11. Changes to Services and Website</h2>
                  <p className="leading-relaxed mb-4">We reserve the right to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Modify, suspend, or discontinue services at any time without notice</li>
                    <li>Change website content, features, or functionality</li>
                    <li>Update policies, terms, and disclaimers</li>
                    <li>Alter pricing, service offerings, or geographic coverage</li>
                  </ul>
                  <p className="leading-relaxed">
                    Continued use of our website or services after changes constitutes acceptance of those changes.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">12. Compliance with Laws</h2>

                  <h3 className="text-xl font-semibold mb-3">12.1 Your Responsibility</h3>
                  <p className="leading-relaxed mb-4">You are responsible for:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Complying with all applicable laws and regulations</li>
                    <li>Obtaining necessary licenses, permits, or approvals</li>
                    <li>Understanding your legal obligations as a client</li>
                    <li>Reporting issues as required by law</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">12.2 Regulatory Changes</h3>
                  <p className="leading-relaxed mb-4">
                    Laws and regulations governing home health care may change. We make reasonable efforts to comply but cannot guarantee:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Immediate compliance with newly enacted laws</li>
                    <li>Awareness of all regulatory changes</li>
                    <li>Application of laws to your specific situation</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">13. Force Majeure</h2>
                  <p className="leading-relaxed mb-4">
                    CareEase USA is not liable for failure to perform obligations due to circumstances beyond our reasonable control, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Natural disasters (hurricanes, earthquakes, floods, fires)</li>
                    <li>Pandemics or public health emergencies</li>
                    <li>War, terrorism, or civil unrest</li>
                    <li>Government orders or restrictions</li>
                    <li>Utility failures or infrastructure disruptions</li>
                    <li>Labor disputes or strikes</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">14. Severability</h2>
                  <p className="leading-relaxed">
                    If any provision of this Disclaimer is found to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">15. Governing Law</h2>
                  <p className="leading-relaxed">
                    This Disclaimer is governed by the laws of the State of New York, without regard to its conflict of law provisions. Any disputes arising from this Disclaimer shall be resolved in accordance with our <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">16. Questions and Concerns</h2>
                  <p className="leading-relaxed mb-4">
                    If you have any questions about this Disclaimer or need clarification on any matter, please contact us:
                  </p>
                  <p className="leading-relaxed mb-4"><strong>CareEase USA LLC</strong></p>
                  <ul className="list-none space-y-2 mb-4">
                    <li><strong>Email:</strong> contact@careeaseusa.com</li>
                    <li><strong>Phone:</strong> (347) 471-1520</li>
                    <li><strong>Mailing Address:</strong> 1510 Castle Hill Ave #1073, Bronx, NY 10462, USA</li>
                    <li><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST</li>
                  </ul>
                  <p className="leading-relaxed">
                    For urgent matters, please call during business hours. For emergencies, call 911.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">17. Acceptance of Disclaimer</h2>
                  <p className="leading-relaxed mb-4">
                    <strong>BY USING OUR WEBSITE OR SERVICES, YOU ACKNOWLEDGE THAT:</strong>
                  </p>
                  <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li>You have read and understood this entire Disclaimer</li>
                    <li>You agree to all terms and conditions stated herein</li>
                    <li>You understand the limitations and exclusions described</li>
                    <li>You accept the risks associated with using our website and services</li>
                    <li>You will not hold CareEase USA liable beyond the scope permitted by law</li>
                  </ol>
                  <p className="leading-relaxed">
                    <strong>If you do not agree with any part of this Disclaimer, you must immediately discontinue use of our website and services.</strong>
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <p className="text-sm text-muted-foreground mb-6">
                  <strong>Last Updated:</strong> October 31, 2025
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  <strong>This Disclaimer is subject to change without notice. Please review it periodically for updates.</strong>
                </p>

                <div className="border-t border-border my-8" />

                <p className="leading-relaxed italic">
                  <strong>Thank you for taking the time to read and understand our Legal Disclaimer. Your safety and well-being are our top priorities, and we are committed to providing transparent information about our services and limitations.</strong>
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

export default Disclaimer;
