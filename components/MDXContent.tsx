import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactElement, ReactNode } from "react";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";
import Callout from "./Callout";
import ImageFigure from "./ImageFigure";
import { slugify } from "@/lib/toc";

interface Props {
  content: string;
  domainColor: string;
}

export default function MDXContent({ content, domainColor }: Props) {
  const components = buildComponents(domainColor);
  return (
    <div className="mdx-content">
      <MDXRemote
        source={content}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}

function buildComponents(domainColor: string) {
  return {
    h2({ children }: { children?: ReactNode }) {
      const id = slugify(String(children ?? ""));
      return (
        <h2
          id={id}
          className="font-display font-bold text-fg mt-8 mb-4"
          style={{
            fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            paddingLeft: "14px",
            borderLeft: `2px solid ${domainColor}`,
          }}
        >
          {children}
        </h2>
      );
    },
    h3({ children }: { children?: ReactNode }) {
      const id = slugify(String(children ?? ""));
      return (
        <h3
          id={id}
          className="font-body font-semibold text-fg text-[1.125rem] leading-[1.25] mt-6 mb-3"
        >
          {children}
        </h3>
      );
    },
    p({ children }: { children?: ReactNode }) {
      return (
        <p className="font-body text-base text-fg-2 leading-[1.75] mb-4">
          {children}
        </p>
      );
    },
    ul({ children }: { children?: ReactNode }) {
      return (
        <ul className="font-body text-base text-fg-2 leading-[1.75] mb-4 pl-5 list-disc">
          {children}
        </ul>
      );
    },
    ol({ children }: { children?: ReactNode }) {
      return (
        <ol className="font-body text-base text-fg-2 leading-[1.75] mb-4 pl-5 list-decimal">
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
          className="text-accent hover:text-accent-strong transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
    code({ children, className }: { children?: ReactNode; className?: string }) {
      if (className) return <code className={className}>{children}</code>;
      return (
        <code className="font-mono text-[0.9em] text-accent-strong bg-surface-2 px-1 py-0.5 rounded-sm">
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
          className="border-l-2 border-border-strong pl-4 my-4 text-fg-muted italic"
        >
          {children}
        </blockquote>
      );
    },
    table({ children }: { children?: ReactNode }) {
      return (
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse font-mono text-sm">
            {children}
          </table>
        </div>
      );
    },
    thead({ children }: { children?: ReactNode }) {
      return <thead className="border-b border-border">{children}</thead>;
    },
    tbody({ children }: { children?: ReactNode }) {
      return <tbody>{children}</tbody>;
    },
    tr({ children }: { children?: ReactNode }) {
      return (
        <tr className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
          {children}
        </tr>
      );
    },
    th({ children }: { children?: ReactNode }) {
      return (
        <th className="px-4 py-2 text-left text-fg font-semibold whitespace-nowrap">
          {children}
        </th>
      );
    },
    td({ children }: { children?: ReactNode }) {
      return (
        <td className="px-4 py-2 text-fg-2">
          {children}
        </td>
      );
    },
    Callout,
    ImageFigure,
  };
}
