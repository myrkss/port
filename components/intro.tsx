export function Intro() {
  return (
    <section id="intro" className="tone-dark snap flex min-h-svh">
      <div className="shell flex flex-col justify-between gap-20 pb-10 pt-28 lg:pb-14 lg:pt-40">
        <div className="grid-12 gap-y-6">
          <p className="label lg:col-span-2 lg:pt-3">(intro)</p>
          <h2
            data-reveal="fade"
            className="display text-balance text-[clamp(2.25rem,6.4vw,7rem)] md:col-span-6 lg:col-span-10"
          >
            i work between design, code, image and physical objects.
          </h2>
        </div>

        <div className="grid-12">
          <p
            data-reveal="fade"
            className="max-w-[34ch] font-mono text-xs leading-relaxed text-muted md:col-span-3 md:col-start-4 lg:col-span-4 lg:col-start-9 lg:text-sm"
          >
            websites, visual identities, clothing, video and digital experiments.
          </p>
        </div>
      </div>
    </section>
  );
}
