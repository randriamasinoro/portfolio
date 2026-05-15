"use client";

import type { Domain, Project } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";

interface Props {
  allProjects: Project[];
  activeDomains: Domain[];
  activeTags: string[];
  search: string;
  filteredCount: number;
  onDomainsChange: (domains: Domain[]) => void;
  onTagsChange: (tags: string[]) => void;
  onSearchChange: (q: string) => void;
}

export default function FilterBar({
  allProjects,
  activeDomains,
  activeTags,
  search,
  filteredCount,
  onDomainsChange,
  onTagsChange,
  onSearchChange,
}: Props) {
  const domains = Object.entries(DOMAIN_CONFIG) as [Domain, { label: string; color: string }][];

  const allTags = Array.from(
    new Set(
      allProjects
        .filter((p) =>
          activeDomains.length === 0 || p.domains.some((d) => activeDomains.includes(d))
        )
        .flatMap((p) => p.tags)
    )
  ).sort();

  function toggleDomain(key: Domain) {
    onDomainsChange(
      activeDomains.includes(key)
        ? activeDomains.filter((d) => d !== key)
        : [...activeDomains, key]
    );
  }

  function toggleTag(tag: string) {
    onTagsChange(
      activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag]
    );
  }

  const hasFilters = activeDomains.length > 0 || activeTags.length > 0 || search.length > 0;

  return (
    <div className="bg-surface border border-border rounded flex flex-col gap-[14px] p-[18px]">
      {/* Recherche */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un projet, une technologie…"
          className="w-full bg-surface-2 border border-border text-fg font-body text-sm placeholder:text-fg-dim rounded pl-9 pr-4 py-[9px] outline-none focus:border-accent transition-colors duration-200"
          aria-label="Rechercher un projet"
        />
      </div>

      {/* Filtres domaines */}
      <div className="flex gap-2 flex-wrap items-center">
        <span className="font-mono text-[11px] text-fg-muted tracking-[0.04em] mr-1">
          DOMAINES
        </span>
        {domains.map(([key, { label, color }]) => {
          const active = activeDomains.includes(key);
          return (
            <button
              key={key}
              onClick={() => toggleDomain(key)}
              className="font-mono text-xs inline-flex items-center gap-[6px] rounded-full cursor-pointer transition-all duration-200"
              style={{
                padding: "5px 11px",
                border: `1px solid ${active ? `${color}66` : "#2A2A3E"}`,
                background: active ? `${color}1F` : "transparent",
                color: active ? color : "#6B7280",
                letterSpacing: "0.02em",
              }}
              aria-pressed={active}
            >
              {active && (
                <span
                  className="w-[6px] h-[6px] rounded-full bg-current inline-block"
                  aria-hidden="true"
                />
              )}
              {label}
            </button>
          );
        })}
        {activeDomains.length > 0 && (
          <button
            onClick={() => onDomainsChange([])}
            className="font-mono text-[11px] text-fg-muted bg-transparent border-none cursor-pointer px-[6px] py-1 hover:text-fg transition-colors duration-200"
          >
            réinitialiser
          </button>
        )}
      </div>

      {/* Filtres tags */}
      {allTags.length > 0 && (
        <div className="flex gap-2 flex-wrap items-center">
          <span className="font-mono text-[11px] text-fg-muted tracking-[0.04em] mr-1">
            TAGS
          </span>
          {allTags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="font-mono text-[11px] cursor-pointer rounded-sm transition-all duration-200 border-none"
                style={{
                  padding: "3px 8px",
                  background: active ? "#20203A" : "#1A1A2E",
                  color: active ? "#E8E8F0" : "#B0B0C0",
                  letterSpacing: "0.04em",
                }}
                aria-pressed={active}
              >
                {tag}
              </button>
            );
          })}
          {activeTags.length > 0 && (
            <button
              onClick={() => onTagsChange([])}
              className="font-mono text-[11px] text-fg-muted bg-transparent border-none cursor-pointer px-[6px] py-1 hover:text-fg transition-colors duration-200"
            >
              réinitialiser
            </button>
          )}
        </div>
      )}

      {/* Compteur */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-fg-muted">
          {filteredCount} projet{filteredCount > 1 ? "s" : ""}
          {hasFilters && " · filtré"}
        </span>
        {hasFilters && (
          <button
            onClick={() => {
              onDomainsChange([]);
              onTagsChange([]);
              onSearchChange("");
            }}
            className="font-mono text-[11px] text-fg-dim hover:text-fg-muted transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            tout effacer
          </button>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
