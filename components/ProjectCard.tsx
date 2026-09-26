import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";

interface Props {
  project: Project;
  layout?: "vertical" | "horizontal"; // horizontal : projet phare de l'accueil
  onTagClick?: (tag: string) => void;
}

// Couverture typographique : un mot-clé du projet sur fond sombre,
// avec un halo à la couleur du domaine principal. Une vraie photo (`cover`) la remplace.
function Cover({ project, large }: { project: Project; large: boolean }) {
  const domain = DOMAIN_CONFIG[project.domains[0]];
  if (project.cover) {
    return (
      <div className="relative h-full min-h-[200px] bg-scope-bg">
        <Image src={project.cover} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className="relative h-full min-h-[200px] bg-scope-bg overflow-hidden flex items-end p-6"
      style={{
        backgroundImage: `radial-gradient(circle at 15% 10%, color-mix(in srgb, ${domain?.trace ?? "var(--accent)"} 45%, transparent), transparent 55%), radial-gradient(circle at 95% 100%, color-mix(in srgb, var(--accent) 40%, transparent), transparent 50%)`,
      }}
      aria-hidden="true"
    >
      <span
        className={`font-ui font-bold text-scope-fg leading-none tracking-[-0.01em] ${
          large ? "text-[3rem] sm:text-[4rem]" : "text-[2.5rem]"
        }`}
      >
        {project.label ?? project.tags[0]}
      </span>
    </div>
  );
}

export default function ProjectCard({ project, layout = "vertical", onTagClick }: Props) {
  const horizontal = layout === "horizontal";
  const tags = project.tags.slice(0, 4);

  return (
    <article
      className={`group relative rounded-xl border border-border bg-surface overflow-hidden transition-colors duration-200 hover:border-accent ${
        horizontal ? "grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]" : "flex flex-col"
      }`}
    >
      <div className={horizontal ? "aspect-[16/9] md:aspect-auto" : "aspect-[16/9]"}>
        <Cover project={project} large={horizontal} />
      </div>

      <div className={`flex flex-col gap-3 ${horizontal ? "p-6 md:p-8 justify-center" : "p-5 flex-1"}`}>
        <div className="flex flex-wrap gap-2">
          {project.domains.map((d) => (
            <span
              key={d}
              className="text-[12px] px-2 py-[3px] rounded-md border border-border-strong"
              style={{ color: DOMAIN_CONFIG[d]?.ink }}
            >
              {DOMAIN_CONFIG[d]?.label}
            </span>
          ))}
        </div>

        <h3 className={horizontal ? "text-[1.5rem] leading-snug" : "text-[1.125rem] leading-snug"}>
          <Link
            href={`/projects/${project.id}`}
            className="text-fg no-underline before:absolute before:inset-0 before:content-[''] group-hover:text-accent-ink transition-colors duration-200"
          >
            {project.title}
          </Link>
        </h3>

        <p className={`text-fg-2 leading-relaxed ${horizontal ? "text-[1rem]" : "text-[14.5px] line-clamp-3"}`}>
          {project.description}
        </p>

        <p className="relative mt-auto pt-2 flex flex-wrap gap-x-3 gap-y-2 text-[13px] text-fg-muted">
          <span>{project.date}</span>
          {tags.map((tag) =>
            onTagClick ? (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick(tag)}
                aria-label={`Filtrer par ${tag}`}
                className="bg-transparent border-none px-1 -mx-1 py-2 -my-2 cursor-pointer text-fg-muted hover:text-accent-ink"
              >
                {tag}
              </button>
            ) : (
              <span key={tag}>{tag}</span>
            )
          )}
        </p>
      </div>
    </article>
  );
}
