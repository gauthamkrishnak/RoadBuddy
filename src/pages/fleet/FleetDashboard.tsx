import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Truck, Users, DollarSign, Activity, Car, ChevronRight, Plus } from 'lucide-react';

export const FleetDashboard: React.FC = () => {
  const { vehicles, drivers, bookings } = useApp();
  const navigate = useNavigate();

  const activeVehicles = vehicles.filter((v) => v.status === 'available' || v.status === 'in_transit');
  const activeTrips = bookings.filter((b) => b.status === 'in_progress' || b.status === 'accepted');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3 inline-block">
            Fleet Operations Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Apex Fleet Operations</h1>
          <p className="text-slate-300 text-sm mt-1">Managing commercial tourist buses, traveller vans & city rental taxis.</p>
        </div>

        <button
          onClick={() => navigate('/fleet/vehicles')}
          className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl transition flex items-center gap-2 text-sm shrink-0"
        >
          <Plus className="w-5 h-5" /> Add New Vehicle
        </button>
      </div>

      {/* Fleet Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Vehicles"
          value={vehicles.length}
          icon={Truck}
        />
        <StatCard
          title="Active Vehicles"
          value={activeVehicles.length}
          icon={Car}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-400"
        />
        <StatCard
          title="Assigned Drivers"
          value={drivers.length}
          icon={Users}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-400"
        />
        <StatCard
          title="Live Active Trips"
          value={activeTrips.length}
          icon={Activity}
          iconBgColor="bg-cyan-500/10"
          iconTextColor="text-cyan-400"
        />
        <StatCard
          title="Today Fleet Revenue"
          value="₹1,12,000"
          isPositive={true}
          change="22%"
          icon={DollarSign}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-400"
        />
      </div>

      {/* Tables Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vehicles Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-400" /> Managed Vehicles ({vehicles.length})
            </h3>
            <button
              onClick={() => navigate('/fleet/vehicles')}
              className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
            >
              Manage All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold">
                  <th className="pb-3">Vehicle</th>
                  <th className="pb-3">Registration</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 font-bold text-white">{v.name}</td>
                    <td className="py-3 font-mono text-blue-400">{v.registrationNumber}</td>
                    <td className="py-3 text-slate-300">{v.type}</td>
                    <td className="py-3"><StatusBadge status={v.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drivers Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" /> Fleet Drivers ({drivers.length})
            </h3>
            <button
              onClick={() => navigate('/fleet/drivers')}
              className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
            >
              Manage All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold">
                  <th className="pb-3">Driver Name</th>
                  <th className="pb-3">Vehicle Assigned</th>
                  <th className="pb-3">Rating</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {drivers.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 font-bold text-white">{d.name}</td>
                    <td className="py-3 font-mono text-slate-300">{d.vehicle}</td>
                    <td className="py-3 font-bold text-amber-400">★ {d.rating}</td>
                    <td className="py-3"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
