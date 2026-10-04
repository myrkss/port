const email = "svjatolsavssapa@gmail.com";

export function Contact() {
  return (
    <section id="contact" className="tone-dark snap flex min-h-svh flex-col">
      <div className="shell flex flex-1 flex-col justify-between gap-16 pb-12 pt-24 lg:pt-28">
        <p className="label">(contact)</p>

        <div>
          <h2 data-reveal="lines" className="display text-[clamp(2.75rem,11.5vw,12.5rem)]">
            <span className="line">
              <span>have something</span>
            </span>
            <span className="line" style={{ "--i": 1 } as React.CSSProperties}>
              <span>interesting?</span>
            </span>
          </h2>

          <div className="grid-12 mt-12 items-end gap-y-8 lg:mt-20">
            <a
              href={`mailto:${email}`}
              className="link justify-self-start text-[clamp(1.15rem,2.6vw,2.5rem)] tracking-tight md:col-span-4 lg:col-span-7"
            >
              {email}
            </a>
            <p className="label md:col-span-2 lg:col-span-3">riga, latvia</p>
            <ul className="label md:col-span-6 lg:col-span-2 lg:justify-self-end">
              <li>
                <a href={`mailto:${email}`} className="text-fg transition-opacity hover:opacity-60">
                  email <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="shell">
        <div className="label flex items-baseline justify-between border-t border-line py-4">
          <p>svjatolsavs sapa</p>
          <a href="#top" className="transition-colors hover:text-fg">
            back to top <span aria-hidden="true">↑</span>
          </a>
          <p>2026</p>
        </div>
      </footer>
    </section>
  );
}
