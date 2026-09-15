import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Wrench } from 'lucide-react';

export const AdminRoadsidePage: React.FC = () => {
  const { roadsideRequests } = useApp();

  return (
    <div className="space-y-8">
      <PageHeader title="Roadside Assistance Dispatches" subtitle="Monitor breakdown services, mechanic assignments, and repair costs." />
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold tracking-wider">
                <th className="pb-3">Request ID</th>
                <th className="pb-3">Passenger</th>
                <th className="pb-3">Service Type</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Assigned Provider</th>
                <th className="pb-3">Cost</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {roadsideRequests.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 font-mono text-amber-400 font-bold">{r.id}</td>
                  <td className="py-3.5 font-bold text-white">{r.passengerName}</td>
                  <td className="py-3.5 font-semibold text-amber-400">{r.serviceType}</td>
                  <td className="py-3.5 text-slate-300 max-w-xs truncate">{r.location}</td>
                  <td className="py-3.5 text-slate-300">{r.providerName || 'Assigning...'}</td>
                  <td className="py-3.5 font-bold text-emerald-400">₹{r.cost || 500}</td>
                  <td className="py-3.5"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
