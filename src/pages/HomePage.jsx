import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceHighlights } from '../data/home.js';
import MarketingLayout from '../layouts/MarketingLayout.jsx';

const trustItems = ['Built from scratch', 'Android + iOS', 'AI Development', 'Launch Support'];
const processItems = ['Share your idea', 'We build it', 'Launch'];

function AbstractVisual() {
  return (
    <div className="animate-in-soft stagger-2 overflow-hidden">
      <img
        src="/home-page-img.png"
        alt="Taskmare Labs app development visual"
        className="w-full object-contain"
      />
    </div>
  );
}

function PricingSection() {
  const plans = [
    {
      label: 'Basic',
      title: 'Apps starting from',
      price: '₹14,999',
      text: 'Perfect for startups and MVPs. Custom apps built for a single platform.',
      accent: 'brand',
      items: ['Custom App Development', 'Clean & Modern UI', 'Quality Assurance', 'Post-Launch Support'],
    },
    {
      label: 'Bundle',
      title: 'Android + iOS starting from',
      price: '₹49,999',
      text: 'One product, two platforms. Reach more users, grow faster.',
      accent: 'ink',
      items: ['Android + iOS Apps', 'Shared Codebase', 'App Store Submission', 'Post-Launch Support'],
    },
  ];

  return (
    <section className="reveal bg-white py-20">
      <div className="container-page grid border hairline bg-white md:grid-cols-2">
        {plans.map((plan, index) => (
          <div key={plan.label} className={`relative p-8 md:p-10 ${index === 1 ? 'border-t hairline md:border-l md:border-t-0' : ''}`}>
            {index === 1 && (
              <div className="absolute left-1/2 top-0 hidden size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border hairline bg-white md:grid">
                <img src="/favicon.png" alt="" className="size-6 object-contain" />
              </div>
            )}
            <div className={`absolute right-8 top-0 h-px w-32 ${plan.accent === 'brand' ? 'bg-brand' : 'bg-ink'}`} />
            <p className={`text-xs font-black uppercase tracking-[0.2em] ${plan.accent === 'brand' ? 'text-brand' : 'text-ink'}`}>
              {plan.label}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">{plan.title}</h2>
            <p className="mt-2 font-display text-5xl font-bold tracking-tight text-ink">{plan.price}</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{plan.text}</p>
            <div className="mt-8 grid gap-3 border-t hairline pt-6 text-sm font-semibold text-ink">
              {plan.items.map((item) => (
                <p key={item} className="flex items-center gap-3">
                  <Check size={14} className={plan.accent === 'brand' ? 'text-brand' : 'text-ink'} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <MarketingLayout>
      <section className="overflow-hidden">
        <div className="container-page grid min-h-[calc(100vh-72px)] items-center gap-16 py-20 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="animate-in">
            <h1 className="max-w-4xl text-5xl font-bold leading-[1] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              You have the idea.
              <span className="block">We build the app.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-muted">
              Custom Android, iOS & AI applications built from scratch by professional developers.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link to="/contact" className="btn-motion inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-black text-white hover:bg-brand-dark">
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="text-sm font-black text-ink underline decoration-neutral-300 underline-offset-8 hover:decoration-brand">
                View Services
              </Link>
            </div>
          </div>
          <AbstractVisual />
        </div>
      </section>

      <section className="reveal border-y hairline bg-white">
        <div className="container-page flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm font-black text-ink">
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="reveal section-space">
        <div className="container-page">
          <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-ink">
            Everything you need to build and launch.
          </h2>
          <div className="mt-12 border-t hairline">
            {serviceHighlights.map((item) => (
              <div key={item} className="group grid gap-4 border-b hairline px-4 py-7 transition duration-300 hover:bg-brand hover:pl-7 md:grid-cols-[0.7fr_1fr]">
                <h3 className="text-2xl font-black text-ink transition duration-300 group-hover:text-white">{item}</h3>
                <p className="max-w-2xl leading-7 text-muted transition duration-300 group-hover:text-red-50">
                  Strategy, product thinking, design, development and launch support handled with a clean studio process.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="reveal section-space">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden border hairline bg-white">
            <img
              src="/studio-collaboration.jpg"
              alt="App development team discussing product work"
              className="aspect-[4/3] w-full object-cover grayscale transition duration-500 hover:grayscale-0"
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">Launch support</p>
            <h2 className="mt-4 max-w-xl text-5xl font-bold leading-tight tracking-tight text-ink">
              Built for real stores, real users and real launches.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              We help prepare app builds, store assets, listings and release support for Android and iOS products.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <img src="/app-store-badge.svg" alt="Download on the App Store" className="h-10 w-auto" />
              <img src="/google-play-badge.svg" alt="Get it on Google Play" className="h-10 w-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="reveal section-space">
        <div className="container-page grid gap-10 md:grid-cols-[0.65fr_1fr]">
          <h2 className="text-5xl font-bold tracking-tight text-ink">Process</h2>
          <div className="border-t hairline">
            {processItems.map((item, index) => (
              <div key={item} className="group grid grid-cols-[72px_1fr] border-b hairline px-4 py-7 transition duration-300 hover:bg-brand hover:pl-7">
                <span className="text-sm font-black text-brand transition duration-300 group-hover:text-white">0{index + 1}</span>
                <h3 className="text-3xl font-bold tracking-tight text-ink transition duration-300 group-hover:text-white">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal relative overflow-hidden bg-ink py-24 text-white">
        <img src="/bg-img.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-page relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-5xl font-bold tracking-tight">Ready to build something?</h2>
            <p className="mt-4 text-lg text-neutral-300">Tell us what you have in mind.</p>
          </div>
          <Link to="/contact" className="btn-motion inline-flex w-fit items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-black text-white hover:bg-brand-dark">
            Start Your Project
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}

export default HomePage;
