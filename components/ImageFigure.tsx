import Image from "next/image";
import { ArrowUpRightIcon } from "./icons";

const SIZE_CLASSES = {
  xs: "max-w-[240px]",
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-md",
  full: "w-full",
};

interface Props {
  src: string;
  alt: string;
  caption?: string;
  size?: keyof typeof SIZE_CLASSES;
  /** Si défini, l'aperçu devient cliquable et ouvre l'URL dans un nouvel onglet. */
  href?: string;
}

export default function ImageFigure({ src, alt, caption, size = "full", href }: Props) {
  const media = (
    <div className="relative w-full aspect-[4/3] bg-surface-2">
      <Image src={src} alt={alt} fill className="object-contain p-2" />
    </div>
  );

  return (
    <figure className={`flex flex-col gap-2 mx-auto ${SIZE_CLASSES[size]}`}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ouvrir ${alt} dans un nouvel onglet`}
          className="group relative block rounded-sm overflow-hidden border border-border hover:border-fg-muted transition-colors duration-200"
        >
          {media}
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 font-mono text-[11px] text-fg bg-bg/80 backdrop-blur px-2 py-1 rounded border border-border-strong opacity-80 group-hover:opacity-100 transition-opacity">
            Ouvrir
            <ArrowUpRightIcon />
          </span>
        </a>
      ) : (
        <div className="rounded-sm overflow-hidden border border-border">{media}</div>
      )}
      {caption && (
        <figcaption className="font-mono text-xs text-fg-muted text-center leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
