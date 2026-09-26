export type Domain = "data-science" | "cybersecurity" | "embedded" | "devsecops";

export interface Project {
  id: string;
  title: string;
  description: string;
  domains: Domain[];
  tags: string[];
  date: string;
  github?: string;
  demo?: string;
  media?: string[];
  label?: string; // mot-clé affiché sur la couverture typographique (sinon tags[0])
  cover?: string; // vraie photo de couverture (optionnel) ; sinon couverture typographique
  featured?: boolean;
  order?: number; // position dans "Projets choisis" (1 = en premier)
  draft?: boolean;
}

// Chaque domaine correspond à une voie d'oscilloscope (CH1 à CH4).
// `trace` : couleur du signal (traits, pastilles), `ink` : version lisible pour du texte.
// Les valeurs vivent dans app/globals.css (--ch1, --ch1-ink, ...) et suivent le thème.
export const DOMAIN_CONFIG: Record<
  Domain,
  { label: string; channel: 1 | 2 | 3 | 4; trace: string; ink: string }
> = {
  cybersecurity:  { label: "Cybersécurité",      channel: 1, trace: "var(--ch1)", ink: "var(--ch1-ink)" },
  embedded:       { label: "Systèmes embarqués", channel: 2, trace: "var(--ch2)", ink: "var(--ch2-ink)" },
  "data-science": { label: "Data et IA",         channel: 3, trace: "var(--ch3)", ink: "var(--ch3-ink)" },
  devsecops:      { label: "DevSecOps",          channel: 4, trace: "var(--ch4)", ink: "var(--ch4-ink)" },
};
