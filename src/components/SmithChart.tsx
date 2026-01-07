'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * 史密斯圆图数据点
 */
export interface SmithChartPoint {
  frequency: number;
  reflection_real: number;  // 反射系数实部
  reflection_imag: number;  // 反射系数虚部
  label?: string;
}

interface SmithChartProps {
  points: SmithChartPoint[];
  title?: string;
  height?: number;
  showImpedance?: boolean; // 是否显示阻抗标注
}

/**
 * 史密斯圆图组件
 *
 * 使用 Recharts 绘制极坐标形式的阻抗曲线
 *
 * 示例：
 * <SmithChart
 *   points={[
 *     { frequency: 1000, reflection_real: 0.5, reflection_imag: 0.3 }
 *   ]}
 *   showImpedance={true}
 * />
 */
export default function SmithChart({
  points,
  title = 'Smith Chart',
  height = 400,
  showImpedance = true,
}: SmithChartProps) {
  // 生成史密斯圆图的恒电阻和恒电抗圆
  const generateSmithChartBackground = () => {
    const backgroundPoints: Array<{
      x: number;
      y: number;
      resistance?: number;
      reactance?: number;
    }> = [];

    // 恒电阻圆（r = 0.5, 1, 2, ...）
    const resistances = [0.5, 1, 2, 5];
    resistances.forEach(r => {
      const circlePoints = [];
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const angle = (2 * Math.PI * i) / steps;
        const radius = 1 / (r + 1);
        const x = radius + radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        circlePoints.push({ x, y, resistance: r });
      }
      backgroundPoints.push(...circlePoints, null as any); // 用 null 断开线条
    });

    // 恒电抗圆（x = 0.5, 1, -0.5, -1）
    const reactances = [-5, -2, -1, -0.5, 0.5, 1, 2, 5];
    reactances.forEach(x => {
      const circlePoints = [];
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const angle = (2 * Math.PI * i) / steps;
        const radius = Math.abs(1 / x);
        const centerX = 1;
        const centerY = 1 / x;
        const posX = centerX + radius * Math.cos(angle);
        const posY = centerY + radius * Math.sin(angle);

        // 只保留单位圆内的点
        if (posX * posX + posY * posY <= 1) {
          circlePoints.push({ x: posX, y: posY, reactance: x });
        }
      }
      backgroundPoints.push(...circlePoints, null as any);
    });

    return backgroundPoints;
  };

  // 生成外圆
  const generateOuterCircle = () => {
    const points = [];
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const angle = (2 * Math.PI * i) / steps;
      points.push({
        x: Math.cos(angle),
        y: Math.sin(angle),
      });
    }
    return points;
  };

  const backgroundData = generateSmithChartBackground();
  const outerCircleData = generateOuterCircle();

  // 转换反射系数为阻抗
  const reflectionToImpedance = (real: number, imag: number) => {
    const denom = (1 - real) ** 2 + imag ** 2;
    const r = (1 - real ** 2 - imag ** 2) / denom;
    const x = (2 * imag) / denom;
    return { r: r.toFixed(2), x: x.toFixed(2) };
  };

  return (
    <div className="w-full space-y-4">
      {title && (
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      )}

      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={backgroundData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              strokeOpacity={0.1}
            />
            <XAxis
              type="number"
              domain={[-1, 1]}
              tick={false}
              axisLine={false}
            />
            <YAxis
              type="number"
              domain={[-1, 1]}
              tick={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value: number | undefined, name: string | undefined, props: any) => {
                if (props.payload) {
                  if (props.payload.resistance !== undefined) {
                    return [`R = ${props.payload.resistance} Z0`, '恒电阻'];
                  }
                  if (props.payload.reactance !== undefined) {
                    const reactance = Number(props.payload.reactance);
                    return [`X = ${reactance > 0 ? '+' : ''}${reactance} Z0`, '恒电抗'];
                  }
                  if (props.payload.frequency) {
                    const impedance = reflectionToImpedance(
                      props.payload.reflection_real,
                      props.payload.reflection_imag
                    );
                    const x = parseFloat(impedance.x);
                    return [
                      `Z = ${impedance.r}${x > 0 ? '+' : ''}${impedance.x}j Z0`,
                      `Frequency: ${props.payload.frequency} MHz`,
                    ];
                  }
                }
                return [value?.toFixed(2) || '0', name || ''];
              }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />

            {/* 绘制恒电阻圆 */}
            {resistances.map((r, index) => (
              <Line
                key={`r-${r}`}
                type="monotone"
                dataKey="x"
                stroke="currentColor"
                strokeOpacity={0.3}
                strokeWidth={1}
                dot={false}
                connectNulls={false}
              />
            ))}

            {/* 绘制外圆 */}
            <Line
              type="monotone"
              data={outerCircleData}
              dataKey="x"
              stroke="currentColor"
              strokeOpacity={0.8}
              strokeWidth={2}
              dot={false}
            />

            {/* 绘制用户数据点 */}
            <Line
              type="monotone"
              data={points}
              dataKey="reflection_real"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4, fill: '#2563eb' }}
              name="S11"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* 中心点标记 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rounded-full" />
      </div>

      {/* 阻抗参考标注 */}
      {showImpedance && (
        <div className="grid grid-cols-4 gap-4 text-xs text-slate-600 dark:text-slate-400 mt-4">
          <div className="text-center">
            <div className="font-medium">短路 (Short)</div>
            <div className="text-slate-500">Γ = -1</div>
          </div>
          <div className="text-center">
            <div className="font-medium">开路 (Open)</div>
            <div className="text-slate-500">Γ = +1</div>
          </div>
          <div className="text-center">
            <div className="font-medium">50Ω 匹配</div>
            <div className="text-slate-500">Γ = 0</div>
          </div>
          <div className="text-center">
            <div className="font-medium">纯电抗</div>
            <div className="text-slate-500">|Γ| = 1</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 辅助数据
const resistances = [0.5, 1, 2, 5];

/**
 * 生成演示数据（模拟一个阻抗匹配的轨迹）
 */
export function generateDemoSmithData(centerFreq: number, points: number = 50): SmithChartPoint[] {
  const data: SmithChartPoint[] = [];
  const bandwidth = centerFreq * 0.1; // 10% 带宽

  for (let i = 0; i < points; i++) {
    const frequency = centerFreq - bandwidth + (2 * bandwidth * i) / (points - 1);

    // 模拟一个阻抗匹配网络的轨迹
    const normalizedFreq = (frequency - centerFreq) / bandwidth;

    // 反射系数（中心频率处最小）
    const reflection_mag = 0.1 + 0.4 * normalizedFreq * normalizedFreq;
    const reflection_phase = -Math.PI * normalizedFreq;

    const real = reflection_mag * Math.cos(reflection_phase);
    const imag = reflection_mag * Math.sin(reflection_phase);

    data.push({
      frequency,
      reflection_real: real,
      reflection_imag: imag,
    });
  }

  return data;
}
