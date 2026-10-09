import Image from "next/image";

interface Props {
  device: "desktop" | "phone";
  src: string;
  alt: string;
  /** Dimensions réelles de la capture, en chaînes (le MDX bloque les expressions {…}). */
  width: string;
  height: string;
  caption?: string;
  /** Aperçu cliquable : ouvre la capture en grand dans un nouvel onglet. */
  href?: string;
}

// Cadre d'appareil façon prototype Figma : fenêtre de navigateur ou téléphone.
export default function DeviceMockup({ device, src, alt, width, height, caption, href }: Props) {
  const screen = (
    <Image src={src} alt={alt} width={Number(width)} height={Number(height)} sizes="(min-width: 1024px) 720px, 100vw" className="block w-full h-auto" />
  );
  const linked = href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Ouvrir ${alt} dans un nouvel onglet`} className="block">
      {screen}
    </a>
  ) : (
    screen
  );

  return (
    <figure className="flex flex-col gap-3 m-0">
      {device === "phone" ? (
        <div className="mx-auto w-full max-w-[220px] rounded-[2rem] border-[7px] border-black bg-black shadow-2xl shadow-black/50 overflow-hidden relative">
          <span aria-hidden="true" className="absolute top-2 left-1/2 -translate-x-1/2 h-1.5 w-14 rounded-full bg-black z-10" />
          <div className="rounded-[1.4rem] overflow-hidden">{linked}</div>
        </div>
      ) : (
        <div className="w-full rounded-xl border border-border-strong bg-surface shadow-2xl shadow-black/40 overflow-hidden">
          <div aria-hidden="true" className="flex items-center gap-1.5 px-3 h-7 bg-surface-2 border-b border-border">
            <span className="h-2.5 w-2.5 rounded-full bg-fg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg-muted" />
          </div>
          {linked}
        </div>
      )}
      {caption && <figcaption className="font-ui text-[13px] text-fg-2 text-center leading-snug">{caption}</figcaption>}
    </figure>
  );
}

/** Fond de « planche » violet sur lequel posent les appareils. */
export function MockupBoard({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-2xl bg-accent-deep p-5 sm:p-8 flex flex-col gap-8">
      {children}
    </div>
  );
}

/** Un grand écran et un téléphone côte à côte (empilés sur mobile). */
export function MockupPair({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-end [&>*:first-child]:lg:col-span-3">{children}</div>;
}

/** Plusieurs écrans en grille de deux colonnes. */
export function MockupGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{children}</div>;
}
