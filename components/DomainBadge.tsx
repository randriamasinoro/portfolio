import type { Domain } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";

interface Props {
  domain: Domain;
  size?: "sm" | "md";
  withDot?: boolean;
}

export default function DomainBadge({ domain, size = "md", withDot = false }: Props) {
  const config = DOMAIN_CONFIG[domain];
  if (!config) return null;

  const { color, label } = config;
  const fontSize = size === "sm" ? "11px" : "12px";
  const padding = size === "sm" ? "3px 8px" : "5px 10px";

  return (
    <span
      className="inline-flex items-center gap-[6px] font-mono whitespace-nowrap rounded-full"
      style={{
        fontSize,
        padding,
        border: `1px solid ${color}66`,
        background: `${color}1F`,
        color,
        letterSpacing: "0.02em",
      }}
    >
      {withDot && (
        <span
          className="w-[6px] h-[6px] rounded-full bg-current inline-block"
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}
