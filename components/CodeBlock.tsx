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
    <div className="relative my-6">
      <pre
        ref={ref}
        className="bg-scope-bg rounded-md font-mono text-[13px] leading-[1.65] text-scope-fg overflow-x-auto"
        style={{ padding: "40px 16px 16px", margin: 0 }}
      >
        {children}
      </pre>

      <button
        onClick={copy}
        aria-label="Copier le code"
        className="absolute top-2 right-2 bg-transparent border border-scope-grid rounded-sm font-ui text-[12px] text-scope-text hover:text-scope-fg inline-flex items-center gap-[6px] px-2 py-1 cursor-pointer"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? "Copié" : "Copier"}
      </button>

      {language && (
        <span className="absolute top-3 left-4 font-ui text-[12px] text-scope-text">{language}</span>
      )}
    </div>
  );
}
