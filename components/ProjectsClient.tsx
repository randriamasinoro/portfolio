"use client";

import { useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Domain, Project } from "@/types/project";
import FilterBar from "./FilterBar";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];
}

export default function ProjectsClient({ projects }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeDomains = searchParams.getAll("domain") as Domain[];
  const activeTags = searchParams.getAll("tag");
  const search = searchParams.get("q") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string[]>) => {
      const params = new URLSearchParams();
      const merged = {
        domain: activeDomains,
        tag: activeTags,
        q: search ? [search] : [],
        ...updates,
      };
      Object.entries(merged).forEach(([key, values]) => {
        values.forEach((v) => { if (v) params.append(key, v); });
      });
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [activeDomains, activeTags, search, pathname, router]
  );

  const setDomains = useCallback(
    (domains: Domain[]) => updateParams({ domain: domains }),
    [updateParams]
  );
  const setTags = useCallback(
    (tags: string[]) => updateParams({ tag: tags }),
    [updateParams]
  );
  const setSearch = useCallback(
    (q: string) => updateParams({ q: q ? [q] : [] }),
    [updateParams]
  );
  const handleTagClick = useCallback(
    (tag: string) => {
      const next = activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag];
      setTags(next);
    },
    [activeTags, setTags]
  );

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (activeDomains.length > 0 && !p.domains.some((d) => activeDomains.includes(d)))
          return false;
        if (activeTags.length > 0 && !p.tags.some((t) => activeTags.includes(t)))
          return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
          );
        }
        return true;
      }),
    [projects, activeDomains, activeTags, search]
  );

  return (
    <>
      <div className="mb-8">
        <FilterBar
          allProjects={projects}
          activeDomains={activeDomains}
          activeTags={activeTags}
          search={search}
          filteredCount={filtered.length}
          onDomainsChange={setDomains}
          onTagsChange={setTags}
          onSearchChange={setSearch}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center font-mono text-[13px] text-fg-muted border border-dashed border-border-strong rounded">
          Aucun projet ne correspond aux filtres.
        </div>
      ) : (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
        >
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onTagClick={handleTagClick}
            />
          ))}
        </div>
      )}
    </>
  );
}
