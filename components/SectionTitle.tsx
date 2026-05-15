import type { Domain } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";

interface Props {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  domain?: Domain | "accent";
}

export default function SectionTitle({ children, as: Tag = "h2", domain = "accent" }: Props) {
  const color =
    domain === "accent"
      ? "#2D7DD2"
      : DOMAIN_CONFIG[domain as Domain]?.color ?? "#2D7DD2";

  const fontSize =
    Tag === "h1"
      ? "clamp(2.25rem, 4.5vw, 3rem)"
      : "clamp(1.5rem, 3vw, 2rem)";

  return (
    <Tag
      className="font-display font-bold tracking-[-0.02em] text-fg m-0"
      style={{
        fontSize,
        lineHeight: 1.1,
        paddingLeft: "16px",
        borderLeft: `2px solid ${color}`,
      }}
    >
      {children}
    </Tag>
  );
}
