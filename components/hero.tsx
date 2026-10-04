import { SchlierenRig } from "@/components/ui/hero-ascii-schlieren";

export function Hero() {
  return (
    <section id="top" className="tone-dark snap relative h-svh min-h-[560px] overflow-hidden">
      <div className="absolute inset-0">
        <SchlierenRig />
      </div>

      {/* keeps the statement readable over the ascii field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-bg via-bg/75 to-transparent"
      />

      <div className="shell pointer-events-none relative flex h-full flex-col justify-end pb-5 lg:pb-7">
        <p
          data-reveal="lines"
          className="display text-[clamp(2.1rem,9vw,9.5rem)]"
        >
          <span className="line">
            <span>i design things</span>
          </span>
          <span className="line" style={{ "--i": 1 } as React.CSSProperties}>
            <span>that need to exist.</span>
          </span>
        </p>

        <div className="label mt-8 grid grid-cols-2 gap-x-5 gap-y-1 border-t border-line pt-3 lg:mt-12 lg:grid-cols-12 lg:gap-x-6 lg:pt-4">
          <h1 className="text-fg lg:col-span-3">
            <span className="sr-only">svjatolsavs sapa — </span>
            creative digital specialist
          </h1>
          <p className="justify-self-end lg:col-span-3 lg:justify-self-start">riga / 2026</p>
          <p className="lg:col-span-3">design / code / image / motion</p>
          <a
            href="#work"
            className="pointer-events-auto justify-self-end text-fg transition-opacity hover:opacity-60 lg:col-span-3"
          >
            selected work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
