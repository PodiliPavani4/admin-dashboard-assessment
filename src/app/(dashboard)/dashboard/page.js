"use client";

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import Button from '@/components/ui/Button';
import { useMockFetch } from '@/hooks/useMockFetch';
import { mockApi } from '@/lib/mockApi';
import { useAuth } from '@/context/AuthContext';
import {
  Heart,
  MessageSquare,
  TrendingUp,
  Users,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';

export default function DashboardPage() {
  const { isReadOnly } = useAuth();

  const { data: stats, loading, error, refetch } = useMockFetch(
    () => mockApi.getDashboardStats(),
    []
  );

  const statIcons = [Heart, MessageSquare, TrendingUp, Users];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview & Analytics"
        description="Monitor system metrics, engagement rates, and recent user activity."
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Dashboard' }]}
      />

      {/* Role Restriction Banner */}
      {isReadOnly && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-800 font-medium">
              Browsing in <strong>Viewer (Read-Only)</strong> mode. Actions are restricted.
            </p>
          </div>
          <Link href="/settings">
            <Button variant="outline" size="sm">
              Change Role
            </Button>
          </Link>
        </div>
      )}

      {/* Error state */}
      {error ? (
        <Card className="border-red-200 bg-red-50 text-center py-10">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-red-700">Failed to Load Dashboard Data</h3>
          <p className="text-xs text-red-600 max-w-md mx-auto mt-1 mb-4">{error}</p>
          <Button variant="primary" size="sm" onClick={refetch}>
            Try Again
          </Button>
        </Card>
      ) : (
        <>
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="animate-pulse h-28 bg-slate-100" />
                ))
              : stats?.metrics.map((m, idx) => (
                  <StatCard
                    key={m.title}
                    title={m.title}
                    value={m.value}
                    change={m.change}
                    isPositive={m.isPositive}
                    subtext={m.subtext}
                    icon={statIcons[idx]}
                  />
                ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LineChartCard
                title="Followers Growth & Financial Trend"
                description="Daily tracking of new followers, income, and operational outcomes."
                data={stats?.followersChartData || []}
                xKey="date"
                lines={[
                  { key: 'followers', name: 'Followers', color: '#7038d4' },
                  { key: 'income', name: 'Income ($)', color: '#10b981' },
                  { key: 'outcome', name: 'Outcome ($)', color: '#f43f5e' },
                ]}
              />
            </div>
            <div>
              <BarChartCard
                title="Activity by Day of Week"
                description="Distribution of user interactions."
                data={stats?.activityByDay || []}
                xKey="day"
                barKey="count"
                barColor="#7038d4"
              />
            </div>
          </div>

          {/* Breakdown & Actions Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between mb-4">
                <div>
                  <CardTitle>User Actions Breakdown</CardTitle>
                  <p className="text-xs text-slate-500">Total engagement breakdown for the current period</p>
                </div>
                <Link href="/users">
                  <Button variant="outline" size="sm">
                    View Directory →
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.actionsBreakdown.map((item) => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700">{item.name}</span>
                        <span className="text-slate-900 font-bold">{item.value}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#7038d4] transition-all"
                          style={{ width: `${Math.min(100, (item.value / 250) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <p className="text-xs text-slate-500">System tools & shortcuts</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/users/new" className="block">
                  <Button variant="primary" className="w-full justify-start" disabled={isReadOnly}>
                    + Add New User
                  </Button>
                </Link>
                <Link href="/users" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    Manage Directory
                  </Button>
                </Link>
                <Link href="/settings" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    System Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
