"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";
import { GitHubIcon } from "./icons";
import DomainBadge from "./DomainBadge";
import TechTag from "./TechTag";

interface Props {
  project: Project;
  onTagClick?: (tag: string) => void;
}

export default function ProjectCard({ project, onTagClick }: Props) {
  const [hovered, setHovered] = useState(false);

  const primaryDomain = project.domains[0];
  const domainColor = DOMAIN_CONFIG[primaryDomain]?.color ?? "#2D7DD2";

  const borderColor = hovered ? `${domainColor}66` : "var(--border)";
  const boxShadow = hovered
    ? `0 0 0 1px ${domainColor}66, 0 8px 32px -8px ${domainColor}80`
    : "none";

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-surface rounded flex flex-col gap-[14px]"
      style={{
        padding: "22px",
        border: `1px solid ${borderColor}`,
        boxShadow,
        transition: "border-color 200ms cubic-bezier(0.2,0,0,1), box-shadow 200ms cubic-bezier(0.2,0,0,1)",
        minHeight: "200px",
      }}
    >
      <div className="flex gap-2 flex-wrap">
        {project.domains.map((d) => (
          <DomainBadge key={d} domain={d} size="sm" />
        ))}
      </div>

      {/* Stretched link sur le titre — rend toute la card navigable au clavier */}
      <h3
        className="font-display font-bold text-fg m-0 leading-[1.2]"
        style={{ fontSize: "22px", letterSpacing: "-0.02em" }}
      >
        <Link
          href={`/projects/${project.id}`}
          className="text-fg no-underline focus-visible:outline-none before:absolute before:inset-0 before:rounded before:content-['']"
        >
          {project.title}
        </Link>
      </h3>

      <p
        className="font-body text-sm text-fg-2 m-0 leading-[1.55]"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </p>

      <div className="relative z-10 flex gap-3 flex-wrap mt-auto">
        {project.tags.slice(0, 4).map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagClick?.(tag)}
            className={
              onTagClick
                ? "cursor-pointer bg-transparent border-none p-0 text-inherit"
                : "cursor-default bg-transparent border-none p-0 text-inherit"
            }
            tabIndex={onTagClick ? 0 : -1}
            aria-label={onTagClick ? `Filtrer par ${tag}` : undefined}
          >
            <TechTag>{tag}</TechTag>
          </button>
        ))}
      </div>

      <div className="relative z-10 flex justify-between items-center pt-3 border-t border-border">
        <span className="font-mono text-[11px] text-fg-muted">
          {project.date}
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Code source de ${project.title} sur GitHub`}
          className="text-fg-muted hover:text-fg transition-colors duration-200 inline-flex"
        >
          <GitHubIcon size={15} />
        </a>
      </div>
    </article>
  );
}
