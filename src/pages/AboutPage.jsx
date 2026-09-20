import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo.jsx';
import MarketingLayout from '../layouts/MarketingLayout.jsx';

const principles = [
  {
    title: 'Built from scratch',
    description: 'Every product is designed and developed around your idea. No ready-made templates, no recycled layouts.',
  },
  {
    title: 'Right technology, not more technology',
    description: 'We use AI and Generative AI where they make the product better, not because it sounds impressive.',
  },
  {
    title: 'Clear scope and milestones',
    description: 'You know what is being built, when each part is ready, and what comes next.',
  },
  {
    title: 'Direct communication',
    description: 'You talk directly with the people building your product, from the first call to launch.',
  },
  {
    title: 'Launch and beyond',
    description: 'Store submission guidance, release support and post-launch support are part of the work.',
  },
];

function AboutPage() {
  return (
    <MarketingLayout>
      <Seo
        title="About Taskmare Labs | Software Studio in Bijnor"
        description="Taskmare Labs is a software studio in Bijnor, Uttar Pradesh, building apps, AI and custom software from scratch with clear milestones and direct communication."
        path="/about"
      />
      <section className="container-page section-space animate-in">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">About Taskmare Labs</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1] tracking-tight text-ink md:text-7xl">
          We build products from scratch<span className="text-brand">.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-9 text-muted">
          Taskmare Labs is a software studio in Bijnor, Uttar Pradesh. We build Android, iOS, AI and custom software for founders and growing businesses who want a product made around their idea.
        </p>
      </section>

      <section className="reveal pb-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden border hairline bg-white">
            <img
              src="/about.png"
              alt="Taskmare Labs logo surrounded by red, white and black building blocks"
              className="w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">How we work</p>
            <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              You bring the idea. We handle the building.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              We work with you to understand what you want to build, shape it into a clear scope, then design, develop and launch it. Mobile apps, web platforms, backend systems and AI features all come from one team, so nothing gets lost between them.
            </p>
          </div>
        </div>
      </section>

      <section className="reveal border-t hairline bg-white py-24">
        <div className="container-page grid gap-10 md:grid-cols-[0.65fr_1fr]">
          <div>
            <h2 className="text-5xl font-bold tracking-tight text-ink">What we stand for</h2>
            <img
              src="/about-plan.png"
              alt="Our five steps: plan, design, develop, test and launch"
              className="mt-10 w-full max-w-xs"
            />
          </div>
          <div className="interactive-list border-t hairline">
            {principles.map((item, index) => (
              <div key={item.title} className={`interactive-row group grid gap-2 border-b hairline px-4 py-6 transition duration-300 hover:pl-7 ${index === 0 ? 'default-active-row' : ''}`}>
                <h3 className="active-white text-xl font-black text-ink transition duration-300">{item.title}</h3>
                <p className="active-muted leading-7 text-muted transition duration-300">{item.description}</p>
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
            <h2 className="text-5xl font-bold tracking-tight">Have something in mind?</h2>
            <p className="mt-4 text-lg text-neutral-300">Tell us what you want to build.</p>
          </div>
          <Link to="/start-project" className="btn-motion inline-flex w-fit items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-black text-white hover:bg-brand-dark">
            Start Your Project
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}

export default AboutPage;
