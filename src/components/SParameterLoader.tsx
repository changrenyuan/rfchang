'use client';

import React, { useState, useCallback } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';
import { parseTouchstoneFile, TouchstoneMetadata } from '@/lib/touchstone';
import SParameterChart, { generateDemoData } from './SParameterChart';

interface SParameterLoaderProps {
  onDataLoaded?: (data: TouchstoneMetadata) => void;
  showDemo?: boolean;
}

/**
 * S 参数文件加载器组件
 *
 * 支持在浏览器本地解析 .s1p/.s2p 文件，无需后端存储
 *
 * 示例：
 * <SParameterLoader onDataLoaded={(data) => console.log(data)} />
 */
export default function SParameterLoader({
  onDataLoaded,
  showDemo = true,
}: SParameterLoaderProps) {
  const [data, setData] = useState<TouchstoneMetadata | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      // 检查文件扩展名
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!['s1p', 's2p', 's1p1', 's2p1', 's1p2', 's2p2', 's1p3', 's2p3', 's1p4', 's2p4'].includes(extension || '')) {
        throw new Error('不支持的文件格式，请上传 .s1p 或 .s2p 文件');
      }

      const parsedData = await parseTouchstoneFile(file);
      setData(parsedData);

      // 通知父组件
      if (onDataLoaded) {
        onDataLoaded(parsedData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '文件解析失败');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [onDataLoaded]);

  const loadDemoData = useCallback(() => {
    const demoData: TouchstoneMetadata = {
      version: '2.0',
      frequencyUnit: 'MHz',
      parameter: 'S',
      format: 'MA',
      reference: 50,
      ports: 2,
      data: generateDemoData(1000, 2400, 100),
    };

    setData(demoData);
    if (onDataLoaded) {
      onDataLoaded(demoData);
    }
    setError('');
  }, [onDataLoaded]);

  const exportData = useCallback(() => {
    if (!data) return;

    // 导出为 CSV 格式
    let csv = 'Frequency (MHz),S11 (dB),S21 (dB)\n';
    data.data.forEach(point => {
      csv += `${point.frequency.toFixed(2)},${point.S11_db?.toFixed(2) || 'N/A'},${point.S21_db?.toFixed(2) || 'N/A'}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 's-parameters.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  return (
    <div className="space-y-6">
      {/* 上传区域 */}
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center text-center">
            <Upload className="h-12 w-12 text-slate-400 mb-2" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
              上传 S 参数文件
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              支持 .s1p 和 .s2p 格式的 Touchstone 文件
            </p>
          </div>

          <input
            type="file"
            accept=".s1p,.s2p,.s1p1,.s2p1,.s1p2,.s2p2,.s1p3,.s2p3,.s1p4,.s2p4"
            onChange={handleFileUpload}
            className="hidden"
            id="sparam-file-input"
            disabled={loading}
          />
          <label
            htmlFor="sparam-file-input"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '解析中...' : '选择文件'}
          </label>

          {showDemo && (
            <button
              onClick={loadDemoData}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              加载演示数据
            </button>
          )}
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-red-900 dark:text-red-300">
              解析错误
            </h4>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* 数据展示 */}
      {data && (
        <div className="space-y-4">
          {/* 文件信息 */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="text-sm">
              <div className="flex items-center gap-4">
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {data.ports} 端口 S 参数
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  参考阻抗: {data.reference} Ω
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  数据点: {data.data.length}
                </span>
              </div>
            </div>
            <button
              onClick={exportData}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              导出 CSV
            </button>
          </div>

          {/* 图表展示 */}
          {data.ports === 2 && data.data.length > 0 && (
            <SParameterChart
              data={data.data.map(item => ({
                frequency: item.frequency,
                S11_db: item.S11_db || 0,
                S21_db: item.S21_db || 0,
                S11_phase: item.S11_phase || 0,
                S21_phase: item.S21_phase || 0,
              }))}
              showPhase={true}
              frequencyUnit="MHz"
              title="S-Parameter Response"
            />
          )}

          {data.ports === 1 && data.data.length > 0 && (
            <div className="text-center py-12 text-slate-600 dark:text-slate-400">
              <p>单端口 S 参数数据已加载</p>
              <p className="text-sm mt-2">
                频率范围: {data.data[0].frequency.toFixed(2)} - {data.data[data.data.length - 1].frequency.toFixed(2)} MHz
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
