type CalloutType = "info" | "warning" | "tip" | "danger";

interface Props {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const CONFIG: Record<CalloutType, { color: string; label: string }> = {
  info:    { color: "var(--ch4)", label: "Note" },
  warning: { color: "var(--ch1)", label: "Attention" },
  tip:     { color: "var(--ch2)", label: "Astuce" },
  danger:  { color: "var(--ch3)", label: "Danger" },
};

export default function Callout({ type = "info", title, children }: Props) {
  const { color, label } = CONFIG[type];

  return (
    <aside
      className="text-fg-2 leading-relaxed my-8 pl-5 [&_p]:mb-0 max-w-[720px] mx-auto"
      style={{ borderLeft: `2px solid ${color}` }}
    >
      <p className="font-ui text-[14px] text-fg font-bold mb-1">{title ?? label}</p>
      {children}
    </aside>
  );
}
