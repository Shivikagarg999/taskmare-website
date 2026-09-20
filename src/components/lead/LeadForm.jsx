import { ArrowLeft, ArrowRight, Mail, MessageCircle, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AI_PROJECT_TYPE,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  buildEnquiryMessage,
  leadQuestions,
} from '../../data/lead.js';

// Shows one project question at a time. Nothing is sent anywhere until the visitor
// picks WhatsApp or email at the end.
function LeadForm({ topic }) {
  const initialAnswers = useMemo(() => (topic === 'ai' ? { type: AI_PROJECT_TYPE } : {}), [topic]);

  const [answers, setAnswers] = useState(initialAnswers);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const queue = leadQuestions.filter((question) => !question.when || question.when(answers));
  const steps = queue.filter((question) => !(question.id in initialAnswers));
  const current = steps.find((question) => !(question.id in answers));
  const answeredCount = steps.filter((question) => question.id in answers).length;

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, [current?.id]);

  function submit(question, value) {
    const trimmed = value.trim();
    if (!(question.optional && !trimmed)) {
      const message = question.validate?.(trimmed);
      if (message) {
        setError(message);
        return;
      }
    }
    setError('');
    setDraft('');
    setAnswers((previous) => ({ ...previous, [question.id]: trimmed }));
  }

  function goBack() {
    const previous = steps.filter((question) => question.id in answers).at(-1);
    if (!previous) return;
    setDraft(previous.options ? '' : answers[previous.id]);
    setError('');
    setAnswers(({ [previous.id]: _removed, ...rest }) => rest);
  }

  function restart() {
    setAnswers(initialAnswers);
    setDraft('');
    setError('');
  }

  const enquiry = buildEnquiryMessage(answers);
  const whatsappHref = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(enquiry)}`;
  const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(enquiry)}`;

  if (!current) {
    return (
      <div className="animate-in border hairline bg-white p-7 shadow-2xl shadow-neutral-200/80 sm:p-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand">All done</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">Thanks, {answers.name}.</h2>
        <p className="mt-3 max-w-lg leading-7 text-muted">
          Here’s what you told us. Nothing has been sent yet. Choose how you’d like to send it and we’ll get back to you.
        </p>

        <dl className="mt-8 grid gap-4 border-t hairline pt-6 text-sm">
          {leadQuestions
            .filter((question) => answers[question.id])
            .map((question) => (
              <div key={question.id} className="grid gap-1 sm:grid-cols-[150px_1fr]">
                <dt className="text-xs font-black uppercase tracking-[0.14em] text-muted">{question.label}</dt>
                <dd className="font-bold text-ink">{answers[question.id]}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-motion inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-black text-white hover:bg-brand-dark">
            <MessageCircle size={17} />
            Send on WhatsApp
          </a>
          <a href={mailHref} className="btn-motion inline-flex items-center gap-2 rounded-md border hairline bg-white px-5 py-3 text-sm font-black text-ink hover:text-brand">
            <Mail size={17} />
            Send by email
          </a>
          <button type="button" onClick={restart} className="ml-auto inline-flex items-center gap-1.5 text-xs font-black text-muted hover:text-brand">
            <RotateCcw size={14} />
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border hairline bg-white p-7 shadow-2xl shadow-neutral-200/80 sm:p-10">
      <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.2em]">
        <span className="text-brand">Question {answeredCount + 1}</span>
        {answeredCount > 0 && (
          <button type="button" onClick={goBack} className="inline-flex items-center gap-1.5 tracking-normal text-muted hover:text-ink">
            <ArrowLeft size={14} />
            Back
          </button>
        )}
      </div>
      <div className="mt-4 h-1 bg-neutral-100" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={answeredCount}>
        <div className="h-full bg-brand transition-all duration-500" style={{ width: `${(answeredCount / steps.length) * 100}%` }} />
      </div>

      <div key={current.id} className="animate-in min-h-72 pt-10">
        <h2 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-ink">{current.text}</h2>

        {current.options ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {current.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => submit(current, option)}
                className="group flex items-center justify-between gap-3 rounded-md border hairline bg-white px-5 py-4 text-left text-sm font-black text-ink transition hover:border-brand hover:text-brand"
              >
                {option}
                <ArrowRight size={16} className="shrink-0 text-brand opacity-0 transition group-hover:opacity-100" />
              </button>
            ))}
          </div>
        ) : (
          <form
            className="mt-8"
            onSubmit={(event) => {
              event.preventDefault();
              submit(current, draft);
            }}
          >
            <input
              ref={inputRef}
              type={current.inputType || 'text'}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={current.placeholder}
              aria-label={current.text}
              aria-invalid={Boolean(error)}
              className="w-full rounded-md border hairline bg-white px-4 py-4 text-base outline-none focus:border-brand"
            />
            {error && <p className="mt-2 text-xs font-bold text-brand">{error}</p>}
            <div className="mt-5 flex items-center gap-5">
              <button type="submit" className="btn-motion inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-black text-white hover:bg-brand-dark">
                {current.optional && !draft.trim() ? 'Continue' : 'Next'}
                <ArrowRight size={17} />
              </button>
              {current.optional && (
                <button type="button" onClick={() => submit(current, '')} className="text-sm font-black text-muted hover:text-ink">
                  Skip
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LeadForm;
