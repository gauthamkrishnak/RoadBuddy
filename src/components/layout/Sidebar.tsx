import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Car,
  Clock,
  History,
  Bot,
  CreditCard,
  Wrench,
  AlertTriangle,
  UserCheck,
  DollarSign,
  Truck,
  Users,
  Shield,
  FileText,
  X,
  LogOut,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const passengerNav = [
    { label: 'Dashboard', path: '/passenger/dashboard', icon: LayoutDashboard },
    { label: 'Book Ride', path: '/passenger/book-ride', icon: Car },
    { label: 'Scheduled Rides', path: '/passenger/scheduled-rides', icon: Clock },
    { label: 'My Trips', path: '/passenger/history', icon: History },
    { label: 'AI Assistant', path: '/passenger/ai-assistant', icon: Bot, badge: 'AI' },
    { label: 'Payments', path: '/passenger/payments', icon: CreditCard },
    { label: 'Roadside Help', path: '/passenger/roadside', icon: Wrench },
    { label: 'Emergency SOS', path: '/passenger/emergency', icon: AlertTriangle, isSos: true },
    { label: 'Profile', path: '/passenger/profile', icon: UserCheck },
  ];

  const driverNav = [
    { label: 'Dashboard', path: '/driver/dashboard', icon: LayoutDashboard },
    { label: 'Ride Requests', path: '/driver/requests', icon: Car, badge: '3' },
    { label: 'Active Trip', path: '/driver/active-trip', icon: Clock },
    { label: 'Earnings', path: '/driver/earnings', icon: DollarSign },
    { label: 'Profile', path: '/driver/profile', icon: UserCheck },
  ];

  const fleetNav = [
    { label: 'Dashboard', path: '/fleet/dashboard', icon: LayoutDashboard },
    { label: 'Vehicles', path: '/fleet/vehicles', icon: Truck },
    { label: 'Drivers', path: '/fleet/drivers', icon: Users },
    { label: 'Reports', path: '/fleet/reports', icon: FileText },
  ];

  const adminNav = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Drivers', path: '/admin/drivers', icon: UserCheck },
    { label: 'Vehicles', path: '/admin/vehicles', icon: Truck },
    { label: 'Bookings', path: '/admin/bookings', icon: Car },
    { label: 'Emergencies', path: '/admin/emergencies', icon: AlertTriangle, isSos: true },
    { label: 'Roadside', path: '/admin/roadside', icon: Wrench },
    { label: 'Reports', path: '/admin/reports', icon: FileText },
  ];

  let navItems = passengerNav;
  if (role === 'driver') navItems = driverNav;
  if (role === 'fleet') navItems = fleetNav;
  if (role === 'admin') navItems = adminNav;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-[#090e1a]/95 border-r border-slate-800/80 backdrop-blur-xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header & Logo */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                  <Car className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-wide flex items-center gap-1">
                  ROAD<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">BUDDY</span>
                </span>
                <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase block">
                  Intelligent Mobility
                </span>
              </div>
            </NavLink>
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role badge */}
          <div className="px-6 py-3 bg-[#060a12]/80 border-b border-slate-800/60 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {role} portal
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider shadow-sm">
              {role}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-210px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      item.isSos
                        ? isActive
                          ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/30 border border-rose-500/40'
                          : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
                        : isActive
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#060a12]/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
                }
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-700/80 shrink-0 ring-2 ring-indigo-500/20"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/80 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
