import { ArrowRight, Sparkles } from 'lucide-react';

function Hero() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-sm font-bold text-brand shadow-sm">
          <Sparkles size={16} />
          Modern task operations
        </div>
        <h1 className="max-w-3xl text-5xl font-black leading-[1.02] text-ink sm:text-6xl">
          Taskmare
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          A focused task workspace for teams that need priorities, ownership, and daily execution in one clean view.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-brand-dark" href="#features">
            Explore Features
            <ArrowRight size={18} />
          </a>
          <a className="font-bold text-ink transition hover:text-brand" href="#workflow">
            See workflow
          </a>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/80">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <p className="text-sm font-black text-ink">Today Board</p>
            <p className="text-xs font-semibold text-muted">8 tasks due</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">Live</span>
        </div>
        <div className="grid gap-3">
          {['Launch checklist', 'Client follow-up', 'Design review', 'QA handoff'].map((task, index) => (
            <div key={task} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-bold text-ink">{task}</p>
                <p className="text-xs font-semibold text-muted">{index + 1} owner assigned</p>
              </div>
              <span className="text-xs font-black text-brand">{index < 2 ? 'High' : 'Normal'}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
