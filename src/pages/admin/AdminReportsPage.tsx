import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { MOCK_CHART_DATA } from '../../mockData';
import { DollarSign, FileText, TrendingUp, Users } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminReportsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader title="Platform Master Financial & Safety Reports" subtitle="Comprehensive platform health metrics, earnings growth, and risk audit logs." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Platform Gross GMV" value="₹12.8M" change="28%" isPositive={true} icon={DollarSign} />
        <StatCard title="Active Passenger Accounts" value="48,200" isPositive={true} change="14%" icon={Users} iconBgColor="bg-emerald-500/10" iconTextColor="text-emerald-400" />
        <StatCard title="SOS Incident Resolution Rate" value="99.9%" icon={TrendingUp} iconBgColor="bg-indigo-500/10" iconTextColor="text-indigo-400" />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Monthly Platform GMV Growth (₹)</h3>
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_CHART_DATA.revenueWeekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
