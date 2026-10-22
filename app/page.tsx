import Link from "next/link";
import { readProjects } from "@/lib/projects";
import HeroBanner from "@/components/HeroBanner";
import ProjectCard from "@/components/ProjectCard";

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
        <HeroBanner />
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
