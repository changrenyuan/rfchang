import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TechnicalNote } from '@/data';

interface TechnicalNotesProps {
  notes: TechnicalNote[];
}

export function TechnicalNotes({ notes }: TechnicalNotesProps) {
  return (
    <section className="border-t py-16">
      <div className="content-container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
            Recent Technical Notes
          </h2>
          <Link
            href="/notes"
            className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            全部札记 ({notes.length})
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {notes.map((note, index) => (
            <Link
              key={index}
              href={`/notes/${encodeURIComponent(note.title)}`}
              className="block pl-4 py-3 hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <div className="mb-2 flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                <span className="font-mono">{note.date}</span>
                <span>·</span>
                <span className="px-2 py-0.5 bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                  {note.category}
                </span>
                <span>·</span>
                <span>{note.readTime}</span>
                {note.isDeep && (
                  <>
                    <span>·</span>
                    <span className="text-[var(--color-primary)] font-medium">
                      深度研读
                    </span>
                  </>
                )}
              </div>

              <h3 className="mb-2 text-lg font-serif font-medium text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors">
                {note.title}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {note.excerpt}
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {note.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs bg-[var(--bg-code)] text-[var(--text-tertiary)] rounded-industrial-sm font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
