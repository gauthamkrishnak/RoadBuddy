import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { Users, Plus, Trash2, Edit } from 'lucide-react';

export const FleetDriversPage: React.FC = () => {
  const { drivers, addDriver, deleteDriver } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('KL 01 BT 8890');
  const [status, setStatus] = useState('Available');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDriver({ name, phone, vehicle, status });
    setIsModalOpen(false);
    setName('');
    setPhone('');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Fleet Driver Roster"
        subtitle="Manage assigned commercial drivers, active trips, and partner ratings."
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Driver
          </button>
        }
      />

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold tracking-wider">
                <th className="pb-3">Driver Name</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Vehicle Assigned</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Lifetime Trips</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
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
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => deleteDriver(d.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Fleet Driver Partner"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Driver Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+91 98000 11122"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Assigned Vehicle Reg Number
            </label>
            <input
              type="text"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition text-sm mt-4"
          >
            Register Driver
          </button>
        </form>
      </Modal>
    </div>
  );
};
