"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitHubIcon, ArrowRightIcon, ArrowUpRightIcon } from "./icons";

function useTypewriter(text: string, speed = 90) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return displayed;
}

const BlinkingCursor = memo(function BlinkingCursor() {
  return (
    <span
      className="inline-block w-[0.5ch] h-[0.9em] bg-accent align-bottom ml-2 animate-blink"
      aria-hidden="true"
      style={{ willChange: "opacity", transform: "translateZ(0)" }}
    />
  );
});

const ease = "easeOut";

export default function Hero() {
  const displayed = useTypewriter("Elisa", 90);

  return (
    <section className="min-h-[calc(100vh-60px)] flex items-center">
      <div className="max-w-layout mx-auto px-6 py-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="font-mono text-[13px] text-accent tracking-[0.04em] mb-4"
        >
          ~ / portfolio
        </motion.p>

        <div
          className="font-display font-bold text-fg mb-6"
          style={{
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            minHeight: "1.05em",
          }}
          aria-label="Elisa"
        >
          {displayed}
          <BlinkingCursor />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.6 }}
          className="font-body text-[17px] leading-[1.6] text-fg-2 max-w-[640px] mb-3"
        >
          Étudiant en <em className="not-italic font-semibold text-fg">M1 Cybersécurité des Systèmes Embarqués</em> — UBS Lorient.
          <br />
          Recherche <em className="not-italic font-semibold text-fg">stage</em> (dispo. imm.) &amp; <em className="not-italic font-semibold text-fg">alternance</em> cybersécurité / data (sept. 2026 — ENSIBS Vannes).
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.75 }}
          className="font-mono text-[13px] text-fg-muted tracking-[0.04em] mb-10"
        >
          Cybersécurité{" "}
          <span className="text-accent">·</span>{" "}
          Systèmes Embarqués{" "}
          <span className="text-accent">·</span>{" "}
          Data
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.9 }}
          className="flex gap-3 flex-wrap"
        >
          <Link
            href="/projects"
            className="font-body text-sm font-medium px-[18px] py-[11px] rounded bg-accent text-white border border-transparent inline-flex items-center gap-2 transition-all duration-200 hover:brightness-110"
          >
            Voir mes projets
            <ArrowRightIcon />
          </Link>
          <a
            href="https://github.com/randriamasinoro"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium px-[18px] py-[11px] rounded bg-transparent text-fg border border-border-strong inline-flex items-center gap-2 transition-all duration-200 hover:border-fg-muted"
          >
            <GitHubIcon />
            GitHub
            <ArrowUpRightIcon />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
