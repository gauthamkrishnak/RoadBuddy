import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconBgColor?: string;
  iconTextColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  iconBgColor = 'bg-indigo-500/10 border border-indigo-500/20',
  iconTextColor = 'text-indigo-400',
}) => {
  return (
    <div className="glass-card-hover p-5 border border-slate-800/80 shadow-xl rounded-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2 text-xs font-bold">
              <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                {isPositive ? '↑' : '↓'} {change}
              </span>
              <span className="text-slate-400 font-medium">vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-3.5 rounded-2xl shadow-inner ${iconBgColor} ${iconTextColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
