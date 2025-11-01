import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
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
                    This Cookie Policy explains how CareEase USA LLC ("CareEase," "we," "us," or "our") uses cookies and similar tracking technologies on our website <a href="https://www.careeaseusa.com" className="text-primary hover:underline">www.careeaseusa.com</a> (the "Website").
                  </p>
                  <p className="leading-relaxed">
                    This Cookie Policy should be read in conjunction with our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and <a href="/terms" className="text-primary hover:underline">Terms of Service</a>, which provide additional information about how we collect, use, and protect your personal information.
                  </p>
                  <p className="leading-relaxed">
                    <strong>By continuing to use our Website, you consent to our use of cookies as described in this Cookie Policy.</strong> You can manage your cookie preferences at any time through your browser settings or our cookie consent tool.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
                  <p className="leading-relaxed mb-4">
                    Cookies are small text files that are stored on your device (computer, tablet, smartphone, or other electronic device) when you visit a website. Cookies contain information that is transferred to your device's hard drive and allow the website to recognize your device and store certain information about your preferences or actions.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">Types of Storage Technologies</h3>
                  <p className="leading-relaxed mb-4">
                    In addition to cookies, we may use similar technologies including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Local Storage:</strong> Data stored in your browser that persists across sessions</li>
                    <li><strong>Session Storage:</strong> Temporary data that is deleted when you close your browser</li>
                    <li><strong>Web Beacons (Pixels):</strong> Small graphic images embedded in web pages or emails</li>
                    <li><strong>Scripts:</strong> Code that runs in your browser to enable functionality</li>
                  </ul>
                  <p className="leading-relaxed">
                    For simplicity, we refer to all of these technologies collectively as "cookies" in this policy.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">3. Why We Use Cookies</h2>
                  <p className="leading-relaxed mb-4">We use cookies for several important purposes:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Essential Functionality:</strong> Enable core website features and security</li>
                    <li><strong>Performance and Analytics:</strong> Understand how visitors use our site and identify areas for improvement</li>
                    <li><strong>Personalization:</strong> Remember your preferences and provide customized experiences</li>
                    <li><strong>Security:</strong> Protect against fraud and maintain secure sessions</li>
                    <li><strong>Advertising:</strong> Deliver relevant marketing content (with your consent)</li>
                  </ul>
                  <p className="leading-relaxed">
                    Cookies help us provide you with a better, more efficient, and more personalized experience when you visit our Website.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">4. Types of Cookies We Use</h2>

                  <h3 className="text-xl font-semibold mb-3">4.1 Essential Cookies (Strictly Necessary)</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>Purpose:</strong> These cookies are absolutely necessary for the Website to function properly. They enable core functionality such as security, network management, authentication, and accessibility.
                  </p>
                  <p className="leading-relaxed mb-4"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Session cookies that maintain your login status</li>
                    <li>Security cookies that authenticate users and prevent fraud</li>
                    <li>Load balancing cookies that distribute traffic across servers</li>
                    <li>Cookie consent cookies that remember your cookie preferences</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    <strong>Legal Basis:</strong> These cookies are necessary for the performance of our contract with you or to comply with legal obligations.
                  </p>
                  <p className="leading-relaxed mb-4">
                    <strong>Can be disabled?</strong> No. Disabling these cookies will prevent you from using essential features of our Website.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Retention:</strong> Most essential cookies are session cookies and are deleted when you close your browser. Some may persist for up to 24 hours.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">4.2 Performance and Analytics Cookies</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>Purpose:</strong> These cookies collect information about how visitors use our Website, such as which pages are visited most often, how long visitors stay on the site, and any error messages received.
                  </p>
                  <p className="leading-relaxed mb-4"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Google Analytics cookies (_ga, _gid, _gat)</li>
                    <li>Visitor tracking cookies</li>
                    <li>Heat mapping and session recording tools</li>
                  </ul>
                  <p className="leading-relaxed mb-4"><strong>Information Collected:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Pages visited and time spent on each page</li>
                    <li>Links clicked and navigation patterns</li>
                    <li>Browser type, device type, and operating system</li>
                    <li>Referring website or source</li>
                    <li>Geographic location (country/city level)</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    <strong>Legal Basis:</strong> Your consent (where required by law) or our legitimate interest in improving our Website.
                  </p>
                  <p className="leading-relaxed mb-4">
                    <strong>Can be disabled?</strong> Yes. You can opt out through our cookie consent tool or browser settings.
                  </p>
                  <p className="leading-relaxed mb-4">
                    <strong>Retention:</strong> Typically 2 years, but may vary by specific cookie.
                  </p>
                  <p className="leading-relaxed mb-4"><strong>Third Parties:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Google Analytics (<a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">4.3 Functional Cookies</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>Purpose:</strong> These cookies allow our Website to remember choices you make (such as your language preference, region, or accessibility needs) and provide enhanced, more personalized features.
                  </p>
                  <p className="leading-relaxed mb-4"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Language preference cookies</li>
                    <li>Font size or accessibility settings</li>
                    <li>Region or location settings</li>
                    <li>Previously completed forms or questionnaires</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    <strong>Legal Basis:</strong> Your consent or our legitimate interest in providing personalized services.
                  </p>
                  <p className="leading-relaxed mb-4">
                    <strong>Can be disabled?</strong> Yes, but disabling these cookies may limit certain personalized features.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Retention:</strong> Typically 1 year or until you clear your cookies.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">4.4 Advertising and Marketing Cookies</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>Purpose:</strong> These cookies are used to deliver advertisements that are more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
                  </p>
                  <p className="leading-relaxed mb-4"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Retargeting cookies that show ads based on your website visits</li>
                    <li>Social media advertising cookies (Facebook Pixel, LinkedIn Insight Tag)</li>
                    <li>Ad network cookies</li>
                  </ul>
                  <p className="leading-relaxed mb-4"><strong>Information Collected:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Pages visited and content viewed</li>
                    <li>Products or services viewed</li>
                    <li>Interactions with advertisements</li>
                    <li>Cross-site browsing behavior (for retargeting)</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    <strong>Legal Basis:</strong> Your explicit consent.
                  </p>
                  <p className="leading-relaxed mb-4">
                    <strong>Can be disabled?</strong> Yes. You can opt out through our cookie consent tool, browser settings, or opt-out tools provided by advertising networks.
                  </p>
                  <p className="leading-relaxed mb-4">
                    <strong>Retention:</strong> Typically up to 2 years, varying by provider.
                  </p>
                  <p className="leading-relaxed mb-4"><strong>Third Parties:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Google Ads (<a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
                    <li>Facebook/Meta (<a href="https://www.facebook.com/privacy/policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">4.5 Social Media Cookies</h3>
                  <p className="leading-relaxed mb-4">
                    <strong>Purpose:</strong> These cookies enable you to share content from our Website on social media platforms and allow social media platforms to track your browsing behavior across websites.
                  </p>
                  <p className="leading-relaxed mb-4"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Facebook "Like" or "Share" buttons</li>
                    <li>Twitter/X share functionality</li>
                    <li>LinkedIn share features</li>
                    <li>Instagram embedding</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    <strong>Legal Basis:</strong> Your consent.
                  </p>
                  <p className="leading-relaxed mb-4">
                    <strong>Can be disabled?</strong> Yes, through our cookie consent tool or by not interacting with social media features.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Retention:</strong> Varies by platform, typically up to 2 years.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">5. First-Party vs. Third-Party Cookies</h2>

                  <h3 className="text-xl font-semibold mb-3">5.1 First-Party Cookies</h3>
                  <p className="leading-relaxed mb-4">
                    First-party cookies are set directly by our Website. We control these cookies and the data they collect.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">5.2 Third-Party Cookies</h3>
                  <p className="leading-relaxed mb-4">
                    Third-party cookies are set by external services we use on our Website. These third parties have their own privacy policies and cookie practices.
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-border text-sm">
                      <thead>
                        <tr className="bg-secondary">
                          <th className="border border-border p-2 text-left">Service</th>
                          <th className="border border-border p-2 text-left">Purpose</th>
                          <th className="border border-border p-2 text-left">Privacy Policy Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-2">Google Analytics</td>
                          <td className="border border-border p-2">Website analytics</td>
                          <td className="border border-border p-2">
                            <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Link</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Google Ads</td>
                          <td className="border border-border p-2">Advertising</td>
                          <td className="border border-border p-2">
                            <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Link</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Facebook Pixel</td>
                          <td className="border border-border p-2">Advertising & Analytics</td>
                          <td className="border border-border p-2">
                            <a href="https://www.facebook.com/privacy/policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Link</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="leading-relaxed mt-4">
                    We encourage you to review the privacy policies of these third parties to understand their data practices.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">6. Cookie Duration</h2>
                  <p className="leading-relaxed mb-4">Cookies may be either:</p>

                  <h3 className="text-xl font-semibold mb-3">6.1 Session Cookies</h3>
                  <p className="leading-relaxed mb-4">
                    Temporary cookies that are deleted automatically when you close your browser. These are essential for website functionality.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">6.2 Persistent Cookies</h3>
                  <p className="leading-relaxed mb-4">
                    Cookies that remain on your device for a set period (from days to years) or until you manually delete them. These help us remember your preferences across visits.
                  </p>

                  <p className="leading-relaxed mb-4"><strong>Our typical cookie retention periods:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Essential cookies: Session or up to 24 hours</li>
                    <li>Functional cookies: Up to 1 year</li>
                    <li>Analytics cookies: Up to 2 years</li>
                    <li>Advertising cookies: Up to 2 years</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">7. How to Manage and Control Cookies</h2>
                  <p className="leading-relaxed mb-4">You have several options to manage or disable cookies:</p>

                  <h3 className="text-xl font-semibold mb-3">7.1 Cookie Consent Tool</h3>
                  <p className="leading-relaxed mb-4">
                    When you first visit our Website, you'll see a cookie consent banner that allows you to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Accept all cookies</li>
                    <li>Reject non-essential cookies</li>
                    <li>Customize your cookie preferences by category</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    You can change your cookie preferences at any time by clicking the "Cookie Settings" link in our website footer.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">7.2 Browser Settings</h3>
                  <p className="leading-relaxed mb-4">
                    Most web browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
                  </p>
                  
                  <p className="leading-relaxed"><strong>Google Chrome:</strong></p>
                  <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li>Go to Settings &gt; Privacy and security &gt; Cookies and other site data</li>
                    <li>Choose your preferred cookie settings</li>
                  </ol>

                  <p className="leading-relaxed"><strong>Mozilla Firefox:</strong></p>
                  <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li>Go to Settings &gt; Privacy & Security</li>
                    <li>Under "Cookies and Site Data," adjust your preferences</li>
                  </ol>

                  <p className="leading-relaxed"><strong>Safari:</strong></p>
                  <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li>Go to Preferences &gt; Privacy</li>
                    <li>Manage cookie preferences</li>
                  </ol>

                  <p className="leading-relaxed"><strong>Microsoft Edge:</strong></p>
                  <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li>Go to Settings &gt; Cookies and site permissions</li>
                    <li>Manage cookie settings</li>
                  </ol>

                  <p className="leading-relaxed mb-4"><strong>Mobile Browsers:</strong></p>
                  <p className="leading-relaxed mb-4">
                    Check your device's settings menu for privacy or cookie management options.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">7.3 Browser Plugins</h3>
                  <p className="leading-relaxed mb-4">
                    You can use browser extensions to manage cookies, such as:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Ghostery</li>
                    <li>Privacy Badger</li>
                    <li>uBlock Origin</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">7.4 Opt-Out Tools</h3>
                  <p className="leading-relaxed mb-4">For analytics and advertising cookies, you can use opt-out tools:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Google Analytics Opt-Out:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Download browser add-on</a></li>
                    <li><strong>Network Advertising Initiative (NAI):</strong> <a href="https://optout.networkadvertising.org/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Opt-out tool</a></li>
                    <li><strong>Digital Advertising Alliance (DAA):</strong> <a href="https://optout.aboutads.info/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Opt-out tool</a></li>
                    <li><strong>Your Online Choices (EU):</strong> <a href="https://www.youronlinechoices.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Opt-out tool</a></li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">7.5 "Do Not Track" Signals</h3>
                  <p className="leading-relaxed mb-4">
                    Some browsers offer a "Do Not Track" (DNT) signal. However, there is currently no industry standard for how websites should respond to DNT signals. Our Website does not respond to DNT signals at this time.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">7.6 Mobile Advertising IDs</h3>
                  <p className="leading-relaxed mb-4">On mobile devices, you can limit ad tracking:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>iOS:</strong> Settings &gt; Privacy &gt; Tracking &gt; Allow Apps to Request to Track (toggle off)</li>
                    <li><strong>Android:</strong> Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">8. Consequences of Disabling Cookies</h2>
                  <p className="leading-relaxed mb-4">
                    While you can block or delete cookies, please be aware that doing so may impact your experience on our Website:
                  </p>

                  <p className="leading-relaxed mb-4"><strong>If you disable essential cookies:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>You may not be able to log in or use secure features</li>
                    <li>The Website may not function properly</li>
                    <li>Security features may be compromised</li>
                  </ul>

                  <p className="leading-relaxed mb-4"><strong>If you disable functional cookies:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Your preferences will not be saved between visits</li>
                    <li>You may need to re-enter information</li>
                    <li>Personalization features will not work</li>
                  </ul>

                  <p className="leading-relaxed mb-4"><strong>If you disable analytics cookies:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>We won't be able to improve our Website based on usage patterns</li>
                    <li>Your visits will not be tracked (which you may prefer)</li>
                  </ul>

                  <p className="leading-relaxed mb-4"><strong>If you disable advertising cookies:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>You will still see ads, but they will be less relevant to your interests</li>
                    <li>You may see the same ads repeatedly</li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">9. Cookies and Personal Data</h2>

                  <h3 className="text-xl font-semibold mb-3">9.1 What Information Cookies Collect</h3>
                  <p className="leading-relaxed mb-4">Cookies may collect various types of information, including:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>IP address (often anonymized)</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and actions taken</li>
                    <li>Time and date of visits</li>
                    <li>Referring website</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">9.2 How Cookie Data Relates to Privacy</h3>
                  <p className="leading-relaxed mb-4">
                    Information collected through cookies may be considered personal data under privacy laws such as GDPR (for EU visitors) or CCPA (for California residents).
                  </p>
                  <p className="leading-relaxed mb-4">
                    For detailed information about how we handle personal data, please review our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">9.3 International Data Transfers</h3>
                  <p className="leading-relaxed">
                    Some of our third-party cookie providers may transfer data to countries outside your residence, including the United States. These transfers are subject to appropriate safeguards as described in our Privacy Policy.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
                  <p className="leading-relaxed mb-4">
                    Our Website and Services are not directed to children under the age of 18. We do not knowingly use cookies to collect information from children. If you believe we have inadvertently collected information from a child, please contact us immediately at contact@careeaseusa.com.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">11. Updates to This Cookie Policy</h2>
                  <p className="leading-relaxed mb-4">
                    We may update this Cookie Policy from time to time to reflect changes in:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Cookie technologies we use</li>
                    <li>Legal or regulatory requirements</li>
                    <li>Our business practices</li>
                  </ul>
                  <p className="leading-relaxed mb-4">When we make material changes, we will:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Update the "Last Updated" date at the top of this policy</li>
                    <li>Notify you through a prominent notice on our Website</li>
                    <li>Request renewed consent where required by law</li>
                  </ul>
                  <p className="leading-relaxed">
                    We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">12. Legal Basis for Using Cookies</h2>
                  <p className="leading-relaxed mb-4">
                    Depending on your location and the type of cookies, our legal basis for using cookies may include:
                  </p>

                  <h3 className="text-xl font-semibold mb-3">12.1 Consent</h3>
                  <p className="leading-relaxed mb-4">
                    For non-essential cookies, we rely on your explicit consent obtained through our cookie consent tool.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">12.2 Legitimate Interests</h3>
                  <p className="leading-relaxed mb-4">
                    For some cookies (particularly analytics), we may rely on our legitimate interest in:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Improving our Website and Services</li>
                    <li>Understanding user behavior</li>
                    <li>Preventing fraud and maintaining security</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">12.3 Contractual Necessity</h3>
                  <p className="leading-relaxed mb-4">
                    Essential cookies are necessary to perform our contract with you (providing Website services).
                  </p>

                  <h3 className="text-xl font-semibold mb-3">12.4 Legal Obligations</h3>
                  <p className="leading-relaxed">
                    Some cookies help us comply with legal requirements.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">13. Your Rights Regarding Cookies</h2>
                  <p className="leading-relaxed mb-4">
                    Depending on your location, you may have certain rights regarding cookies and the personal data they collect:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Right to withdraw consent:</strong> You can change your cookie preferences at any time</li>
                    <li><strong>Right to access:</strong> Request information about the data collected through cookies</li>
                    <li><strong>Right to deletion:</strong> Request deletion of data collected through cookies</li>
                    <li><strong>Right to object:</strong> Object to the use of cookies for direct marketing purposes</li>
                    <li><strong>Right to lodge a complaint:</strong> File a complaint with your local data protection authority</li>
                  </ul>
                  <p className="leading-relaxed">
                    To exercise these rights, please contact us using the information in Section 15.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">14. Specific Regional Notices</h2>

                  <h3 className="text-xl font-semibold mb-3">14.1 For EU/EEA Visitors (GDPR)</h3>
                  <p className="leading-relaxed mb-4">
                    If you are located in the European Union or European Economic Area, we comply with the General Data Protection Regulation (GDPR). We will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Obtain your explicit consent before using non-essential cookies</li>
                    <li>Provide clear information about all cookies used</li>
                    <li>Honor your cookie preferences</li>
                    <li>Allow you to exercise your GDPR rights</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">14.2 For California Residents (CCPA/CPRA)</h3>
                  <p className="leading-relaxed mb-4">
                    If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Right to know what personal information is collected through cookies</li>
                    <li>Right to opt out of the "sale" of personal information</li>
                    <li>Right to request deletion of cookie data</li>
                  </ul>
                  <p className="leading-relaxed mb-4">
                    Note: While we do not sell personal information in the traditional sense, sharing data with advertising partners through cookies may be considered a "sale" under CCPA.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">14.3 For UK Visitors</h3>
                  <p className="leading-relaxed">
                    UK visitors are protected under UK GDPR and the Privacy and Electronic Communications Regulations (PECR). We comply with these regulations by obtaining consent for non-essential cookies.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">15. Contact Us</h2>
                  <p className="leading-relaxed mb-4">
                    If you have any questions, concerns, or requests regarding this Cookie Policy or our use of cookies, please contact us:
                  </p>
                  <p className="leading-relaxed mb-4"><strong>CareEase USA LLC</strong></p>
                  <ul className="list-none space-y-2 mb-4">
                    <li><strong>Email:</strong> contact@careeaseusa.com</li>
                    <li><strong>Phone:</strong> (347) 471-1520</li>
                    <li><strong>Mailing Address:</strong> 1510 Castle Hill Ave #1073, Bronx, NY 10462, USA</li>
                  </ul>

                  <p className="leading-relaxed mb-4">
                    <strong>For cookie-specific inquiries:</strong><br />
                    Please include "Cookie Policy Question" in the subject line of your email.
                  </p>

                  <p className="leading-relaxed">
                    <strong>For data protection inquiries:</strong><br />
                    You may also contact our Privacy Officer at the email address above.
                  </p>
                </section>

                <div className="border-t border-border my-8" />

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">16. Additional Resources</h2>
                  <p className="leading-relaxed mb-4">For more information about cookies and online privacy, visit:</p>
                  <ul className="list-none space-y-2 mb-4">
                    <li><strong>All About Cookies:</strong> <a href="http://www.allaboutcookies.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a></li>
                    <li><strong>Network Advertising Initiative:</strong> <a href="http://www.networkadvertising.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.networkadvertising.org</a></li>
                    <li><strong>Digital Advertising Alliance:</strong> <a href="http://www.aboutads.info" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a></li>
                    <li><strong>Your Online Choices (EU):</strong> <a href="http://www.youronlinechoices.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.youronlinechoices.com</a></li>
                  </ul>
                </section>

                <div className="border-t border-border my-8" />

                <p className="leading-relaxed italic">
                  <strong>Thank you for taking the time to understand how we use cookies. Your privacy is important to us, and we are committed to providing transparency about our data practices.</strong>
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

export default CookiePolicy;
