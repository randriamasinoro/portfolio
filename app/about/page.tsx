import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "fs";
import { join } from "path";
import DomainBadge from "@/components/DomainBadge";
import UartTrace from "@/components/UartTrace";
import { CERTIFICATIONS, SKILL_GROUPS, TIMELINE } from "@/lib/about";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Master 2 Cybersécurité des Systèmes Embarqués (UBS Lorient). Recherche un stage de fin d'études de 4 à 6 mois à partir de janvier 2027, avec perspective de pré-embauche, en cybersécurité et systèmes embarqués. Alternance également envisagée.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "https://sinoro.fr/about",
    title: "À propos, Sehenonirina Elisa Randriamasinoro",
    description:
      "Master 2 Cybersécurité des Systèmes Embarqués (UBS Lorient). Recherche un stage de fin d'études de 4 à 6 mois à partir de janvier 2027, avec perspective de pré-embauche, en cybersécurité et systèmes embarqués. Alternance également envisagée.",
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

const CONTACTS = [
  { href: "mailto:randriamasnrelisa@gmail.com", label: "Email", text: "randriamasnrelisa@gmail.com" },
  { href: "tel:+33664689713", label: "Téléphone", text: "06 64 68 97 13" },
  {
    href: "https://www.linkedin.com/in/sehenonirina-elisa-randriamasinoro",
    label: "LinkedIn",
    text: "sehenonirina-elisa-randriamasinoro",
  },
  { href: "https://github.com/randriamasinoro", label: "GitHub", text: "randriamasinoro" },
] as const;

export default function AboutPage() {
  const photoSrc = resolvePhotoPath();

  return (
    <div className="pt-6 md:pt-12">
      <h1 className="text-[2.25rem] sm:text-[3rem] leading-tight mb-8">À propos</h1>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:gap-x-16 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_300px]">
        <div className="max-w-[62ch] min-w-0 lg:col-start-1 lg:row-start-1">
          <div className="text-[1.1875rem] leading-relaxed text-fg-2 space-y-5">
            <p className="text-fg">
              Je m&apos;appelle Sehenonirina Elisa Randriamasinoro. Je suis en
              Master 2 Cybersécurité des Systèmes Embarqués à l&apos;UBS
              Lorient. Avant, j&apos;ai fait une licence en systèmes numériques
              et objets connectés à l&apos;UBS, et deux diplômes techniques à
              l&apos;IST-T d&apos;Antananarivo, en génie industriel puis en
              systèmes automatisés.
            </p>
            <p>
              Côté embarqué, je développe en C sur STM32, sous FreeRTOS ou en
              bare-metal, et j&apos;ai construit une distribution Linux avec
              Yocto pour une carte STM32MP135. Côté sécurité, je travaille sur
              un banc d&apos;attaques Zigbee (nRF52840, ESP32-H2, WHAD) et sur
              l&apos;injection de trames CAN, et j&apos;ai mis en place un secure
              boot U-Boot signé en RSA sous QEMU.
            </p>
            <p>
              J&apos;administre aussi un serveur ARM64 qui héberge ce site,
              derrière un VPN WireGuard, avec Wazuh, CrowdSec et une
              supervision Prometheus et Grafana, déployé par une chaîne
              DevSecOps.
            </p>
            <p>
              Je cherche un stage de fin d&apos;études de 4 à 6 mois à partir
              de janvier 2027, en cybersécurité des systèmes embarqués, avec une
              perspective de pré-embauche. Une alternance m&apos;intéresse
              aussi.
            </p>
          </div>

          <section className="mt-12">
            <UartTrace message="Elisa" />
          </section>
        </div>

        <div className="max-w-[62ch] min-w-0 lg:col-start-1 lg:row-start-2 xl:col-start-2 xl:row-start-1">
          <section>
            <h2 className="text-[1.5rem] mb-6">Compétences</h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {SKILL_GROUPS.map(({ label, domain, skills }) => (
                <div key={label}>
                  {domain ? (
                    <DomainBadge domain={domain} />
                  ) : (
                    <span className="font-ui text-[13px] text-fg-muted">{label}</span>
                  )}
                  <p className="text-[1.0625rem] text-fg-2 leading-relaxed mt-2 m-0">{skills.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-[1.5rem] mb-6">Formation</h2>
            <ol className="list-none p-0 m-0 border-l border-border-strong">
              {TIMELINE.map((item) => (
                <li key={item.year} className="relative pl-6 pb-7 last:pb-0">
                  <span
                    className="absolute -left-[5px] top-[7px] w-[9px] h-[9px] rounded-full bg-bg border-2 border-fg"
                    aria-hidden="true"
                  />
                  <p className="font-ui text-[14px] text-fg-muted m-0">{item.year}</p>
                  <p className="font-ui text-[1.0625rem] font-bold text-fg m-0 mt-1">{item.title}</p>
                  <p className="text-fg-2 m-0">{item.org}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16">
            <h2 className="text-[1.5rem] mb-6">Certifications</h2>
            <ul className="list-none p-0 m-0 space-y-4">
              {CERTIFICATIONS.map((c) => (
                <li key={c.title}>
                  <p className="font-ui text-[1.0625rem] font-bold text-fg m-0">{c.title}</p>
                  <p className="text-fg-2 m-0">
                    {c.org}
                    {c.date && `, ${c.date}`}
                  </p>
                </li>
              ))}
            </ul>
          </section>

        </div>

        <aside className="order-first lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 xl:col-start-3 xl:row-span-1 flex flex-row lg:flex-col gap-5 lg:gap-0 items-start text-[15px] min-w-0">
          {photoSrc && (
            <Image
              src={photoSrc}
              alt="Sehenonirina Elisa Randriamasinoro"
              width={320}
              height={320}
              className="w-24 sm:w-40 lg:w-full max-w-[320px] shrink-0 aspect-square object-cover rounded-md lg:mb-8"
              priority
            />
          )}
          <div className="min-w-0">
          <h2 className="text-[1.125rem] mb-3 lg:mb-4">Contact</h2>
          <dl className="m-0 space-y-2 lg:space-y-3">
            {CONTACTS.map(({ href, label, text }) => (
              <div key={label}>
                <dt className="text-fg-muted text-[13px]">{label}</dt>
                <dd className="m-0 break-all">
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-fg"
                  >
                    {text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
