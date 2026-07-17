const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sehenonirina Elisa Randriamasinoro",
  alternateName: "Elisa Randriamasinoro",
  url: "https://sinoro.fr",
  email: "mailto:randriamasnrelisa@gmail.com",
  jobTitle: "Titulaire d'un Master 1 Cybersécurité des Systèmes Embarqués",
  description:
    "Titulaire d'un Master 1 Cybersécurité des Systèmes Embarqués (UBS Lorient). Sécurité des protocoles sans fil embarqués (Zigbee/802.15.4), reverse engineering de firmwares, sécurité CAN bus, hardening Linux embarqué, data science et IA. Recherche une alternance à la rentrée 2026, en M2 Cybersécurité des Systèmes Embarqués à l'UBS ou en cycle ingénieur Cybersécurité & Data Science à l'ENSIBS Vannes.",
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Université Bretagne Sud (UBS)",
      url: "https://www.univ-ubs.fr/",
    },
  ],
  knowsAbout: [
    "Cybersécurité des systèmes embarqués",
    "Reverse engineering de firmware",
    "Sécurité des protocoles sans fil",
    "Zigbee",
    "802.15.4",
    "Sécurité CAN bus",
    "Hardening Linux embarqué",
    "STM32",
    "ESP32",
    "nRF52840",
    "Data science",
    "DevSecOps",
  ],
  sameAs: [
    "https://github.com/randriamasinoro",
    "https://www.linkedin.com/in/sehenonirina-elisa-randriamasinoro",
  ],
  seeks: {
    "@type": "Demand",
    name: "Alternance à partir de septembre 2026 en cybersécurité, systèmes embarqués, data science ou intelligence artificielle (M2 Cybersécurité des Systèmes Embarqués à l'UBS Lorient ou cycle ingénieur Cybersécurité & Data Science à l'ENSIBS Vannes)",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Portfolio, Sehenonirina Elisa Randriamasinoro",
  url: "https://sinoro.fr",
  inLanguage: "fr-FR",
  author: { "@type": "Person", name: "Sehenonirina Elisa Randriamasinoro" },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
