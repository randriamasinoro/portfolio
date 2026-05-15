"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";
import DomainBadge from "./DomainBadge";
import TechTag from "./TechTag";

interface Props {
  project: Project;
  onTagClick?: (tag: string) => void;
}

export default function ProjectCard({ project, onTagClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const primaryDomain = project.domains[0];
  const domainColor = DOMAIN_CONFIG[primaryDomain]?.color ?? "#2D7DD2";

  const borderColor = hovered ? `${domainColor}66` : "#1E1E2E";
  const boxShadow = hovered
    ? `0 0 0 1px ${domainColor}66, 0 8px 32px -8px ${domainColor}80`
    : "none";

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/projects/${project.id}`)}
      className="bg-surface rounded flex flex-col gap-[14px] cursor-pointer"
      style={{
        padding: "22px",
        border: `1px solid ${borderColor}`,
        boxShadow,
        transition: "all 200ms cubic-bezier(0.2,0,0,1)",
        minHeight: "200px",
      }}
    >
      <div className="flex gap-2 flex-wrap">
        {project.domains.map((d) => (
          <DomainBadge key={d} domain={d} size="sm" />
        ))}
      </div>

      <h3
        className="font-display font-bold text-fg m-0 leading-[1.2]"
        style={{ fontSize: "22px", letterSpacing: "-0.02em" }}
      >
        {project.title}
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

      <div className="flex gap-3 flex-wrap mt-auto">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            onClick={(e) => {
              if (!onTagClick) return;
              e.stopPropagation();
              onTagClick(tag);
            }}
            className={onTagClick ? "cursor-pointer" : undefined}
          >
            <TechTag>{tag}</TechTag>
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-border">
        <span className="font-mono text-[11px] text-fg-muted">
          {project.date}
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Code source de ${project.title} sur GitHub`}
          onClick={(e) => e.stopPropagation()}
          className="text-fg-muted hover:text-fg transition-colors duration-200 inline-flex"
        >
          <GitHubIcon />
        </a>
      </div>
    </article>
  );
}

function GitHubIcon() {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
