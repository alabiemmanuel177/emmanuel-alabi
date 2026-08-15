#!/usr/bin/env bash
# Build the academic CV PDF and publish it to public/cv/.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
src="$root/cv"
out="$src/generated"
public="$root/public/cv"
name="emmanuel-alabi-academic-cv"

if ! command -v pdflatex >/dev/null 2>&1; then
  echo "error: pdflatex not found." >&2
  echo "       install a TeX distribution, e.g. brew install --cask mactex-no-gui" >&2
  exit 1
fi

mkdir -p "$out" "$public"

# Twice: first pass resolves references, second typesets them.
for _ in 1 2; do
  pdflatex -interaction=nonstopmode -halt-on-error \
    -output-directory "$out" -jobname "$name" "$src/cv.tex" >/dev/null
done

cp "$out/$name.pdf" "$public/$name.pdf"
echo "built $public/$name.pdf"
