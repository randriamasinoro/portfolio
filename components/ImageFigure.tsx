import Image from "next/image";

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
}

export default function ImageFigure({ src, alt, caption, size = "full" }: Props) {
  return (
    <figure className={`flex flex-col gap-2 mx-auto ${SIZE_CLASSES[size]}`}>
      <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-border bg-surface-2">
        <Image src={src} alt={alt} fill className="object-contain p-2" />
      </div>
      {caption && (
        <figcaption className="font-mono text-xs text-fg-muted text-center leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
