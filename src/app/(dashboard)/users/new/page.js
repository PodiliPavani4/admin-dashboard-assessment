"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TextField } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { mockApi } from '@/lib/mockApi';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, UserPlus, ShieldAlert } from 'lucide-react';

export default function NewUserPage() {
  const router = useRouter();
  const { isReadOnly } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Member',
    status: 'Active',
    location: '',
    bio: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validateForm() {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Valid email address required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isReadOnly) {
      alert('Viewer role cannot create new users.');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await mockApi.createUser(formData);
      router.push('/users');
    } catch (err) {
      alert(err.message || 'Could not create user.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New User Account"
        description="Register a new team member into the organization dashboard."
        breadcrumbs={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Users', href: '/users' },
          { label: 'New User' },
        ]}
        actions={
          <Link href="/users">
            <Button variant="outline" size="sm">
              <ArrowLeft size={14} className="mr-1 inline" /> Back to Directory
            </Button>
          </Link>
        }
      />

      {isReadOnly && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-3">
          <ShieldAlert size={18} className="text-amber-600 shrink-0" />
          <span>User creation is disabled in <strong>Viewer</strong> mode. Switch role in topbar to test.</span>
        </div>
      )}

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                disabled={isReadOnly}
                placeholder="e.g. Phoenix Baker"
              />
              <TextField
                label="Email Address *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isReadOnly}
                placeholder="e.g. phoenix@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="User Role *"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isReadOnly}
                options={[
                  { label: 'Admin', value: 'Admin' },
                  { label: 'Manager', value: 'Manager' },
                  { label: 'Editor', value: 'Editor' },
                  { label: 'Member', value: 'Member' },
                ]}
              />
              <Select
                label="Account Status *"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isReadOnly}
                options={[
                  { label: 'Active', value: 'Active' },
                  { label: 'Pending', value: 'Pending' },
                  { label: 'Inactive', value: 'Inactive' },
                ]}
              />
            </div>

            <TextField
              label="Location / Country"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={isReadOnly}
              placeholder="e.g. United Kingdom"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Biography / Notes</label>
              <textarea
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                disabled={isReadOnly}
                placeholder="User bio or team responsibilities..."
                className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#7038d4] disabled:opacity-60"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Link href="/users">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button variant="primary" type="submit" disabled={isSubmitting || isReadOnly}>
                <UserPlus size={14} className="mr-1.5 inline" />
                {isSubmitting ? 'Creating...' : 'Create User'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
