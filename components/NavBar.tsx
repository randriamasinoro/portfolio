"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/about", label: "À propos" },
] as const;

export default function NavBar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className="max-w-page mx-auto px-4 sm:px-8 py-5 flex items-center gap-1 sm:gap-4 whitespace-nowrap">
      <Link href="/" className="mr-auto no-underline inline-flex items-center gap-2 py-2" aria-label="Accueil">
        <span className="relative inline-flex items-center justify-center w-9 h-9 font-bold text-[1.25rem] text-fg">
          E
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent" aria-hidden="true" />
        </span>
        <span className="hidden sm:inline font-bold text-fg">Elisa Randriamasinoro</span>
      </Link>
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex items-center min-h-[40px] px-2 text-[15px] no-underline border-b-2 transition-colors duration-150 ${
              active ? "text-accent-ink border-accent" : "text-fg border-transparent hover:text-accent-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <ThemeToggle />
    </nav>
  );
}
