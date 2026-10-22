import HeroBanner from "@/components/HeroBanner";

// L'accueil tient dans un seul écran : la présentation seule. Les projets et
// la page À propos se rejoignent depuis le menu ou les boutons du hero.
export default function HomePage() {
  return <HeroBanner />;
}
