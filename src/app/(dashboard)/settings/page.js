"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TextField } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { mockApi } from '@/lib/mockApi';
import { User, Shield, Save, RotateCcw, Check } from 'lucide-react';

export default function SettingsPage() {
  const { user, switchRole, ROLES } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    title: 'Senior Operations Admin',
    bio: 'Overseeing global platform analytics, team access control, and user directories.',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  function handleProfileSave(e) {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile settings saved successfully.');
    }, 400);
  }

  async function handleDataReset() {
    setIsResetting(true);
    try {
      await mockApi.resetData();
      alert('Mock database reset to initial seed state.');
      window.location.reload();
    } catch (err) {
      alert('Could not reset database.');
    } finally {
      setIsResetting(false);
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'role', label: 'Role & Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Account & System Settings"
        description="Manage your profile details and active user role permissions."
        breadcrumbs={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Settings' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Tab Menu */}
        <Card className="md:col-span-1 p-2 h-fit space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#7038d4] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Tab Content Panels */}
        <div className="md:col-span-3 space-y-6">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <p className="text-xs text-slate-500">Update your display details and personal information.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSave} className="space-y-5">
                  <div className="flex items-center gap-4 py-2 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-[#7038d4] text-white flex items-center justify-center font-bold text-xl shadow-md">
                      {profileData.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{profileData.name}</h4>
                      <p className="text-xs text-slate-400">{profileData.email}</p>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-purple-50 text-[#7038d4] border-purple-200 inline-block mt-1">
                        {user.role} Account
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>

                  <TextField
                    label="Job Title"
                    value={profileData.title}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Bio</label>
                    <textarea
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm p-3 focus:ring-2 focus:ring-[#7038d4]"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <Button variant="primary" type="submit" disabled={isSaving}>
                      <Save size={14} className="mr-1.5 inline" />
                      {isSaving ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* ROLE & SECURITY TAB */}
          {activeTab === 'role' && (
            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access Control (RBAC)</CardTitle>
                <p className="text-xs text-slate-500">
                  Switch your active role to test how component restrictions and permissions operate across the application.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      role: ROLES.ADMIN,
                      desc: 'Full access to view, create, edit, and delete user records and system configuration.',
                    },
                    {
                      role: ROLES.MANAGER,
                      desc: 'Can view, create, and update user records. Deletion actions are restricted.',
                    },
                    {
                      role: ROLES.VIEWER,
                      desc: 'Read-only access. All create, edit, and delete controls are disabled with warning banners.',
                    },
                  ].map((item) => (
                    <div
                      key={item.role}
                      onClick={() => switchRole(item.role)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        user.role === item.role
                          ? 'border-[#7038d4] bg-purple-50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-purple-50 text-[#7038d4] border-purple-200">
                          {item.role}
                        </span>
                        {user.role === item.role && <Check size={16} className="text-[#7038d4]" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-2">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Reset Demo Data</h4>
                    <p className="text-[11px] text-slate-500">Restore mock API local storage back to seed state.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleDataReset} disabled={isResetting}>
                    <RotateCcw size={14} className="mr-1.5 inline" /> Reset Mock Database
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
