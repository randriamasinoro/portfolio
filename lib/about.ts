import type { Domain } from "@/types/project";

// Source de vérité : ~/Documents/CV/referentiel.yaml (entrées "valide" uniquement).

export interface SkillGroup {
  label: string;
  domain?: Domain; // si présent, le libellé prend la couleur de la voie du domaine
  skills: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  org: string;
}

export interface Certification {
  title: string;
  org: string;
  date?: string;
}

// Compétences de base, sur la bannière d'accueil.
export const HERO_SKILLS: string[] = ["Linux embarqué", "IoT", "Cybersécurité", "RTOS"];

// Version courte pour la page À propos (une page sans défilement) : l'essentiel par
// domaine. Liste complète dans le référentiel CV et l'historique git.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Systèmes embarqués",
    domain: "embedded",
    skills: ["STM32", "FreeRTOS", "Yocto", "ESP32", "I²C, SPI, UART, CAN"],
  },
  {
    label: "Cybersécurité",
    domain: "cybersecurity",
    skills: ["Attaques Zigbee", "Reverse engineering (Ghidra)", "Canaux auxiliaires (DPA)", "Secure boot U-Boot"],
  },
  {
    label: "DevSecOps et infrastructure",
    domain: "devsecops",
    skills: ["GitHub Actions", "Docker", "Wazuh", "CrowdSec"],
  },
  {
    label: "Langages",
    skills: ["C", "Python", "C++", "Bash", "VHDL"],
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2025–27",
    title: "Master Cybersécurité des Systèmes Embarqués",
    org: "UBS, Lorient · M2 en cours",
  },
  {
    year: "2024–25",
    title: "Licence Systèmes Numériques, Informatique Embarquée et Objets Connectés",
    org: "UBS, Lorient",
  },
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Understanding the EU Cyber Resilience Act", org: "The Linux Foundation" },
];
