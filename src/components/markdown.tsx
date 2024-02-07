// import Link from 'next/link';
import { Heading } from './heading.js';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
  text: string;
};

export const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  return (
    <div data-cmptype="Markdown" className="leading-7">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ref, children, ...props }) => (
            <Heading variant="h1" {...props}>
              {children}
            </Heading>
          ),
          h2: ({ node, ref, children, ...props }) => (
            <Heading variant="h2" {...props}>
              {children}
            </Heading>
          ),
          h3: ({ node, ref, children, ...props }) => (
            <Heading variant="h3" {...props}>
              {children}
            </Heading>
          ),
          h4: ({ node, ref, children, ...props }) => (
            <Heading variant="h4" {...props}>
              {children}
            </Heading>
          ),
          ol: ({ node, children, ...props }) => (
            <ol className="ml-5 list-outside list-decimal" {...props}>
              {children}
            </ol>
          ),
          ul: ({ node, children, ...props }) => (
            <ul className="ml-5 list-outside list-disc" {...props}>
              {children}
            </ul>
          ),
          code: ({ node, children, ...props }) => (
            <code {...props} className="inline rounded-md bg-border px-1.5 py-0.5 font-mono">
              {children}
            </code>
          ),
          // a: ({ node, children, href, ref, ...props }) => (
          //   <Link className="underline" href={href || ''} {...props} target="_blank">
          //     {children}
          //   </Link>
          // ),
          table: ({ node, children, ...props }) => (
            <div className="overflow-x-auto">
              <table className="border" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ node, children, ...props }) => (
            <thead className="bg-card" {...props}>
              {children}
            </thead>
          ),
          th: ({ node, children, ...props }) => (
            <th className="whitespace-nowrap px-2 py-1" {...props}>
              {children}
            </th>
          ),
          tr: ({ node, children, ...props }) => (
            <tr className="border-b border-card last:border-b-0" {...props}>
              {children}
            </tr>
          ),
          td: ({ node, children, ...props }) => (
            <td className="whitespace-pre border-r border-card px-2 py-1 last:border-r-0" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
