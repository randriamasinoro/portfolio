import Script from "next/script";

/**
 * Traceur Umami (analytics auto-hébergé, sans cookie).
 * - Le Website ID vient d'une variable d'environnement runtime (UMAMI_WEBSITE_ID),
 *   injectée par docker-compose : aucun ID en dur dans le code.
 * - Si la variable n'est pas définie (dev local), le script n'est pas rendu.
 * - data-domains limite la collecte à la prod -> pas de pollution depuis localhost.
 */
export default function Analytics() {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  if (!websiteId) return null;

  return (
    <Script
      src="https://analytics.sinoro.fr/script.js"
      data-website-id={websiteId}
      data-domains="sinoro.fr"
      strategy="afterInteractive"
    />
  );
}
