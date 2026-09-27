import { MDXRemote } from "next-mdx-remote/rsc";
import { isValidElement, type ComponentProps, type ReactNode } from "react";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import CodeBlock from "./CodeBlock";
import Callout from "./Callout";
import ImageFigure from "./ImageFigure";
import { slugify } from "@/lib/toc";

interface Props {
  content: string;
}

export default function MDXContent({ content }: Props) {
  return (
    <div className="mdx-content font-body">
      <MDXRemote
        source={content}
        components={COMPONENTS}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, PRETTY_CODE]],
          },
        }}
      />
    </div>
  );
}

// Coloration syntaxique au build (Shiki) : aucun JS côté navigateur.
// Fond géré par CodeBlock (écran d'instrument), le thème ne fournit que les couleurs du texte.
const PRETTY_CODE: PrettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: false,
  defaultLang: "plaintext",
  bypassInlineCode: true,
};

// Texte brut d'un titre, même s'il contient du code inline (pour une ancre identique au sommaire).
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

const COMPONENTS = {
  h2({ children }: { children?: ReactNode }) {
    const id = slugify(textOf(children));
    return (
      <h2 id={id} className="text-[1.5rem] leading-tight text-fg mt-14 mb-4 scroll-mt-6 max-w-[720px] mx-auto">
        {children}
      </h2>
    );
  },
  h3({ children }: { children?: ReactNode }) {
    const id = slugify(textOf(children));
    return (
      <h3
        id={id}
        className="text-[1.1875rem] leading-snug text-fg mt-10 mb-3 scroll-mt-6 max-w-[720px] mx-auto"
      >
        {children}
      </h3>
    );
  },
  p({ children }: { children?: ReactNode }) {
    // Markdown place chaque image dans un paragraphe : on l'en sort pour qu'elle
    // prenne toute la largeur de la colonne, plus large que le texte.
    if (isValidElement<{ src?: string }>(children) && typeof children.props.src === "string") {
      return <>{children}</>;
    }
    return (
      <p className="text-[1.125rem] text-fg-2 leading-[1.75] mb-5 max-w-[720px] mx-auto">
        {children}
      </p>
    );
  },
  ul({ children }: { children?: ReactNode }) {
    return (
      <ul className="text-[1.125rem] text-fg-2 leading-[1.7] mb-5 pl-5 list-disc marker:text-fg-muted max-w-[720px] mx-auto">
        {children}
      </ul>
    );
  },
  ol({ children }: { children?: ReactNode }) {
    return (
      <ol className="max-w-[720px] mx-auto text-[1.125rem] text-fg-2 leading-[1.7] mb-5 pl-5 list-decimal marker:text-fg-muted marker:font-ui">
        {children}
      </ol>
    );
  },
  li({ children }: { children?: ReactNode }) {
    return <li className="mb-2">{children}</li>;
  },
  a({ href, children }: { href?: string; children?: ReactNode }) {
    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-accent-ink underline underline-offset-2"
      >
        {children}
      </a>
    );
  },
  code({ children, className, ...rest }: ComponentProps<"code"> & { "data-language"?: string }) {
    // Code de bloc déjà traité par rehype-pretty-code : on le laisse tel quel.
    if (className || rest["data-language"]) {
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code className="font-mono text-[0.82em] text-fg bg-surface-2 px-1 py-0.5 rounded-sm">
        {children}
      </code>
    );
  },
  pre({ children, ...rest }: ComponentProps<"pre"> & { "data-language"?: string }) {
    return <CodeBlock language={rest["data-language"]}>{children}</CodeBlock>;
  },
  figure({ children, ...rest }: ComponentProps<"figure"> & { "data-rehype-pretty-code-figure"?: string }) {
    // rehype-pretty-code enveloppe chaque bloc dans une <figure> : on neutralise ses marges.
    if ("data-rehype-pretty-code-figure" in rest) return <>{children}</>;
    return <figure {...rest}>{children}</figure>;
  },
  blockquote({ children }: { children?: ReactNode }) {
    return (
      <blockquote
        className="border-l-2 border-border-strong pl-5 my-6 text-fg-2 italic max-w-[720px] mx-auto"
      >
        {children}
      </blockquote>
    );
  },
  table({ children }: { children?: ReactNode }) {
    return (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse font-ui text-[14px] leading-relaxed">
          {children}
        </table>
      </div>
    );
  },
  thead({ children }: { children?: ReactNode }) {
    return <thead className="border-b border-border-strong">{children}</thead>;
  },
  tbody({ children }: { children?: ReactNode }) {
    return <tbody>{children}</tbody>;
  },
  tr({ children }: { children?: ReactNode }) {
    return (
      <tr className="border-b border-border last:border-0">
        {children}
      </tr>
    );
  },
  th({ children }: { children?: ReactNode }) {
    return (
      <th className="px-3 py-2 text-left align-bottom text-fg font-bold whitespace-nowrap">
        {children}
      </th>
    );
  },
  td({ children }: { children?: ReactNode }) {
    return (
      <td className="px-3 py-2 align-top text-fg-2">
        {children}
      </td>
    );
  },
  img({ src, alt }: { src?: string; alt?: string }) {
    if (!src) return null;
    return (
      <figure className="my-8">
        {src.endsWith(".svg") ? (
          // Schéma TikZ : fond blanc arrondi intégré ; clic pour l'ouvrir en grand (utile sur mobile)
          <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Ouvrir le schéma en grand : ${alt ?? ""}`} className="block rounded-xl focus-visible:outline-offset-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt ?? ""} loading="lazy" className="w-full h-auto rounded-xl" />
          </a>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} loading="lazy" className="w-full rounded-sm border border-border" />
        )}
        {alt && (
          <figcaption className="font-ui text-[13px] text-fg-muted mt-2 leading-snug">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
  Callout,
  ImageFigure,
};
