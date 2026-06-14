import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projets techniques",
  description:
    "Projets en cybersécurité des systèmes embarqués : reverse engineering de firmware, analyse de protocoles radio (Zigbee, BLE, CAN Bus), sécurité IoT, data science et pipelines DevSecOps. UBS Lorient.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "https://sinoro.fr/projects",
    title: "Projets techniques — Sehenonirina Elisa Randriamasinoro",
    description:
      "Projets cybersécurité embarquée, reverse engineering firmware, protocoles radio (Zigbee, CAN Bus), IoT, data science et DevSecOps.",
  },
};
import { readProjects } from "@/lib/projects";
import SectionTitle from "@/components/SectionTitle";
import ProjectsClient from "@/components/ProjectsClient";

export default function ProjectsPage() {
  const projects = readProjects();

  return (
    <div className="max-w-layout mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="font-mono text-[13px] text-accent tracking-[0.04em] mb-3">
          ~ / projets
        </p>
        <SectionTitle as="h1">Projets techniques</SectionTitle>
        <p className="font-body text-base text-fg-2 max-w-[640px] mt-4 leading-[1.55]">
          Liste filtrable par domaine et tag technologique.
          Cliquer une card pour ouvrir la fiche détaillée.
        </p>
      </header>

      <Suspense fallback={<ProjectsFallback />}>
        <ProjectsClient projects={projects} />
      </Suspense>
    </div>
  );
}

function ProjectsFallback() {
  return (
    <div className="font-mono text-[13px] text-fg-muted animate-pulse">
      Chargement…
    </div>
  );
}
