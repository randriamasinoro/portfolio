"use client";

import type { Domain } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";

interface Props {
  activeDomains: Domain[];
  activeTags: string[];
  search: string;
  filteredCount: number;
  onDomainsChange: (domains: Domain[]) => void;
  onTagsChange: (tags: string[]) => void;
  onSearchChange: (q: string) => void;
}

// Onglets de domaine (un seul actif à la fois, "Tous" pour réinitialiser) + recherche.
export default function FilterBar({
  activeDomains,
  activeTags,
  search,
  filteredCount,
  onDomainsChange,
  onTagsChange,
  onSearchChange,
}: Props) {
  const domains = Object.entries(DOMAIN_CONFIG) as [Domain, (typeof DOMAIN_CONFIG)[Domain]][];
  const tabs: { key: Domain | null; label: string }[] = [
    { key: null, label: "Tous" },
    ...domains.map(([key, { label }]) => ({ key, label })),
  ];
  const current = activeDomains[0] ?? null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par domaine">
          {tabs.map(({ key, label }) => {
            const active = current === key;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onDomainsChange(key ? [key] : [])}
                aria-pressed={active}
                className={`min-h-[44px] px-4 rounded-md border text-[15px] cursor-pointer transition-colors duration-150 ${
                  active
                    ? "border-accent text-fg bg-surface"
                    : "border-transparent bg-transparent text-fg-2 hover:text-fg"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un titre ou une techno"
          aria-label="Rechercher un projet"
          className="lg:ml-auto w-full lg:w-72 bg-surface border border-border rounded-md text-fg placeholder:text-fg-muted px-4 min-h-[44px] outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-fg-muted">
        <span aria-live="polite">
          {filteredCount} projet{filteredCount > 1 ? "s" : ""}
        </span>
        {activeTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagsChange(activeTags.filter((t) => t !== tag))}
            aria-label={`Retirer le filtre ${tag}`}
            className="inline-flex items-center gap-2 bg-surface-2 text-fg border-none rounded-md px-3 min-h-[36px] cursor-pointer"
          >
            {tag}
            <span aria-hidden="true">×</span>
          </button>
        ))}
        {(activeTags.length > 0 || search) && (
          <button
            type="button"
            onClick={() => {
              onTagsChange([]);
              onSearchChange("");
            }}
            className="bg-transparent border-none p-0 cursor-pointer text-accent-ink underline"
          >
            Effacer la recherche
          </button>
        )}
      </div>
    </div>
  );
}
