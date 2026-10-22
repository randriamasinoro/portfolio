import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css"
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ThemeProvider from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";

// JetBrains Mono : code. Police d'interface et des titres : --font-sans (globals.css), celle du CV.
const codeMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-code",
  display: "swap",
});

// Source Serif 4 : textes longs (fiches projet, bio).
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

// Bannière d'accueil : serif pour l'accroche (prénom en italique).
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sinoro.fr"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Sehenonirina Elisa Randriamasinoro, Cybersécurité embarquée",
    template: "%s, Elisa Randriamasinoro",
  },
  description:
    "Master 2 Cybersécurité des Systèmes Embarqués (UBS Lorient). Recherche un stage de fin d'études à partir de janvier 2027 (pré-embauche), alternance envisagée. Reverse engineering firmware, CAN bus, DevSecOps.",
  keywords: [
    "cybersécurité systèmes embarqués",
    "alternance cybersécurité",
    "UBS Lorient",
    "stage fin d'études cybersécurité",
    "reverse engineering firmware",
    "STM32",
    "ESP32",
    "Zigbee",
    "CAN Bus",
    "DevSecOps",
    "sécurité IoT",
    "alternance cybersécurité embarquée",
    "alternance systèmes embarqués",
    "Linux embarqué",
    "FreeRTOS",
    "M2 cybersécurité systèmes embarqués",
    "stage systèmes embarqués janvier 2027",
    "stage pré-embauche cybersécurité",
  ],
  authors: [{ name: "Sehenonirina Elisa Randriamasinoro" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://sinoro.fr",
    siteName: "Sehenonirina Elisa Randriamasinoro",
    title: "Sehenonirina Elisa Randriamasinoro, Cybersécurité embarquée",
    description:
      "Master 2 Cybersécurité des Systèmes Embarqués (UBS Lorient). Recherche un stage de fin d'études de 20 semaines minimum à partir de janvier 2027, avec perspective de pré-embauche, en cybersécurité et systèmes embarqués. Alternance également envisagée.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sehenonirina Elisa Randriamasinoro, Cybersécurité embarquée",
    description:
      "Master 2 Cybersécurité des Systèmes Embarqués (UBS Lorient). Recherche un stage de fin d'études de 20 semaines minimum à partir de janvier 2027, avec perspective de pré-embauche, en cybersécurité et systèmes embarqués. Alternance également envisagée.",
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
    { media: "(prefers-color-scheme: light)", color: "#F5F4F7" },
    { media: "(prefers-color-scheme: dark)", color: "#161616" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // overflow-x-clip sur <html> : seule la racine propage au viewport ; sur <body>
    // seul, un débordement (halo du hero) rendait la page défilable à l'horizontale.
    <html
      lang="fr"
      className={`overflow-x-clip ${codeMono.variable} ${sourceSerif.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      {/* Grille nav / contenu / footer : le contenu remplit la hauteur restante, ce qui
          permet à l'accueil (data-fullscreen) de tenir exactement dans l'écran. */}
      <body className="text-fg min-h-[100dvh] grid grid-rows-[auto_1fr_auto] overflow-x-clip" suppressHydrationWarning>
        <JsonLd />
        <Analytics />
        <ThemeProvider>
          <CursorGlow />
          <NavBar />
          <main className="w-full max-w-page mx-auto px-5 sm:px-10 xl:px-16 pb-24 has-[>[data-fullscreen]]:pb-0">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
