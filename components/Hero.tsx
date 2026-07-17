import Link from "next/link";
import { GitHubIcon, ArrowRightIcon, ArrowUpRightIcon } from "./icons";

function BlinkingCursor() {
  return (
    <span
      className="inline-block w-[0.5ch] h-[0.9em] bg-accent align-bottom ml-2 animate-blink"
      aria-hidden="true"
      style={{ willChange: "opacity", transform: "translateZ(0)" }}
    />
  );
}

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-60px)] flex items-center">
      <div className="max-w-layout mx-auto px-6 py-24 w-full">
        <p className="font-mono text-[13px] text-accent tracking-[0.04em] mb-4 animate-fade-up">
          ~ / portfolio
        </p>

        <h1
          className="font-display font-bold text-fg mb-6"
          style={{
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            minHeight: "1.05em",
          }}
        >
          {/* Titre sémantique complet (SEO + lecteurs d'écran) */}
          <span className="sr-only">
            Sehenonirina Elisa Randriamasinoro, Cybersécurité &amp; Data Science
          </span>
          {/* Version visuelle */}
          <span aria-hidden="true">
            Elisa
            <BlinkingCursor />
          </span>
        </h1>

        <p
          className="font-body text-[17px] leading-[1.6] text-fg-2 max-w-[640px] mb-3 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Titulaire d&apos;un Master 1 Cybersécurité des Systèmes Embarqués
          (UBS Lorient). À la rentrée 2026, alternance en M2 Cybersécurité des
          Systèmes Embarqués à l&apos;UBS ou en 4ᵉ année du cycle ingénieur
          Cybersécurité &amp; Data Science à l&apos;ENSIBS Vannes.
          <br />
          Recherche une alternance dès septembre 2026 en cybersécurité,
          systèmes embarqués, data science ou intelligence artificielle.
        </p>

        <p
          className="font-mono text-[13px] text-fg-muted tracking-[0.04em] mb-10 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Cybersécurité{" "}
          <span className="text-accent">·</span>{" "}
          Systèmes Embarqués{" "}
          <span className="text-accent">·</span>{" "}
          Data Science
        </p>

        <div
          className="flex gap-3 flex-wrap animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/projects"
            className="font-body text-sm font-medium px-[18px] py-[11px] rounded bg-accent text-white border border-transparent inline-flex items-center gap-2 transition-all duration-200 hover:brightness-110"
          >
            Voir mes projets
            <ArrowRightIcon />
          </Link>
          <a
            href="https://github.com/randriamasinoro"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium px-[18px] py-[11px] rounded bg-transparent text-fg border border-border-strong inline-flex items-center gap-2 transition-all duration-200 hover:border-fg-muted"
          >
            <GitHubIcon />
            GitHub
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
