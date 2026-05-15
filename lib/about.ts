import type { Domain } from "@/types/project";

export interface SkillGroup {
  domain: Domain;
  skills: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  org: string;
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    domain: "cybersecurity",
    skills: ["Reverse engineering", "Analyse de firmware", "Protocoles radio", "TLS / mTLS", "Forensics"],
  },
  {
    domain: "embedded",
    skills: ["ESP32", "STM32", "nRF52", "FreeRTOS", "I²C / SPI / UART", "CAN Bus"],
  },
  {
    domain: "data-science",
    skills: ["Python", "scikit-learn", "Kafka", "Pandas", "Grafana"],
  },
  {
    domain: "devsecops",
    skills: ["GitHub Actions", "Ansible", "Docker", "Trivy", "CycloneDX SBOM"],
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2026–29",
    title: "4ème année — Cycle ingénieur Cybersécurité & Data Science",
    org: "ENSIBS — Vannes (admis)",
  },
  {
    year: "2025–26",
    title: "Master 1 Cybersécurité des Systèmes Embarqués",
    org: "UBS — Lorient",
  },
  {
    year: "2024–25",
    title: "Licence Système Numérique & Informatique Embarquée",
    org: "UBS — Lorient",
  },
];
