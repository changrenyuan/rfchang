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
    <div>
      <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        阻抗串并联等效转换
      </h3>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        计算串联和并联阻抗的等效转换关系
      </p>

      <div className="space-y-8">
        {/* 转换模式选择 */}
        <div>
          <label className="mb-3 block font-medium text-slate-900 dark:text-white">
            转换模式
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => { setMode('series-to-parallel'); setResult(null); }}
              className={`flex-1 rounded-lg border-2 px-4 py-3 transition-colors ${
                mode === 'series-to-parallel'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              串联 → 并联
            </button>
            <button
              onClick={() => { setMode('parallel-to-series'); setResult(null); }}
              className={`flex-1 rounded-lg border-2 px-4 py-3 transition-colors ${
                mode === 'parallel-to-series'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              并联 → 串联
            </button>
          </div>
        </div>

        {/* 输入参数 */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-slate-900 dark:text-white">
              {mode === 'series-to-parallel' ? '串联电阻 Rs (Ω)' : '并联电阻 Rp (Ω)'}
            </label>
            <input
              type="number"
              step="0.001"
              value={r}
              onChange={(e) => setR(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder={mode === 'series-to-parallel' ? '输入串联电阻' : '输入并联电阻'}
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-slate-900 dark:text-white">
              {mode === 'series-to-parallel' ? '串联电抗 Xs (Ω)' : '并联电抗 Xp (Ω)'}
            </label>
            <input
              type="number"
              step="0.001"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="输入电抗（正数感抗，负数容抗）"
            />
          </div>
        </div>

        {/* 频率输入（可选，用于计算元件值） */}
        <div>
          <label className="mb-2 block font-medium text-slate-900 dark:text-white">
            工作频率 (MHz) - 可选
          </label>
          <input
            type="number"
            step="0.1"
            value={f}
            onChange={(e) => setF(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            placeholder="输入频率以计算电容或电感值"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
        >
          计算
        </button>

        {/* 结果显示 */}
        {result && 'rp' in result && (
          <>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-900/20">
              <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                计算结果（串联 → 并联）
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="text-center">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                    并联电阻 Rp (Ω)
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {result.rp}
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                    并联电抗 Xp (Ω)
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {result.xp}
                  </div>
                </div>
              </div>
              {parseFloat(f) > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-900">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    元件值：
                  </div>
                  {parseFloat(result.xp) > 0 ? (
                    <div className="font-mono text-slate-700 dark:text-slate-300">
                      L = {result.xp} / (2π × {parseFloat(f) * 1000000}) = {(parseFloat(result.xp) / (2 * Math.PI * parseFloat(f) * 1000000) * 1e9).toFixed(3)} nH
                    </div>
                  ) : (
                    <div className="font-mono text-slate-700 dark:text-slate-300">
                      C = 1 / (2π × {parseFloat(f) * 1000000} × {Math.abs(parseFloat(result.xp))}) = {(1 / (2 * Math.PI * parseFloat(f) * 1000000 * Math.abs(parseFloat(result.xp))) * 1e12).toFixed(3)} pF
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                计算公式
              </h4>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  Q = |Xs / Rs|
                </div>
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  Rp = Rs × (1 + Q²)
                </div>
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  Xp = Xs × (1 + Q²)
                </div>
              </div>
            </div>
          </>
        )}

        {result && 'rs' in result && (
          <>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-900/20">
              <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                计算结果（并联 → 串联）
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="text-center">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                    串联电阻 Rs (Ω)
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {result.rs}
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                    串联电抗 Xs (Ω)
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {result.xs}
                  </div>
                </div>
              </div>
              {parseFloat(f) > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-900">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    元件值：
                  </div>
                  {parseFloat(result.xs) > 0 ? (
                    <div className="font-mono text-slate-700 dark:text-slate-300">
                      L = {result.xs} / (2π × {parseFloat(f) * 1000000}) = {(parseFloat(result.xs) / (2 * Math.PI * parseFloat(f) * 1000000) * 1e9).toFixed(3)} nH
                    </div>
                  ) : (
                    <div className="font-mono text-slate-700 dark:text-slate-300">
                      C = 1 / (2π × {parseFloat(f) * 1000000} × {Math.abs(parseFloat(result.xs))}) = {(1 / (2 * Math.PI * parseFloat(f) * 1000000 * Math.abs(parseFloat(result.xs))) * 1e12).toFixed(3)} pF
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                计算公式
              </h4>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  Q = |Rp / Xp|
                </div>
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  Rs = Rp / (1 + Q²)
                </div>
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  Xs = Xp / (1 + Q²)
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
