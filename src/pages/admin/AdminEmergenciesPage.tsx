import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AlertTriangle, Radio } from 'lucide-react';

export const AdminEmergenciesPage: React.FC = () => {
  const { emergencies } = useApp();

  return (
    <div className="space-y-8">
      <PageHeader title="Emergency SOS Incidents Log" subtitle="Monitor emergency dispatches and responder telemetry." />
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold tracking-wider">
                <th className="pb-3">Incident ID</th>
                <th className="pb-3">Passenger Name</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Emergency Type</th>
                <th className="pb-3">Broadcast Location</th>
                <th className="pb-3">Responder Unit</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {emergencies.map((e) => (
                <tr key={e.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 font-mono text-rose-400 font-bold">{e.id}</td>
                  <td className="py-3.5 font-bold text-white">{e.passengerName}</td>
                  <td className="py-3.5 font-mono text-slate-300">{e.passengerPhone}</td>
                  <td className="py-3.5 font-bold text-rose-400">{e.type}</td>
                  <td className="py-3.5 text-slate-300 max-w-xs truncate">{e.location}</td>
                  <td className="py-3.5 text-slate-300">{e.assignedResponder || 'Patrol Unit #14'}</td>
                  <td className="py-3.5"><StatusBadge status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
