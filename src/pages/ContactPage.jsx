import { ArrowRight, CreditCard, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Target, WalletCards } from 'lucide-react';
import MarketingLayout from '../layouts/MarketingLayout.jsx';

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'No obligation',
    text: 'Talk to us with zero commitment.',
  },
  {
    icon: Target,
    title: 'Clear scope',
    text: 'We understand your idea clearly.',
  },
  {
    icon: MessageCircle,
    title: 'Direct communication',
    text: "You'll talk directly with our team.",
  },
  {
    icon: CreditCard,
    title: 'Flexible payments',
    text: 'Flexible pricing that works for you.',
  },
];

function PixelPattern({ className = '' }) {
  return (
    <div className={`grid grid-cols-6 gap-2 ${className}`} aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => (
        <span key={index} className="size-1 rounded-full bg-ink/12" />
      ))}
    </div>
  );
}

function ContactPage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden py-20 sm:py-24">
        <PixelPattern className="absolute bottom-12 left-6 opacity-80" />
        <PixelPattern className="absolute bottom-14 right-10 opacity-60" />

        <div className="container-page animate-in grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-8 bg-brand" />
              Let's connect
            </p>
            <h1 className="max-w-xl text-6xl font-bold leading-[0.96] tracking-tight text-ink md:text-7xl">
              Let's build your idea<span className="text-brand">.</span>
            </h1>
            <div className="mt-8 h-px w-16 bg-ink/18" />
            <p className="mt-7 max-w-md text-base leading-7 text-muted">
              Tell us what you're building. We'll help you figure out the right way to build it.
            </p>

            <div className="mt-9 grid max-w-xl gap-x-8 gap-y-5 sm:grid-cols-2">
              {trustItems.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border hairline bg-white text-brand">
                    <Icon size={17} />
                  </span>
                  <span>
                    <span className="block text-xs font-black text-ink">{title}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted">{text}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-end gap-3">
              <span className="h-10 w-3 bg-brand" />
              <span className="size-5 bg-brand" />
            </div>
          </div>

          <aside className="reveal border hairline bg-white p-7 shadow-2xl shadow-neutral-200/80 sm:p-10">
            <div className="grid gap-0">
              <div className="grid gap-5 border-b hairline py-7 first:pt-0 sm:grid-cols-[52px_1fr]">
                <span className="grid size-11 place-items-center rounded-md bg-neutral-50 text-brand">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Email</p>
                  <a href="mailto:info@taskmare.online" className="mt-2 block text-xl font-black text-ink hover:text-brand">
                    info@taskmare.online
                  </a>
                </div>
              </div>

              <div className="grid gap-5 border-b hairline py-7 sm:grid-cols-[52px_1fr]">
                <span className="grid size-11 place-items-center rounded-md bg-neutral-50 text-brand">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Phone / WhatsApp</p>
                  <a href="https://wa.me/919760556855" target="_blank" rel="noreferrer" className="mt-2 block text-xl font-black text-ink hover:text-brand">
                    +91 9760556855
                  </a>
                </div>
              </div>

              <div className="grid gap-5 py-7 sm:grid-cols-[52px_1fr]">
                <span className="grid size-11 place-items-center rounded-md bg-neutral-50 text-brand">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Address</p>
                  <p className="mt-2 text-xl font-black text-ink">Bijnor, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>

            <a href="mailto:info@taskmare.online" className="btn-motion mt-4 flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-4 text-sm font-black text-white hover:bg-brand-dark">
              <ArrowRight size={18} />
              Start Your Project
            </a>
          </aside>
        </div>

        <div className="container-page mt-10 hidden items-center gap-4 border-l-2 border-brand pl-5 sm:flex">
          <WalletCards size={18} className="text-brand" />
          <div>
            <p className="text-sm font-black text-ink">Have an idea in mind?</p>
            <p className="text-sm text-muted">Let's turn it into something real.</p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

export default ContactPage;
