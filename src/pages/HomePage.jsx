import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiTags, serviceHighlights } from '../data/home.js';
import Seo from '../components/common/Seo.jsx';
import MarketingLayout from '../layouts/MarketingLayout.jsx';

function AbstractVisual() {
  return (
    <div className="animate-in-soft stagger-2">
      <img
        src="/home-graphics.png"
        alt="From idea to AI-powered product: a founder imagining a custom app built by Taskmare Labs"
        className="w-full object-contain"
      />
    </div>
  );
}

function HomePage() {
  return (
    <MarketingLayout>
      <Seo
        title="Taskmare Labs | App, AI & Software Development in Bijnor"
        description="Taskmare Labs builds custom Android, iOS, AI and software products from scratch. Modern development with AI and Generative AI, from idea to launch."
        path="/"
      />
      <section className="overflow-hidden">
        <div className="container-page grid min-h-[calc(100vh-72px)] items-center gap-16 py-20 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="animate-in">
            <h1 className="max-w-4xl text-5xl font-bold leading-[1] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Build better with
              <span className="block text-brand">modern tech.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-muted">
              We combine modern software development with <span className="font-bold text-ink">AI and Generative AI</span> to build products that are faster, smarter and designed around real business needs.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
              From custom apps and SaaS platforms to AI-powered features, automations and intelligent workflows, we use the right technology where it actually adds value.
            </p>
            <p className="mt-8 max-w-2xl text-base font-bold leading-7 text-ink">
              We don’t add AI because it sounds impressive. We use it where it makes the product better.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link to="/services" className="btn-motion inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-black text-white hover:bg-brand-dark">
                Explore What We Can Build
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <AbstractVisual />
        </div>
      </section>

      <section className="reveal section-space">
        <div className="container-page">
          <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-ink">
            Everything you need to build and launch.
          </h2>
          <div className="interactive-list mt-12 border-t hairline">
            {serviceHighlights.map((item, index) => (
              <div key={item.title} className={`interactive-row group grid items-center gap-4 border-b hairline px-4 py-7 transition duration-300 hover:pl-7 md:grid-cols-[64px_0.7fr_1fr] md:gap-6 ${index === 0 ? 'default-active-row' : ''}`}>
                <img src={item.image} alt="" className="size-16 rounded-lg object-cover" />
                <h3 className="active-white text-2xl font-black text-ink transition duration-300">{item.title}</h3>
                <p className="active-muted max-w-2xl leading-7 text-muted transition duration-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal border-t hairline bg-paper py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">AI + Modern Development</p>
            <h2 className="mt-4 max-w-xl text-5xl font-bold leading-tight tracking-tight text-ink">
              Build smarter products with AI.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              We integrate AI and Generative AI directly into apps and software — from intelligent assistants and content generation to automation, recommendations and smarter workflows.
            </p>
            <p className="mt-6 max-w-xl text-sm font-black leading-7 text-ink">{aiTags.join(' · ')}</p>
            <Link to="/ai-development" className="btn-motion mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-black text-white hover:bg-brand-dark">
              Explore AI Development
              <ArrowRight size={18} />
            </Link>
          </div>
          <img
            src="/ai.png"
            alt="OpenAI, Gemini, Meta, AWS and Google Cloud integrated into one product, leading to faster development, smarter products and real business impact"
            className="w-full object-contain"
          />
        </div>
      </section>
    </MarketingLayout>
  );
}

export default HomePage;
