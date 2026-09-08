"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SearchInput } from '@/components/ui/Input';
import {
  Menu,
  Bell,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  Shield,
  Check,
} from 'lucide-react';

export default function Topbar({ isSidebarCollapsed, onToggleSidebar, onToggleMobileNav }) {
  const { user, switchRole, ROLES } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onToggleMobileNav}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Menu size={20} />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex p-2 rounded-lg text-slate-500 hover:bg-slate-100"
        >
          {isSidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>

        {/* Search Input Box */}
        <div className="hidden sm:block w-64 md:w-80">
          <SearchInput placeholder="Search anything..." />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Role Selector Badge (Demonstrating Role-Based Navigation) */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 text-xs font-semibold text-[#7038d4] hover:bg-purple-100 transition-colors"
          >
            <Shield size={14} />
            <span>Role: {user.role}</span>
            <ChevronDown size={12} />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Role
              </div>
              {Object.values(ROLES).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    switchRole(role);
                    setShowRoleMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between text-slate-700 hover:bg-slate-100"
                >
                  <span>{role}</span>
                  {user.role === role && <Check size={14} className="text-[#7038d4]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7038d4]" />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#7038d4] text-white flex items-center justify-center font-bold text-xs">
          {user.name.charAt(0)}
        </div>
      </div>
    </header>
  );
}
