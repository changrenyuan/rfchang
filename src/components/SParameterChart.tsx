'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

/**
 * S 参数数据类型
 */
export interface SParameterData {
  frequency: number; // 频率 (MHz or GHz)
  S11_db: number;    // S11 幅度 (dB)
  S21_db: number;    // S21 幅度 (dB)
  S11_phase: number; // S11 相位 (degrees)
  S21_phase: number; // S21 相位 (degrees)
}

interface SParameterChartProps {
  data: SParameterData[];
  showPhase?: boolean;  // 是否显示相位曲线
  frequencyUnit?: 'MHz' | 'GHz'; // 频率单位
  title?: string;
  height?: number;
}

/**
 * S 参数可视化组件
 *
 * 使用 Recharts 绘制 S11、S21 的幅频特性和相频特性曲线
 *
 * 示例：
 * <SParameterChart
 *   data={[
 *     { frequency: 100, S11_db: -10, S21_db: -0.5, S11_phase: -30, S21_phase: -5 }
 *   ]}
 *   showPhase={true}
 *   frequencyUnit="MHz"
 * />
 */
export default function SParameterChart({
  data,
  showPhase = false,
  frequencyUnit = 'MHz',
  title = 'S-Parameter Response',
  height = 400,
}: SParameterChartProps) {
  // 转换频率单位显示
  const formatFrequency = (value: number) => {
    if (frequencyUnit === 'GHz') {
      return `${value.toFixed(2)}`;
    }
    return `${value.toFixed(0)}`;
  };

  return (
    <div className="w-full space-y-6">
      {title && (
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      )}

      {/* 幅频特性曲线 */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            幅频特性 | Frequency Response
          </span>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-blue-600" />
              <span className="text-slate-600 dark:text-slate-400">
                S11 (Return Loss)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-green-600" />
              <span className="text-slate-600 dark:text-slate-400">
                S21 (Insertion Loss)
              </span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              strokeOpacity={0.1}
            />
            <XAxis
              dataKey="frequency"
              tickFormatter={formatFrequency}
              label={{
                value: `Frequency (${frequencyUnit})`,
                position: 'insideBottom',
                offset: -5,
                style: { fill: 'currentColor', fontSize: 12 },
              }}
              style={{ fill: 'currentColor', fontSize: 11 }}
            />
            <YAxis
              label={{
                value: 'Magnitude (dB)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: 'currentColor', fontSize: 12 },
              }}
              style={{ fill: 'currentColor', fontSize: 11 }}
              domain={[-60, 0]}
            />
            <Tooltip
              formatter={(value: number | undefined, name: string | undefined) => [
                `${value?.toFixed(2) || 0} dB`,
                name || '',
              ]}
              labelFormatter={(label) =>
                `Frequency: ${formatFrequency(Number(label))} ${frequencyUnit}`
              }
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <ReferenceLine y={-10} stroke="orange" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="S11_db"
              stroke="#2563eb"
              strokeWidth={1.5}
              dot={false}
              name="S11"
            />
            <Line
              type="monotone"
              dataKey="S21_db"
              stroke="#16a34a"
              strokeWidth={1.5}
              dot={false}
              name="S21"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 相频特性曲线 */}
      {showPhase && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              相频特性 | Phase Response
            </span>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-purple-600" />
                <span className="text-slate-600 dark:text-slate-400">
                  S11 Phase
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-pink-600" />
                <span className="text-slate-600 dark:text-slate-400">
                  S21 Phase
                </span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                strokeOpacity={0.1}
              />
              <XAxis
                dataKey="frequency"
                tickFormatter={formatFrequency}
                label={{
                  value: `Frequency (${frequencyUnit})`,
                  position: 'insideBottom',
                  offset: -5,
                  style: { fill: 'currentColor', fontSize: 12 },
                }}
                style={{ fill: 'currentColor', fontSize: 11 }}
              />
              <YAxis
                label={{
                  value: 'Phase (degrees)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: 'currentColor', fontSize: 12 },
                }}
                style={{ fill: 'currentColor', fontSize: 11 }}
                domain={[-180, 180]}
                ticks={[-180, -90, 0, 90, 180]}
              />
              <Tooltip
                formatter={(value: number | undefined, name: string | undefined) => [
                  `${value?.toFixed(2) || 0}°`,
                  name || '',
                ]}
                labelFormatter={(label) =>
                  `Frequency: ${formatFrequency(Number(label))} ${frequencyUnit}`
                }
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="S11_phase"
                stroke="#9333ea"
                strokeWidth={1.5}
                dot={false}
                name="S11 Phase"
              />
              <Line
                type="monotone"
                dataKey="S21_phase"
                stroke="#db2777"
                strokeWidth={1.5}
                dot={false}
                name="S21 Phase"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/**
 * 生成演示数据
 */
export function generateDemoData(frequencyStart: number, frequencyEnd: number, points: number = 100): SParameterData[] {
  const data: SParameterData[] = [];
  const step = (frequencyEnd - frequencyStart) / (points - 1);

  for (let i = 0; i < points; i++) {
    const frequency = frequencyStart + step * i;

    // 模拟一个带通滤波器的 S 参数
    const centerFreq = (frequencyStart + frequencyEnd) / 2;
    const normalizedFreq = (frequency - centerFreq) / ((frequencyEnd - frequencyStart) / 4);

    // S11: 中心频率处最小（-30 dB），边缘处增大（-5 dB）
    const S11_db = -30 + 25 * normalizedFreq * normalizedFreq;

    // S21: 中心频率处最大（-0.5 dB），边缘处减小（-20 dB）
    const S21_db = -0.5 - 19.5 * normalizedFreq * normalizedFreq;

    // 相位：模拟线性相位响应
    const S11_phase = -30 * normalizedFreq;
    const S21_phase = -5 * normalizedFreq;

    data.push({
      frequency,
      S11_db,
      S21_db,
      S11_phase,
      S21_phase,
    });
  }

  return data;
}
