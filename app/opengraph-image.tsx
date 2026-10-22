import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { HERO_SKILLS } from "@/lib/about";

export const runtime = "nodejs";
export const alt =
  "Sehenonirina Elisa Randriamasinoro, Cybersécurité des Systèmes Embarqués";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori ne lit pas les variables CSS : palette .dark de globals.css recopiée en hex.
const C = {
  surface: "#1E1E1F",
  surface2: "#262628",
  borderStrong: "#48484D",
  fg: "#F2F2F3",
  fg2: "#BDBDC3",
  fgMuted: "#8E8E96",
  accent: "#A43BFF",
  accentInk: "#C27CFF",
  accentDeep: "#4A1F6E",
};

// Assets lus une seule fois (ne dépendent pas de la requête). Satori n'accepte pas le woff2.
const fontDir = join(process.cwd(), "public/fonts");
const [serifItalic, interRegular, interBold, photo] = await Promise.all([
  readFile(join(fontDir, "InstrumentSerif-Italic.ttf")),
  readFile(join(fontDir, "Inter-Regular.ttf")),
  readFile(join(fontDir, "Inter-Bold.ttf")),
  readFile(join(process.cwd(), "public/photo-detouree.png"), "base64"),
]);
const photoSrc = `data:image/png;base64,${photo}`;

// Même composition que la bannière d'accueil (HeroBanner) : photo à gauche, texte à droite.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: C.surface,
          fontFamily: "Inter",
          color: C.fg,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: `radial-gradient(circle at 22% 100%, rgba(164, 59, 255, 0.45) 0%, rgba(164, 59, 255, 0) 55%), radial-gradient(circle at 100% 0%, rgba(74, 31, 110, 0.8) 0%, rgba(74, 31, 110, 0) 40%)`,
          }}
        />

        {/* photo détourée, posée sur le bord bas */}
        <div style={{ display: "flex", alignItems: "flex-end", width: 580, paddingLeft: 32 }}>
          <img src={photoSrc} width={548} height={467} alt="" />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            textAlign: "right",
            padding: "56px 64px 60px 24px",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: C.fgMuted }}>sinoro.fr</div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: `1px solid ${C.borderStrong}`,
                background: C.surface2,
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 30,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 5, background: C.accent }} />
              Master 2 · UBS Lorient
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: "Instrument Serif",
                fontStyle: "italic",
                fontSize: 60,
                lineHeight: 1.1,
              }}
            >
              Bonjour, je m&apos;appelle&nbsp;<span style={{ color: C.accentInk }}>Elisa.</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 36,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginTop: 10,
                maxWidth: 540,
              }}
            >
              Je travaille sur la sécurité des systèmes embarqués, du firmware au réseau.
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 23, fontWeight: 700, color: C.fg2, whiteSpace: "nowrap" }}>
            {HERO_SKILLS.join("  •  ")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, style: "normal", weight: 400 },
        { name: "Inter", data: interBold, style: "normal", weight: 700 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
      ],
    }
  );
}
