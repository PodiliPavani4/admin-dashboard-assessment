import React from 'react';
import { Search } from 'lucide-react';

export function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error = '',
  disabled = false,
  name,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-xs font-semibold text-slate-700">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-lg border bg-white text-slate-900 text-sm px-3.5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7038d4] disabled:bg-slate-100 disabled:cursor-not-allowed ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm pl-9 pr-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#7038d4]"
      />
    </div>
  );
}
