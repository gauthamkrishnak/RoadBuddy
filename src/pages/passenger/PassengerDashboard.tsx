import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { BookingCard } from '../../components/common/BookingCard';
import { VehicleCard } from '../../components/common/VehicleCard';
import { PageHeader } from '../../components/common/PageHeader';
import {
  Car,
  Bot,
  AlertTriangle,
  Wrench,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const PassengerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { bookings, vehicles, roadsideRequests } = useApp();
  const navigate = useNavigate();

  const activeBooking = bookings.find(
    (b) => b.status === 'in_progress' || b.status === 'accepted'
  );
  const scheduledRides = bookings.filter((b) => b.isScheduled || b.status === 'pending');
  const recentCompleted = bookings.filter((b) => b.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-[#0f172a] to-blue-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 mb-3 inline-block shadow-sm">
              Passenger Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Good Morning, {user?.name?.split(' ')[0] || 'Gautham'} 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1 flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              Current Location: <span className="font-bold text-white">InfoPark, Kakkanad, Kochi</span>
            </p>
          </div>

          <button
            onClick={() => navigate('/passenger/book-ride')}
            className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/30 transition border border-indigo-400/30 flex items-center gap-2 text-sm shrink-0"
          >
            <Car className="w-5 h-5 text-cyan-300" /> Book Ride Now
          </button>
        </div>
      </div>

      {/* Quick Action Grid Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => navigate('/passenger/book-ride')}
          className="glass-card-hover p-5 text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Car className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-white text-base">🚗 Book Ride</h4>
          <p className="text-xs text-slate-400 mt-1 font-medium">Taxi, Rental, Van or Bus</p>
        </button>

        <button
          onClick={() => navigate('/passenger/ai-assistant')}
          className="glass-card-hover p-5 text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-white text-base">🤖 Ask AI</h4>
          <p className="text-xs text-slate-400 mt-1 font-medium">Smart travel recommendations</p>
        </button>

        <button
          onClick={() => navigate('/passenger/emergency')}
          className="glass-card-hover p-5 text-left group border-rose-500/20 hover:border-rose-500/50"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 animate-pulse shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-white text-base text-rose-400">🆘 Emergency SOS</h4>
          <p className="text-xs text-slate-400 mt-1 font-medium">One-tap 24/7 emergency help</p>
        </button>

        <button
          onClick={() => navigate('/passenger/roadside')}
          className="glass-card-hover p-5 text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Wrench className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base">🔧 Roadside Help</h4>
          <p className="text-xs text-slate-400 mt-1">Towing, Tyre, Fuel delivery</p>
        </button>
      </div>

      {/* Active Trip Banner */}
      {activeBooking && (
        <div className="bg-blue-950/40 border border-blue-500/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              Active Trip in Progress
            </span>
            <button
              onClick={() => navigate('/passenger/tracking')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              Live Tracking Screen <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <BookingCard booking={activeBooking} />
        </div>
      )}

      {/* Grid Content: Nearby Vehicles & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Nearby Vehicles */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-400" /> Nearby Vehicles Available
            </h3>
            <button
              onClick={() => navigate('/passenger/book-ride')}
              className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
            >
              View All Vehicles <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {vehicles.slice(0, 3).map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                onSelect={() => navigate('/passenger/book-ride')}
              />
            ))}
          </div>
        </div>

        {/* Scheduled & History Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> Upcoming Rides
              </h3>
              <button
                onClick={() => navigate('/passenger/scheduled-rides')}
                className="text-xs font-bold text-blue-400 hover:underline"
              >
                Manage
              </button>
            </div>

            {scheduledRides.length > 0 ? (
              <div className="space-y-3">
                {scheduledRides.slice(0, 2).map((r) => (
                  <div key={r.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                    <p className="text-xs font-bold text-white">{r.vehicleName}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-1">To: {r.destination}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-mono">
                      <span>{r.date} • {r.time}</span>
                      <span className="text-emerald-400 font-bold">₹{r.fare}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No scheduled rides.</p>
            )}
          </div>

          {/* Quick Safety info */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <h4 className="font-bold text-white text-sm">RoadBuddy Safety Guarantee</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every driver is background-verified. All rides include emergency audio monitoring and live GPS sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
