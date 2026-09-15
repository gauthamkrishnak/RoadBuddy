import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Car, Lock, Mail, UserCheck, Shield, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('gautham@roadbuddy.ai');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('passenger');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, { email });

    if (selectedRole === 'passenger') navigate('/passenger/dashboard');
    if (selectedRole === 'driver') navigate('/driver/dashboard');
    if (selectedRole === 'fleet') navigate('/fleet/dashboard');
    if (selectedRole === 'admin') navigate('/admin/dashboard');
  };

  const roleOptions: { role: UserRole; title: string; desc: string }[] = [
    { role: 'passenger', title: 'Passenger', desc: 'Book rides, track, emergency SOS' },
    { role: 'driver', title: 'Driver', desc: 'Accept requests & earn trips' },
    { role: 'fleet', title: 'Fleet Owner', desc: 'Manage vehicle fleets & drivers' },
    { role: 'admin', title: 'Administrator', desc: 'System management & analytics' },
  ];

  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-mesh-glow">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#080c14] rounded-[14px] flex items-center justify-center">
              <Car className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <span className="font-extrabold text-2xl text-white tracking-wide">
            ROAD<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">BUDDY</span>
          </span>
        </Link>
        <h2 className="text-3xl font-black text-white">Welcome Back</h2>
        <p className="mt-2 text-sm font-medium text-slate-400">Select a demo role to instantly explore the platform.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="glass-panel py-8 px-6 sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Select Demo Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((item) => (
                  <button
                    type="button"
                    key={item.role}
                    onClick={() => setSelectedRole(item.role)}
                    className={`p-3 rounded-2xl text-left border transition-all duration-200 ${
                      selectedRole === item.role
                        ? 'bg-gradient-to-r from-indigo-950/80 to-blue-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/15 ring-1 ring-indigo-500/50'
                        : 'bg-[#090e1a]/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs text-white">{item.title}</span>
                      {selectedRole === item.role && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight font-medium">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#090e1a] border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#090e1a] border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold rounded-xl shadow-xl shadow-indigo-600/30 transition flex items-center justify-center gap-2 text-sm border border-indigo-400/30"
            >
              Sign In as {selectedRole.toUpperCase()} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:underline font-extrabold">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
