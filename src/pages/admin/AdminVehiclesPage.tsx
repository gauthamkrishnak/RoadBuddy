import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Truck } from 'lucide-react';

export const AdminVehiclesPage: React.FC = () => {
  const { vehicles } = useApp();

  return (
    <div className="space-y-8">
      <PageHeader title="Platform Vehicles Control" subtitle="Monitor all taxis, rental cars, traveller vans, and tourist buses." />
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold tracking-wider">
                <th className="pb-3">Vehicle</th>
                <th className="pb-3">Registration</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Driver Name</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Rate</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 font-bold text-white text-sm">{v.name}</td>
                  <td className="py-3.5 font-mono text-blue-400 font-bold">{v.registrationNumber}</td>
                  <td className="py-3.5 text-slate-300">{v.type} ({v.capacity} Seats)</td>
                  <td className="py-3.5 font-semibold text-slate-200">{v.driverName || 'Unassigned'}</td>
                  <td className="py-3.5 text-slate-400">{v.location || 'HQ Yard'}</td>
                  <td className="py-3.5 font-bold text-emerald-400">₹{v.pricePerKm}/km</td>
                  <td className="py-3.5"><StatusBadge status={v.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
