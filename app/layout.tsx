import type { Metadata, Viewport } from "next";
import { Syne, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css"
import NavBar from "@/components/NavBar";
import ThemeProvider from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans", 
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sinoro.fr"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Sehenonirina Elisa Randriamasinoro — Cybersécurité Systèmes Embarqués & Data Science",
    template: "%s — Sehenonirina Elisa Randriamasinoro",
  },
  description:
    "Étudiant en M1 Cybersécurité des Systèmes Embarqués à UBS Lorient. Je travaille sur la sécurité des protocoles sans fil embarqués (Zigbee/802.15.4), le reverse engineering de firmwares, la sécurité CAN bus et le hardening de systèmes Linux embarqués. Recherche stage dispo. imm. & alternance Cybersécurité / Data Science (sept. 2026 — ENSIBS Vannes).",
  keywords: [
    "cybersécurité systèmes embarqués",
    "stage cybersécurité",
    "UBS Lorient",
    "ENSIBS Vannes",
    "reverse engineering firmware",
    "STM32",
    "ESP32",
    "Zigbee",
    "CAN Bus",
    "DevSecOps",
    "data science",
    "alternance data science",
    "stage data science",
    "machine learning",
    "M1 cybersécurité",
  ],
  authors: [{ name: "Sehenonirina Elisa Randriamasinoro" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://sinoro.fr",
    siteName: "Sehenonirina Elisa Randriamasinoro",
    title: "Sehenonirina Elisa Randriamasinoro — Cybersécurité Systèmes Embarqués & Data Science",
    description:
      "Étudiant en M1 Cybersécurité des Systèmes Embarqués à UBS Lorient. Sécurité protocoles sans fil (Zigbee/802.15.4), reverse engineering firmwares, CAN bus, hardening Linux embarqué. Stage dispo. imm. & alternance cybersécurité / data (sept. 2026 — ENSIBS Vannes).",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sehenonirina Elisa Randriamasinoro — Cybersécurité Systèmes Embarqués & Data Science",
    description:
      "Étudiant M1 Cybersécurité des Systèmes Embarqués (UBS Lorient). Reverse engineering firmware, Zigbee, CAN bus, data science. Stage & alternance sept. 2026.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F3EE" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
      className="bg-bg text-fg min-h-screen"
      suppressHydrationWarning
      >
        <JsonLd />
        <ThemeProvider>
          <NavBar />
          <main className="pt-[60px]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
