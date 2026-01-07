/**
 * Touchstone (.s1p, .s2p) 文件解析器
 *
 * 支持在浏览器本地解析 S 参数文件，无需后端处理
 *
 * 文件格式参考：IBIS 5.0 / Touchstone File Format Specification
 */

/**
 * S 参数矩阵数据类型
 */
export interface SParameterMatrix {
  frequency: number;
  // 对于 .s1p 文件
  S11?: {
    magnitude: number;  // dB or linear
    phase: number;      // degrees or radians
  };
  // 对于 .s2p 文件
  S11_db?: number;
  S11_phase?: number;
  S21_db?: number;
  S21_phase?: number;
  S12_db?: number;
  S12_phase?: number;
  S22_db?: number;
  S22_phase?: number;
}

/**
 * Touchstone 文件元数据
 */
export interface TouchstoneMetadata {
  version: string;        // 格式版本号（通常是 2.0）
  frequencyUnit: string;  // GHz, MHz, kHz, Hz
  parameter: string;       // S, Y, Z, H, G, A
  format: string;         // MA (magnitude-angle), DB (decibel-angle), RI (real-imag)
  reference: number;      // 参考阻抗 (通常 50)
  ports: number;          // 端口数 (1 或 2)
  data: SParameterMatrix[];
}

/**
 * 解析 Touchstone 文件
 *
 * @param fileContent - 文件内容
 * @returns 解析后的 S 参数数据
 *
 * 示例：
 * const fileContent = await file.text();
 * const sparams = parseTouchstone(fileContent);
 */
export function parseTouchstone(fileContent: string): TouchstoneMetadata {
  const lines = fileContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('!')); // 移除注释和空行

  // 默认元数据
  const metadata: TouchstoneMetadata = {
    version: '2.0',
    frequencyUnit: 'GHz',
    parameter: 'S',
    format: 'MA',
    reference: 50,
    ports: 1,
    data: [],
  };

  // 解析元数据行
  let dataStartIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 格式行：# [freq] [parameter] [format] R [reference]
    if (line.startsWith('#')) {
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        metadata.frequencyUnit = parts[1].toUpperCase();
      }
      if (parts.length >= 3) {
        metadata.parameter = parts[2].toUpperCase();
      }
      if (parts.length >= 4) {
        metadata.format = parts[3].toUpperCase();
      }
      if (parts.length >= 5 && parts[4].toUpperCase() === 'R') {
        metadata.reference = parseFloat(parts[5]);
      }
    } else if (!isNaN(parseFloat(line.split(/\s+/)[0]))) {
      // 数据行开始
      dataStartIndex = i;
      break;
    }
  }

  // 确定端口数（通过检查数据行）
  if (lines[dataStartIndex]) {
    const parts = lines[dataStartIndex].split(/\s+/);
    // S1p: freq + mag + phase (3 列)
    // S2p: freq + S11(mag,phase) + S21(mag,phase) + S12(mag,phase) + S22(mag,phase) (9 列)
    const expectedColumns = metadata.format === 'RI' ? 5 : 9;
    if (parts.length >= expectedColumns) {
      metadata.ports = 2;
    }
  }

  // 解析数据行
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split(/\s+/).map(parseFloat);

    if (parts.length < 3 || isNaN(parts[0])) {
      continue;
    }

    const frequency = parts[0];

    // 转换频率单位为 MHz
    const frequencyMHz = convertFrequency(
      frequency,
      metadata.frequencyUnit.toUpperCase() as 'GHz' | 'MHz' | 'kHz' | 'Hz',
      'MHz'
    );

    const dataPoint: SParameterMatrix = { frequency: frequencyMHz };

    if (metadata.ports === 1) {
      // S1p 文件
      if (metadata.format === 'MA') {
        // 格式：frequency magnitude angle
        const magnitude = parts[1];
        const angle = parts[2];

        dataPoint.S11 = {
          magnitude,
          phase: angle,
        };
      } else if (metadata.format === 'DB') {
        // 格式：frequency dB angle
        const dB = parts[1];
        const angle = parts[2];

        dataPoint.S11 = {
          magnitude: Math.pow(10, dB / 20), // dB 转线性
          phase: angle,
        };
      } else if (metadata.format === 'RI') {
        // 格式：frequency real imag
        const real = parts[1];
        const imag = parts[2];

        // 复数转换为幅值和相位
        const magnitude = Math.sqrt(real * real + imag * imag);
        const angle = Math.atan2(imag, real) * (180 / Math.PI);

        dataPoint.S11 = {
          magnitude,
          phase: angle,
        };
      }
    } else if (metadata.ports === 2) {
      // S2p 文件
      if (metadata.format === 'MA' || metadata.format === 'DB') {
        // 格式：frequency S11(mag,phase) S21(mag,phase) S12(mag,phase) S22(mag,phase)
        let S11_mag, S11_phase;
        let S21_mag, S21_phase;
        let S12_mag, S12_phase;
        let S22_mag, S22_phase;

        if (metadata.format === 'DB') {
          S11_mag = Math.pow(10, parts[1] / 20);
          S11_phase = parts[2];
          S21_mag = Math.pow(10, parts[3] / 20);
          S21_phase = parts[4];
          S12_mag = Math.pow(10, parts[5] / 20);
          S12_phase = parts[6];
          S22_mag = Math.pow(10, parts[7] / 20);
          S22_phase = parts[8];
        } else {
          S11_mag = parts[1];
          S11_phase = parts[2];
          S21_mag = parts[3];
          S21_phase = parts[4];
          S12_mag = parts[5];
          S12_phase = parts[6];
          S22_mag = parts[7];
          S22_phase = parts[8];
        }

        dataPoint.S11_db = 20 * Math.log10(S11_mag);
        dataPoint.S11_phase = S11_phase;
        dataPoint.S21_db = 20 * Math.log10(S21_mag);
        dataPoint.S21_phase = S21_phase;
        dataPoint.S12_db = 20 * Math.log10(S12_mag);
        dataPoint.S12_phase = S12_phase;
        dataPoint.S22_db = 20 * Math.log10(S22_mag);
        dataPoint.S22_phase = S22_phase;
      } else if (metadata.format === 'RI') {
        // 格式：frequency S11(real,imag) S21(real,imag) S12(real,imag) S22(real,imag)
        const S11_real = parts[1];
        const S11_imag = parts[2];
        const S21_real = parts[3];
        const S21_imag = parts[4];
        const S12_real = parts[5];
        const S12_imag = parts[6];
        const S22_real = parts[7];
        const S22_imag = parts[8];

        // 复数转换
        dataPoint.S11_db = 20 * Math.log10(Math.sqrt(S11_real ** 2 + S11_imag ** 2));
        dataPoint.S11_phase = Math.atan2(S11_imag, S11_real) * (180 / Math.PI);
        dataPoint.S21_db = 20 * Math.log10(Math.sqrt(S21_real ** 2 + S21_imag ** 2));
        dataPoint.S21_phase = Math.atan2(S21_imag, S21_real) * (180 / Math.PI);
        dataPoint.S12_db = 20 * Math.log10(Math.sqrt(S12_real ** 2 + S12_imag ** 2));
        dataPoint.S12_phase = Math.atan2(S12_imag, S12_real) * (180 / Math.PI);
        dataPoint.S22_db = 20 * Math.log10(Math.sqrt(S22_real ** 2 + S22_imag ** 2));
        dataPoint.S22_phase = Math.atan2(S22_imag, S22_real) * (180 / Math.PI);
      }
    }

    metadata.data.push(dataPoint);
  }

  return metadata;
}

