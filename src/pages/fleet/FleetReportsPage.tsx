import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { MOCK_CHART_DATA } from '../../mockData';
import { DollarSign, FileText, TrendingUp, Truck } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const FleetReportsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Fleet Analytics & Reports"
        subtitle="Revenue analytics, fuel efficiency logs, and trip statistics."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Weekly Revenue"
          value="₹5,14,000"
          change="19%"
          isPositive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Total Trips Completed"
          value="1,655 Trips"
          icon={Truck}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-400"
        />
        <StatCard
          title="Fleet Utilization"
          value="94.2%"
          icon={TrendingUp}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-400"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Fleet Daily Revenue Growth (₹)</h3>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_CHART_DATA.revenueWeekly}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
