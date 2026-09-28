import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USER } from '../mockData';
import { authApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  login: (selectedRole: UserRole, userDetails?: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (details: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('roadbuddy_role') as UserRole) || 'passenger';
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('roadbuddy_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('roadbuddy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('roadbuddy_user');
    }
    localStorage.setItem('roadbuddy_role', role);
  }, [user, role]);

  const login = async (selectedRole: UserRole, userDetails?: Partial<User>) => {
    setRole(selectedRole);

    let roleEmail = userDetails?.email || 'gautham@roadbuddy.ai';
    if (!userDetails?.email) {
      if (selectedRole === 'driver') roleEmail = 'rahul.driver@roadbuddy.ai';
      else if (selectedRole === 'fleet') roleEmail = 'fleet@apexfleet.in';
      else if (selectedRole === 'admin') roleEmail = 'admin@roadbuddy.ai';
    }

    try {
      const response = await authApi.login({ email: roleEmail, role: selectedRole });
      if (response.access_token) {
        localStorage.setItem('roadbuddy_token', response.access_token);
        setUser(response.user);
        return;
      }
    } catch (err) {
      console.warn('Backend login fallback to local session:', err);
    }

    // Fallback if backend API unavailable
    let roleName = 'Gautham S.';
    if (selectedRole === 'driver') roleName = 'Rahul Verma (Driver)';
    else if (selectedRole === 'fleet') roleName = 'Apex Fleet Operations';
    else if (selectedRole === 'admin') roleName = 'Admin Ops HQ';

    const newUser: User = {
      ...INITIAL_USER,
      id: `usr_${selectedRole}_1`,
      name: roleName,
      email: roleEmail,
      role: selectedRole,
      ...userDetails,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setRole('passenger');
    localStorage.removeItem('roadbuddy_user');
    localStorage.removeItem('roadbuddy_role');
    localStorage.removeItem('roadbuddy_token');
  };

  const updateUser = async (details: Partial<User>) => {
    if (user) {
      try {
        const updated = await authApi.updateProfile(details);
        setUser(updated);
      } catch (err) {
        console.warn('Backend profile update fallback to local state:', err);
        setUser({ ...user, ...details });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
