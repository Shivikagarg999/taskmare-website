import { features } from '../../data/home.js';

function FeatureGrid() {
  return (
    <section id="features" className="border-y border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-wider text-brand">Features</p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">Everything needed to run the day.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-black text-ink">{feature.title}</h3>
              <p className="mt-3 leading-7 text-muted">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureGrid;
