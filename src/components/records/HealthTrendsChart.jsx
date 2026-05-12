import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useLanguage } from '@/lib/LanguageContext';

const trendData = [
  { month: 'Jan', weight: 68, bp: 118, risk: 3 },
  { month: 'Feb', weight: 69, bp: 122, risk: 4 },
  { month: 'Mar', weight: 71, bp: 130, risk: 7 },
  { month: 'Apr', weight: 70, bp: 125, risk: 5 },
  { month: 'May', weight: 68, bp: 120, risk: 4 },
];

const TABS = ['weight', 'bp', 'risk'];

export default function HealthTrendsChart() {
  const { t } = useLanguage();
  const [active, setActive] = useState('weight');

  const config = {
    weight: { key: 'weight', label: t('weightKg'), color: '#3b82f6', fill: '#bfdbfe' },
    bp:     { key: 'bp',     label: t('bpSystolic'), color: '#f59e0b', fill: '#fde68a' },
    risk:   { key: 'risk',   label: t('riskScore'),  color: '#ef4444', fill: '#fecaca' },
  };

  const c = config[active];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-jakarta font-bold text-xl text-gray-900 mb-1">{t('healthTrends')}</h2>
      <p className="text-gray-500 text-sm mb-5">{t('analyticsSubtitle')}</p>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-5">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActive(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${active === tab ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:border-blue-300'}`}>
            {config[tab].label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={trendData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={c.color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={c.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
          <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
          <Area type="monotone" dataKey={c.key} stroke={c.color} strokeWidth={2.5} fill="url(#grad)" dot={{ fill: c.color, r: 4 }} name={c.label} />
        </AreaChart>
      </ResponsiveContainer>

      {/* Mini stat cards */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {['Jan', 'Mar', 'May'].map((m, i) => {
          const row = trendData.find(d => d.month === m);
          return (
            <div key={m} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">{m}</p>
              <p className="font-bold text-gray-800">{row[c.key]}</p>
              <p className="text-xs text-gray-400">{c.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
