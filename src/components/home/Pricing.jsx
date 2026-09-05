function Pricing() {
  return (
    <section id="pricing" className="bg-ink py-20 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wider text-blue-300">Pricing</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Start lean, scale when the team grows.</h2>
        </div>
        <a href="mailto:info@taskmare.online" className="inline-flex w-fit rounded-lg bg-white px-5 py-3 font-black text-ink transition hover:bg-blue-50">
          Contact Sales
        </a>
      </div>
    </section>
  );
}

export default Pricing;