/**
 * 频率单位转换
 */
function convertFrequency(
  value: number,
  from: 'GHz' | 'MHz' | 'kHz' | 'Hz',
  to: 'GHz' | 'MHz' | 'kHz' | 'Hz'
): number {
  const units = { GHz: 1e9, MHz: 1e6, kHz: 1e3, Hz: 1 };
  const fromHz = value * units[from];
  return fromHz / units[to];
}

/**
 * 从文件对象解析
 */
export async function parseTouchstoneFile(file: File): Promise<TouchstoneMetadata> {
  const content = await file.text();
  return parseTouchstone(content);
}

/**
 * 生成示例 Touchstone 文件
 */
export function generateSampleTouchstone(type: '1port' | '2port' = '1port'): string {
  if (type === '1port') {
    return `
# 1-port S-parameter data
# GHZ S MA R 50
!
! Frequency (GHz)   S11 (mag)   S11 (phase)
0.50                0.100        -30.0
1.00                0.050        -45.0
1.50                0.030        -60.0
2.00                0.020        -75.0
2.50                0.015        -90.0
`.trim();
  } else {
    return `
# 2-port S-parameter data
# GHZ S MA R 50
!
! Frequency   S11 (mag)   S11 (phase)   S21 (mag)   S21 (phase)   S12 (mag)   S12 (phase)   S22 (mag)   S22 (phase)
0.50          0.100        -30.0         0.950       -5.0          0.050       -180.0        0.150        -20.0
1.00          0.050        -45.0         0.980       -8.0          0.030       -180.0        0.100        -30.0
1.50          0.030        -60.0         0.990       -10.0         0.020       -180.0        0.080        -35.0
2.00          0.020        -75.0         0.992       -12.0         0.015       -180.0        0.060        -40.0
`.trim();
  }
}
