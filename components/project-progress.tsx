"use client";

import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";

// tiny fixed 01–04 index on the right edge; only present while the work is on screen
export function ProjectProgress() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        setActive(projects.find((project) => inView.has(project.id))?.id ?? null);
      },
      // a hairline across the middle of the viewport decides which project is current
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const project of projects) {
      const section = document.getElementById(project.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="project progress"
      inert={active === null}
      className={`fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 font-mono text-[0.6875rem] transition-opacity duration-300 lg:block ${
        active === null ? "opacity-0" : "opacity-100"
      }`}
    >
      <ol className="flex flex-col gap-1">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={`#${project.id}`}
              aria-label={`${project.no} — ${project.name}`}
              aria-current={active === project.id ? "true" : undefined}
              className={`chip block ${active === project.id ? "" : "text-[#8b8b8b]"}`}
            >
              {project.no}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
