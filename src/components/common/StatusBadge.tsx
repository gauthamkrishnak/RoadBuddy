import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status.toLowerCase();

  let styles = 'bg-slate-800/80 text-slate-300 border-slate-700/60';

  if (['completed', 'paid', 'active', 'available', 'successful', 'resolved', 'dispatched'].includes(normalized)) {
    styles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm';
  } else if (['in_progress', 'accepted', 'arrived', 'in_transit', 'notified', 'assigned', 'on trip'].includes(normalized)) {
    styles = 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-sm';
  } else if (['pending', 'finding', 'maintenance', 'offline'].includes(normalized)) {
    styles = 'bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-sm';
  } else if (['cancelled', 'failed', 'refunded', 'inactive'].includes(normalized)) {
    styles = 'bg-rose-500/10 text-rose-300 border-rose-500/30 shadow-sm';
  }

  const label = status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border tracking-wide uppercase ${styles}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
      {label}
    </span>
  );
};
