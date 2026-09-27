export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Retire la syntaxe Markdown inline d'un titre (code, gras, italique, liens).
export function plainTitle(text: string): string {
  return text
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim();
}

export function extractToc(content: string): TocItem[] {
  // On ignore les blocs de code : un commentaire "# ..." dans du bash n'est pas un titre.
  const withoutCode = content.replace(/^```[\s\S]*?^```/gm, "");
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(withoutCode)) !== null) {
    const level = match[1].length;
    const title = plainTitle(match[2]);
    items.push({ level, title, id: slugify(title) });
  }

  return items;
}
