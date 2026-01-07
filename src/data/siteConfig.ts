/**
 * 站点配置中心
 * 集中管理全站配置，SEO、JSON-LD 和 UI 统一引用此配置
 */

export const siteConfig = {
  // ========== 基本信息 ==========
  name: '射频工程技术笔记',
  description: '专注射频电路设计、5G/6G 通信、高频电路工程研究与实践',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rf.yikii.cn',
  author: '射频工程师',

  // ========== SEO 配置 ==========
  seo: {
    defaultTitle: '射频工程技术笔记 - RF Engineering Notes',
    titleTemplate: '%s | 射频工程技术笔记',
    defaultDescription: '射频电路设计实战笔记，涵盖5G基站、阻抗匹配、高频电路设计、S参数分析等核心领域',
    keywords: [
      '射频工程',
      'RF',
      '5G基站',
      '阻抗匹配',
      'Smith Chart',
      'S参数',
      '高频电路',
      '功率放大器',
      'PCB设计',
      'EMC',
      '射频前端',
      '滤波器设计',
      'VSWR',
      '回波损耗',
      '衰减器',
      '串并联阻抗',
    ],
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      siteName: '射频工程技术笔记',
    },
  },

  // ========== 首页内容 ==========
  home: {
    // Hero 区域
    hero: {
      title: '射频设计不仅是理论\n更是工程的艺术',
      subtitle: '聚焦 5G/6G 通信、阻抗匹配、高频电路设计的实战经验',
      cta: {
        primary: {
          label: '探索札记',
          href: '/notes',
        },
        secondary: {
          label: '在线工具',
          href: '/tools',
        },
      },
    },

    // 研究方向
    research: {
      title: '研究方向',
      subtitle: '聚焦射频工程核心技术领域',
      items: [
        {
          icon: '📡',
          title: '5G/6G 基站',
          description: '功率放大器设计、射频前端优化',
          metrics: {
            years: '8+',
            projects: '50+',
          },
        },
        {
          icon: '⚡',
          title: '阻抗匹配',
          description: 'Smith Chart 实战、匹配网络设计',
          metrics: {
            years: '6+',
            projects: '30+',
          },
        },
        {
          icon: '📊',
          title: '高频电路',
          description: 'PCB 布局、EMC 设计、信号完整性',
          metrics: {
            years: '5+',
            projects: '20+',
          },
        },
        {
          icon: '🔬',
          title: 'S 参数分析',
          description: '网络分析仪使用、调试技巧',
          metrics: {
            years: '7+',
            projects: '40+',
          },
        },
      ],
    },

    // 工程案例
    projects: {
      title: '工程案例',
      subtitle: '真实项目经验分享',
      items: [
        {
          title: '5G 宏基站 PA 设计',
          description: '基于 GaN 的高功率放大器，效率提升 15%',
          category: '5G基站',
        },
        {
          title: 'Massive MIMO 移相器',
          description: '32 通道移相网络，相位精度 < 2°',
          category: '高频电路',
        },
        {
          title: '毫米波变频链路',
          description: '24-40 GHz 宽带变频，噪声系数优化',
          category: '5G基站',
        },
      ],
    },

    // 技术标签
    tags: [
      'Smith Chart',
      'S Parameters',
      'VSWR',
      'Impedance Matching',
      'Power Amplifier',
      'Filter Design',
      'EMC/EMI',
      'PCB Layout',
      'Network Analyzer',
      'Vector Network Analysis',
      'Touchstone Files',
      'Non-linear Distortion',
      'Impedance Synthesis',
    ],
  },

  // ========== 社交链接 ==========
  social: {
    github: 'https://github.com/changrenyuan/rfchang',
    email: 'contact@rf.yikii.cn',
  },

  // ========== JSON-LD 专业术语 ==========
  knowsAbout: [
    // 核心领域
    'RF Circuit Design',
    '5G/6G Base Station Design',
    'Impedance Matching',
    'Smith Chart',
    'S-Parameter Analysis',
    'High-Frequency PCB Design',
    'Power Amplifier Design',
    'Filter Design',
    'EMC/EMI Design',

    // 技术细节
    'Vector Network Analysis',
    'Touchstone Files',
    'Non-linear Distortion',
    'Impedance Synthesis',
    'VSWR and Return Loss',
    'Attenuator Design',
    'Series/Parallel Impedance Conversion',
    'Signal Integrity',
    'EMC Testing and Mitigation',

    // 工具和方法
    'Network Analyzer',
    'Massive MIMO',
    'Phase Shifter',
    'GaN/GaAs Devices',
    'Millimeter Wave Design',
    'RF Front-End Design',
  ],

  // ========== 路由配置 ==========
  navigation: {
    home: '/',
    notes: '/notes',
    articles: '/articles',
    publications: '/publications',
    tools: '/tools',
    about: '/about',
  },
} as const;

export type SiteConfig = typeof siteConfig;
