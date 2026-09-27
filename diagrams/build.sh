#!/usr/bin/env bash
# Compile chaque schéma TikZ de diagrams/src en SVG dans public/images/...
# La destination est indiquée sur la première ligne du .tex : "% out: public/images/<id>/<nom>.svg"
# Prérequis : pdflatex (TeX Live avec tikz, standalone, lmodern) et pdftocairo (poppler-utils).
set -euo pipefail
cd "$(dirname "$0")"
root="$(cd .. && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
for src in src/*.tex; do
  [[ -n "${1:-}" && "$src" != *"$1"* ]] && continue
  out="$(head -1 "$src" | sed -n 's/^% out: //p')"
  [[ -z "$out" ]] && { echo "ignoré (pas de ligne out) : $src"; continue; }
  name="$(basename "$src" .tex)"
  if ! TEXINPUTS="$PWD:" pdflatex -interaction=nonstopmode -halt-on-error \
      -output-directory "$tmp" "$src" > "$tmp/$name.stdout" 2>&1; then
    echo "ÉCHEC $src"; grep -A4 "^!" "$tmp/$name.log" | head -12; exit 1
  fi
  mkdir -p "$root/$(dirname "$out")"
  pdftocairo -svg "$tmp/$name.pdf" "$root/$out"
  echo "ok  $src -> $out"
done
