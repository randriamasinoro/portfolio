"use client";

import { useState, useRef } from "react";
import { CopyIcon, CheckIcon } from "./icons";

interface Props {
  language?: string;
  children: string;
}

export default function CodeBlock({ language, children }: Props) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLPreElement>(null);

  function copy() {
    const text = ref.current?.innerText ?? children;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="relative my-3">
      <pre
        ref={ref}
        className="bg-surface-2 rounded font-mono text-[13px] leading-[1.6] text-fg-2 overflow-x-auto"
        style={{ padding: "14px 16px", margin: 0 }}
      >
        {children}
      </pre>

      <button
        onClick={copy}
        aria-label="Copier le code"
        className="absolute top-[10px] right-[10px] bg-surface border border-border-strong rounded-sm font-mono text-[11px] inline-flex items-center gap-[6px] px-[9px] py-1 cursor-pointer transition-all duration-200"
        style={{ color: copied ? "#22C55E" : "#B0B0C0" }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? "Copié" : "Copier"}
      </button>

      {language && (
        <span className="absolute bottom-2 right-3 font-mono text-[10px] text-fg-dim tracking-[0.04em]">
          {language.toUpperCase()}
        </span>
      )}
    </div>
  );
}
