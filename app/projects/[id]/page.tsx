import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { readProject, readProjects } from "@/lib/projects";
import { extractToc } from "@/lib/toc";
import { DOMAIN_CONFIG } from "@/types/project";
import DomainBadge from "@/components/DomainBadge";
import TechTag from "@/components/TechTag";
import TableOfContents from "@/components/TableOfContents";
import MDXContent from "@/components/MDXContent";
import ProjectJsonLd from "@/components/ProjectJsonLd";

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
  const primaryDomain = project.domains[0];
  const domainColor = DOMAIN_CONFIG[primaryDomain]?.color ?? "#2D7DD2";

  return (
    <div className="max-w-layout mx-auto px-6 py-16">
      <ProjectJsonLd project={project} />

      {/* Breadcrumb */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-[6px] font-mono text-xs text-fg-muted hover:text-fg transition-colors duration-200 mb-6 no-underline"
      >
        <ArrowLeftIcon />
        Projets
      </Link>

      {/* Header */}
      <header className="mb-12 pb-8 border-b border-border">
        <div className="flex gap-2 flex-wrap mb-5">
          {project.domains.map((d) => (
            <DomainBadge key={d} domain={d} />
          ))}
        </div>

        <h1
          className="font-display font-bold text-fg mb-4"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}
        </h1>

        <p className="font-body text-[18px] leading-[1.55] text-fg-2 max-w-[720px] mb-6">
          {project.description}
        </p>

        <div className="flex gap-[14px] flex-wrap items-center mb-5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-medium px-[14px] py-[9px] rounded bg-surface text-fg border border-border-strong no-underline transition-colors duration-200 hover:border-fg-muted"
          >
            <GitHubIcon />
            Code source
            <ArrowUpRightIcon />
          </a>
          <span className="font-mono text-xs text-fg-muted inline-flex items-center gap-4">
            <span>{project.date}</span>
            <span
              className="w-1 h-1 rounded-full bg-fg-dim inline-block"
              aria-hidden="true"
            />
            <span>{project.tags.length} stack</span>
          </span>
        </div>

        <div className="flex gap-3 flex-wrap">
          {project.tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
      </header>

      {/* Contenu + ToC */}
      <div className="grid gap-16 items-start lg:grid-cols-[minmax(0,1fr)_220px]">
        <main
          className="min-w-0"
          style={{ "--domain-color": domainColor } as React.CSSProperties}
        >
          <MDXContent content={content} domainColor={domainColor} />
        </main>

        <TableOfContents items={toc} />
      </div>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
