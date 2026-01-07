import PublicationsWall from '@/components/PublicationsWall';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '学术论文 | Publications | 常人元射频研究',
  description: '常人元在射频工程领域的学术论文和研究成果，涵盖 5G/6G 通信、毫米波功率放大器、线性化技术等方向。发表在 IEEE Transactions、Nature Communications 等顶级期刊。',
  keywords: ['常人元论文', '射频论文', 'Publications', '学术论文', 'IEEE', '毫米波', '线性化技术'],
  openGraph: {
    title: '学术论文 | Publications | 常人元射频研究',
    description: '常人元在射频工程领域的学术论文和研究成果',
  },
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
