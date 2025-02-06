// components/MarkdownRenderer.tsx
import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/base16/atelier-sulphurpool.css';
import Image from 'next/image';
import { FiCopy, FiCheck, FiCornerDownLeft, FiArrowUpRight } from 'react-icons/fi';

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className="absolute right-4 top-0 z-20 flex items-center gap-2 rounded-lg bg-gray-800/50 p-2 backdrop-blur-sm transition-all
                text-gray-300 hover:text-white"
    >
      {copied ? (
        <>
          <FiCheck className="h-4 w-4 text-emerald-400 transition-colors" />
          <span className="text-xs font-medium text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <FiCopy className="h-4 w-4 transition-colors" />
          <span className="text-xs font-medium">Copy</span>
        </>
      )}
    </button>
  );
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="prose dark:prose-invert prose-lg max-w-none 
                bg-white dark:bg-gray-900/95
                p-8 rounded-2xl shadow-xl dark:shadow-2xl
                border border-gray-100 dark:border-gray-800
                backdrop-blur-sm"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const codeString = String(children).replace(/\n$/, '');

          return match ? (
            <div className="group relative my-6 overflow-hidden rounded-xl bg-gray-900 shadow-lg">
              <div className="flex items-center justify-between bg-gray-800 px-6 py-2">
                <span className="font-mono text-xs font-medium text-white">{match[1]}</span>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-700/50" />
                  <div className="h-3 w-3 rounded-full bg-gray-700/50" />
                  <div className="h-3 w-3 rounded-full bg-gray-700/50" />
                </div>
              </div>
              <CopyButton code={codeString} />
              <pre className="overflow-x-auto">
                <code className={`${className} font-mono text-xs leading-relaxed`} {...props}>
                  {children}
                </code>
              </pre>
              <FiCornerDownLeft className="absolute bottom-4 right-4 h-5 w-5 text-gray-500/50" />
            </div>
          ) : (
            <code className="rounded-lg bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
              {children}
            </code>
          );
        },
        p({ ...props }) {
          return <p className="text-gray-600 dark:text-gray-300/90 mb-6 leading-relaxed tracking-wide" {...props} />;
        },
        a({ href, children, ...props }) {
          return (
            <a
              href={href}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300
                        underline-offset-4 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
              <FiArrowUpRight className="inline-block h-4 w-4 -translate-y-px" />
            </a>
          );
        },
        h1({ ...props }) {
          return (
            <h1
              className="mb-12 mt-16 text-4xl font-bold text-gray-900 dark:text-white 
                       border-b-2 border-gray-200 dark:border-gray-800 pb-4"
              {...props}
            />
          );
        },
        h2({ ...props }) {
          return (
            <h2
              className="mb-10 mt-14 text-3xl font-semibold text-gray-900 dark:text-white 
                       before:content-['#'] before:text-blue-500 before:mr-2"
              {...props}
            />
          );
        },
        h3({ ...props }) {
          return (
            <h3
              className="mb-8 mt-12 text-2xl font-medium text-gray-900 dark:text-white 
                       before:content-['##'] before:text-purple-500 before:mr-2 before:opacity-70"
              {...props}
            />
          );
        },
        blockquote({ ...props }) {
          return (
            <blockquote
              className="my-8 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-800/50 pl-6 py-4 italic text-gray-700 dark:text-gray-300/90
                       shadow-inner rounded-r-lg"
              {...props}
            />
          );
        },
        table({ ...props }) {
          return <table className="my-8 w-full border-collapse rounded-lg overflow-hidden shadow-md" {...props} />;
        },
        thead({ ...props }) {
          return (
            <thead
              className="bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300
                        border-b border-gray-200 dark:border-gray-700"
              {...props}
            />
          );
        },
        tr({ ...props }) {
          return <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors" {...props} />;
        },
        th({ ...props }) {
          return <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white" {...props} />;
        },
        td({ ...props }) {
          return <td className="px-6 py-3 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800" {...props} />;
        },
        ul({ ...props }) {
          return <ul className="my-6 pl-6 list-disc space-y-3 marker:text-blue-500/80" {...props} />;
        },
        ol({ ...props }) {
          return <ol className="my-6 pl-6 list-decimal space-y-3 marker:font-medium marker:text-purple-500/80" {...props} />;
        },
        li({ ...props }) {
          return <li className="pl-2 text-gray-700 dark:text-gray-300/90 leading-relaxed" {...props} />;
        },
        img({ src, alt, ...props }) {
          return (
            <figure className="my-10 overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
              <Image
                src={src || ''}
                alt={alt || ''}
                width={1200}
                height={630}
                className="transition-opacity hover:opacity-90"
                quality={100}
                priority
                {...props}
              />
              {alt && (
                <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 px-4">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
}