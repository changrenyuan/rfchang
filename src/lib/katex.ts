/**
 * KaTeX 配置
 * 用于 LaTeX 公式渲染
 */

export const katexConfig = {
  displayMode: false,
  output: 'html',
  strict: true,
  trust: false,
  fleqn: false,
  throwOnError: false,
  errorColor: '#cc0000',
  macros: {
    // 射频工程符号
    '\\S11': 'S_{11}',
    '\\S21': 'S_{21}',
    '\\S12': 'S_{12}',
    '\\S22': 'S_{22}',
    '\\GammaL': '\\Gamma_L',
    '\\GammaS': '\\Gamma_S',
    '\\Zin': 'Z_{in}',
    '\\VSWR': '\\text{VSWR}',
    '\\RL': 'RL',
  },
};
