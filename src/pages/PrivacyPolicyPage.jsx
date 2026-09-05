import MarketingLayout from '../layouts/MarketingLayout.jsx';

const sections = [
  ['Information We Collect', 'We may collect your name, email, phone number, project details, usage data, and information you share through forms.'],
  ['How We Use Information', 'We use information to respond to inquiries, plan projects, provide services, improve our website, and communicate with you.'],
  ['Information Sharing', 'We do not sell personal information. We may share data only with trusted service providers when needed to operate our business.'],
  ['Data Security', 'We use reasonable technical and organizational safeguards to protect submitted information.'],
  ['Cookies', 'Our website may use cookies or similar tools for basic functionality, analytics, and performance.'],
  ['Third-Party Links', 'Our website may link to third-party websites. Their privacy practices are governed by their own policies.'],
  ['Data Retention', 'We keep information only as long as needed for business, legal, and service purposes.'],
  ['User Rights', 'You can request access, correction, or deletion of your personal information by contacting us.'],
  ["Children's Privacy", 'Our services are not directed to children, and we do not knowingly collect data from children.'],
  ['Policy Changes', 'We may update this policy from time to time. The latest version will be posted on this page.'],
  ['Contact Information', 'For privacy questions, contact Taskmare Labs at info@taskmare.online.'],
];

function PrivacyPolicyPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 animate-in">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Privacy Policy</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-ink">Privacy Policy</h1>
        <div className="mt-14 border-t hairline">
          {sections.map(([title, body]) => (
            <section key={title} className="reveal border-b hairline py-8">
              <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
              <p className="mt-4 text-lg leading-8 text-muted">{body}</p>
            </section>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}

export default PrivacyPolicyPage;
