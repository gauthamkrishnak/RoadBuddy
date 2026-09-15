import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { BookingCard } from '../../components/common/BookingCard';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';
import { Calendar, Plus, Clock, Repeat, MapPin, Navigation } from 'lucide-react';

export const ScheduledRidesPage: React.FC = () => {
  const { bookings, addBooking, cancelBooking } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recurring' | 'completed'>('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [pickup, setPickup] = useState('Marine Drive, Kochi');
  const [destination, setDestination] = useState('Munnar Tea Gardens, Idukki');
  const [date, setDate] = useState('2026-09-05');
  const [time, setTime] = useState('07:00 AM');
  const [vehicleType, setVehicleType] = useState<'Taxi' | 'Rental Car' | 'Traveller Van' | 'Tourist Bus'>('Traveller Van');
  const [frequency, setFrequency] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      passengerId: 'usr_1',
      passengerName: 'Gautham S.',
      passengerPhone: '+91 98765 43210',
      pickup,
      destination,
      vehicleType,
      vehicleName: vehicleType === 'Traveller Van' ? 'Force Traveller Van Deluxe' : 'RoadBuddy Sedan Premier',
      fare: vehicleType === 'Traveller Van' ? 5400 : 1850,
      distance: '128 km',
      eta: 'Scheduled',
      paymentMethod: 'UPI',
      isScheduled: true,
      recurringFrequency: frequency,
    });
    setIsModalOpen(false);
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'upcoming') return b.isScheduled && b.status !== 'cancelled' && b.status !== 'completed';
    if (activeTab === 'recurring') return b.recurringFrequency && b.recurringFrequency !== 'none';
    if (activeTab === 'completed') return b.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Scheduled & Recurring Rides"
        subtitle="Pre-book long-distance trips, daily commutes, and tourist vans with ease."
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Schedule New Ride
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-sm font-bold">
        {[
          { id: 'upcoming', label: 'Upcoming Scheduled' },
          { id: 'recurring', label: 'Recurring Commutes' },
          { id: 'completed', label: 'Completed History' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 transition relative ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ride Cards list */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((b) => (
            <BookingCard key={b.id} booking={b} onCancel={cancelBooking} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Calendar}
          title="No Scheduled Rides Found"
          description="Schedule a ride for an upcoming holiday trip or set up recurring daily commutes."
          actionLabel="Schedule Ride Now"
          onAction={() => setIsModalOpen(true)}
        />
      )}

      {/* New Schedule Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule a New Journey"
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Destination Location
            </label>
            <div className="relative">
              <Navigation className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                placeholder="07:00 AM"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Vehicle Class
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Taxi">Taxi (4 Seats)</option>
                <option value="Rental Car">Rental Car (4-5 Seats)</option>
                <option value="Traveller Van">Traveller Van (12 Seats)</option>
                <option value="Tourist Bus">Tourist Bus (45 Seats)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Recurring Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="none">One-Time Only</option>
                <option value="daily">Daily Commute</option>
                <option value="weekly">Weekly Trip</option>
                <option value="monthly">Monthly Service</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition text-sm mt-4"
          >
            Confirm Schedule
          </button>
        </form>
      </Modal>
    </div>
  );
};
