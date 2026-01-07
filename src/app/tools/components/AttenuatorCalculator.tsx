'use client';

import { useState } from 'react';

export default function AttenuatorCalculator() {
  const [type, setType] = useState<'pi' | 'tee'>('pi');
  const [z0, setZ0] = useState<string>('50');
  const [attenuation, setAttenuation] = useState<string>('10');
  const [results, setResults] = useState<{ r1: string; r2: string; r3: string } | null>(null);

  const calculate = () => {
    const Z0 = parseFloat(z0);
    const A = parseFloat(attenuation);

    if (Z0 > 0 && A > 0) {
      const K = Math.pow(10, A / 20);

      if (type === 'pi') {
        // Pi型衰减器
        const R1 = Z0 * (K + 1) / (K - 1);
        const R2 = Z0 * (K - 1) / (2 * Math.sqrt(K));
        setResults({
          r1: R1.toFixed(2),
          r2: R2.toFixed(2),
          r3: R2.toFixed(2)
        });
      } else {
        // T型衰减器
        const R1 = Z0 * (K - 1) / (K + 1);
        const R2 = 2 * Z0 * Math.sqrt(K) / (K - 1);
        setResults({
          r1: R1.toFixed(2),
          r2: R2.toFixed(2),
          r3: R1.toFixed(2)
        });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)' }}>
          Attenuator Design
        </h3>
        <p className="text-sm" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          Π型和T型衰减器电阻值计算，基于经典网络理论
        </p>
      </div>

      <div style={{ marginBottom: 'var(--space-8)' }}>
        {/* 衰减器类型选择 */}
        <div className="mb-8">
          <label className="mb-3 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
            衰减器类型 / Type
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setType('pi')}
              className="btn-industrial"
              style={{
                flex: 1,
                borderColor: type === 'pi' ? 'var(--color-primary)' : undefined,
                backgroundColor: type === 'pi' ? 'var(--color-primary-light)' : undefined,
              }}
            >
              Π 型
            </button>
            <button
              onClick={() => setType('tee')}
              className="btn-industrial"
              style={{
                flex: 1,
                borderColor: type === 'tee' ? 'var(--color-primary)' : undefined,
                backgroundColor: type === 'tee' ? 'var(--color-primary-light)' : undefined,
              }}
            >
              T 型
            </button>
          </div>
        </div>

        {/* 输入参数 */}
        <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
            <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              特性阻抗 Z₀ (Ω)
            </label>
            <input
              type="number"
              step="0.1"
              value={z0}
              onChange={(e) => setZ0(e.target.value)}
              className="input-industrial w-full text-lg font-mono"
              placeholder="50"
            />
          </div>
          <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
            <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
              衰减量 A (dB)
            </label>
            <input
              type="number"
              step="0.1"
              value={attenuation}
              onChange={(e) => setAttenuation(e.target.value)}
              className="input-industrial w-full text-lg font-mono"
              placeholder="10"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="btn-industrial w-full btn-primary"
        >
          计算 / Calculate
        </button>
      </div>

      {/* 结果显示 */}
      {results && (
        <>
          <div className="border-thin" style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-8)' }}>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              计算结果 / Results
            </h4>

            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
                <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>R₁ (Ω)</div>
                <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {results.r1}
                </div>
              </div>

              <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
                <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>R₂ (Ω)</div>
                <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {results.r2}
                </div>
              </div>

              <div className="border-thin" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
                <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>R₃ (Ω)</div>
                <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {results.r3}
                </div>
              </div>
            </div>
          </div>

          {/* 电路图说明 */}
          <div className="border-thin mt-6" style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-6)' }}>
            <h4 className="mb-4 text-sm font-semibold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
              计算公式 / Formulas
            </h4>
            <div className="space-y-2 text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
              <div>K = 10<sup>A/20</sup></div>
              {type === 'pi' ? (
                <>
                  <div>R₁ = R₃ = Z₀ × (K + 1) / (K - 1)</div>
                  <div>R₂ = Z₀ × (K - 1) / (2√K)</div>
                </>
              ) : (
                <>
                  <div>R₁ = R₃ = Z₀ × (K - 1) / (K + 1)</div>
                  <div>R₂ = 2 × Z₀ × √K / (K - 1)</div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
