const links = [
  { href: "#work", label: "work" },
  { href: "#about", label: "about" },
  { href: "#contact", label: "contact" },
];

// links sit on small solid labels: legible over dark, light and full-colour media while staying monochrome
export function Navigation() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 font-mono text-[0.6875rem] text-[#f5f5f5] lg:text-xs">
      <div className="shell flex items-baseline justify-between pt-4 lg:pt-6">
        <a href="#top" className="chip pointer-events-auto -ml-[0.5em]">
          svjatolsavs sapa
        </a>
        <nav aria-label="main">
          <ul className="-mr-[0.5em] flex gap-2 lg:gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="chip pointer-events-auto">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
