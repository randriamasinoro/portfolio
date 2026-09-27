"use client";

import { useRef, useState, type ReactNode } from "react";
import { CopyIcon, CheckIcon } from "./icons";

interface Props {
  language?: string;
  children: ReactNode; // lignes déjà colorées par Shiki au build (rehype-pretty-code)
}

// Bloc de code sombre, arrondi, bouton copier en icône à droite (style GitHub).
export default function CodeBlock({ language, children }: Props) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLPreElement>(null);

  function copy() {
    navigator.clipboard?.writeText(ref.current?.innerText ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative my-7 rounded-lg border border-border bg-scope-bg">
      <pre
        ref={ref}
        data-language={language}
        className="m-0 overflow-x-auto py-5 pl-5 pr-16 font-mono text-[13.5px] leading-[1.75] text-scope-fg"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Code copié" : "Copier le code"}
        className="absolute top-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-md border border-scope-grid bg-scope-bg text-scope-text hover:text-scope-fg hover:border-scope-text cursor-pointer transition-colors duration-150"
      >
        {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      </button>
    </div>
  );
}
