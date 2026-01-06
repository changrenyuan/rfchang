'use client';

import { useState } from 'react';

export default function VSWRCalculator() {
  const [vswr, setVswr] = useState<string>('');
  const [reflection, setReflection] = useState<string>('');
  const [returnLoss, setReturnLoss] = useState<string>('');
  const [mismatchLoss, setMismatchLoss] = useState<string>('');

  const calculateFromVSWR = () => {
    const v = parseFloat(vswr);
    if (v >= 1) {
      const ref = (v - 1) / (v + 1);
      const rl = -20 * Math.log10(ref);
      const ml = -10 * Math.log10(1 - ref * ref);
      setReflection(ref.toFixed(4));
      setReturnLoss(rl.toFixed(2));
      setMismatchLoss(ml.toFixed(4));
    }
  };

  const calculateFromReflection = () => {
    const ref = parseFloat(reflection);
    if (ref >= 0 && ref < 1) {
      const v = (1 + ref) / (1 - ref);
      const rl = -20 * Math.log10(ref);
      const ml = -10 * Math.log10(1 - ref * ref);
      setVswr(v.toFixed(3));
      setReturnLoss(rl.toFixed(2));
      setMismatchLoss(ml.toFixed(4));
    }
  };

  const calculateFromReturnLoss = () => {
    const rl = parseFloat(returnLoss);
    if (rl > 0) {
      const ref = Math.pow(10, -rl / 20);
      const v = (1 + ref) / (1 - ref);
      const ml = -10 * Math.log10(1 - ref * ref);
      setVswr(v.toFixed(3));
      setReflection(ref.toFixed(4));
      setMismatchLoss(ml.toFixed(4));
    }
  };

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        VSWR 计算器
      </h3>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        计算驻波比（VSWR）、反射系数、回波损耗和失配损耗之间的转换关系
      </p>

      <div className="space-y-8">
        {/* VSWR 输入 */}
        <div>
          <label className="mb-2 block font-medium text-slate-900 dark:text-white">
            输入 VSWR
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.001"
              min="1"
              value={vswr}
              onChange={(e) => setVswr(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="输入 VSWR 值（≥1）"
            />
            <button
              onClick={calculateFromVSWR}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              计算
            </button>
          </div>
        </div>

        {/* 反射系数输入 */}
        <div>
          <label className="mb-2 block font-medium text-slate-900 dark:text-white">
            输入反射系数 Γ
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.0001"
              min="0"
              max="0.9999"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="输入反射系数（0-1）"
            />
            <button
              onClick={calculateFromReflection}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              计算
            </button>
          </div>
        </div>

        {/* 回波损耗输入 */}
        <div>
          <label className="mb-2 block font-medium text-slate-900 dark:text-white">
            输入回波损耗
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.01"
              min="0"
              value={returnLoss}
              onChange={(e) => setReturnLoss(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="输入回波损耗（dB，>0）"
            />
            <button
              onClick={calculateFromReturnLoss}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              计算
            </button>
          </div>
        </div>

        {/* 结果显示 */}
        {(vswr || reflection || returnLoss) && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-900/20">
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
              计算结果
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  VSWR
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">
                  {vswr || '-'}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  反射系数 Γ
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">
                  {reflection || '-'}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  回波损耗 (dB)
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">
                  {returnLoss || '-'}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  失配损耗 (dB)
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">
                  {mismatchLoss || '-'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 公式说明 */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
          <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
            计算公式
          </h4>
          <div className="space-y-3 text-sm">
            <div className="font-mono text-slate-700 dark:text-slate-300">
              Γ = (VSWR - 1) / (VSWR + 1)
            </div>
            <div className="font-mono text-slate-700 dark:text-slate-300">
              VSWR = (1 + Γ) / (1 - Γ)
            </div>
            <div className="font-mono text-slate-700 dark:text-slate-300">
              回波损耗 (dB) = -20 × log₁₀(Γ)
            </div>
            <div className="font-mono text-slate-700 dark:text-slate-300">
              失配损耗 (dB) = -10 × log₁₀(1 - Γ²)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
