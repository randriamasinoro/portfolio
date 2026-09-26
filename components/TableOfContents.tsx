import type { TocItem } from "@/lib/toc";

interface Props {
  items: TocItem[];
}

export default function TableOfContents({ items }: Props) {
  if (items.length < 3) return null;

  return (
    <nav aria-label="Sommaire" className="hidden lg:block mt-6">
      <p className="text-fg-muted mb-3">Sommaire</p>
      <ul className="list-none p-0 m-0 flex flex-col gap-2 border-l border-border">
        {items.map((item) => (
          <li key={item.id} className={item.level > 2 ? "pl-7" : "pl-4"}>
            <a
              href={`#${item.id}`}
              className="text-fg-2 no-underline hover:text-fg hover:underline leading-snug block"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
