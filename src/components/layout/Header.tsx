import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, Bell, AlertTriangle } from 'lucide-react';
import { UserRole } from '../../types';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { role, login } = useAuth();
  const navigate = useNavigate();

  const handleSwitchRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as UserRole;
    login(selected);
    if (selected === 'passenger') navigate('/passenger/dashboard');
    if (selected === 'driver') navigate('/driver/dashboard');
    if (selected === 'fleet') navigate('/fleet/dashboard');
    if (selected === 'admin') navigate('/admin/dashboard');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080c14]/80 border-b border-slate-800/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/80 transition lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Switch Role (Demo):</span>
          <select
            value={role}
            onChange={handleSwitchRole}
            className="bg-[#0f172a] border border-slate-700/80 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 cursor-pointer shadow-sm"
          >
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
            <option value="fleet">Fleet Owner</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Emergency SOS Button */}
        {role === 'passenger' && (
          <button
            onClick={() => navigate('/passenger/emergency')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-rose-600/30 transition animate-pulse border border-rose-500/30"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
