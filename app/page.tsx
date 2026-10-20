import Link from "next/link";
import { readProjects } from "@/lib/projects";
import HeroBanner from "@/components/HeroBanner";
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
      <section className="pt-4 md:pt-8 pb-20 md:pb-28">
        <HeroBanner projectCount={projects.length} />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <p className="text-fg-2 text-[1.0625rem] leading-relaxed max-w-[52ch]">
            Je cherche un stage de fin d&apos;études de 20 semaines minimum à partir
            de janvier 2027.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
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
            <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
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
            Stage de fin d&apos;études de 20 semaines minimum en cybersécurité des systèmes
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
