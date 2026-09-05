import { ArrowRight } from 'lucide-react';
import MarketingLayout from '../layouts/MarketingLayout.jsx';

function ContactPage() {
  return (
    <MarketingLayout>
      <section className="container-page section-space animate-in">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h1 className="text-6xl font-bold leading-none tracking-tight text-ink md:text-7xl">
              Let's build your idea.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-muted">
              Tell us what you're building. We'll help you figure out the right way to build it.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t hairline pt-5 text-sm font-black text-ink">
              {['No obligation', 'Clear scope', 'Flexible payments', 'Direct communication'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="border-t hairline">
            <div className="grid gap-4 border-b hairline py-8 md:grid-cols-[180px_1fr]">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Email</p>
              <a className="text-3xl font-bold tracking-tight text-ink hover:text-brand" href="mailto:info@taskmare.online">
                info@taskmare.online
              </a>
            </div>
            <div className="grid gap-4 border-b hairline py-8 md:grid-cols-[180px_1fr]">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Phone/WhatsApp</p>
              <a className="text-3xl font-bold tracking-tight text-ink hover:text-brand" href="https://wa.me/919760556855" target="_blank" rel="noreferrer">
                +91 9760556855
              </a>
            </div>
            <a href="mailto:info@taskmare.online" className="btn-motion mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-black text-white hover:bg-brand-dark">
              Start Your Project
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

export default ContactPage;
