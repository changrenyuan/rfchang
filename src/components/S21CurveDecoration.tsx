'use client';

import { useEffect, useRef } from 'react';

/**
 * S21 增益曲线装饰组件
 * 用于首页工程案例卡片的背景装饰，体现"数据即装饰"的设计理念
 *
 * 特点：
 * - 半透明渐变，不干扰内容阅读
 * - 自动适应卡片尺寸
 * - 模拟真实的射频测试曲线（S21 增益）
 */
export function S21CurveDecoration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // 清空画布
    ctx.clearRect(0, 0, rect.width, rect.height);

    // 绘制 S21 增益曲线
    const drawS21Curve = () => {
      const width = rect.width;
      const height = rect.height;

      // 曲线参数（模拟典型的 S21 增益曲线）
      const startFreq = 1800; // MHz
      const endFreq = 2200;   // MHz
      const points: Array<{ x: number; y: number }> = [];

      // 生成曲线点
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const freq = startFreq + (endFreq - startFreq) * t;

        // 模拟增益曲线：中心频率处有峰值，边缘下降
        const centerFreq = (startFreq + endFreq) / 2;
        const bandwidth = 150; // MHz
        const centerGain = 12; // dB

        const normalizedFreq = Math.abs(freq - centerFreq) / (bandwidth / 2);
        let gain = centerGain - 3 * Math.pow(normalizedFreq, 2);

        // 添加一些纹波（模拟实际测量）
        gain += 0.3 * Math.sin(freq / 30) + 0.2 * Math.cos(freq / 50);

        // 转换到画布坐标
        const x = t * width;
        const y = height - ((gain / 15) * height * 0.7 + height * 0.15);

        points.push({ x, y });
      }

      // 绘制渐变填充
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(26, 42, 108, 0.08)');  // var(--color-primary) 低透明度
      gradient.addColorStop(1, 'rgba(26, 42, 108, 0)');

      ctx.beginPath();
      ctx.moveTo(0, height);
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.lineTo(point.x, point.y);
        } else {
          // 使用贝塞尔曲线平滑连接
          const prevPoint = points[index - 1];
          const cp1x = prevPoint.x + (point.x - prevPoint.x) / 2;
          const cp1y = prevPoint.y;
          const cp2x = prevPoint.x + (point.x - prevPoint.x) / 2;
          const cp2y = point.y;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, point.x, point.y);
        }
      });
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // 绘制曲线线条
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          const prevPoint = points[index - 1];
          const cp1x = prevPoint.x + (point.x - prevPoint.x) / 2;
          const cp1y = prevPoint.y;
          const cp2x = prevPoint.x + (point.x - prevPoint.x) / 2;
          const cp2y = point.y;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, point.x, point.y);
        }
      });
      ctx.strokeStyle = 'rgba(26, 42, 108, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 绘制网格线（示波器风格）
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
      ctx.lineWidth = 0.5;

      // 横向网格
      for (let i = 1; i < 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 纵向网格
      for (let i = 1; i < 10; i++) {
        const x = (width / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    };

    drawS21Curve();

    // 响应窗口大小变化
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawS21Curve();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
