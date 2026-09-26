const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sehenonirina Elisa Randriamasinoro",
  alternateName: "Elisa Randriamasinoro",
  url: "https://sinoro.fr",
  email: "mailto:randriamasnrelisa@gmail.com",
  jobTitle: "Master 2 Cybersécurité des Systèmes Embarqués",
  description:
    "En Master 2 Cybersécurité des Systèmes Embarqués (UBS Lorient). Sécurité des protocoles sans fil embarqués (Zigbee/802.15.4), reverse engineering de firmwares, sécurité CAN bus, hardening Linux embarqué, DevSecOps. Recherche un stage de fin d'études de 4 à 6 mois à partir de janvier 2027, avec perspective de pré-embauche ; alternance également envisagée.",
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
    "FreeRTOS",
    "DevSecOps",
  ],
  sameAs: [
    "https://github.com/randriamasinoro",
    "https://www.linkedin.com/in/sehenonirina-elisa-randriamasinoro",
  ],
  seeks: {
    "@type": "Demand",
    name: "Stage de fin d'études de 4 à 6 mois à partir de janvier 2027 (perspective de pré-embauche) ou alternance, en cybersécurité et systèmes embarqués",
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
