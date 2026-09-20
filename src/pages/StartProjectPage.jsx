import { useSearchParams } from 'react-router-dom';
import LeadForm from '../components/lead/LeadForm.jsx';
import Seo from '../components/common/Seo.jsx';
import MarketingLayout from '../layouts/MarketingLayout.jsx';

function StartProjectPage() {
  const [params] = useSearchParams();
  const topic = params.get('topic');

  return (
    <MarketingLayout>
      <Seo
        title="Start Your Project | Taskmare Labs"
        description="Answer a few quick questions about your app, website or AI feature and send your project details to Taskmare Labs."
        path="/start-project"
        noindex
      />
      <section className="py-16 sm:py-24">
        <div className="container-page animate-in grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-8 bg-brand" />
              Start your project
            </p>
            <h1 className="max-w-md text-5xl font-bold leading-[1] tracking-tight text-ink md:text-6xl">
              Tell us about your project<span className="text-brand">.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-muted">
              Answer a few quick questions and we’ll come back with the right way to build it. No commitment.
            </p>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted">
              Prefer to talk directly? Email{' '}
              <a href="mailto:taskmarelabs@gmail.com" className="font-black text-ink hover:text-brand">
                taskmarelabs@gmail.com
              </a>{' '}
              or message us on{' '}
              <a href="https://wa.me/919760556855" target="_blank" rel="noreferrer" className="font-black text-ink hover:text-brand">
                WhatsApp
              </a>
              .
            </p>
          </div>

          <LeadForm key={topic} topic={topic} />
        </div>
      </section>
    </MarketingLayout>
  );
}

export default StartProjectPage;
