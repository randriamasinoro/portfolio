import Script from "next/script";

/**
 * Traceur Umami (analytics auto-hébergé, sans cookie).
 * - Le Website ID est public (visible dans le HTML de chaque visiteur), donc en clair ici.
 *   Indispensable : la page est rendue statiquement au build, une variable d'env runtime
 *   ne serait jamais relue (le HTML est figé).
 * - data-domains limite la collecte à la prod -> pas de pollution depuis localhost.
 */
const UMAMI_WEBSITE_ID = "f18f2728-f688-4a5f-b6aa-dd4500195381";

export default function Analytics() {
  return (
    <Script
      src="https://analytics.sinoro.fr/script.js"
      data-website-id={UMAMI_WEBSITE_ID}
      data-domains="sinoro.fr"
      strategy="afterInteractive"
    />
  );
}
