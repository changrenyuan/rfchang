'use client';

import { useState } from 'react';
import publications from '@/data/publications.json';
import { ExternalLink, FileText, Code, Copy, Check, X } from 'lucide-react';

interface Publication {
  id: string;
  year: number;
  title: string;
  authors: Array<{ name: string; affiliation: string }>;
  journal?: string;
  conference?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  location?: string;
  doi?: string;
  abstract: string;
  keywords: string[];
  pdfUrl?: string;
  codeUrl?: string;
  bibtex: string;
}

export default function PublicationsWall() {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);
  const [copied, setCopied] = useState(false);

  const years = Array.from(new Set(publications.publications.map(p => p.year))).sort((a, b) => b - a);

  const filteredPapers = selectedYear === 'all'
    ? publications.publications
    : publications.publications.filter(p => p.year === selectedYear);

  const copyBibtex = (bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* 年份筛选器 */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-thin pb-4">
        <button
          onClick={() => setSelectedYear('all')}
          className={`px-3 py-1 text-sm rounded-industrial-sm transition-colors
            ${selectedYear === 'all'
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]'}
          `}
        >
          All Years
        </button>
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-3 py-1 text-sm rounded-industrial-sm transition-colors
              ${selectedYear === year
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]'}
            `}
          >
            {year}
          </button>
        ))}
      </div>

      {/* 论文列表 */}
      <div className="space-y-6">
        {filteredPapers.map((paper, index) => (
          <article
            key={paper.id}
            className="border-l-thin pl-4 py-2 hover:bg-[var(--bg-tertiary)] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-serif font-medium text-[var(--text-primary)] mb-2">
                  {paper.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  {paper.authors.map((author, i) => (
                    <span key={i}>
                      {author.name}
                      {i < paper.authors.length - 1 && ', '}
                    </span>
                  ))}
                </p>

                <p className="text-sm font-medium text-[var(--color-primary)] mb-3">
                  {paper.journal || paper.conference}
                  {paper.volume && `, Vol. ${paper.volume}`}
                  {paper.issue && `, No. ${paper.issue}`}
                  {paper.pages && `, pp. ${paper.pages}`}
                  {paper.location && `, ${paper.location}`}
                  {paper.year && ` (${paper.year})`}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {paper.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-[var(--bg-code)] text-[var(--text-secondary)] rounded-industrial-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 text-sm">
                  <button
                    onClick={() => setSelectedPaper(paper)}
                    className="flex items-center gap-1 text-[var(--color-primary)] hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    Abstract
                  </button>
                  {paper.pdfUrl && (
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      PDF
                    </a>
                  )}
                  {paper.codeUrl && (
                    <a
                      href={paper.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <Code className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  <button
                    onClick={() => copyBibtex(paper.bibtex)}
                    className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'BibTeX'}
                  </button>
                </div>
              </div>

              <div className="text-xs font-mono text-[var(--text-tertiary)]">
                {paper.year}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 摘要弹出层 */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-[var(--bg-secondary)] rounded-industrial-md border border-thin max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-[var(--bg-secondary)] border-b border-thin px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-serif font-semibold">Abstract</h2>
              <button
                onClick={() => setSelectedPaper(null)}
                className="p-1 hover:bg-[var(--bg-tertiary)] rounded-industrial-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-[var(--text-primary)] mb-4">
                {selectedPaper.title}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {selectedPaper.authors.map((author, i) => (
                  <span key={i}>
                    {author.name}
                    {i < selectedPaper.authors.length - 1 && ', '}
                  </span>
                ))}
              </p>

              <div className="border-t border-thin pt-4">
                <p className="text-sm leading-relaxed text-[var(--text-primary)]">
                  {selectedPaper.abstract}
                </p>
              </div>

              {selectedPaper.doi && (
                <div className="mt-4 text-sm">
                  <span className="text-[var(--text-tertiary)]">DOI: </span>
                  <a
                    href={`https://doi.org/${selectedPaper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    {selectedPaper.doi}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
