'use client';

import { useState } from 'react';

export default function SeriesParallelCalculator() {
  const [mode, setMode] = useState<'series-to-parallel' | 'parallel-to-series'>('series-to-parallel');
  const [r, setR] = useState<string>('');
  const [x, setX] = useState<string>('');
  const [f, setF] = useState<string>('');
  const [result, setResult] = useState<{ rp: string; xp: string } | { rs: string; xs: string } | null>(null);

  const calculate = () => {
    const R = parseFloat(r);
    const X = parseFloat(x);

    if (R > 0 && X !== 0) {
      if (mode === 'series-to-parallel') {
        // 串联转并联
        const Q = Math.abs(X / R);
        const Rp = R * (1 + Q * Q);
        const Xp = X * (1 + Q * Q);
        setResult({ rp: Rp.toFixed(3), xp: Xp.toFixed(3) });
      } else {
        // 并联转串联
        const Q = Math.abs(R / X);
        const Rs = R / (1 + Q * Q);
        const Xs = X / (1 + Q * Q);
        setResult({ rs: Rs.toFixed(3), xs: Xs.toFixed(3) });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)' }}>
          Series/Parallel Impedance
        </h3>
        <p className="text-sm" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          串联和并联阻抗等效转换，用于 Smith Chart 匹配网络设计
        </p>
      </div>

      <div style={{ marginBottom: 'var(--space-8)' }}>
        {/* 转换模式选择 */}
        <div className="mb-8">
          <label className="mb-3 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
            转换模式 / Mode
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => { setMode('series-to-parallel'); setResult(null); }}
              className="btn-industrial"
              style={{
                flex: 1,
                borderColor: mode === 'series-to-parallel' ? 'var(--color-primary)' : undefined,
                backgroundColor: mode === 'series-to-parallel' ? 'var(--color-primary-light)' : undefined,
              }}
            >
              串联 → 并联
            </button>
            <button
              onClick={() => { setMode('parallel-to-series'); setResult(null); }}
              className="btn-industrial"
              style={{
                flex: 1,
                borderColor: mode === 'parallel-to-series' ? 'var(--color-primary)' : undefined,
                backgroundColor: mode === 'parallel-to-series' ? 'var(--color-primary-light)' : undefined,
              }}
            >
              并联 → 串联
            </button>
          </div>
        </div>

        {/* 输入参数 */}
        <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
            <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              {mode === 'series-to-parallel' ? '串联电阻 Rs (Ω)' : '并联电阻 Rp (Ω)'}
            </label>
            <input
              type="number"
              step="0.001"
              value={r}
              onChange={(e) => setR(e.target.value)}
              className="input-industrial w-full text-lg font-mono"
              placeholder={mode === 'series-to-parallel' ? '输入串联电阻' : '输入并联电阻'}
            />
          </div>
          <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
            <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              {mode === 'series-to-parallel' ? '串联电抗 Xs (Ω)' : '并联电抗 Xp (Ω)'}
            </label>
            <input
              type="number"
              step="0.001"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="input-industrial w-full text-lg font-mono"
              placeholder="正数感抗，负数容抗"
            />
          </div>
        </div>

        {/* 频率输入（可选） */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
            工作频率 (MHz) - 可选 / Frequency (MHz) - Optional
          </label>
          <input
            type="number"
            step="0.1"
            value={f}
            onChange={(e) => setF(e.target.value)}
            className="input-industrial w-full text-sm font-mono"
            placeholder="输入频率以计算电容或电感值"
          />
        </div>

        <button
          onClick={calculate}
          className="btn-industrial w-full btn-primary"
        >
          计算 / Calculate
        </button>
      </div>

      {/* 结果显示 */}
      {result && 'rp' in result && (
        <>
          <div className="border-thin" style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-8)' }}>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              计算结果 / Results (Series → Parallel)
            </h4>

            <div className="grid gap-6 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
                <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>并联电阻 Rp (Ω)</div>
                <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {result.rp}
                </div>
              </div>
              <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
                <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>并联电抗 Xp (Ω)</div>
                <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {result.xp}
                </div>
              </div>
            </div>

            {parseFloat(f) > 0 && (
              <div className="border-thin" style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>元件值 / Component Value:</div>
                {parseFloat(result.xp) > 0 ? (
                  <div className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                    L = {result.xp} / (2π × {parseFloat(f) * 1000000}) = {(parseFloat(result.xp) / (2 * Math.PI * parseFloat(f) * 1000000) * 1e9).toFixed(3)} nH
                  </div>
                ) : (
                  <div className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                    C = 1 / (2π × {parseFloat(f) * 1000000} × {Math.abs(parseFloat(result.xp))}) = {(1 / (2 * Math.PI * parseFloat(f) * 1000000 * Math.abs(parseFloat(result.xp))) * 1e12).toFixed(3)} pF
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-thin mt-6" style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-6)' }}>
            <h4 className="mb-4 text-sm font-semibold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
              计算公式 / Formulas
            </h4>
            <div className="space-y-2 text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
              <div>Q = |Xs / Rs|</div>
              <div>Rp = Rs × (1 + Q²)</div>
              <div>Xp = Xs × (1 + Q²)</div>
            </div>
          </div>
        </>
      )}

      {result && 'rs' in result && (
        <>
          <div className="border-thin" style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-8)' }}>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              计算结果 / Results (Parallel → Series)
            </h4>

            <div className="grid gap-6 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
                <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>串联电阻 Rs (Ω)</div>
                <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {result.rs}
                </div>
              </div>
              <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
                <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>串联电抗 Xs (Ω)</div>
                <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {result.xs}
                </div>
              </div>
            </div>

            {parseFloat(f) > 0 && (
              <div className="border-thin" style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>元件值 / Component Value:</div>
                {parseFloat(result.xs) > 0 ? (
                  <div className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                    L = {result.xs} / (2π × {parseFloat(f) * 1000000}) = {(parseFloat(result.xs) / (2 * Math.PI * parseFloat(f) * 1000000) * 1e9).toFixed(3)} nH
                  </div>
                ) : (
                  <div className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                    C = 1 / (2π × {parseFloat(f) * 1000000} × {Math.abs(parseFloat(result.xs))}) = {(1 / (2 * Math.PI * parseFloat(f) * 1000000 * Math.abs(parseFloat(result.xs))) * 1e12).toFixed(3)} pF
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-thin mt-6" style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-6)' }}>
            <h4 className="mb-4 text-sm font-semibold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
              计算公式 / Formulas
            </h4>
            <div className="space-y-2 text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
              <div>Q = |Rp / Xp|</div>
              <div>Rs = Rp / (1 + Q²)</div>
              <div>Xs = Xp / (1 + Q²)</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
