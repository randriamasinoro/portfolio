export type Domain =
  | "iot"
  | "embedded"
  | "hardware"
  | "cybersecurity"
  | "data-science"
  | "devsecops"
  | "web";

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
  // Bloc "L'essentiel" en haut de la fiche : 3 lignes scannables (problème/action/résultat
  // pour un projet perso ; objectif/démarche/acquis pour un projet d'école).
  resume?: { label: string; texte: string }[];
}

// Chaque domaine correspond à une voie d'oscilloscope (CH1 à CH7).
// `trace` : couleur du signal (traits, pastilles), `ink` : version lisible pour du texte.
// Les valeurs vivent dans app/globals.css (--ch1, --ch1-ink, ...) et suivent le thème.
// L'ordre des clés est celui des onglets de la page Projets.
export const DOMAIN_CONFIG: Record<
  Domain,
  { label: string; channel: 1 | 2 | 3 | 4 | 5 | 6 | 7; trace: string; ink: string }
> = {
  iot:            { label: "IoT",                channel: 6, trace: "var(--ch6)", ink: "var(--ch6-ink)" },
  embedded:       { label: "Systèmes embarqués", channel: 2, trace: "var(--ch2)", ink: "var(--ch2-ink)" },
  hardware:       { label: "FPGA et matériel",   channel: 7, trace: "var(--ch7)", ink: "var(--ch7-ink)" },
  cybersecurity:  { label: "Cybersécurité",      channel: 1, trace: "var(--ch1)", ink: "var(--ch1-ink)" },
  "data-science": { label: "Data et IA",         channel: 3, trace: "var(--ch3)", ink: "var(--ch3-ink)" },
  devsecops:      { label: "DevSecOps",          channel: 4, trace: "var(--ch4)", ink: "var(--ch4-ink)" },
  web:            { label: "Applications web",   channel: 5, trace: "var(--ch5)", ink: "var(--ch5-ink)" },
};
