export default function HomePage() {
  return (
    <div className="dot-grid min-h-[calc(100vh-60px)] flex items-center justify-center">
      <div className="max-w-layout mx-auto px-6 py-24">
        <p className="font-mono text-[13px] text-accent tracking-[0.04em] mb-4">
          ~ / portfolio
        </p>
        <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-bold leading-none tracking-[-0.03em] text-fg mb-6">
          Elisa
          <span
            className="inline-block w-[0.5ch] h-[0.9em] bg-accent align-bottom ml-2 animate-blink"
            aria-hidden="true"
          />
        </h1>
        <p className="font-body text-[17px] leading-[1.6] text-fg-2 max-w-[640px] mb-3">
          Ingénieure en cybersécurité des systèmes embarqués.
          <br />
          En alternance à partir de septembre 2026.
        </p>
        <p className="font-mono text-[13px] text-fg-muted tracking-[0.04em] mb-10">
          Cybersécurité{" "}
          <span className="text-accent">·</span>{" "}
          Systèmes Embarqués{" "}
          <span className="text-accent">·</span>{" "}
          Data
        </p>
        <div className="flex gap-3 flex-wrap">
          <a
            href="/projects"
            className="font-body text-sm font-medium px-[18px] py-[11px] rounded bg-accent text-white border border-transparent inline-flex items-center gap-2 transition-all duration-200 ease-ease hover:brightness-110"
          >
            Voir mes projets
            <ArrowRightIcon />
          </a>
          <a
            href="https://github.com/randriamasinoro-elisa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium px-[18px] py-[11px] rounded bg-transparent text-fg border border-border-strong inline-flex items-center gap-2 transition-all duration-200 ease-ease hover:border-fg-muted"
          >
            <GitHubIcon />
            GitHub
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
