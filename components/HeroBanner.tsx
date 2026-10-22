import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MailIcon } from "@/components/icons";
import { HERO_SKILLS } from "@/lib/about";

// Présentation de l'accueil, seule sur la page : elle remplit la hauteur sous la
// nav (data-fullscreen, voir le <main> du layout) sans défilement, posée sur la
// page (pas de carte) et suivant le thème. Composition symétrique : le bloc est
// centré sur l'écran entier, un peu au-dessus du milieu (le padding bas compense
// la hauteur de la nav), le bas de la photo (coupé droit) est sur la ligne des
// boutons, et la photo est aussi loin du bord gauche que le texte du bord droit.
// Pleine largeur pour que le halo ne soit coupé que par les bords de l'écran.
export default function HeroBanner() {
  return (
    <section
      data-fullscreen
      className="relative isolate overflow-hidden min-h-full -mx-5 sm:-mx-10 xl:-mx-16 px-5 sm:px-10 xl:px-16 py-6 lg:pt-6 lg:pb-[calc(7rem+4dvh)] flex flex-col justify-center text-fg"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:px-12 xl:px-24 2xl:px-32">
        <div className="flex flex-col items-start lg:order-last lg:items-end lg:text-right">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface px-4 py-1.5 whitespace-nowrap font-ui font-semibold text-[0.6875rem] sm:text-[0.75rem] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-fg-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            Stage dès janvier 2027
          </p>

          <h1 className="mt-6 font-display font-normal text-[2.75rem] sm:text-[4rem] xl:text-[4.75rem] 2xl:text-[5.5rem] leading-[0.98] tracking-[-0.01em]">
            Bonjour,
            <br />
            <span className="sm:whitespace-nowrap">
              je m&apos;appelle <span className="sr-only">Sehenonirina</span>{" "}
              <span className="italic text-accent">Elisa.</span>
            </span>
          </h1>

          <p className="mt-6 font-ui text-[0.8125rem] sm:text-[0.875rem] uppercase tracking-[0.22em] lg:tracking-[0.14em] xl:tracking-[0.22em] text-fg-muted">
            {/* Le point suit le mot : un retour à la ligne ne commence jamais par un point */}
            {HERO_SKILLS.join(" · ")}
          </p>

          <p className="mt-7 max-w-[40ch] font-ui text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-fg-2">
            En Master 2 à l&apos;UBS Lorient, je travaille sur la sécurité des systèmes
            embarqués, du firmware au réseau.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 lg:justify-end">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 min-h-12 rounded-full bg-accent px-6 font-ui font-semibold text-white no-underline hover:opacity-90 transition-opacity duration-150"
            >
              Voir mes projets
              <ArrowRightIcon size={15} />
            </Link>
            <a
              href="mailto:randriamasnrelisa@gmail.com"
              className="inline-flex items-center gap-2 min-h-12 rounded-full border border-border-strong bg-surface px-6 font-ui font-semibold text-fg no-underline hover:border-fg-muted transition-colors duration-150"
            >
              <MailIcon size={16} />
              M&apos;écrire
            </a>
          </div>
        </div>

        {/* Photo sur son halo : sous le texte sur mobile, à gauche à partir de lg.
            Sa largeur dépend de la hauteur d'écran (dvh) pour que tout tienne sans
            défilement. Côtés fondus (image) ; bas fondu vers le noir en thème sombre
            seulement (enveloppe), coupé droit en thème clair où une veste noire
            fondue vers le blanc paraît délavée. Deux masques imbriqués plutôt que
            mask-composite. */}
        <div className="relative justify-self-center lg:justify-self-start w-[clamp(160px,calc((100dvh-36rem)*950/810),420px)] lg:w-[min(100%,calc((96dvh-15rem)*950/810),640px)]">
          {/* Halo en ellipse : il s'éteint avant le haut de la section (sinon une
              ligne apparaît sous la nav) et au bas de la photo, pour que le fondu du
              bas aille vers le fond de la page et pas vers le violet */}
          <div
            className="pointer-events-none absolute -z-10 left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[190%] h-[116%]"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(closest-side, var(--hero-spot), color-mix(in srgb, var(--hero-spot) 45%, transparent) 35%, color-mix(in srgb, var(--hero-spot) 12%, transparent) 70%, transparent 100%)",
            }}
          />
          <div className="dark:[mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
            <Image
              src="/photo-detouree.png"
              alt="Portrait de Sehenonirina Elisa Randriamasinoro"
              width={950}
              height={810}
              priority
              quality={90}
              sizes="(min-width: 1024px) 640px, 420px"
              className="block w-full h-auto [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
