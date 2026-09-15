import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SimulatedMap } from '../../components/common/SimulatedMap';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Phone, MessageSquare, ShieldAlert, Star, Navigation, MapPin, CheckCircle } from 'lucide-react';

export const LiveTrackingPage: React.FC = () => {
  const { bookings } = useApp();
  const navigate = useNavigate();

  const currentTrip = bookings.find(
    (b) => b.status === 'in_progress' || b.status === 'accepted'
  ) || bookings[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Live Location Tracking"
        subtitle="Real-time GPS telemetry and driver movement simulation."
        action={
          <button
            onClick={() => navigate('/passenger/emergency')}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 transition flex items-center gap-1.5 animate-pulse"
          >
            <ShieldAlert className="w-4 h-4" /> Trigger Emergency SOS
          </button>
        }
      />

      {/* Main Simulated Map Container */}
      <SimulatedMap
        pickup={currentTrip.pickup}
        destination={currentTrip.destination}
        driverName={currentTrip.driverName || 'Rahul Verma'}
        vehicleNumber={currentTrip.vehicleNumber || 'KL 01 BT 8890'}
        eta={currentTrip.eta || '14 mins'}
        isMoving={true}
      />

      {/* Driver Card & Trip Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Driver Details Card */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <img
                src={
                  currentTrip.driverPhoto ||
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
                }
                alt={currentTrip.driverName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-lg"
              />
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {currentTrip.driverName || 'Rahul Verma'}
                  <span className="flex items-center text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" /> {currentTrip.driverRating || 4.92}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {currentTrip.vehicleName} • <span className="font-mono text-blue-400 font-bold">{currentTrip.vehicleNumber || 'KL 01 BT 8890'}</span>
                </p>
              </div>
            </div>

            <StatusBadge status={currentTrip.status || 'in_progress'} />
          </div>

          {/* Quick Contact Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={`tel:${currentTrip.driverPhone || '+919847011223'}`}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Phone className="w-4 h-4" /> Call Driver
            </a>
            <button
              onClick={() => navigate('/passenger/ai-assistant')}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" /> Chat with AI
            </button>
          </div>
        </div>

        {/* Trip Stats */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Trip Telemetry</h4>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Estimated Arrival:</span>
              <span className="font-bold text-emerald-400 text-base">{currentTrip.eta || '14 mins'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Distance Remaining:</span>
              <span className="font-bold text-white">{currentTrip.distance || '28.4 km'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Trip Fare:</span>
              <span className="font-bold text-blue-400 text-base">₹{currentTrip.fare || 850}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>GPS coordinates refreshed 2s ago.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
