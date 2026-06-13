import Hero from "@/components/Hero";
import FadeIn from "@/components/animations/FadeIn";
import SectionTitle from "@/components/SectionTitle";
import { readProjects } from "@/lib/projects";
import { DOMAIN_CONFIG } from "@/types/project";
import type { Domain } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";

export default function HomePage() {
  const allProjects = readProjects();
  const featured = allProjects.filter((p) => p.featured);

  const domainCounts = Object.fromEntries(
    (Object.keys(DOMAIN_CONFIG) as Domain[]).map((key) => [
      key,
      allProjects.filter((p) => p.domains.includes(key)).length,
    ])
  );

  return (
    <>
      <Hero />

      {/* Domaines */}
      <FadeIn delay={0.1}>
        <section className="max-w-layout mx-auto px-6 py-16">
          <div className="flex justify-between items-baseline mb-8">
            <SectionTitle number="01">Domaines</SectionTitle>
            <span className="font-mono text-xs text-fg-muted">
              {Object.keys(DOMAIN_CONFIG).length} axes techniques
            </span>
          </div>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
          >
            {(Object.entries(DOMAIN_CONFIG) as [Domain, { label: string; color: string }][]).map(
              ([key, { label, color }]) => (
                <Link
                  key={key}
                  href={`/projects?domain=${key}`}
                  className="no-underline block h-full"
                >
                  <DomainCard
                    label={label}
                    color={color}
                    count={domainCounts[key] ?? 0}
                  />
                </Link>
              )
            )}
          </div>
        </section>
      </FadeIn>

      {/* Projets mis en avant */}
      <FadeIn delay={0.2}>
        <section className="max-w-layout mx-auto px-6 pb-16">
          <div className="flex justify-between items-baseline mb-8">
            <SectionTitle number="02">Projets mis en avant</SectionTitle>
            <Link
              href="/projects"
              className="font-mono text-xs text-accent no-underline inline-flex items-center gap-[6px] hover:text-accent-strong transition-colors duration-200"
            >
              Tous les projets
              <ArrowRightIcon />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((project, i) => (
              <div key={project.id} className={i === 0 ? "md:col-span-2" : ""}>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* À propos teaser */}
      <FadeIn delay={0.3}>
        <section className="max-w-layout mx-auto px-6 pb-24">
          <SectionTitle number="03" className="mb-6">À propos</SectionTitle>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start sm:items-center mt-6">
            <p className="font-body text-[17px] leading-[1.6] text-fg-2 max-w-[640px]">
              Étudiant en M1 Cybersécurité des Systèmes Embarqués à UBS Lorient,
              je travaille sur la sécurité des protocoles sans fil embarqués
              (Zigbee/802.15.4), le reverse engineering de firmwares, la sécurité
              CAN bus et le hardening de systèmes Linux embarqués.
            </p>
            <Link
              href="/about"
              className="font-body text-sm font-medium px-[18px] py-[11px] rounded bg-transparent text-fg border border-border-strong inline-flex items-center gap-2 no-underline whitespace-nowrap transition-colors duration-200 hover:border-fg-muted shrink-0"
            >
              Profil complet
              <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </FadeIn>
    </>
  );
}

interface DomainCardProps {
  label: string;
  color: string;
  count: number;
}

function DomainCard({ label, color, count }: DomainCardProps) {
  return (
    <div
      className="bg-surface border border-border rounded p-6 flex flex-col gap-4 cursor-pointer transition-all duration-200 group h-full"
      style={{ minHeight: "160px" }}
    >
      <div
        className="w-9 h-9 rounded flex items-center justify-center"
        style={{ background: `${color}1F`, border: `1px solid ${color}66`, color }}
      >
        <GridIcon />
      </div>
      <div
        className="font-display font-bold text-fg leading-[1.15]"
        style={{ fontSize: "22px", letterSpacing: "-0.02em" }}
      >
        {label}
      </div>
      <div className="mt-auto flex justify-between items-center font-mono text-xs text-fg-muted tracking-[0.02em]">
        <span>
          {count} projet{count > 1 ? "s" : ""}
        </span>
        <ArrowRightIcon />
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} />
      <rect x={3} y={14} width={7} height={7} /><rect x={14} y={14} width={7} height={7} />
    </svg>
  );
}
