import type { Project } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";

interface Props {
  project: Project;
}

// Convertit une date frontmatter en ISO 8601 avec fuseau horaire.
// Le schéma projet ne stocke que l'année (ex. "2025") → on normalise.
function toIsoDate(date: string): string {
  if (/^\d{4}$/.test(date)) return `${date}-01-01T00:00:00+01:00`;
  return date;
}

export default function ProjectJsonLd({ project }: Props) {
  const url = `https://sinoro.fr/projects/${project.id}`;
  const domainLabels = project.domains.map((d) => DOMAIN_CONFIG[d]?.label ?? d);

  // Image de l'article : 1re image du projet si dispo, sinon l'image OG du site.
  const image = project.media?.[0]
    ? `https://sinoro.fr${project.media[0]}`
    : "https://sinoro.fr/opengraph-image";

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    name: project.title,
    description: project.description,
    url,
    image,
    inLanguage: "fr-FR",
    datePublished: toIsoDate(project.date),
    keywords: [...project.tags, ...domainLabels].join(", "),
    about: domainLabels,
    author: {
      "@type": "Person",
      name: "Sehenonirina Elisa Randriamasinoro",
      url: "https://sinoro.fr",
    },
    publisher: {
      "@type": "Person",
      name: "Sehenonirina Elisa Randriamasinoro",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(project.github
      ? {
          codeRepository: project.github,
          isBasedOn: project.github,
        }
      : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sinoro.fr" },
      { "@type": "ListItem", position: 2, name: "Projets", item: "https://sinoro.fr/projects" },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
