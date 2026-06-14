import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "Sehenonirina Elisa Randriamasinoro — Cybersécurité des Systèmes Embarqués & Data Science";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadSyne(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:woff2|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const syne = await loadSyne();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          padding: "72px",
          fontFamily: syne ? "Syne" : "sans-serif",
        }}
      >
        {/* barre accent en haut */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 6,
              background: "#2D7DD2",
              borderRadius: 3,
              marginRight: 20,
            }}
          />
          <div
            style={{
              color: "#6B6862",
              fontSize: 26,
              fontFamily: "monospace",
              letterSpacing: "0.04em",
            }}
          >
            sinoro.fr
          </div>
        </div>

        {/* nom + rôle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#EEEBE4",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 28,
            }}
          >
            <div>Sehenonirina Elisa</div>
            <div>Randriamasinoro</div>
          </div>
          <div
            style={{
              color: "#A8A59E",
              fontSize: 34,
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            M1 Cybersécurité des Systèmes Embarqués — UBS Lorient
          </div>
        </div>

        {/* domaines en bas */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            ["Cybersécurité", "#EF4444"],
            ["Systèmes Embarqués", "#22C55E"],
            ["Data Science", "#3B82F6"],
            ["DevSecOps", "#A855F7"],
          ].map(([label, color]) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                color: "#EEEBE4",
                fontSize: 24,
                fontFamily: "monospace",
                border: `1px solid ${color}66`,
                borderRadius: 6,
                padding: "10px 18px",
                background: `${color}1A`,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: syne
        ? [{ name: "Syne", data: syne, style: "normal", weight: 700 }]
        : [],
    }
  );
}
