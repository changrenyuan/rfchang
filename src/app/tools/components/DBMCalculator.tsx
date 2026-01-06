'use client';

import { useState } from 'react';

export default function DBMCalculator() {
  const [z0, setZ0] = useState<string>('50');
  const [dbm, setDbm] = useState<string>('');
  const [watts, setWatts] = useState<string>('');
  const [voltage, setVoltage] = useState<string>('');

  const calculateFromDBm = () => {
    const P_dBm = parseFloat(dbm);
    if (!isNaN(P_dBm)) {
      const P_w = Math.pow(10, P_dBm / 10) / 1000;
      const V_rms = Math.sqrt(P_w * parseFloat(z0));
      setWatts(P_w.toExponential(3));
      setVoltage(V_rms.toFixed(4));
    }
  };

  const calculateFromWatts = () => {
    const P_w = parseFloat(watts);
    const Z0 = parseFloat(z0);
    if (!isNaN(P_w) && P_w > 0 && Z0 > 0) {
      const P_dBm = 10 * Math.log10(P_w * 1000);
      const V_rms = Math.sqrt(P_w * Z0);
      setDbm(P_dBm.toFixed(2));
      setVoltage(V_rms.toFixed(4));
    }
  };

  const calculateFromVoltage = () => {
    const V_rms = parseFloat(voltage);
    const Z0 = parseFloat(z0);
    if (!isNaN(V_rms) && V_rms >= 0 && Z0 > 0) {
      const P_w = (V_rms * V_rms) / Z0;
      const P_dBm = 10 * Math.log10(P_w * 1000);
      setDbm(P_dBm.toFixed(2));
      setWatts(P_w.toExponential(3));
    }
  };

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        dBm 功率计算器
      </h3>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        dBm、功率（W）、电压之间的快速转换
      </p>

      <div className="space-y-8">
        {/* 特性阻抗 */}
        <div>
          <label className="mb-2 block font-medium text-slate-900 dark:text-white">
            系统阻抗 Z₀ (Ω)
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

        {/* dBm 输入 */}
        <div>
          <label className="mb-2 block font-medium text-slate-900 dark:text-white">
            输入功率 (dBm)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.01"
              value={dbm}
              onChange={(e) => setDbm(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="例如：10"
            />
            <button
              onClick={calculateFromDBm}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              计算
            </button>
          </div>
        </div>

        {/* 功率输入 */}
        <div>
          <label className="mb-2 block font-medium text-slate-900 dark:text-white">
            输入功率 (W)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.000001"
              min="0"
              value={watts}
              onChange={(e) => setWatts(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="例如：0.01"
            />
            <button
              onClick={calculateFromWatts}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              计算
            </button>
          </div>
        </div>

        {/* 电压输入 */}
        <div>
          <label className="mb-2 block font-medium text-slate-900 dark:text-white">
            输入电压 (V)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.0001"
              min="0"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="例如：0.707"
            />
            <button
              onClick={calculateFromVoltage}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              计算
            </button>
          </div>
        </div>

        {/* 结果显示 */}
        {(dbm || watts || voltage) && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-900/20">
            <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
              计算结果
            </h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                  功率 (dBm)
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {dbm || '-'}
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                  功率 (W)
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {watts || '-'}
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-sm text-slate-600 dark:text-slate-400">
                  电压 (V)
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {voltage || '-'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 常用参考值 */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
          <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
            常用参考值 (50Ω 系统)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-4 py-2 text-left text-slate-900 dark:text-white">dBm</th>
                  <th className="px-4 py-2 text-left text-slate-900 dark:text-white">功率 (W)</th>
                  <th className="px-4 py-2 text-left text-slate-900 dark:text-white">电压 (V)</th>
                  <th className="px-4 py-2 text-left text-slate-900 dark:text-white">应用</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">+30</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">1</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">7.07</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">WiFi 发射</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">+20</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0.1</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">2.24</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">蓝牙发射</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">+10</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0.01</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0.707</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">小信号</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0.001</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0.224</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">参考电平</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">-10</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0.0001</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0.0707</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">接收灵敏度</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">-20</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0.00001</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">0.0224</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">弱信号</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">-100</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">1e-13</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">2.24e-6</td>
                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">极弱信号</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 公式说明 */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
          <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
            计算公式
          </h4>
          <div className="space-y-3 text-sm">
            <div className="font-mono text-slate-700 dark:text-slate-300">
              P(dBm) = 10 × log₁₀(P(W) × 1000)
            </div>
            <div className="font-mono text-slate-700 dark:text-slate-300">
              P(W) = 10<sup>(P(dBm)/10)</sup> / 1000
            </div>
            <div className="font-mono text-slate-700 dark:text-slate-300">
              V(RMS) = √(P(W) × Z₀)
            </div>
            <div className="font-mono text-slate-700 dark:text-slate-300">
              P(W) = V(RMS)² / Z₀
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
