import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { HERO_SKILLS } from "@/lib/about";
import { HERO_LOGOS } from "@/lib/tech-logos";

interface HeroBannerProps {
  projectCount: number;
}

// Bannière de présentation de l'accueil. Toujours sombre (classe `dark` locale),
// y compris en thème clair, comme un écran.
export default function HeroBanner({ projectCount }: HeroBannerProps) {
  return (
    <div className="dark relative overflow-hidden rounded-xl border border-border bg-surface text-fg">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(55% 75% at 18% 100%, color-mix(in srgb, var(--accent) 38%, transparent), transparent 70%), radial-gradient(40% 60% at 100% 0%, color-mix(in srgb, var(--accent-deep) 70%, transparent), transparent 70%)",
        }}
      />

      <div className="relative grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Photo : en bas sur mobile, à gauche à partir de lg */}
        <div className="order-last lg:order-first flex items-end justify-center lg:justify-start px-6 lg:pl-10 lg:pr-0 pt-2 lg:pt-20">
          <Image
            src="/photo-detouree.png"
            alt="Portrait de Sehenonirina Elisa Randriamasinoro"
            width={950}
            height={810}
            priority
            sizes="(min-width: 1024px) 460px, 85vw"
            className="w-full max-w-[340px] lg:max-w-[460px] h-auto"
          />
        </div>

        <div className="flex flex-col items-start lg:items-end lg:text-right gap-6 px-6 pt-6 sm:px-10 sm:pt-10 lg:py-14 xl:px-14 xl:py-16">
          <Link
            href="/projects"
            className="lg:absolute lg:top-8 lg:left-10 inline-flex items-center gap-2.5 min-h-10 no-underline font-inter text-[0.9375rem] text-fg-2 hover:text-fg transition-colors duration-150"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white">
              <CheckIcon size={13} />
            </span>
            <span>
              <span className="font-display text-[1.25rem] text-fg">{projectCount}</span> projets réalisés
            </span>
          </Link>

          <p className="inline-flex items-center gap-2.5 rounded-md border border-border-strong bg-surface-2/80 px-3.5 py-1.5 font-inter font-semibold text-[0.9375rem] text-fg">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            Master 2 · UBS Lorient
          </p>

          <h1 className="font-inter font-normal text-[2rem] sm:text-[2.5rem] xl:text-[2.875rem] leading-[1.12] tracking-[-0.02em] max-w-[24ch]">
            <span className="font-display text-[1.12em] tracking-normal">
              Bonjour, je m&apos;appelle <span className="sr-only">Sehenonirina </span>
              <span className="text-accent-ink">Elisa.</span>
            </span>{" "}
            Je travaille sur la sécurité des systèmes embarqués, du firmware au réseau.
          </h1>

          <div className="flex flex-col items-start lg:items-end gap-5 xl:flex-row xl:items-center xl:gap-8 lg:mt-2">
            {/* La puce suit le mot : un retour à la ligne ne commence jamais par une puce */}
            <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1 list-none p-0 m-0 font-inter font-bold text-[1.0625rem] sm:text-[1.1875rem] lg:justify-end xl:flex-nowrap xl:whitespace-nowrap">
              {HERO_SKILLS.map((skill, i) => (
                <li key={skill} className="flex items-center gap-2.5">
                  {skill}
                  {i < HERO_SKILLS.length - 1 && (
                    <span className="text-fg-muted" aria-hidden="true">
                      •
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <ul className="flex items-center -space-x-2 list-none p-0 m-0" aria-label="Outils">
              {HERO_LOGOS.map(({ title, path }) => (
                <li
                  key={title}
                  title={title}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-surface bg-surface-2 text-fg"
                >
                  <svg width={19} height={19} viewBox="0 0 24 24" fill="currentColor" role="img" aria-label={title}>
                    <path d={path} />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
