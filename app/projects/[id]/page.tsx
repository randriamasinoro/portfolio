import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { readProject, readProjects, getRelatedProjects } from "@/lib/projects";
import { extractToc } from "@/lib/toc";
import { DOMAIN_CONFIG } from "@/types/project";
import TableOfContents from "@/components/TableOfContents";
import MDXContent from "@/components/MDXContent";
import ProjectJsonLd from "@/components/ProjectJsonLd";
import ProjectCard from "@/components/ProjectCard";
import DomainBadge from "@/components/DomainBadge";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = readProject(id);
  if (!data) return {};
  const { title, description, tags, domains } = data.frontmatter;
  const domainLabels = domains.map((d) => DOMAIN_CONFIG[d]?.label ?? d);
  return {
    title,
    description,
    keywords: [...tags, ...domainLabels],
    alternates: { canonical: `/projects/${id}` },
    openGraph: {
      type: "article",
      url: `https://sinoro.fr/projects/${id}`,
      title,
      description,
      authors: ["Sehenonirina Elisa Randriamasinoro"],
      tags,
    },
  };
}

export function generateStaticParams() {
  const projects = readProjects();
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const data = readProject(id);
  if (!data) notFound();

  const { frontmatter: project, content } = data;
  const toc = extractToc(content);
  const related = getRelatedProjects(id);

  return (
    <article className="pt-6 md:pt-12">
      <ProjectJsonLd project={project} />

      <Link href="/projects" className="text-[15px] text-fg-muted hover:text-accent-ink">
        Tous les projets
      </Link>

      {/* Titre dans la même colonne centrée que le texte ; la fiche technique à gauche.
          Sur mobile : titre, puis fiche, puis contenu (ordre du DOM). */}
      <div className="grid gap-10 lg:gap-x-16 lg:gap-y-10 mt-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <header className="min-w-0 w-full max-w-[720px] mx-auto lg:col-start-2 lg:row-start-1 lg:mt-4">
          <h1 className="text-[2.125rem] sm:text-[2.875rem] lg:text-[3.25rem] leading-[1.08]">{project.title}</h1>
        </header>

        <aside className="font-ui text-[14px] lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-6 lg:self-start">
          <dl className="grid grid-cols-[6rem_minmax(0,1fr)] lg:grid-cols-1 gap-x-4 gap-y-2 lg:gap-y-0 border-y border-border py-4">
            <dt className="text-fg-muted lg:mt-0">Année</dt>
            <dd className="lg:mb-4">{project.date}</dd>
            <dt className="text-fg-muted">Domaines</dt>
            <dd className="flex flex-col gap-1 lg:mb-4">
              {project.domains.map((d) => (
                <DomainBadge key={d} domain={d} />
              ))}
            </dd>
            <dt className="text-fg-muted">Technos</dt>
            <dd className="text-fg-2 leading-relaxed lg:mb-4">{project.tags.join(", ")}</dd>
            {project.github && (
              <>
                <dt className="text-fg-muted">Code</dt>
                <dd className="lg:mb-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-fg break-all">
                    Dépôt GitHub
                  </a>
                </dd>
              </>
            )}
            <dt className="text-fg-muted">Auteur</dt>
            <dd>
              {/* Signature auteur, E-E-A-T + maillage interne vers /about */}
              <Link href="/about" className="text-fg">
                Sehenonirina Elisa Randriamasinoro
              </Link>
            </dd>
          </dl>
          <TableOfContents items={toc} />
        </aside>

        <div className="min-w-0 w-full max-w-[1000px] mx-auto lg:col-start-2 lg:row-start-2">
          <p className="font-body text-[1.3125rem] leading-relaxed text-fg mb-10 max-w-[720px] mx-auto">{project.description}</p>
          <MDXContent content={content} />
        </div>
      </div>

      {/* Projets similaires, maillage interne + clusters thématiques */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-[1.75rem] mb-2">Projets proches</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-6">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
