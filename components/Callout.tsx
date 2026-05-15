type CalloutType = "info" | "warning" | "tip" | "danger";

interface Props {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const CONFIG: Record<CalloutType, { color: string; label: string }> = {
  info:    { color: "#3B82F6", label: "Info" },
  warning: { color: "#F59E0B", label: "Warning" },
  tip:     { color: "#22C55E", label: "Tip" },
  danger:  { color: "#EF4444", label: "Danger" },
};

export default function Callout({ type = "info", title, children }: Props) {
  const { color, label } = CONFIG[type];

  return (
    <aside
      className="flex gap-3 font-body text-sm text-fg-2 leading-[1.55] my-4"
      style={{
        padding: "14px 16px",
        borderRadius: "6px",
        borderLeft: `2px solid ${color}`,
        background: `${color}14`,
      }}
    >
      <span className="mt-[2px] shrink-0" style={{ color }}>
        <CalloutIcon type={type} />
      </span>
      <div>
        <strong className="text-fg font-semibold">{title ?? label}.</strong>{" "}
        {children}
      </div>
    </aside>
  );
}

function CalloutIcon({ type }: { type: CalloutType }) {
  if (type === "tip") {
    return (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6M10 22h4" />
      </svg>
    );
  }
  if (type === "info") {
    return (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx={12} cy={12} r={10} />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    );
  }
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}
