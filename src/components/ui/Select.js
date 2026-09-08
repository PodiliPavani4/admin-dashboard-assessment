import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  name,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-xs font-semibold text-slate-700">{label}</label>}
      <div className="relative flex items-center">
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white text-slate-900 text-sm pl-3.5 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#7038d4] disabled:bg-slate-100 disabled:cursor-not-allowed cursor-pointer"
        >
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <ChevronDown size={16} className="absolute right-3 pointer-events-none text-slate-400" />
      </div>
    </div>
  );
}
