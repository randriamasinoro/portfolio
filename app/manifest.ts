import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sehenonirina Elisa Randriamasinoro, portfolio",
    short_name: "Elisa R.",
    description:
      "Portfolio technique, cybersécurité des systèmes embarqués.",
    start_url: "/",
    display: "standalone",
    background_color: "#161616",
    theme_color: "#161616",
    lang: "fr",
    categories: ["technology", "education", "portfolio"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon1.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
