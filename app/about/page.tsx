import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "fs";
import { join } from "path";
import FadeIn from "@/components/animations/FadeIn";
import SectionTitle from "@/components/SectionTitle";
import { GitHubIcon, MailIcon, LinkedInIcon, PhoneIcon } from "@/components/icons";
import { SKILL_GROUPS, TIMELINE } from "@/lib/about";
import { DOMAIN_CONFIG } from "@/types/project";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Étudiant en M1 Cybersécurité des Systèmes Embarqués à l'UBS Lorient (ENSIBS). Admis en Diplôme d'Ingénieur Cybersécurité & Data Science à Vannes. Recherche un stage disponible immédiatement jusqu'en août, minimum 10 semaines.",
};

const PHOTO_FORMATS = ["jpg", "jpeg", "png", "webp", "avif"] as const;

function resolvePhotoPath(): string | null {
  for (const ext of PHOTO_FORMATS) {
    if (existsSync(join(process.cwd(), "public", `photo.${ext}`))) {
      return `/photo.${ext}`;
    }
  }
  return null;
}

const CONTACTS = [
  {
    href: "mailto:randriamasnrelisa@gmail.com",
    label: "Email",
    text: "randriamasnrelisa@gmail.com",
    icon: <MailIcon />,
  },
  {
    href: "tel:+33664689713",
    label: "Téléphone",
    text: "06 64 68 97 13",
    icon: <PhoneIcon />,
  },
  {
    href: "https://www.linkedin.com/in/sehenonirina-elisa-randriamasinoro",
    label: "LinkedIn",
    text: "sehenonirina-elisa-randriamasinoro",
    icon: <LinkedInIcon />,
  },
  {
    href: "https://github.com/randriamasinoro-elisa",
    label: "GitHub",
    text: "randriamasinoro-elisa",
    icon: <GitHubIcon />,
  },
] as const;

