import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { existsSync } from "fs";
import { join } from "path";
import DomainBadge from "@/components/DomainBadge";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { CERTIFICATIONS, SKILL_GROUPS, TIMELINE } from "@/lib/about";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Master 2 Cybersécurité des Systèmes Embarqués (UBS Lorient). Recherche un stage de fin d'études de 20 semaines minimum à partir de janvier 2027, avec perspective de pré-embauche, en cybersécurité et systèmes embarqués. Alternance également envisagée.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "https://sinoro.fr/about",
    title: "À propos, Sehenonirina Elisa Randriamasinoro",
    description:
      "Master 2 Cybersécurité des Systèmes Embarqués (UBS Lorient). Recherche un stage de fin d'études de 20 semaines minimum à partir de janvier 2027, avec perspective de pré-embauche, en cybersécurité et systèmes embarqués. Alternance également envisagée.",
  },
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

// Contacts sous la présentation : texte court (le lien porte l'adresse complète).
const CONTACTS = [
  { href: "mailto:randriamasnrelisa@gmail.com", text: "randriamasnrelisa@gmail.com", icon: <MailIcon size={16} /> },
  { href: "tel:+33664689713", text: "06 64 68 97 13", icon: <PhoneIcon size={16} /> },
  {
    href: "https://www.linkedin.com/in/sehenonirina-elisa-randriamasinoro",
    text: "LinkedIn",
    icon: <LinkedInIcon size={16} />,
  },
  { href: "https://github.com/randriamasinoro", text: "GitHub", icon: <GitHubIcon size={16} /> },
] as const;

// Titre de section de la colonne droite.
function Section({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h2 className="text-[1.375rem] mb-3">{title}</h2>
      {children}
    </section>
  );
}

// Ligne "libellé | contenu" des sections de droite.
function Row({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-y-2 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-5 py-2.5 border-t border-border">
      <div className="pt-1">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

// La page tient dans un seul écran à partir de lg (data-fullscreen, voir le <main>
// du layout ; pas de footer) : deux colonnes, présentation | compétences et
// formation. Peu de texte, en taille normale. Sur mobile, une colonne qui défile.
export default function AboutPage() {
  const photoSrc = resolvePhotoPath();

  return (
    <div data-fullscreen className="min-h-full flex flex-col justify-center py-8 lg:py-2">
      <div className="w-full max-w-[1180px] mx-auto grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-x-16 xl:gap-x-20 lg:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-5">
            {photoSrc && (
              <Image
                src={photoSrc}
                alt="Sehenonirina Elisa Randriamasinoro"
                width={192}
                height={192}
                className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 object-cover rounded-2xl"
                priority
              />
            )}
            <h1 className="text-[2.5rem] sm:text-[3rem] leading-tight m-0">À propos</h1>
          </div>

          <div className="mt-8 max-w-[34rem] text-[1.1875rem] leading-relaxed text-fg-2 space-y-4">
            <p className="text-fg">
              Je suis en Master 2 Cybersécurité des Systèmes Embarqués à l&apos;UBS Lorient.
              Je cherche un stage de fin d&apos;études de 20 semaines minimum à partir de
              janvier 2027. Une alternance m&apos;intéresse aussi.
            </p>
            <p>
              Je développe en C sur STM32 et sous Linux embarqué, et je travaille sur des
              attaques Zigbee et l&apos;injection de trames CAN.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-1 list-none p-0 m-0 text-[0.9375rem]">
            {CONTACTS.map(({ href, text, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 min-h-10 text-fg no-underline hover:text-accent-ink"
                >
                  <span className="text-fg-muted">{icon}</span>
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <Section title="Compétences">
            {SKILL_GROUPS.map(({ label, domain, skills }) => (
              <Row
                key={label}
                label={domain ? <DomainBadge domain={domain} /> : <span className="font-ui text-[13px] text-fg-muted">{label}</span>}
              >
                <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
                  {skills.map((skill) => (
                    <li key={skill} className="rounded-md border border-border bg-surface px-2.5 py-0.5 text-[0.9375rem] text-fg-2">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Row>
            ))}
          </Section>

          <Section title="Formation" className="mt-6">
            {TIMELINE.map((item) => (
              <Row key={item.year} label={<span className="font-ui text-[14px] text-fg-muted">{item.year}</span>}>
                <p className="font-ui font-bold text-fg leading-snug m-0">{item.title}</p>
                <p className="text-[0.9375rem] text-fg-2 m-0">{item.org}</p>
              </Row>
            ))}
            {CERTIFICATIONS.map((c) => (
              <Row key={c.title} label={<span className="font-ui text-[14px] text-fg-muted">Certification</span>}>
                <p className="font-ui font-bold text-fg leading-snug m-0">{c.title}</p>
                <p className="text-[0.9375rem] text-fg-2 m-0">{c.org}</p>
              </Row>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}
