import { Sidebar } from '@/components/Sidebar';

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="flex">
        <Sidebar className="sticky top-0 h-screen" />
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
