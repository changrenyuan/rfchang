'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    description: '',
    preferredTime: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const consultationTypes = [
    {
      title: '射频设计咨询',
      description: '阻抗匹配、滤波器设计、功率放大器等',
      price: '500元/小时',
      popular: true
    },
    {
      title: '5G基站设计',
      description: '基站射频前端、PA设计、调试优化',
      price: '800元/小时',
      popular: false
    },
    {
      title: 'EMC/EMI 解决方案',
      description: '电磁兼容性问题诊断和解决',
      price: '600元/小时',
      popular: false
    },
    {
      title: '项目评审与优化',
      description: '项目方案评审、设计优化建议',
      price: '1000元/次',
      popular: false
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该调用 API 提交表单
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* 导航栏 */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
                RF
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  射频工程师实战平台
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/articles"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                知识库
              </Link>
              <Link
                href="/tools"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                在线工具
              </Link>
              <Link
                href="/consultation"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                预约咨询
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* 页面标题 */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            预约专家咨询
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            10年+ 射频工程实战经验，帮你快速解决技术难题
          </p>
        </div>

        {/* 专家简介 */}
        <div className="mb-12 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                RF
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  射频专家
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  资深射频工程师 · 10年+ 实战经验
                </p>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-slate-900 dark:text-white">500+</div>
                <div className="text-slate-600 dark:text-slate-400">咨询案例</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-slate-900 dark:text-white">98%</div>
                <div className="text-slate-600 dark:text-slate-400">好评率</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-slate-900 dark:text-white">24h</div>
                <div className="text-slate-600 dark:text-slate-400">响应时间</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* 咨询类型 */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
              咨询类型
            </h3>
            <div className="grid gap-4">
              {consultationTypes.map((type, index) => (
                <div
                  key={index}
                  className={`rounded-xl border-2 p-6 transition-all ${
                    type.popular
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {type.title}
                    </h4>
                    {type.popular && (
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                        推荐
                      </span>
                    )}
                  </div>
                  <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">
                    {type.description}
                  </p>
                  <div className="text-base font-semibold text-blue-600 dark:text-blue-400">
                    {type.price}
                  </div>
                </div>
              ))}
            </div>

            {/* 服务流程 */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                服务流程
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      提交需求
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      填写咨询表单，详细描述你的问题
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      确认预约
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      专家与你联系，确认时间和方式
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      专家咨询
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      在线视频通话或电话咨询
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      方案交付
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      提供详细解决方案和后续支持
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 预约表单 */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
              提交咨询申请
            </h3>

            {submitted ? (
              <div className="rounded-xl border-2 border-green-500 bg-green-50 p-12 text-center dark:bg-green-900/20">
                <div className="mb-4 text-5xl">✅</div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  提交成功
                </h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                  我们会在 24 小时内与你联系，确认咨询时间
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  返回首页
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="请输入您的姓名"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                      邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="请输入您的邮箱"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                      手机号码 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="请输入您的手机号码"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                      咨询主题 <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">请选择咨询类型</option>
                      <option value="rf-design">射频设计咨询</option>
                      <option value="5g-design">5G基站设计</option>
                      <option value="emc-solution">EMC/EMI 解决方案</option>
                      <option value="project-review">项目评审与优化</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                      问题描述 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="请详细描述您遇到的问题或需求"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
                      预约时间
                    </label>
                    <input
                      type="text"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="例如：周末下午"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    提交申请
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
            常见问题
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                咨询方式是什么？
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                主要是在线视频通话，也可以选择电话或文字沟通。
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                咨询后还有后续支持吗？
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                咨询后提供7天内免费后续答疑，确保问题解决。
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                能否提供书面方案？
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                咨询结束后会提供详细的书面解决方案和建议文档。
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-2 font-semibold text-slate-900 dark:text-white">
                支持发票吗？
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                支持开具正规发票，提供企业报销所需材料。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
