import Image from "next/image";
import Link from "next/link";
import { readProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

const SOCIALS = [
  { href: "https://github.com/randriamasinoro", label: "GitHub", icon: <GitHubIcon size={20} /> },
  { href: "https://www.linkedin.com/in/sehenonirina-elisa-randriamasinoro", label: "LinkedIn", icon: <LinkedInIcon size={20} /> },
  { href: "mailto:randriamasnrelisa@gmail.com", label: "Email", icon: <MailIcon size={20} /> },
] as const;

export default function HomePage() {
  const projects = readProjects();
  // Le premier et le dernier projet de la sélection sont les plus mémorisés :
  // l'ordre se règle avec `order` dans le frontmatter.
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const [lead, ...others] = featured;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-4 md:pt-10 pb-20 md:pb-28">
        <span
          className="pointer-events-none select-none absolute top-2 -left-2 font-ui font-bold text-watermark leading-[0.85] text-[5.5rem] sm:text-[9rem] lg:text-[13rem] tracking-[-0.03em] whitespace-nowrap"
          aria-hidden="true"
        >
          EMBARQUÉ
        </span>

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] items-center">
          <div className="relative z-10 lg:-mr-32">
            <div
              className="rounded-sm border border-border-strong px-6 py-8 sm:px-10 sm:py-12"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in srgb, var(--surface) 82%, transparent) 55%, color-mix(in srgb, var(--accent-deep) 85%, transparent))",
              }}
            >
              <h1 className="font-normal">
                <span className="block text-[1.75rem] sm:text-[2.25rem] text-fg-2">Bonjour,</span>
                <span className="block text-[2.5rem] sm:text-[3.75rem] leading-tight text-fg">je m&apos;appelle</span>
                <span className="block text-[3.5rem] sm:text-[5.5rem] leading-[1] font-bold text-accent">
                  <span className="sr-only">Sehenonirina </span>Elisa
                </span>
              </h1>
              <p className="text-[1.25rem] sm:text-[1.625rem] text-fg mt-5">
                Cybersécurité des systèmes embarqués
              </p>
            </div>

            <p className="text-fg-2 text-[1.0625rem] leading-relaxed mt-8 max-w-[46ch]">
              Master 2 à l&apos;UBS Lorient. Je cherche un stage de fin d&apos;études
              de 4 à 6 mois à partir de janvier 2027.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-6">
              <a
                href="mailto:randriamasnrelisa@gmail.com"
                className="no-underline bg-accent text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-150"
              >
                M&apos;écrire
              </a>
              <Link href="/projects" className="text-fg hover:text-accent-ink">
                Voir mes projets
              </Link>
              <ul className="flex items-center gap-1 list-none p-0 m-0 sm:ml-2">
                {SOCIALS.map(({ href, label, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="inline-flex items-center justify-center w-10 h-10 text-fg-muted hover:text-accent-ink transition-colors duration-150"
                    >
                      {icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] lg:max-w-[560px] lg:ml-auto lg:mr-0">
            <div className="absolute inset-x-0 bottom-0 top-[18%] bg-accent-deep" aria-hidden="true" />
            <Image
              src="/photo-detouree.png"
              alt="Portrait de Sehenonirina Elisa Randriamasinoro"
              width={950}
              height={810}
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="relative w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ── Projets choisis ── */}
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
          <h2 className="text-[2rem]">Projets</h2>
          <Link href="/projects" className="text-fg hover:text-accent-ink">
            Voir les {projects.length} projets
          </Link>
        </div>

        {lead && (
          <div className="grid gap-6">
            <ProjectCard project={lead} layout="horizontal" />
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Fin de page : disponibilité ── */}
      <section className="mt-24 rounded-xl border border-border bg-surface px-6 py-10 sm:px-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="max-w-[52ch]">
          <h2 className="text-[1.75rem] leading-tight">Disponible à partir de janvier 2027</h2>
          <p className="text-fg-2 leading-relaxed mt-3">
            Stage de fin d&apos;études de 4 à 6 mois en cybersécurité des systèmes
            embarqués, avec une perspective de pré-embauche. L&apos;alternance
            m&apos;intéresse aussi.
          </p>
        </div>
        <a
          href="mailto:randriamasnrelisa@gmail.com"
          className="justify-self-start no-underline bg-accent text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-150"
        >
          M&apos;écrire
        </a>
      </section>
    </>
  );
}
