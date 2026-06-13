interface Props {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  number?: string;
  className?: string;
}

export default function SectionTitle({ children, as: Tag = "h2", number, className }: Props) {
  const fontSize =
    Tag === "h1"
      ? "clamp(2.25rem, 4.5vw, 3rem)"
      : "clamp(1.5rem, 3vw, 2rem)";

  return (
    <div className={className}>
      {number && (
        <span className="block font-mono text-xs text-accent tracking-[0.06em] mb-2">
          [{number}]
        </span>
      )}
      <Tag
        className="font-display font-bold tracking-[-0.02em] text-fg m-0"
        style={{ fontSize, lineHeight: 1.1 }}
      >
        {children}
      </Tag>
    </div>
  );
}
