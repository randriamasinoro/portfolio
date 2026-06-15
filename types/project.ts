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
  featured?: boolean;
}

export const DOMAIN_CONFIG: Record<
  Domain,
  { label: string; color: string }
> = {
  "data-science": { label: "Data Science", color: "#3B82F6" },
  cybersecurity:  { label: "Cybersécurité", color: "#EF4444" },
  embedded:       { label: "Systèmes Embarqués", color: "#22C55E" },
  devsecops:      { label: "DevSecOps", color: "#A855F7" },
};
