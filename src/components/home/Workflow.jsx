import { Check } from 'lucide-react';
import { workflowItems } from '../../data/home.js';

function Workflow() {
  return (
    <section id="workflow" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-wider text-brand">Workflow</p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">From idea to done without noise.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {workflowItems.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <span className="grid size-9 place-items-center rounded-lg bg-blue-50 text-brand">
                <Check size={18} />
              </span>
              <p className="font-black text-ink">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workflow;
