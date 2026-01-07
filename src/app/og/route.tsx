// @ts-ignore - Next.js OG route type inference issue
import { ImageResponse } from 'next/og';

// 生成动态 OG 图片的路由处理器
export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image({
  params,
}: {
  params?: { title?: string };
}) {
  const title = params?.title || 'RF Research';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAFAFA',
          backgroundImage: `
            linear-gradient(90deg, #E2E8F0 1px, transparent 1px),
            linear-gradient(#E2E8F0 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* 装饰线条 - 模拟射频波形 */}
        <svg
          width="800"
          height="200"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.05,
          }}
          viewBox="0 0 800 200"
        >
          <path
            d="M 0 100 Q 50 50 100 100 T 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 T 800 100"
            stroke="#1A2A6C"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Logo 和标题 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            padding: '48px',
            border: '2px solid #1A2A6C',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '4px',
            boxShadow: '0 0 40px rgba(26, 42, 108, 0.1)',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1A2A6C',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            RF Research
          </div>

          <div
            style={{
              fontSize: '14px',
              color: '#64748B',
              letterSpacing: '1px',
            }}
          >
            射频工程技术笔记
          </div>

          <div
            style={{
              width: '200px',
              height: '1px',
              backgroundColor: '#1A2A6C',
            }}
          />

          <div
            style={{
              fontSize: '32px',
              fontWeight: '500',
              color: '#0F172A',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: '1.4',
            }}
          >
            {title}
          </div>
        </div>

        {/* 底部信息 */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '12px',
            color: '#94A3B8',
          }}
        >
          rf-research.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
