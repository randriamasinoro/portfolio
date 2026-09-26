import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactElement, ReactNode } from "react";
import remarkGfm from "remark-gfm";
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
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}

const COMPONENTS = {
  h2({ children }: { children?: ReactNode }) {
    const id = slugify(String(children ?? ""));
    return (
      <h2 id={id} className="text-[1.5rem] leading-tight text-fg mt-14 mb-4 scroll-mt-6">
        {children}
      </h2>
    );
  },
  h3({ children }: { children?: ReactNode }) {
    const id = slugify(String(children ?? ""));
    return (
      <h3
        id={id}
        className="text-[1.1875rem] leading-snug text-fg mt-10 mb-3 scroll-mt-6"
      >
        {children}
      </h3>
    );
  },
  p({ children }: { children?: ReactNode }) {
    return (
      <p className="text-[1.125rem] text-fg-2 leading-[1.75] mb-5">
        {children}
      </p>
    );
  },
  ul({ children }: { children?: ReactNode }) {
    return (
      <ul className="text-[1.125rem] text-fg-2 leading-[1.7] mb-5 pl-5 list-disc marker:text-fg-muted">
        {children}
      </ul>
    );
  },
  ol({ children }: { children?: ReactNode }) {
    return (
      <ol className="text-[1.125rem] text-fg-2 leading-[1.7] mb-5 pl-5 list-decimal marker:text-fg-muted marker:font-ui">
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
  code({ children, className }: { children?: ReactNode; className?: string }) {
    if (className) return <code className={className}>{children}</code>;
    return (
      <code className="font-mono text-[0.82em] text-fg bg-surface-2 px-1 py-0.5 rounded-sm">
        {children}
      </code>
    );
  },
  pre({ children }: { children?: ReactNode }) {
    const codeEl = children as ReactElement<{
      className?: string;
      children?: string;
    }>;
    const language =
      codeEl?.props?.className?.replace("language-", "") ?? "";
    const code = String(codeEl?.props?.children ?? "").trimEnd();
    return <CodeBlock language={language}>{code}</CodeBlock>;
  },
  blockquote({ children }: { children?: ReactNode }) {
    return (
      <blockquote
        className="border-l-2 border-border-strong pl-5 my-6 text-fg-2 italic"
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ""}
          className="w-full rounded-sm border border-border"
        />
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
