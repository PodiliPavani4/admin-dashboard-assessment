"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TextField } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useMockFetch } from '@/hooks/useMockFetch';
import { mockApi } from '@/lib/mockApi';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Save, ShieldAlert, UserCheck } from 'lucide-react';

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;
  const { isReadOnly } = useAuth();

  const { data: initialUser, loading, error } = useMockFetch(
    () => mockApi.getUserById(userId),
    [userId]
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Member',
    status: 'Active',
    location: '',
    bio: '',
    likes: 0,
    projects: 0,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialUser) {
      setFormData({
        name: initialUser.name || '',
        email: initialUser.email || '',
        role: initialUser.role || 'Member',
        status: initialUser.status || 'Active',
        location: initialUser.location || '',
        bio: initialUser.bio || '',
        likes: initialUser.likes || 0,
        projects: initialUser.projects || 0,
      });
    }
  }, [initialUser]);

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
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isReadOnly) {
      alert('Viewer role cannot modify user profiles.');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await mockApi.updateUser(userId, formData);
      router.push('/users');
    } catch (err) {
      alert(err.message || 'Could not update user.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-sm text-slate-500">Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center py-12 border-rose-200 bg-rose-50">
        <ShieldAlert className="w-10 h-10 text-rose-500 mx-auto mb-2" />
        <h3 className="text-base font-bold text-rose-800">User Not Found</h3>
        <p className="text-xs text-rose-600 mt-1 mb-4">{error}</p>
        <Link href="/users">
          <Button variant="primary" size="sm">
            <ArrowLeft size={14} className="mr-1 inline" /> Back to Users Directory
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit User: ${initialUser?.name}`}
        description="Update profile details, permissions, and status information."
        breadcrumbs={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Users', href: '/users' },
          { label: initialUser?.name || 'Edit User' },
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
          <span>Form inputs are disabled in <strong>Viewer</strong> mode. Switch role in topbar to edit.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Container */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Details & Role</CardTitle>
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
                  placeholder="e.g. Alice Cruz"
                />
                <TextField
                  label="Email Address *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isReadOnly}
                  placeholder="e.g. alice@example.com"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  placeholder="e.g. Germany"
                />
                <TextField
                  label="Projects Count"
                  type="number"
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  disabled={isReadOnly}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Bio & Notes</label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={isReadOnly}
                  placeholder="Brief description or background..."
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
                  <Save size={14} className="mr-1.5 inline" />
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Live Profile Card Preview */}
        <div>
          <Card className="sticky top-24 text-center p-6">
            <div className="relative inline-block mb-3">
              <img
                src={initialUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt=""
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-purple-100"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-[#7038d4] rounded-full text-white">
                <UserCheck size={14} />
              </div>
            </div>
            <h3 className="font-bold text-lg text-slate-900">{formData.name || 'User Name'}</h3>
            <p className="text-xs text-slate-400 mb-3">{formData.email || 'user@example.com'}</p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-purple-50 text-[#7038d4] border-purple-200">
                {formData.role}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                {formData.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block">Location</span>
                <span className="font-semibold text-slate-800">{formData.location || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Projects</span>
                <span className="font-semibold text-slate-800">{formData.projects}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mt-4 text-left">
              "{formData.bio || 'No bio provided.'}"
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
