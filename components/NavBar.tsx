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

  // Logo à gauche, menu centré dans une pilule, bouton de thème seul à droite.
  // Sur mobile, "Accueil" est masqué : le logo ramène déjà à l'accueil.
  return (
    <nav className="w-full max-w-page mx-auto px-5 sm:px-10 xl:px-16 py-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 whitespace-nowrap">
      <Link href="/" className="justify-self-start no-underline inline-flex items-center gap-2 py-2" aria-label="Accueil">
        <span className="relative inline-flex items-center justify-center w-9 h-9 font-bold text-[1.25rem] text-fg">
          E
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent" aria-hidden="true" />
        </span>
        <span className="hidden lg:inline font-bold text-fg">Elisa Randriamasinoro</span>
      </Link>
      <ul className="flex items-center gap-1 list-none m-0 p-1 rounded-full border border-border bg-surface">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href} className={item.href === "/" ? "hidden sm:block" : undefined}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center min-h-[40px] px-4 rounded-full text-[15px] no-underline transition-colors duration-150 ${
                  active ? "bg-surface-2 text-accent-ink" : "text-fg-2 hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </nav>
  );
}
