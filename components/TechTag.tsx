interface Props {
  children: string;
  variant?: "bracket" | "block";
}

export default function TechTag({ children, variant = "bracket" }: Props) {
  const label = children.toUpperCase();

  if (variant === "block") {
    return (
      <span className="font-mono text-[11px] text-fg-2 tracking-[0.04em] px-2 py-1 rounded-sm bg-surface-2">
        {label}
      </span>
    );
  }

  return (
    <span className="font-mono text-xs text-fg-2 tracking-[0.04em] whitespace-nowrap">
      <span className="text-fg-muted">[</span>
      {label}
      <span className="text-fg-muted">]</span>
    </span>
  );
}
