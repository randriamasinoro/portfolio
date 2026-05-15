"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/about", label: "À propos" },
] as const;

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-border"
      style={{ background: "rgba(10,10,15,0.72)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-layout mx-auto h-full flex items-center gap-8 px-6">
        <Link
          href="/"
          className="font-mono text-[15px] font-semibold text-fg tracking-[0.02em] no-underline"
        >
          elisa<span className="text-accent">.dev</span>
        </Link>

        <div className="flex gap-7">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative font-body text-sm font-medium py-[6px]
                  no-underline whitespace-nowrap
                  transition-colors duration-200 ease-ease
                  ${active ? "text-fg" : "text-fg-muted hover:text-fg"}
                `}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute bottom-[-3px] left-0 right-0 h-[2px] bg-accent rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex gap-[14px] items-center text-fg-2">
          <a
            href="https://github.com/randriamasinoro-elisa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex text-fg-2 hover:text-fg transition-colors duration-200"
          >
            <GitHubIcon />
          </a>
          <a
            href="mailto:randriamasnrelisa@gmail.com"
            aria-label="Envoyer un email"
            className="inline-flex text-fg-2 hover:text-fg transition-colors duration-200"
          >
            <MailIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}

function GitHubIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x={2} y={4} width={20} height={16} rx={2} />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
