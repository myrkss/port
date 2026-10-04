const fields = ["design", "web", "branding", "video", "photography", "marketing"];

const tools = [
  "photoshop",
  "illustrator",
  "figma",
  "premiere pro",
  "blender",
  "git",
  "ai-assisted development",
];

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="label pb-3">{title}</h3>
      <ul className="border-t border-line font-mono text-xs lg:text-sm">
        {items.map((item, index) => (
          <li key={item} className="flex gap-6 border-b border-line py-3">
            <span className="text-muted">{String(index + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="tone-light snap">
      <div className="shell pb-20 pt-24 lg:pb-32 lg:pt-36">
        <div className="grid-12 gap-y-10">
          <h2 data-reveal="fade" className="display text-[clamp(3rem,9.4vw,10.5rem)] lg:col-span-5">
            about
          </h2>
          <div
            data-reveal="fade"
            className="space-y-[1em] text-[clamp(1.4rem,2.7vw,2.6rem)] leading-[1.12] tracking-[-0.03em] md:col-span-6 lg:col-span-7 lg:pt-4"
          >
            <p className="text-balance">i work across web, visual design, video, branding and physical products.</p>
            <p className="text-balance text-muted">
              i like building complete ideas rather than staying inside a single discipline.
            </p>
          </div>
        </div>

        <div className="grid-12 mt-20 gap-y-12 lg:mt-36">
          <p className="label lg:col-span-5">(capabilities)</p>
          <div className="md:col-span-3 lg:col-span-3">
            <List title="fields" items={fields} />
          </div>
          <div className="md:col-span-3 lg:col-span-4">
            <List title="tools" items={tools} />
          </div>
        </div>
      </div>
    </section>
  );
}
