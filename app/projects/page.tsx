import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projets techniques",
  description:
    "Projets en cybersécurité des systèmes embarqués : reverse engineering de firmware, analyse de protocoles radio (Zigbee, BLE, CAN Bus), sécurité IoT et pipelines DevSecOps. UBS Lorient.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "https://sinoro.fr/projects",
    title: "Projets techniques, Sehenonirina Elisa Randriamasinoro",
    description:
      "Projets cybersécurité embarquée, reverse engineering firmware, protocoles radio (Zigbee, CAN Bus), IoT et DevSecOps.",
  },
};
import { readProjects } from "@/lib/projects";
import ProjectsClient from "@/components/ProjectsClient";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const projects = readProjects();

  return (
    <div className="relative pt-6 md:pt-12">
      {/* Halos flous derrière le titre */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-screen h-[600px]"
        style={{
          background:
            "radial-gradient(560px 300px at 30% 50%, var(--glow-1), transparent 70%), radial-gradient(480px 280px at 72% 42%, var(--glow-2), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <header className="relative mb-10 max-w-[60ch]">
        <h1 className="text-[2.5rem] sm:text-[3.25rem] leading-tight">Projets</h1>
        <p className="text-fg-2 text-[1.0625rem] leading-relaxed mt-3">
          Projets d&apos;école, de stage et personnels. Cliquez sur une techno pour
          ne garder que les projets qui l&apos;utilisent.
        </p>
      </header>

      {/* Fallback = liste complète rendue côté serveur (SEO, pas de JS requis) */}
      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        }
      >
        <ProjectsClient projects={projects} />
      </Suspense>
    </div>
  );
}
