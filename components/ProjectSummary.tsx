import type { Project } from "@/types/project";

interface Props {
  items: NonNullable<Project["resume"]>;
}

// Bloc "L'essentiel" : le recruteur comprend le projet en un coup d'œil avant les détails.
export default function ProjectSummary({ items }: Props) {
  if (!items?.length) return null;
  return (
    <section
      aria-label="L'essentiel"
      className="max-w-[720px] mx-auto mb-12 rounded-xl border border-border bg-surface/60 p-6 sm:p-7"
    >
      <dl className="grid gap-x-5 gap-y-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
        {items.map(({ label, texte }) => (
          <div key={label} className="contents">
            <dt className="font-ui text-[14px] font-bold text-accent-ink pt-[3px]">
              {label}
            </dt>
            <dd className="m-0 font-body text-[1.0625rem] leading-relaxed text-fg">{texte}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
