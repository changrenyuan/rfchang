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
    <div className="w-full">
      <div className="mb-8">
        <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)' }}>
          dBm Calculator
        </h3>
        <p className="text-sm" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          dBm、功率（W）、电压之间的快速转换
        </p>
      </div>

      <div style={{ marginBottom: 'var(--space-8)' }}>
        {/* 特性阻抗 */}
        <div className="mb-8 " style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
          <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
            系统阻抗 Z₀ (Ω) / System Impedance
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

        {/* dBm 输入 */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
            输入功率 (dBm) / Power (dBm)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.01"
              value={dbm}
              onChange={(e) => setDbm(e.target.value)}
              className="input-industrial flex-1 text-lg font-mono"
              placeholder="例如：10"
            />
            <button
              onClick={calculateFromDBm}
              className="btn-industrial btn-primary"
            >
              计算
            </button>
          </div>
        </div>

        {/* 功率输入 */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
            输入功率 (W) / Power (Watts)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.000001"
              min="0"
              value={watts}
              onChange={(e) => setWatts(e.target.value)}
              className="input-industrial flex-1 text-lg font-mono"
              placeholder="例如：0.01"
            />
            <button
              onClick={calculateFromWatts}
              className="btn-industrial btn-primary"
            >
              计算
            </button>
          </div>
        </div>

        {/* 电压输入 */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
            输入电压 (V) / Voltage (V)
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              step="0.0001"
              min="0"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="input-industrial flex-1 text-lg font-mono"
              placeholder="例如：0.707"
            />
            <button
              onClick={calculateFromVoltage}
              className="btn-industrial btn-primary"
            >
              计算
            </button>
          </div>
        </div>
      </div>

      {/* 结果显示 */}
      {(dbm || watts || voltage) && (
        <div className="" style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-8)' }}>
          <h4 className="mb-6 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            计算结果 / Results
          </h4>

          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            <div className="" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
              <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>功率 (dBm)</div>
              <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                {dbm || '-'}
              </div>
            </div>
            <div className="" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
              <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>功率 (W)</div>
              <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                {watts || '-'}
              </div>
            </div>
            <div className="" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)' }}>
              <div className="mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>电压 (V)</div>
              <div className="text-3xl font-mono font-semibold" style={{ color: 'var(--color-primary)' }}>
                {voltage || '-'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 常用参考值 */}
      <div className="mt-6" style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-6)' }}>
        <h4 className="mb-4 text-sm font-semibold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
          常用参考值 (50Ω 系统) / Reference Values (50Ω System)
        </h4>
        <div className="overflow-x-auto">
          <table className="table-industrial">
            <thead>
              <tr>
                <th>dBm</th>
                <th>功率 (W)</th>
                <th>电压 (V)</th>
                <th>应用 / Application</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>+30</td>
                <td>1</td>
                <td>7.07</td>
                <td>WiFi 发射</td>
              </tr>
              <tr>
                <td>+20</td>
                <td>0.1</td>
                <td>2.24</td>
                <td>蓝牙发射</td>
              </tr>
              <tr>
                <td>+10</td>
                <td>0.01</td>
                <td>0.707</td>
                <td>移动电话</td>
              </tr>
              <tr>
                <td>0</td>
                <td>0.001</td>
                <td>0.224</td>
                <td>参考电平</td>
              </tr>
              <tr>
                <td>-10</td>
                <td>0.0001</td>
                <td>0.0707</td>
                <td>接收灵敏度</td>
              </tr>
              <tr>
                <td>-20</td>
                <td>0.00001</td>
                <td>0.0224</td>
                <td>弱信号</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 计算公式 */}
      <div className="mt-6" style={{ backgroundColor: 'var(--bg-tertiary)', padding: 'var(--space-6)' }}>
        <h4 className="mb-4 text-sm font-semibold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
          计算公式 / Formulas
        </h4>
        <div className="space-y-2 text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
          <div>P(dBm) = 10 × log₁₀(P(W) × 1000)</div>
          <div>P(W) = 10<sup>P(dBm)/10</sup> / 1000</div>
          <div>V = √(P(W) × Z₀)</div>
        </div>
      </div>
    </div>
  );
}
