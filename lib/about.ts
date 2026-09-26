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

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Systèmes embarqués",
    domain: "embedded",
    skills: [
      "STM32 et STM32CubeIDE",
      "FreeRTOS",
      "Linux embarqué avec Yocto (Poky, systemd)",
      "U-Boot secure boot",
      "ESP32, ESP-IDF",
      "nRF52840",
      "I²C, SPI, UART, bus CAN",
      "FPGA Xilinx avec VHDL et Vivado (Basys 3)",
    ],
  },
  {
    label: "Cybersécurité",
    domain: "cybersecurity",
    skills: [
      "Attaques Zigbee et IEEE 802.15.4",
      "WHAD, Wireshark",
      "Attaques par canaux auxiliaires (DPA)",
      "Reverse engineering avec Ghidra",
      "Fuzzing, buffer overflow, race conditions",
      "Cryptographie (AES, RSA, ECC, SHA)",
      "Modélisation des menaces STRIDE",
    ],
  },
  {
    label: "DevSecOps et infrastructure",
    domain: "devsecops",
    skills: [
      "GitHub Actions, Docker",
      "Trivy, Gitleaks, Semgrep, OWASP ZAP",
      "WireGuard, Traefik, CrowdSec",
      "Wazuh, Prometheus, Grafana",
    ],
  },
  {
    label: "Langages",
    skills: ["C", "Python", "C++", "Bash", "VHDL", "Assembleur ARM", "SQL"],
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2026–27",
    title: "Master 2 Cybersécurité des Systèmes Embarqués",
    org: "UBS, Lorient",
  },
  {
    year: "2025–26",
    title: "Master 1 Cybersécurité des Systèmes Embarqués",
    org: "UBS, Lorient",
  },
  {
    year: "2024–25",
    title: "Licence Systèmes Numériques, Informatique Embarquée et Objets Connectés",
    org: "UBS, Lorient",
  },
  {
    year: "2023–24",
    title: "DTSS Génie des Systèmes Automatisés (grade licence)",
    org: "IST-T, Antananarivo, Madagascar",
  },
  {
    year: "2021–23",
    title: "DTS Génie Industriel et Maintenance",
    org: "IST-T, Antananarivo, Madagascar",
  },
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Understanding the EU Cyber Resilience Act", org: "The Linux Foundation" },
  { title: "Certificat professionnel UX/UI Design", org: "Orange Digital Center Madagascar", date: "Avril 2023" },
];
