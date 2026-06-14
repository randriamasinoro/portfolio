import type { Project } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectJsonLd({ project }: Props) {
  const url = `https://sinoro.fr/projects/${project.id}`;
  const domainLabels = project.domains.map((d) => DOMAIN_CONFIG[d]?.label ?? d);

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    name: project.title,
    description: project.description,
    url,
    inLanguage: "fr-FR",
    datePublished: project.date,
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
