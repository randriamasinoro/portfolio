"use client";

import { useState } from "react";

interface Props {
  message: string;
  baud?: number;
}

// Géométrie en unités de bit : chaque trame 8N1 = start (0) + 8 bits LSB d'abord + stop (1).
const U = 14;
const IDLE_BEFORE = 3;
const GAP = 2;
const FRAME = 10;
const HIGH = 132;
const LOW = 176;
const HEIGHT = 222;

interface Frame {
  char: string;
  code: number;
  start: number; // position du bit de start, en unités
  bits: number[]; // start, D0..D7, stop
}

function buildFrames(message: string): Frame[] {
  return [...message].map((char, i) => {
    const code = char.charCodeAt(0) & 0xff;
    const data = Array.from({ length: 8 }, (_, b) => (code >> b) & 1);
    return {
      char,
      code,
      start: IDLE_BEFORE + i * (FRAME + GAP),
      bits: [0, ...data, 1],
    };
  });
}

function buildPath(frames: Frame[], units: number) {
  const levels = Array<number>(units).fill(1);
  frames.forEach((f) => f.bits.forEach((bit, i) => (levels[f.start + i] = bit)));

  let d = `M0 ${HIGH}`;
  let length = 0;
  let prev = 1;
  levels.forEach((level, i) => {
    if (level !== prev) {
      d += ` V${level ? HIGH : LOW}`;
      length += LOW - HIGH;
      prev = level;
    }
    d += ` H${(i + 1) * U}`;
    length += U;
  });
  return { d, length };
}

const hex = (n: number) => `0x${n.toString(16).toUpperCase().padStart(2, "0")}`;
const binary = (n: number) => n.toString(2).padStart(8, "0").replace(/(\d{4})/, "$1 ");

export default function UartTrace({ message, baud = 115200 }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const frames = buildFrames(message);
  const units = IDLE_BEFORE + frames.length * (FRAME + GAP) + 1;
  const width = units * U;
  const { d, length } = buildPath(frames, units);
  const current = active === null ? null : frames[active];

  return (
    <figure className="min-w-0 bg-scope-bg rounded-md text-scope-text font-ui text-[13px] m-0">
      <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1 px-4 pt-3">
        <span>
          <span className="text-[var(--trace)]">Voie 1</span> UART {baud.toLocaleString("fr-FR")} bauds, 8N1
        </span>
        <span>Survolez ou touchez un octet</span>
      </figcaption>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${HEIGHT}`}
          className="block w-full min-w-[560px]"
          role="img"
          aria-label={`Trame UART qui encode le texte « ${message} »`}
        >
          {/* Graticule : une division toutes les 4 unités de bit */}
          {Array.from({ length: Math.floor(units / 4) + 1 }, (_, i) => (
            <line key={i} x1={i * 4 * U} x2={i * 4 * U} y1={16} y2={HEIGHT - 8} stroke="var(--scope-grid)" />
          ))}
          <line x1={0} x2={width} y1={(HIGH + LOW) / 2} y2={(HIGH + LOW) / 2} stroke="var(--scope-grid)" strokeDasharray="2 4" />

          {frames.map((f, i) => {
            const x = f.start * U;
            const w = FRAME * U;
            const isActive = active === i;
            return (
              <g
                key={i}
                tabIndex={0}
                role="button"
                aria-label={`Octet ${hex(f.code)}, caractère ${f.char}, bits ${binary(f.code)}`}
                aria-pressed={isActive}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(isActive ? null : i)}
                className="cursor-pointer outline-none"
              >
                <rect x={x} y={16} width={w} height={HEIGHT - 24} fill={isActive ? "rgba(194,124,255,0.10)" : "transparent"} />
                <g className="animate-decode" style={{ animationDelay: `${1.1 + i * 0.09}s` }}>
                  <rect
                    x={x + 2}
                    y={24}
                    width={w - 4}
                    height={70}
                    rx={4}
                    fill={isActive ? "var(--trace)" : "none"}
                    stroke="var(--trace)"
                    strokeOpacity={isActive ? 1 : 0.55}
                  />
                  <text
                    x={x + w / 2}
                    y={50}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize={18}
                    fill={isActive ? "var(--scope-bg)" : "var(--scope-text)"}
                  >
                    {hex(f.code)}
                  </text>
                  <text
                    x={x + w / 2}
                    y={83}
                    textAnchor="middle"
                    fontSize={27}
                    fontWeight={700}
                    fill={isActive ? "var(--scope-bg)" : "var(--trace)"}
                  >
                    {f.char}
                  </text>
                </g>
                {isActive &&
                  f.bits.map((bit, b) => (
                    <text
                      key={b}
                      x={x + b * U + U / 2}
                      y={206}
                      textAnchor="middle"
                      fontSize={14}
                      className="font-mono"
                      fill={b === 0 || b === 9 ? "var(--scope-text)" : "var(--trace)"}
                    >
                      {b === 0 ? "S" : b === 9 ? "P" : bit}
                    </text>
                  ))}
              </g>
            );
          })}

          <path
            d={d}
            fill="none"
            stroke="var(--trace)"
            strokeWidth={2}
            strokeLinejoin="round"
            className="animate-trace pointer-events-none"
            style={{ "--trace-length": length } as React.CSSProperties}
          />
        </svg>
      </div>

      <p className="px-4 pb-3 pt-1 m-0 min-h-[2.75rem]" aria-live="polite">
        {current ? (
          <>
            <span className="text-[var(--trace)]">{hex(current.code)}</span> = {binary(current.code)}, envoyé
            bit de poids faible en premier, entre un bit de start (S) et un bit de stop (P).
          </>
        ) : (
          <>Texte décodé : « {message} »</>
        )}
      </p>
    </figure>
  );
}
