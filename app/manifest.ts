import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sehenonirina Elisa Randriamasinoro — Portfolio",
    short_name: "Elisa R.",
    description:
      "Portfolio technique — Cybersécurité des Systèmes Embarqués & Data Science.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    lang: "fr",
    categories: ["technology", "education", "portfolio"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
