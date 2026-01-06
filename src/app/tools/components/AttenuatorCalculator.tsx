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
    <div>
      <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        衰减器设计工具
      </h3>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        计算 Π型和T型衰减器的电阻值
      </p>

      <div className="space-y-8">
        {/* 衰减器类型选择 */}
        <div>
          <label className="mb-3 block font-medium text-slate-900 dark:text-white">
            衰减器类型
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setType('pi')}
              className={`flex-1 rounded-lg border-2 px-4 py-3 transition-colors ${
                type === 'pi'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Π 型
            </button>
            <button
              onClick={() => setType('tee')}
              className={`flex-1 rounded-lg border-2 px-4 py-3 transition-colors ${
                type === 'tee'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              T 型
            </button>
          </div>
        </div>

        {/* 输入参数 */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-slate-900 dark:text-white">
              特性阻抗 Z₀ (Ω)
            </label>
            <input
              type="number"
              step="0.1"
              value={z0}
              onChange={(e) => setZ0(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="50"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-slate-900 dark:text-white">
              衰减量 (dB)
            </label>
            <input
              type="number"
              step="0.1"
              value={attenuation}
              onChange={(e) => setAttenuation(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="10"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
        >
          计算电阻值
        </button>

        {/* 结果显示 */}
        {results && (
          <>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-900/20">
              <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                计算结果
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                    R₁ (Ω)
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {results.r1}
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                    R₂ (Ω)
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {results.r2}
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                    R₃ (Ω)
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {results.r3}
                  </div>
                </div>
              </div>
            </div>

            {/* 电路图说明 */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                电路说明
              </h4>
              <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                {type === 'pi' ? (
                  <div>
                    <p className="mb-2">Π 型衰减器电路：</p>
                    <div className="font-mono">
                      输入 ── R₁ ─┬── 输出<br/>
                                │<br/>
                                R₂<br/>
                                │<br/>
                               GND<br/>
                                │<br/>
                                R₃<br/>
                                │<br/>
                               GND
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="mb-2">T 型衰减器电路：</p>
                    <div className="font-mono">
                      输入 ── R₁ ─┬── R₃ ── 输出<br/>
                                │<br/>
                                R₂<br/>
                                │<br/>
                               GND
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  K = 10<sup>A/20</sup>
                </div>
                {type === 'pi' ? (
                  <>
                    <div className="font-mono text-slate-700 dark:text-slate-300">
                      R₁ = R₃ = Z₀ × (K + 1) / (K - 1)
                    </div>
                    <div className="font-mono text-slate-700 dark:text-slate-300">
                      R₂ = Z₀ × (K - 1) / (2√K)
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-mono text-slate-700 dark:text-slate-300">
                      R₁ = R₃ = Z₀ × (K - 1) / (K + 1)
                    </div>
                    <div className="font-mono text-slate-700 dark:text-slate-300">
                      R₂ = 2 × Z₀ × √K / (K - 1)
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
