import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USER } from '../mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  login: (role: UserRole, userDetails?: Partial<User>) => void;
  logout: () => void;
  updateUser: (details: Partial<User>) => void;
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

  const login = (selectedRole: UserRole, userDetails?: Partial<User>) => {
    setRole(selectedRole);
    let roleName = 'Gautham S.';
    let roleEmail = 'gautham@roadbuddy.ai';

    if (selectedRole === 'driver') {
      roleName = 'Rahul Verma (Driver)';
      roleEmail = 'rahul.driver@roadbuddy.ai';
    } else if (selectedRole === 'fleet') {
      roleName = 'Apex Fleet Operations';
      roleEmail = 'fleet@apexfleet.in';
    } else if (selectedRole === 'admin') {
      roleName = 'Admin Ops HQ';
      roleEmail = 'admin@roadbuddy.ai';
    }

    const newUser: User = {
      ...INITIAL_USER,
      id: `usr_${selectedRole}_1`,
      name: roleName,
      email: roleEmail,
      role: selectedRole,
      ...userDetails
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setRole('passenger');
    localStorage.removeItem('roadbuddy_user');
    localStorage.removeItem('roadbuddy_role');
  };

  const updateUser = (details: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...details });
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
