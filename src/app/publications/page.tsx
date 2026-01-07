import PublicationsWall from '@/components/PublicationsWall';

export const metadata = {
  title: 'Publications | RF Research',
  description: '射频工程学术论文与研究成果',
};

export default function PublicationsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-serif font-semibold mb-4">Publications</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            学术论文与研究成果
          </p>
        </header>

        <PublicationsWall />
      </div>
    </div>
  );
}
