import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MailIcon } from "@/components/icons";
import { HERO_SKILLS } from "@/lib/about";

// Bannière de présentation de l'accueil. Toujours sombre (classe `dark` locale),
// y compris en thème clair, comme un écran. La photo est posée sur un halo violet
// qui fait office de projecteur ; le texte est aligné à droite à partir de lg.
export default function HeroBanner() {
  return (
    <div className="dark relative isolate overflow-hidden rounded-xl border border-border bg-bg text-fg">
      {/* Ambiance : violet profond à gauche, bords assombris */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70% 90% at 22% 70%, color-mix(in srgb, var(--accent-deep) 85%, transparent), transparent 70%), radial-gradient(130% 120% at 50% 40%, transparent 55%, color-mix(in srgb, black 55%, transparent))",
        }}
      />

      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:min-h-[600px] xl:min-h-[680px]">
        <div className="flex flex-col items-start justify-center px-6 pt-10 sm:px-10 sm:pt-14 lg:order-last lg:items-end lg:text-right lg:py-16 xl:pr-16">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface px-4 py-1.5 whitespace-nowrap font-inter font-semibold text-[0.6875rem] sm:text-[0.75rem] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-fg-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            Stage dès janvier 2027
          </p>

          <h1 className="mt-6 font-display font-normal text-[2.75rem] sm:text-[4rem] xl:text-[4.75rem] 2xl:text-[5.5rem] leading-[0.98] tracking-[-0.01em]">
            Bonjour,
            <br />
            <span className="sm:whitespace-nowrap">
              je m&apos;appelle <span className="sr-only">Sehenonirina </span>
              <span className="italic text-accent">Elisa.</span>
            </span>
          </h1>

          <p className="mt-6 font-inter text-[0.8125rem] sm:text-[0.875rem] uppercase tracking-[0.22em] text-fg-muted">
            {/* Le point suit le mot : un retour à la ligne ne commence jamais par un point */}
            {HERO_SKILLS.join("\u00a0· ")}
          </p>

          <p className="mt-7 max-w-[40ch] font-inter text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-fg-2">
            En Master 2 à l&apos;UBS Lorient, je travaille sur la sécurité des systèmes
            embarqués, du firmware au réseau.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 lg:justify-end">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 min-h-12 rounded-full bg-accent px-6 font-inter font-semibold text-white no-underline hover:opacity-90 transition-opacity duration-150"
            >
              Voir mes projets
              <ArrowRightIcon size={15} />
            </Link>
            <a
              href="mailto:randriamasnrelisa@gmail.com"
              className="inline-flex items-center gap-2 min-h-12 rounded-full border border-border-strong bg-surface px-6 font-inter font-semibold text-fg no-underline hover:border-fg-muted transition-colors duration-150"
            >
              <MailIcon size={16} />
              M&apos;écrire
            </a>
          </div>
        </div>

        {/* Photo sur son halo : sous le texte sur mobile, à gauche à partir de lg */}
        <div className="relative flex items-end justify-center px-6 pt-10 lg:justify-start lg:pl-10 lg:pr-0 lg:pt-16">
          <div
            className="pointer-events-none absolute left-1/2 bottom-0 -z-10 w-[130%] max-w-[900px] aspect-square -translate-x-1/2 translate-y-[30%] lg:left-[42%]"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 75%, transparent), color-mix(in srgb, var(--accent) 30%, transparent) 45%, transparent 100%)",
            }}
          />
          <Image
            src="/photo-detouree.png"
            alt="Portrait de Sehenonirina Elisa Randriamasinoro"
            width={950}
            height={810}
            priority
            sizes="(min-width: 1024px) 600px, 90vw"
            className="w-full max-w-[400px] lg:max-w-[600px] h-auto [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          />
        </div>
      </div>
    </div>
  );
}
