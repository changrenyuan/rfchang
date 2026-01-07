'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeElement = document.querySelector('code');
    if (codeElement) {
      const text = codeElement.textContent || '';
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="relative group">
      {language && (
        <div className="absolute top-0 right-0 flex items-center gap-2 px-3 py-1 text-xs text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] rounded-br">
          <span>{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[var(--bg-secondary)] transition-colors"
            title="复制代码"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>
      )}
      <pre className={className}>{children}</pre>
    </div>
  );
}
