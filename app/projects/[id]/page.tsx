import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: Props) {
  if (!params.id) notFound();

  return (
    <div className="max-w-layout mx-auto px-6 py-16">
      <p className="font-mono text-[13px] text-accent tracking-[0.04em] mb-3">
        ~ / projets / {params.id}
      </p>
      <h1 className="font-display text-h1 font-bold tracking-[-0.02em] text-fg mb-4">
        {params.id}
      </h1>
      <p className="font-body text-sm text-fg-muted">
        Sprint 4 — détail projet MDX à venir.
      </p>
    </div>
  );
}
