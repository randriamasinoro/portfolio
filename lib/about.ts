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
export const HERO_SKILLS: string[] = ["Linux embarqué", "RTOS", "FPGA", "IoT", "Cybersécurité"];

// Version courte pour la page À propos (une page sans défilement) : l'essentiel par
// domaine. Liste complète dans le référentiel CV et l'historique git.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "IoT",
    domain: "iot",
    skills: ["Zigbee", "WHAD, nRF52840", "ESP32", "BLE (bases)"],
  },
  {
    label: "Systèmes embarqués",
    domain: "embedded",
    skills: ["STM32", "FreeRTOS", "Yocto", "I²C, SPI, UART, CAN"],
  },
  {
    label: "FPGA et matériel",
    domain: "hardware",
    skills: ["VHDL, Vivado", "TPM 2.0", "Extraction de firmware", "DPA"],
  },
  {
    label: "Cybersécurité",
    domain: "cybersecurity",
    skills: ["Ghidra, Radare2", "Secure boot", "Durcissement Linux"],
  },
  {
    label: "DevSecOps et infrastructure",
    domain: "devsecops",
    skills: ["GitHub Actions", "Docker", "Wazuh", "CrowdSec"],
  },
  {
    label: "Langages",
    skills: ["C", "Python", "C++", "Bash", "Assembleur ARM"],
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2025–27",
    title: "Master Cybersécurité des Systèmes Embarqués",
    org: "UBS, Lorient · M1 validé, M2 en cours",
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
