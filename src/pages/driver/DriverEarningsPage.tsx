import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { MOCK_CHART_DATA } from '../../mockData';
import { DollarSign, TrendingUp, Clock, Calendar } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const DriverEarningsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Driver Earnings & Analytics"
        subtitle="Detailed breakdown of daily trips, weekly earnings, and performance metrics."
      />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Today's Total Payout"
          value="₹3,450.00"
          change="14%"
          isPositive={true}
          icon={DollarSign}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-400"
        />
        <StatCard
          title="Weekly Net Revenue"
          value="₹18,400.00"
          change="8%"
          isPositive={true}
          icon={TrendingUp}
        />
        <StatCard
          title="Monthly Cumulative"
          value="₹72,000.00"
          icon={Calendar}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-400"
        />
      </div>

      {/* Recharts Bar Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Weekly Earnings Breakdown (₹)</h3>
            <p className="text-xs text-slate-400">Daily revenue earned from trip completions</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Avg ₹2,628 / Day
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_CHART_DATA.driverEarningsWeekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Bar dataKey="earnings" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
