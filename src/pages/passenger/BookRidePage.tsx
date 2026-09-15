import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Vehicle, VehicleType, Booking } from '../../types';
import { VehicleCard } from '../../components/common/VehicleCard';
import { PageHeader } from '../../components/common/PageHeader';
import { Modal } from '../../components/common/Modal';
import { MapPin, Navigation, Car, Clock, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export const BookRidePage: React.FC = () => {
  const { vehicles, addBooking } = useApp();
  const navigate = useNavigate();

  const [pickup, setPickup] = useState('InfoPark, Kakkanad, Kochi');
  const [destination, setDestination] = useState('Cochin International Airport (COK)');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehicles[1] || vehicles[0]);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Wallet' | 'Cash'>('UPI');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickDestinations = [
    'Cochin International Airport (COK)',
    'Munnar Tea Gardens, Idukki',
    'Marine Drive, Kochi',
    'Swaraj Round, Thrissur',
    'Lulu Mall, Edappally',
    'MG Road, Bangalore'
  ];

  // Simple price multiplier mock logic
  const calculatedFare = selectedVehicle.baseFare + Math.round(selectedVehicle.pricePerKm * 28);
  const estimatedDistance = '28.4 km';
  const estimatedEta = selectedVehicle.eta || '12 mins';

  const handleConfirmBooking = () => {
    const booking = addBooking({
      passengerId: 'usr_1',
      passengerName: 'Gautham S.',
      passengerPhone: '+91 98765 43210',
      pickup,
      destination,
      vehicleType: selectedVehicle.type,
      vehicleName: selectedVehicle.name,
      fare: calculatedFare,
      distance: estimatedDistance,
      eta: estimatedEta,
      paymentMethod,
    });

    setConfirmedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Book Your Ride"
        subtitle="Choose your pickup, destination, and vehicle class with instant fair pricing."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Route Inputs & Vehicle Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pickup & Destination Inputs */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Trip Route Details</h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Pickup Location
              </label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Destination Location
              </label>
              <div className="relative">
                <Navigation className="w-5 h-5 text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            {/* Quick Destination Pills */}
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-2">Popular Destinations:</span>
              <div className="flex flex-wrap gap-2">
                {quickDestinations.map((dest, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDestination(dest)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Vehicle Selection Cards */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-400" /> Select Vehicle Type
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {vehicles.map((v) => {
                const fare = v.baseFare + Math.round(v.pricePerKm * 28);
                return (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    isSelected={selectedVehicle.id === v.id}
                    onSelect={(selected) => setSelectedVehicle(selected)}
                    estimatedFare={fare}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Booking Summary & Confirmation */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl sticky top-24 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">
              Booking Summary
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">Pickup</span>
                  <span className="font-semibold text-white">{pickup}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">Destination</span>
                  <span className="font-semibold text-white">{destination}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Estimated Distance</span>
                <span className="font-bold text-white">{estimatedDistance}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Estimated Arrival</span>
                <span className="font-bold text-emerald-400">{estimatedEta}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Selected Vehicle</span>
                <span className="font-bold text-white">{selectedVehicle.name}</span>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['UPI', 'Credit/Debit Card', 'Wallet', 'Cash'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                        paymentMethod === m
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Fare */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Total Fare (Inclusive Tax)</span>
                  <span className="text-2xl font-black text-emerald-400">₹{calculatedFare}</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full font-bold">
                  GUARANTEED FARE
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition flex items-center justify-center gap-2 text-base"
            >
              Confirm Booking <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Booking Confirmed! 🎉"
        >
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Ride Requested Successfully</h3>
              <p className="text-xs text-slate-400 mt-1">Booking ID: <span className="font-mono text-blue-400 font-bold">{confirmedBooking.id}</span></p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-left text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Driver:</span>
                <span className="font-bold text-white">{confirmedBooking.driverName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle Number:</span>
                <span className="font-mono text-blue-400 font-bold">{confirmedBooking.vehicleNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Fare:</span>
                <span className="font-bold text-emerald-400">₹{confirmedBooking.fare} ({confirmedBooking.paymentMethod})</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  navigate('/passenger/tracking');
                }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition text-sm"
              >
                Go to Live Tracking
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  navigate('/passenger/dashboard');
                }}
                className="py-3 px-4 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-sm font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
