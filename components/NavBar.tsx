"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { GitHubIcon, MailIcon, MenuIcon, XIcon } from "./icons";

const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/about", label: "À propos" },
] as const;

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-border nav-blur">
        <div className="max-w-layout mx-auto h-full flex items-center gap-6 md:gap-8 px-4 md:px-6">
          <Link
            href="/"
            className="font-mono text-[15px] font-semibold text-fg tracking-[0.02em] no-underline shrink-0"
            onClick={() => setOpen(false)}
          >
            elisa<span className="text-accent">.dev</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-7">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-body text-sm font-medium py-[6px] no-underline whitespace-nowrap transition-colors duration-200 ${active ? "text-fg" : "text-fg-muted hover:text-fg"}`}
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

          {/* Desktop icons + theme toggle */}
          <div className="ml-auto hidden md:flex gap-[14px] items-center text-fg-2">
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
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            className="ml-auto md:hidden text-fg-2 hover:text-fg transition-colors duration-200 p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="fixed top-[60px] left-0 right-0 z-40 border-b border-border nav-menu-blur"
          >
            <div className="max-w-layout mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`font-body text-sm font-medium px-3 py-3 rounded no-underline transition-colors duration-200 ${active ? "text-fg bg-surface" : "text-fg-muted hover:text-fg hover:bg-surface"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex gap-3 items-center px-3 pt-2 pb-1 border-t border-border mt-1">
                <a
                  href="https://github.com/randriamasinoro-elisa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-fg-2 hover:text-fg transition-colors duration-200 inline-flex"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="mailto:randriamasnrelisa@gmail.com"
                  aria-label="Envoyer un email"
                  className="text-fg-2 hover:text-fg transition-colors duration-200 inline-flex"
                >
                  <MailIcon />
                </a>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
