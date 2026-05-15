import type { TocItem } from "@/lib/toc";

interface Props {
  items: TocItem[];
}

export default function TableOfContents({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <aside className="sticky top-[88px] self-start hidden lg:block">
      <div className="font-mono text-[10px] tracking-[0.08em] text-fg-muted mb-[14px] pb-[10px] border-b border-border">
        SUR CETTE PAGE
      </div>
      <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level > 2 ? "12px" : "0" }}>
            <a
              href={`#${item.id}`}
              className="font-body text-[13px] text-fg-muted hover:text-fg-2 no-underline transition-colors duration-200"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
