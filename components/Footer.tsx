const LINKS = [
  { href: "mailto:randriamasnrelisa@gmail.com", label: "randriamasnrelisa@gmail.com" },
  { href: "https://github.com/randriamasinoro", label: "GitHub" },
  { href: "https://www.linkedin.com/in/sehenonirina-elisa-randriamasinoro", label: "LinkedIn" },
  { href: "https://github.com/randriamasinoro/portfolio", label: "Code source du site" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-page mx-auto px-4 sm:px-8 py-8 flex flex-wrap justify-between gap-x-8 gap-y-3 font-ui text-sm text-fg-muted">
        <p className="m-0 py-2">Elisa Randriamasinoro, Lorient</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-block py-2 text-fg-muted hover:text-fg"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
