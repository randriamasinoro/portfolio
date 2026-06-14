const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sehenonirina Elisa Randriamasinoro",
  alternateName: "Elisa Randriamasinoro",
  url: "https://sinoro.fr",
  email: "mailto:randriamasnrelisa@gmail.com",
  jobTitle: "Étudiant M1 Cybersécurité des Systèmes Embarqués",
  description:
    "Étudiant en M1 Cybersécurité des Systèmes Embarqués à UBS Lorient. Sécurité des protocoles sans fil embarqués (Zigbee/802.15.4), reverse engineering de firmwares, sécurité CAN bus, hardening Linux embarqué et data science.",
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Université Bretagne Sud (UBS)",
      url: "https://www.univ-ubs.fr/",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lorient",
        addressCountry: "FR",
      },
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
    name: "Stage cybersécurité (disponibilité immédiate) et alternance cybersécurité / data science (septembre 2026, ENSIBS Vannes)",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Portfolio — Sehenonirina Elisa Randriamasinoro",
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
