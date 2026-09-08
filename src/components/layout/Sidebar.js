"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Home,
  FileText,
  LayoutGrid,
  ShoppingBag,
  Shield,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const menuSections = [
  {
    label: 'Home',
    icon: Home,
    href: '/dashboard',
  },
  {
    label: 'Pages',
    icon: FileText,
    children: [
      { label: 'Profile', href: '/settings' },
      { label: 'Users Directory', href: '/users' },
      { label: 'Account', href: '/settings' },
      { label: 'Settings', href: '/settings' },
      { label: 'Projects', href: '/dashboard' },
      { label: 'Pricing page', href: '/dashboard' },
      { label: 'Charts', href: '/dashboard' },
    ],
  },
  {
    label: 'Applications',
    icon: LayoutGrid,
    children: [
      { label: 'Kanban', href: '/dashboard' },
      { label: 'Wizard', href: '/dashboard' },
      { label: 'Data tables', href: '/users' },
      { label: 'Calendar', href: '/dashboard' },
    ],
  },
  {
    label: 'E-commerce',
    icon: ShoppingBag,
    children: [
      { label: 'Overview', href: '/dashboard' },
      { label: 'Products', href: '/dashboard' },
      { label: 'Orders', href: '/dashboard' },
    ],
  },
  {
    label: 'Authentication',
    icon: Shield,
    children: [
      { label: 'Login', href: '/dashboard' },
      { label: 'Register', href: '/dashboard' },
    ],
  },
];

export default function Sidebar({ isCollapsed }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [openSections, setOpenSections] = useState({ Pages: true });

  function toggleSection(label) {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  }

  return (
    <aside
      className={`hidden sm:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-30 shrink-0 sticky top-0 h-screen ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Figma purple logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-3 font-bold text-xl text-[#7038d4]">
          <div className="w-9 h-9 rounded-xl bg-[#7038d4] text-white flex items-center justify-center font-extrabold shadow-sm">
            M
          </div>
          {!isCollapsed && (
            <span className="tracking-tight text-slate-900 font-bold">
              Admin<span className="text-[#7038d4]">Kit</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation menu matching Figma kit */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {menuSections.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openSections[item.label];

          return (
            <div key={item.label}>
              {hasChildren ? (
                <button
                  onClick={() => toggleSection(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isOpen
                      ? 'bg-purple-50 text-[#7038d4] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} className={isOpen ? 'text-[#7038d4]' : 'text-slate-400'} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </>
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-[#7038d4] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-[#7038d4]' : 'text-slate-400'} />
                  {!isCollapsed && <span className="flex-1">{item.label}</span>}
                </Link>
              )}

              {/* Submenu expansion */}
              {hasChildren && isOpen && !isCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isChildActive
                            ? 'text-[#7038d4] font-semibold bg-purple-50/50'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User Card at bottom */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-[#7038d4] text-white flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate">{user.name}</p>
              <p className="text-[10px] text-purple-100 truncate opacity-80">{user.email}</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white">
              {user.role}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
