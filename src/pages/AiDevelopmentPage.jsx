import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiCapabilities } from '../data/home.js';
import Seo from '../components/common/Seo.jsx';
import MarketingLayout from '../layouts/MarketingLayout.jsx';

function AiDevelopmentPage() {
  return (
    <MarketingLayout>
      <Seo
        title="AI & Generative AI Development | Taskmare Labs"
        description="Add AI assistants, generative AI, automation, smart search and OpenAI or Gemini integrations to your app or software with Taskmare Labs."
        path="/ai-development"
      />
      <section className="container-page section-space animate-in">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">AI + Modern Development</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1] tracking-tight text-ink md:text-7xl">
          Build smarter products with AI.
        </h1>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <img
            src="/ai.png"
            alt="OpenAI, Gemini, Meta, AWS and Google Cloud integrated into one product, leading to faster development, smarter products and real business impact"
            className="w-full object-contain"
          />

          <div className="interactive-list border-t hairline">
            {aiCapabilities.map((item, index) => (
              <div key={item.title} className={`interactive-row group grid gap-2 border-b hairline px-4 py-6 transition duration-300 hover:pl-7 ${index === 0 ? 'default-active-row' : ''}`}>
                <h2 className="active-white text-xl font-black text-ink transition duration-300">{item.title}</h2>
                <p className="active-muted leading-7 text-muted transition duration-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page reveal pb-24">
        <div className="flex flex-col gap-6 border-t-2 border-brand pt-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-5xl font-bold tracking-tight text-ink">Have an AI feature in mind?</h2>
          <Link to="/start-project?topic=ai" className="btn-motion inline-flex w-fit items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-black text-white hover:bg-brand-dark">
            Tell Us What You Want to Build
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}

export default AiDevelopmentPage;
