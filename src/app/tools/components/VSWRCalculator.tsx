'use client';

import { useState, useEffect } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

export default function VSWRCalculator() {
  const [vswr, setVswr] = useState<string>('2.0');
  const [activeInput, setActiveInput] = useState<'vswr' | 'reflection' | 'returnLoss'>('vswr');

  // 计算所有参数
  const calculate = () => {
    const v = parseFloat(vswr);

    if (isNaN(v) || v < 1) {
      return {
        reflection: '-',
        returnLoss: '-',
        mismatchLoss: '-',
        powerTransmitted: '-',
        isValid: false,
      };
    }

    const reflection = (v - 1) / (v + 1);
    const returnLoss = -20 * Math.log10(reflection);
    const mismatchLoss = -10 * Math.log10(1 - reflection * reflection);
    const powerTransmitted = (1 - reflection * reflection) * 100;

    return {
      reflection: reflection.toFixed(4),
      returnLoss: returnLoss.toFixed(2),
      mismatchLoss: mismatchLoss.toFixed(4),
      powerTransmitted: powerTransmitted.toFixed(2),
      isValid: true,
    };
  };

  const result = calculate();

  // 实时计算效果
  const calculateFromReflection = (ref: number) => {
    if (ref >= 0 && ref < 1) {
      const v = (1 + ref) / (1 - ref);
      setVswr(v.toFixed(3));
    }
  };

  const calculateFromReturnLoss = (rl: number) => {
    if (rl > 0) {
      const ref = Math.pow(10, -rl / 20);
      calculateFromReflection(ref);
    }
  };

  const handleReflectionChange = (value: string) => {
    setActiveInput('reflection');
    const ref = parseFloat(value);
    if (!isNaN(ref)) {
      calculateFromReflection(ref);
    }
  };

  const handleReturnLossChange = (value: string) => {
    setActiveInput('returnLoss');
    const rl = parseFloat(value);
    if (!isNaN(rl)) {
      calculateFromReturnLoss(rl);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-serif font-semibold text-[var(--text-primary)] mb-4">
          VSWR Calculator
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          计算驻波比（VSWR）、反射系数、回波损耗和失配损耗之间的转换关系。
          该工具基于 IEEE 标准，适用于射频电路阻抗匹配分析与性能评估。
        </p>
      </div>

      <div className="space-y-8">
        {/* 输入区域 */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* VSWR 输入 */}
          <div className="border-thin bg-[var(--bg-secondary)] p-6">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                VSWR (驻波比)
              </label>
              <input
                type="number"
                step="0.001"
                min="1"
                max="100"
                value={vswr}
                onChange={(e) => {
                  setActiveInput('vswr');
                  setVswr(e.target.value);
                }}
                className={`input-industrial w-full text-lg font-mono
                  ${activeInput === 'vswr' ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]' : ''}
                `}
                placeholder="≥ 1"
              />
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">
              输入范围: 1.000 - 100.000
            </div>
          </div>

          {/* 反射系数输入 */}
          <div className="border-thin bg-[var(--bg-secondary)] p-6">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Γ (反射系数)
              </label>
              <input
                type="number"
                step="0.0001"
                min="0"
                max="0.9999"
                value={result.isValid ? result.reflection : ''}
                onChange={(e) => handleReflectionChange(e.target.value)}
                className={`input-industrial w-full text-lg font-mono
                  ${activeInput === 'reflection' ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]' : ''}
                `}
                placeholder="0 - 0.9999"
              />
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">
              输入范围: 0.0000 - 0.9999
            </div>
          </div>

          {/* 回波损耗输入 */}
          <div className="border-thin bg-[var(--bg-secondary)] p-6">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                RL (回波损耗, dB)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={result.isValid ? result.returnLoss : ''}
                onChange={(e) => handleReturnLossChange(e.target.value)}
                className={`input-industrial w-full text-lg font-mono
                  ${activeInput === 'returnLoss' ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]' : ''}
                `}
                placeholder="> 0 dB"
              />
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">
              输入范围: 0 - 100 dB
            </div>
          </div>
        </div>

        {/* 结果显示区域 */}
        {result.isValid && (
          <div className="border-thin bg-[var(--bg-tertiary)] p-8">
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              计算结果
            </h4>

            <div className="grid gap-6 md:grid-cols-4">
              <div className="border-thin bg-[var(--bg-secondary)] p-4">
                <div className="mb-2 text-xs text-[var(--text-tertiary)]">VSWR</div>
                <div className="text-3xl font-mono font-semibold text-[var(--color-primary)]">
                  {vswr}
                </div>
              </div>

              <div className="border-thin bg-[var(--bg-secondary)] p-4">
                <div className="mb-2 text-xs text-[var(--text-tertiary)]">反射系数 Γ</div>
                <div className="text-3xl font-mono font-semibold text-[var(--color-primary)]">
                  {result.reflection}
                </div>
              </div>

              <div className="border-thin bg-[var(--bg-secondary)] p-4">
                <div className="mb-2 text-xs text-[var(--text-tertiary)]">回波损耗 (dB)</div>
                <div className="text-3xl font-mono font-semibold text-[var(--color-primary)]">
                  {result.returnLoss}
                </div>
              </div>

              <div className="border-thin bg-[var(--bg-secondary)] p-4">
                <div className="mb-2 text-xs text-[var(--text-tertiary)]">功率传输 (%)</div>
                <div className="text-3xl font-mono font-semibold text-[var(--color-primary)]">
                  {result.powerTransmitted}
                </div>
              </div>
            </div>

            {/* 失配损耗 */}
            <div className="mt-6 border-thin bg-[var(--bg-secondary)] p-4">
              <div className="mb-2 text-xs text-[var(--text-tertiary)]">失配损耗 (dB)</div>
              <div className="text-2xl font-mono font-semibold text-[var(--text-primary)]">
                {result.mismatchLoss}
              </div>
            </div>
          </div>
        )}

        {/* 公式推导与原理 */}
        <div className="border-t border-thin pt-8">
          <h4 className="mb-6 text-lg font-serif font-semibold text-[var(--text-primary)]">
            原理与推导
          </h4>

          {/* 基础公式 */}
          <div className="mb-6 border-thin bg-[var(--bg-secondary)] p-6">
            <h5 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">基础公式</h5>
            <div className="space-y-3 text-sm">
              <div className="formula-block">
                <div className="mb-1 text-xs text-[var(--text-tertiary)] text-left">驻波比与反射系数的关系</div>
                <div className="font-mono text-base text-[var(--text-primary)]">
                  VSWR = (1 + |Γ|) / (1 - |Γ|)
                </div>
              </div>

              <div className="formula-block">
                <div className="mb-1 text-xs text-[var(--text-tertiary)] text-left">反射系数定义</div>
                <div className="font-mono text-base text-[var(--text-primary)]">
                  Γ = (Z_L - Z_0) / (Z_L + Z_0)
                </div>
              </div>

              <div className="formula-block">
                <div className="mb-1 text-xs text-[var(--text-tertiary)] text-left">回波损耗 (dB)</div>
                <div className="font-mono text-base text-[var(--text-primary)]">
                  RL = -20 · log₁₀(|Γ|)
                </div>
              </div>

              <div className="formula-block">
                <div className="mb-1 text-xs text-[var(--text-tertiary)] text-left">失配损耗 (dB)</div>
                <div className="font-mono text-base text-[var(--text-primary)]">
                  ML = -10 · log₁₀(1 - |Γ|²)
                </div>
              </div>
            </div>
          </div>

          {/* VSWR 评级参考 */}
          <div className="mb-6 border-thin bg-[var(--bg-secondary)] p-6">
            <h5 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">VSWR 评级参考</h5>
            <div className="overflow-x-auto table-mobile-wrapper">
              <table className="table-industrial w-full">
                <thead>
                  <tr>
                    <th>VSWR</th>
                    <th>反射系数 |Γ|</th>
                    <th>回波损耗 (dB)</th>
                    <th>功率传输</th>
                    <th>评级</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-mono">1.00</td>
                    <td className="font-mono">0.000</td>
                    <td className="font-mono">∞</td>
                    <td className="font-mono">100%</td>
                    <td>完美匹配</td>
                  </tr>
                  <tr>
                    <td className="font-mono">1.05</td>
                    <td className="font-mono">0.024</td>
                    <td className="font-mono">32.3</td>
                    <td className="font-mono">99.94%</td>
                    <td>优秀</td>
                  </tr>
                  <tr>
                    <td className="font-mono">1.10</td>
                    <td className="font-mono">0.048</td>
                    <td className="font-mono">26.4</td>
                    <td className="font-mono">99.77%</td>
                    <td>良好</td>
                  </tr>
                  <tr>
                    <td className="font-mono">1.50</td>
                    <td className="font-mono">0.200</td>
                    <td className="font-mono">14.0</td>
                    <td className="font-mono">96.00%</td>
                    <td>一般</td>
                  </tr>
                  <tr>
                    <td className="font-mono">2.00</td>
                    <td className="font-mono">0.333</td>
                    <td className="font-mono">9.5</td>
                    <td className="font-mono">88.89%</td>
                    <td>较差</td>
                  </tr>
                  <tr>
                    <td className="font-mono">3.00</td>
                    <td className="font-mono">0.500</td>
                    <td className="font-mono">6.0</td>
                    <td className="font-mono">75.00%</td>
                    <td>差</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 参考文献 */}
          <div className="border-thin bg-[var(--bg-secondary)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-[var(--color-primary)]" />
              <h5 className="text-sm font-semibold text-[var(--text-primary)]">参考文献</h5>
            </div>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <div className="citation">
                <p>[1] Pozar, D. M. (2011). <i>Microwave Engineering</i> (4th ed.). Wiley. Chapter 2.</p>
              </div>
              <div className="citation">
                <p>[2] Agilent Technologies. (2004). <i>VNA Measurement Uncertainty and Accuracy</i>. Application Note 1287-9.</p>
              </div>
              <div className="citation">
                <p>[3] IEEE Std 145-1983. <i>IEEE Standard Definitions of Terms for Antennas</i>.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 外部链接 */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <ExternalLink className="h-4 w-4" />
          <span>
            相关工具: &nbsp;
            <a href="/tools/s-parameter-plotter" className="text-[var(--color-primary)] hover:underline">
              S Parameter Plotter
            </a>
            {' '}/{' '}
            <a href="/tools/attenuator-calculator" className="text-[var(--color-primary)] hover:underline">
              Attenuator Calculator
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
