import Image, { type StaticImageData } from "next/image";

type ProjectSectionProps = {
  id: string;
  no: string;
  /** one entry per display line */
  title: string[];
  meta: string[];
  role: string;
  description?: string;
  href: string;
  image: StaticImageData;
  alt: string;
  tone?: "dark" | "light";
  /** "lead": title first, screenshot below. "wide": oversized title, screenshot pushed right. */
  layout?: "lead" | "wide";
};

function VisitLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="link font-mono text-xs text-fg lg:text-sm">
      visit website <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Screenshot({ image, alt, sizes }: { image: StaticImageData; alt: string; sizes: string }) {
  return (
    <div data-reveal="clip" data-cursor className="media border border-line">
      <Image
        src={image}
        alt={alt}
        sizes={sizes}
        quality={90}
        placeholder="blur"
        className="media-img h-auto w-full"
      />
    </div>
  );
}

export function ProjectSection({
  id,
  no,
  title,
  meta,
  role,
  description,
  href,
  image,
  alt,
  tone = "dark",
  layout = "lead",
}: ProjectSectionProps) {
  const heading = title.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));

  if (layout === "wide") {
    return (
      <section id={id} className={`tone-${tone} snap`}>
        <div className="shell flex flex-col lg:min-h-svh pb-16 pt-24 lg:pb-20 lg:pt-28">
          <div className="label grid-12 gap-y-1 border-b border-line pb-3">
            <p className="text-fg lg:col-span-1">{no}</p>
            <p className="md:col-span-2 lg:col-span-4">{meta.join(" / ")}</p>
            <p className="md:col-span-3 lg:col-span-4">{role}</p>
          </div>

          <h2 data-reveal="fade" className="display mt-8 text-[clamp(3rem,11.6vw,12.5rem)] lg:mt-10">
            {heading}
          </h2>

          <div className="grid-12 mt-10 items-end gap-y-8 lg:mt-12">
            <div className="order-2 flex flex-col gap-6 md:col-span-2 lg:order-1 lg:col-span-3">
              {description && <p className="max-w-[24ch] text-lg leading-snug tracking-tight lg:text-xl">{description}</p>}
              <VisitLink href={href} />
            </div>
            <div className="order-1 -mx-(--gutter) md:col-span-6 md:mx-0 lg:order-2 lg:col-span-9">
              <Screenshot image={image} alt={alt} sizes="(min-width: 1440px) 1010px, (min-width: 1024px) 72vw, 100vw" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`tone-${tone} snap`}>
      <div className="shell grid-12 content-start lg:min-h-svh gap-y-4 pb-16 pt-24 lg:pb-24 lg:pt-28">
        {/* the number stays pinned while the screenshot scrolls past */}
        <div className="lg:col-span-1">
          <p className="label text-fg lg:sticky lg:top-28">{no}</p>
        </div>

        <div className="md:col-span-6 lg:col-span-11">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 data-reveal="fade" className="display text-[clamp(2.5rem,6.6vw,7.5rem)]">
              {heading}
            </h2>
            <div className="flex shrink-0 items-end justify-between gap-10 lg:flex-col lg:items-start lg:gap-6 lg:pb-2">
              <ul className="label">
                {meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                <li className="mt-2">{role}</li>
              </ul>
              <VisitLink href={href} />
            </div>
          </div>

          <div className="-mx-(--gutter) mt-10 md:mx-0 lg:mt-12">
            <Screenshot image={image} alt={alt} sizes="(min-width: 1440px) 1240px, (min-width: 1024px) 88vw, 100vw" />
          </div>
          {description && <p className="label mt-4">{description}</p>}
        </div>
      </div>
    </section>
  );
}