export default function AboutPage() {
  const photoSrc = resolvePhotoPath();

  return (
    <div className="max-w-layout mx-auto px-6 py-16 pb-24">
      <FadeIn>
        <header className="mb-16">
          <p className="font-mono text-[13px] text-accent tracking-[0.04em] mb-3">
            ~ / à-propos
          </p>
          <SectionTitle as="h1">Profil</SectionTitle>
        </header>
      </FadeIn>

      {/* Bio */}
      <FadeIn delay={0.1}>
        <section className="mb-24">
          <div className="grid gap-10 sm:gap-16 items-start sm:grid-cols-[minmax(0,1fr)_200px]">
            <div className="max-w-[640px]">
              <p className="font-body text-[18px] leading-[1.6] text-fg mb-5">
                Étudiant en M1 Cybersécurité des Systèmes Embarqués à UBS
                Lorient, je travaille sur la sécurité des protocoles sans fil
                embarqués (Zigbee/802.15.4), le reverse engineering de
                firmwares, la sécurité CAN bus et le hardening de systèmes
                Linux embarqués.
              </p>
              <p className="font-body text-base leading-[1.6] text-fg-2 mb-5">
                Admis en 4e année du cycle ingénieur Cybersécurité &amp; Data
                Science à ENSIBS à partir de septembre 2026.
              </p>
              <p className="font-body text-base leading-[1.6] text-fg-2 mb-2">
                Je recherche actuellement :
              </p>
              <ul className="font-body text-base leading-[1.7] text-fg-2 mb-4 pl-5 list-disc space-y-1">
                <li>
                  un <strong className="text-fg font-semibold">stage en cybersécurité embarquée</strong>{" "}
                  (disponible immédiatement, durée minimale de 10 semaines,
                  jusqu&apos;à août 2026) ;
                </li>
                <li>
                  une <strong className="text-fg font-semibold">alternance en cybersécurité &amp; data science</strong>{" "}
                  à partir de septembre 2026, au rythme 1 mois école / 1 mois
                  entreprise.
                </li>
              </ul>
              <p className="font-mono text-[13px] text-fg-muted tracking-[0.04em]">
                France · Europe · télétravail OK
              </p>

              {/* Badges disponibilité */}
              <div className="mt-5 flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] px-3 py-[6px] rounded-full border w-fit"
                  style={{ color: "#22C55E", borderColor: "rgba(34,197,94,0.4)", background: "rgba(34,197,94,0.08)" }}>
                  <span className="w-[6px] h-[6px] rounded-full bg-current animate-pulse inline-block" aria-hidden="true" />
                  Stage · disponible immédiatement · 10 sem. min. · jusqu&apos;en août
                </div>
                <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] px-3 py-[6px] rounded-full border w-fit"
                  style={{ color: "#A855F7", borderColor: "rgba(168,85,247,0.4)", background: "rgba(168,85,247,0.08)" }}>
                  <span className="w-[6px] h-[6px] rounded-full bg-current inline-block" aria-hidden="true" />
                  Alternance · Cybersécurité &amp; Data Science · sept. 2026 · rythme 1 mois / 1 mois
                </div>
              </div>
            </div>

            {/* Photo de profil */}
            <div className="w-[160px] sm:w-[200px] shrink-0">
              {photoSrc ? (
                <Image
                  src={photoSrc}
                  alt="Sehenonirina Elisa Randriamasinoro"
                  width={200}
                  height={200}
                  className="w-full aspect-square object-cover rounded border border-border"
                  priority
                />
              ) : (
                <div
                  className="w-full aspect-square bg-surface border border-border border-dashed rounded flex flex-col items-center justify-center gap-2 text-center"
                  role="img"
                  aria-label="Photo de profil non encore ajoutée"
                >
                  <PlaceholderIcon />
                  <span className="font-mono text-[10px] text-fg-dim tracking-[0.04em] leading-tight px-2">
                    Déposer <code className="text-fg-muted">public/photo.jpg</code>
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Compétences */}
      <FadeIn delay={0.15}>
        <section className="mb-24">
          <div className="mb-8">
            <SectionTitle>Compétences</SectionTitle>
          </div>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
          >
            {SKILL_GROUPS.map(({ domain, skills }) => {
              const { color, label } = DOMAIN_CONFIG[domain];
              return (
                <div key={domain} className="bg-surface border border-border rounded p-5">
                  <div className="flex items-center gap-[10px] mb-4">
                    <div
                      className="w-7 h-7 rounded-sm flex items-center justify-center"
                      style={{ background: `${color}1F`, border: `1px solid ${color}66`, color }}
                    >
                      <DomainDotIcon />
                    </div>
                    <h3 className="font-body text-sm font-semibold text-fg m-0 tracking-[0.02em]">
                      {label}
                    </h3>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[11px] text-fg-2 tracking-[0.02em] px-[9px] py-1 rounded-sm bg-surface-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {/* Parcours */}
      <FadeIn delay={0.2}>
        <section className="mb-24">
          <div className="mb-8">
            <SectionTitle>Formation</SectionTitle>
          </div>
          <ol className="list-none p-0 m-0 max-w-[680px] relative">
            <div
              className="absolute top-[6px] bottom-[6px] bg-border-strong"
              style={{ left: "71px", width: "1px" }}
              aria-hidden="true"
            />
            {TIMELINE.map((item, i) => (
              <li
                key={i}
                className="grid items-baseline gap-4 py-[14px]"
                style={{ gridTemplateColumns: "64px auto 1fr" }}
              >
                <span className="font-mono text-[11px] text-fg-muted tracking-[0.04em] whitespace-nowrap">
                  {item.year}
                </span>
                <span
                  className="w-[9px] h-[9px] rounded-full bg-surface border border-accent z-10"
                  style={{ marginLeft: "-4px" }}
                  aria-hidden="true"
                />
                <div>
                  <div className="font-body text-[15px] font-semibold text-fg mb-[2px]">
                    {item.title}
                  </div>
                  <div className="font-body text-[13px] text-fg-muted">{item.org}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </FadeIn>

      {/* Contact */}
      <FadeIn delay={0.25}>
        <section>
          <div className="mb-6">
            <SectionTitle>Contact</SectionTitle>
          </div>
          <div className="flex flex-col gap-3 max-w-sm">
            {CONTACTS.map(({ href, label, text, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex items-center gap-3 font-body text-sm text-fg-2 hover:text-fg transition-colors duration-200 group"
              >
                <span className="w-9 h-9 rounded bg-surface border border-border text-fg-muted group-hover:text-fg group-hover:border-border-strong inline-flex items-center justify-center transition-all duration-200 shrink-0">
                  {icon}
                </span>
                <span className="font-mono text-[12px] text-fg-muted group-hover:text-fg transition-colors duration-200 truncate">
                  {text}
                </span>
              </a>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}

function DomainDotIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <circle cx={12} cy={12} r={4} />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function PlaceholderIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-fg-dim" aria-hidden="true">
      <circle cx={12} cy={8} r={4} />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
