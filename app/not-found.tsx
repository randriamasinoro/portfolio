import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-read mx-auto px-6 py-24 text-center">
      <p className="font-mono text-[13px] text-accent tracking-[0.04em] mb-6">
        ~ / 404
      </p>
      <h1 className="font-display font-bold text-fg mb-4" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
        404
      </h1>
      <p className="font-body text-base text-fg-muted mb-8">
        Page introuvable.
      </p>
      <Link
        href="/projects"
        className="font-mono text-sm text-accent hover:text-accent-strong transition-colors duration-200 inline-flex items-center gap-2"
      >
        <ArrowLeftIcon />
        Retour aux projets
      </Link>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
