import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Car } from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookings } = useApp();

  return (
    <div className="space-y-8">
      <PageHeader title="Master Bookings Audit" subtitle="Audit all historical and active platform bookings." />
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold tracking-wider">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Passenger</th>
                <th className="pb-3">Pickup</th>
                <th className="pb-3">Destination</th>
                <th className="pb-3">Vehicle</th>
                <th className="pb-3">Fare</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 font-mono text-blue-400 font-bold">{b.id}</td>
                  <td className="py-3.5 font-bold text-white">{b.passengerName}</td>
                  <td className="py-3.5 text-slate-300 max-w-xs truncate">{b.pickup}</td>
                  <td className="py-3.5 text-slate-300 max-w-xs truncate">{b.destination}</td>
                  <td className="py-3.5 text-slate-300">{b.vehicleName}</td>
                  <td className="py-3.5 font-bold text-emerald-400">₹{b.fare}</td>
                  <td className="py-3.5"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
