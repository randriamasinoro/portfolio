import { readProjects } from "@/lib/projects";
import { DOMAIN_CONFIG } from "@/types/project";

// Génère /llms.txt — un résumé structuré du site destiné aux LLM et moteurs
// de recherche IA (ChatGPT, Perplexity, Claude…). Format : https://llmstxt.org
export const dynamic = "force-static";

export function GET() {
  const projects = readProjects();

  const projectLines = projects
    .map((p) => {
      const domains = p.domains
        .map((d) => DOMAIN_CONFIG[d]?.label ?? d)
        .join(", ");
      return `- [${p.title}](https://sinoro.fr/projects/${p.id}) : ${p.description} (${domains}) — code : ${p.github}`;
    })
    .join("\n");

  const body = `# Sehenonirina Elisa Randriamasinoro

> Étudiant en M1 Cybersécurité des Systèmes Embarqués à l'UBS Lorient (ENSIBS).
> Spécialités : sécurité des protocoles sans fil embarqués (Zigbee/802.15.4),
> reverse engineering de firmwares, sécurité CAN bus, hardening Linux embarqué
> et data science. Recherche un stage (disponible immédiatement) et une
> alternance en cybersécurité & data science (sept. 2026, ENSIBS Vannes).

## Pages principales

- [Accueil](https://sinoro.fr) : présentation et projets mis en avant
- [Projets](https://sinoro.fr/projects) : liste complète filtrable par domaine et technologie
- [À propos](https://sinoro.fr/about) : parcours, compétences, formation et contact

## Projets

${projectLines}

## Contact

- Email : randriamasnrelisa@gmail.com
- GitHub : https://github.com/randriamasinoro
- LinkedIn : https://www.linkedin.com/in/sehenonirina-elisa-randriamasinoro
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
