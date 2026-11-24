import Image from "next/image";

interface Props {
  device: "desktop" | "tablet" | "phone";
  src: string;
  alt: string;
  /** Dimensions réelles de la capture, en chaînes (le MDX bloque les expressions {…}). */
  width: string;
  height: string;
  caption?: string;
  /** Aperçu cliquable : ouvre la capture en grand dans un nouvel onglet. */
  href?: string;
}

const SIZES: Record<Props["device"], string> = {
  desktop: "(min-width: 1024px) 760px, 100vw",
  tablet: "(min-width: 768px) 300px, 60vw",
  phone: "(min-width: 768px) 220px, 45vw",
};

// Cadre d'appareil dessiné en CSS : fenêtre de navigateur, tablette ou téléphone.
export default function DeviceMockup({ device, src, alt, width, height, caption, href }: Props) {
  const screen = (
    <Image src={src} alt={alt} width={Number(width)} height={Number(height)} sizes={SIZES[device]} className="block w-full h-auto" />
  );
  const linked = href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Ouvrir ${alt} dans un nouvel onglet`} className="block">
      {screen}
    </a>
  ) : (
    screen
  );

  let frame: React.ReactNode;
  if (device === "phone") {
    frame = (
      <div className="mx-auto w-full max-w-[220px] rounded-[2rem] border-[7px] border-black bg-black shadow-2xl shadow-black/50 overflow-hidden">
        {/* Encoche dans le bord du haut : elle ne couvre jamais la capture */}
        <div aria-hidden="true" className="flex justify-center items-center h-4">
          <span className="h-1.5 w-14 max-w-[30%] rounded-full bg-neutral-800" />
        </div>
        <div className="rounded-[1.2rem] overflow-hidden">{linked}</div>
      </div>
    );
  } else if (device === "tablet") {
    frame = (
      <div className="mx-auto w-full max-w-[340px] rounded-[1.6rem] border-[10px] border-black bg-black shadow-2xl shadow-black/50 overflow-hidden">
        <div className="rounded-[0.9rem] overflow-hidden">{linked}</div>
      </div>
    );
  } else {
    frame = (
      <div className="w-full rounded-xl border border-border-strong bg-surface shadow-2xl shadow-black/40 overflow-hidden">
        <div aria-hidden="true" className="flex items-center gap-1.5 px-3 h-7 bg-surface-2 border-b border-border">
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-muted" />
        </div>
        {linked}
      </div>
    );
  }

  return (
    <figure className="flex flex-col gap-3 m-0">
      {frame}
      {caption && <figcaption className="font-ui text-[13px] text-fg-2 text-center leading-snug">{caption}</figcaption>}
    </figure>
  );
}

/** Groupe d'appareils posés directement sur la page, sans planche ni cadre de couleur. */
export function MockupBoard({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-10 flex flex-col gap-10">{children}</div>;
}

/** Un grand écran et un téléphone côte à côte (empilés sur mobile). */
export function MockupPair({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-end [&>*:first-child]:lg:col-span-3">{children}</div>;
}

/** Plusieurs écrans en grille de deux colonnes. */
export function MockupGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{children}</div>;
}

/**
 * La même page sur ordinateur, tablette et téléphone (enfants dans cet ordre, sans légende chacun).
 * À partir de md, la tablette et le téléphone chevauchent le bas droit de l'ordinateur ;
 * en dessous, l'ordinateur passe au-dessus et les deux autres se rangent côte à côte.
 */
export function MockupTrio({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="m-0 flex flex-col gap-4">
      <div
        className={[
          "grid grid-cols-[3fr_2fr] gap-6 items-end",
          "[&>*:first-child]:col-span-2",
          "md:block md:relative md:pr-[22%] md:pb-[7%]",
          "[&>*:nth-child(2)]:md:absolute [&>*:nth-child(2)]:md:right-[7%] [&>*:nth-child(2)]:md:bottom-0 [&>*:nth-child(2)]:md:w-[29%] [&>*:nth-child(2)]:md:z-10",
          "[&>*:nth-child(3)]:md:absolute [&>*:nth-child(3)]:md:right-0 [&>*:nth-child(3)]:md:-bottom-[2%] [&>*:nth-child(3)]:md:w-[14%] [&>*:nth-child(3)]:md:z-20",
        ].join(" ")}
      >
        {children}
      </div>
      {caption && <figcaption className="font-ui text-[13px] text-fg-2 text-center leading-snug">{caption}</figcaption>}
    </figure>
  );
}

/** Une rangée d'écrans de téléphone, de même largeur (deux par ligne sur mobile). */
export function MockupRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-6 [&>*:only-child]:col-span-2 md:grid-cols-none md:grid-flow-col md:auto-cols-fr items-start">{children}</div>;
}
