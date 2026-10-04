import { projects } from "@/lib/projects";

export function WorkIndex() {
  return (
    <nav id="work" aria-label="selected work" className="tone-dark">
      <div className="shell pb-24 pt-20 lg:pb-36 lg:pt-28">
        <p className="label mb-4">selected work</p>
        <ol className="border-t border-line">
          {projects.map((project) => (
            <li key={project.id} className="border-b border-line">
              <a
                href={`#${project.id}`}
                className="group flex items-baseline gap-4 py-4 transition-[padding] duration-300 ease-out hover:pl-2 lg:gap-6 lg:py-5"
              >
                <span className="label w-6 shrink-0 lg:w-[calc((100%-264px)/12)]">{project.no}</span>
                <span className="text-lg tracking-tight lg:text-2xl">— {project.name}</span>
                <span className="label ml-auto hidden md:block">{project.category}</span>
                <span
                  aria-hidden="true"
                  className="ml-auto font-mono text-xs text-muted transition-colors group-hover:text-fg md:ml-10"
                >
                  ↓
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
