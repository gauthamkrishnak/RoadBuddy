import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { UserCheck } from 'lucide-react';

export const AdminDriversPage: React.FC = () => {
  const { drivers } = useApp();

  return (
    <div className="space-y-8">
      <PageHeader title="Platform Drivers Directory" subtitle="Inspect independent & fleet driver partners, ratings, and performance." />
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold tracking-wider">
                <th className="pb-3">Driver Name</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Assigned Vehicle</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Lifetime Trips</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {drivers.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 font-bold text-white text-sm">{d.name}</td>
                  <td className="py-3.5 text-slate-300 font-mono">{d.phone}</td>
                  <td className="py-3.5 font-mono text-blue-400 font-bold">{d.vehicle}</td>
                  <td className="py-3.5 font-bold text-amber-400">★ {d.rating}</td>
                  <td className="py-3.5 text-slate-200">{d.trips}</td>
                  <td className="py-3.5"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
