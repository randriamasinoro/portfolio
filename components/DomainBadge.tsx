import type { Domain } from "@/types/project";
import { DOMAIN_CONFIG } from "@/types/project";

interface Props {
  domain: Domain;
}

// Libellé de domaine précédé d'un repère à la couleur de sa voie d'oscilloscope.
export default function DomainBadge({ domain }: Props) {
  const config = DOMAIN_CONFIG[domain];
  if (!config) return null;
  return (
    <span className="inline-flex items-center gap-[6px] font-ui text-[13px]" style={{ color: config.ink }}>
      <span className="w-[10px] h-[3px] rounded-full" style={{ background: config.trace }} aria-hidden="true" />
      {config.label}
    </span>
  );
}
