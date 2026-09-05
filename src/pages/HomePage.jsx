import { ArrowRight } from 'lucide-react';
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

function HomePage() {
  return (
    <MarketingLayout>
      <section className="overflow-hidden">
        <div className="container-page grid min-h-[calc(100vh-72px)] items-center gap-16 py-20 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="animate-in">
            <h1 className="max-w-4xl text-6xl font-bold leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-8xl">
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
              <div key={item} className="grid gap-4 border-b hairline py-7 transition duration-300 hover:pl-2 md:grid-cols-[0.7fr_1fr]">
                <h3 className="text-2xl font-black text-ink">{item}</h3>
                <p className="max-w-2xl leading-7 text-muted">
                  Strategy, product thinking, design, development and launch support handled with a clean studio process.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal bg-white py-20">
        <div className="container-page grid gap-8 md:grid-cols-2">
          <div className="border-t-2 border-brand pt-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">Pricing</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">Apps starting from ₹15,000</h2>
          </div>
          <div className="border-t-2 border-ink pt-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-ink">Bundle</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">Android + iOS starting from ₹50,000</h2>
          </div>
        </div>
      </section>

      <section className="reveal section-space">
        <div className="container-page grid gap-10 md:grid-cols-[0.65fr_1fr]">
          <h2 className="text-5xl font-bold tracking-tight text-ink">Process</h2>
          <div className="border-t hairline">
            {processItems.map((item, index) => (
              <div key={item} className="grid grid-cols-[72px_1fr] border-b hairline py-7">
                <span className="text-sm font-black text-brand">0{index + 1}</span>
                <h3 className="text-3xl font-bold tracking-tight text-ink">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal bg-ink py-24 text-white">
        <div className="container-page flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
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
