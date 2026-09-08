"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { X, Home, FileText, LayoutGrid, ShoppingBag, Shield } from 'lucide-react';

export default function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!isOpen) return null;

  const links = [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Users Directory', icon: FileText, href: '/users' },
    { label: 'Settings', icon: Shield, href: '/settings' },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />

      {/* Slide-out Drawer */}
      <div className="relative z-10 w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2 font-bold text-lg text-[#7038d4]">
            <div className="w-8 h-8 rounded-lg bg-[#7038d4] text-white flex items-center justify-center font-bold">M</div>
            <span>AdminKit</span>
          </Link>
          <button onClick={onClose} className="p-1 text-slate-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-purple-50 text-[#7038d4] font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#7038d4]' : 'text-slate-400'} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-[#7038d4] text-white flex items-center justify-between">
            <div className="text-xs">
              <p className="font-semibold">{user.name}</p>
              <p className="opacity-80 text-[10px]">{user.email}</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
