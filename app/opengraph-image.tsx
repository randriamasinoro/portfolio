import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt =
  "Sehenonirina Elisa Randriamasinoro — Cybersécurité des Systèmes Embarqués & Data Science";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function loadFont(): ArrayBuffer {
  const fontPath = path.join(process.cwd(), "public/fonts/Syne-Bold.ttf");
  const buffer = fs.readFileSync(fontPath);
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

export default async function Image() {
  const syne = loadFont();

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
          fontFamily: "Syne",
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
      fonts: [{ name: "Syne", data: syne, style: "normal", weight: 700 }],
    }
  );
}
