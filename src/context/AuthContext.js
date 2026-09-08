"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  VIEWER: 'Viewer',
};

const DEFAULT_USER = {
  name: 'Alice Cruz',
  email: 'alice.cruz@example.com',
  role: ROLES.ADMIN,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);

  useEffect(() => {
    const savedRole = localStorage.getItem('app_user_role');
    if (savedRole && Object.values(ROLES).includes(savedRole)) {
      setUser((prev) => ({ ...prev, role: savedRole }));
    }
  }, []);

  function switchRole(newRole) {
    if (Object.values(ROLES).includes(newRole)) {
      setUser((prev) => ({ ...prev, role: newRole }));
      localStorage.setItem('app_user_role', newRole);
    }
  }


  const isReadOnly = false;
  const canEdit = true;
  const canDelete = true;

  return (
    <AuthContext.Provider
      value={{
        user,
        switchRole,
        isReadOnly,
        canEdit,
        canDelete,
        ROLES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
