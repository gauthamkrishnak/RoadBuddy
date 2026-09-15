import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { Vehicle, VehicleType } from '../../types';
import { Truck, Plus, Edit, Trash2 } from 'lucide-react';

export const FleetVehiclesPage: React.FC = () => {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<VehicleType>('Rental Car');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [capacity, setCapacity] = useState(4);
  const [pricePerKm, setPricePerKm] = useState(24);
  const [baseFare, setBaseFare] = useState(150);
  const [driverName, setDriverName] = useState('');
  const [location, setLocation] = useState('InfoPark, Kochi');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600');

  const handleOpenAddModal = () => {
    setEditingVehicle(null);
    setName('');
    setType('Rental Car');
    setRegistrationNumber('KL 07 EV ' + Math.floor(1000 + Math.random() * 9000));
    setCapacity(4);
    setPricePerKm(24);
    setBaseFare(150);
    setDriverName('New Driver');
    setLocation('Kochi Town');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setName(v.name);
    setType(v.type);
    setRegistrationNumber(v.registrationNumber);
    setCapacity(v.capacity);
    setPricePerKm(v.pricePerKm);
    setBaseFare(v.baseFare);
    setDriverName(v.driverName || '');
    setLocation(v.location || '');
    setImage(v.image);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, {
        name,
        type,
        registrationNumber,
        capacity,
        pricePerKm,
        baseFare,
        driverName,
        location,
        image,
      });
    } else {
      addVehicle({
        name,
        type,
        registrationNumber,
        capacity,
        pricePerKm,
        baseFare,
        image,
        eta: '5 mins',
        status: 'available',
        driverName,
        location,
        rating: 4.9,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Fleet Vehicle Management"
        subtitle="Add, configure, and manage commercial taxis, rentals, vans, and tourist buses."
        action={
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Vehicle
          </button>
        }
      />

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold tracking-wider">
                <th className="pb-3">Vehicle Details</th>
                <th className="pb-3">Registration</th>
                <th className="pb-3">Type & Capacity</th>
                <th className="pb-3">Assigned Driver</th>
                <th className="pb-3">Current Location</th>
                <th className="pb-3">Rates</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={v.image} alt={v.name} className="w-12 h-9 rounded-lg object-cover border border-slate-800" />
                      <span className="font-bold text-white text-sm">{v.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 font-mono text-blue-400 font-bold">{v.registrationNumber}</td>
                  <td className="py-3.5 text-slate-300">{v.type} ({v.capacity} Seats)</td>
                  <td className="py-3.5 font-semibold text-slate-200">{v.driverName || 'Unassigned'}</td>
                  <td className="py-3.5 text-slate-400">{v.location || 'HQ Yard'}</td>
                  <td className="py-3.5 font-bold text-emerald-400">₹{v.pricePerKm}/km</td>
                  <td className="py-3.5"><StatusBadge status={v.status} /></td>
                  <td className="py-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(v)}
                      className="p-2 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-slate-800 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteVehicle(v.id)}
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

      {/* Add / Edit Vehicle Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVehicle ? 'Edit Vehicle Details' : 'Add New Fleet Vehicle'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Vehicle Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. RoadBuddy Cruiser Sedan"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Type Class
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as VehicleType)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Taxi">Taxi</option>
                <option value="Rental Car">Rental Car</option>
                <option value="Traveller Van">Traveller Van</option>
                <option value="Tourist Bus">Tourist Bus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 font-mono rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Capacity
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Base Fare (₹)
              </label>
              <input
                type="number"
                value={baseFare}
                onChange={(e) => setBaseFare(Number(e.target.value))}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Rate / Km (₹)
              </label>
              <input
                type="number"
                value={pricePerKm}
                onChange={(e) => setPricePerKm(Number(e.target.value))}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Assigned Driver Name
            </label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition text-sm mt-4"
          >
            {editingVehicle ? 'Update Vehicle' : 'Add Vehicle to Fleet'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
