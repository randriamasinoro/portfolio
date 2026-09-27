"use client";

import { useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Domain, Project } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";

// « securite » doit trouver « Sécurité » : on compare sans accents ni casse.
const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
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
          const q = normalize(search);
          const haystack = [
            p.title,
            p.description,
            ...p.tags,
            ...p.domains.map((d) => DOMAIN_CONFIG[d]?.label ?? d),
          ];
          return haystack.some((field) => normalize(field).includes(q));
        }
        return true;
      }),
    [projects, activeDomains, activeTags, search]
  );

  return (
    <>
      <div className="mb-10">
        <FilterBar
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
        <p className="text-fg-2 py-10">
          Aucun projet ne correspond à ces filtres. Retirez un domaine ou une techno pour élargir.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onTagClick={handleTagClick} />
          ))}
        </div>
      )}
    </>
  );
}
