import { services } from '../data/home.js';
import MarketingLayout from '../layouts/MarketingLayout.jsx';
import { ArrowRight, BadgeCheck, Boxes, Headphones, Milestone } from 'lucide-react';
import { Link } from 'react-router-dom';

function ServicesPage() {
  return (
    <MarketingLayout>
      <section className="container-page section-space animate-in">
        <h1 className="max-w-4xl text-6xl font-bold leading-none tracking-tight text-ink md:text-7xl">
          Apps. AI. Software. Built right.
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-9 text-muted">
          From early product thinking to production release, Taskmare Labs builds custom digital products with clarity and craft.
        </p>

        <div className="mt-16 border-t hairline">
          {services.map((service, index) => (
            <article key={service.title} className="group grid gap-6 border-b hairline px-4 py-9 transition duration-300 hover:bg-brand hover:pl-7 md:grid-cols-[110px_0.8fr_1fr]">
              <p className="text-sm font-black text-brand transition duration-300 group-hover:text-white">0{index + 1}</p>
              <h2 className="text-3xl font-bold tracking-tight text-ink transition duration-300 group-hover:text-white">{service.title}</h2>
              <div className="flex items-start justify-between gap-6">
                <p className="max-w-2xl text-lg leading-8 text-muted transition duration-300 group-hover:text-red-50">{service.description}</p>
                <ArrowRight className="mt-2 shrink-0 -translate-x-2 text-brand opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:text-white group-hover:opacity-100" size={22} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal relative overflow-hidden bg-ink py-20 text-white">
        <img src="/bg-img.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.34]" />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-page relative grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-5xl font-bold tracking-tight">Not just development. Delivery.</h2>
          <div>
            <p className="text-lg leading-8 text-neutral-300">
              Built from scratch with clear milestones, store launch support, and post-launch support.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <img src="/app-store-badge.svg" alt="Download on the App Store" className="h-10 w-auto" />
              <img src="/google-play-badge.svg" alt="Get it on Google Play" className="h-10 w-auto" />
            </div>
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {[
                ['Built from scratch', Boxes],
                ['Clear milestones', Milestone],
                ['Store launch support', BadgeCheck],
                ['Post-launch support', Headphones],
              ].map(([item, Icon]) => (
                <div key={item} className="flex items-center gap-3 border-t border-white/20 pt-4">
                  <Icon size={20} className="text-brand" />
                  <span className="text-sm font-black">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page reveal py-20">
        <div className="flex flex-col gap-6 border-t-2 border-brand pt-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-5xl font-bold tracking-tight text-ink">Have something specific in mind?</h2>
          <Link to="/contact" className="btn-motion inline-flex w-fit items-center gap-2 text-sm font-black text-brand">
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}

export default ServicesPage;
