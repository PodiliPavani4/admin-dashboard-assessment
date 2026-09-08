import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-5 shadow-xs transition-colors ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`flex flex-col gap-1 mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold text-slate-900 ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function StatCard({ title, value, change, isPositive = true, subtext, icon: Icon }) {
  return (
    <Card className="relative overflow-hidden hover:border-purple-300 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="p-2 rounded-lg bg-purple-50 text-[#7038d4]">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {change && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
          >
            {change}
          </span>
        )}
      </div>

      {subtext && <p className="mt-2 text-xs text-slate-400">{subtext}</p>}
    </Card>
  );
}
