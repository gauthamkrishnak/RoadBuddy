import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DollarSign, Car, Star, Navigation, MapPin, ChevronRight, Power, CheckCircle2 } from 'lucide-react';

export const DriverDashboard: React.FC = () => {
  const { user } = useAuth();
  const { driverStats, toggleDriverOnline, bookings, updateBookingStatus } = useApp();
  const navigate = useNavigate();

  const activeTrip = bookings.find((b) => b.status === 'accepted' || b.status === 'in_progress');
  const pendingRequests = bookings.filter((b) => b.status === 'pending');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3 inline-block">
            Driver Partner Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {user?.name || 'Rahul Verma'} 👋
          </h1>
          <p className="text-slate-300 text-sm mt-1">Vehicle: <span className="font-bold text-white font-mono">KL 01 BT 8890</span> (RoadBuddy Sedan Premier)</p>
        </div>

        {/* Online / Offline Toggle Button */}
        <button
          onClick={toggleDriverOnline}
          className={`px-6 py-3.5 rounded-2xl font-extrabold text-sm transition shadow-xl flex items-center gap-2 ${
            driverStats.isOnline
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
          }`}
        >
          <Power className="w-5 h-5" />
          <span>{driverStats.isOnline ? 'ONLINE & RECEIVING' : 'OFFLINE'}</span>
        </button>
      </div>

      {/* Driver Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Earnings"
          value={`₹${driverStats.todayEarnings.toLocaleString()}`}
          change="18%"
          isPositive={true}
          icon={DollarSign}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-400"
        />
        <StatCard
          title="Completed Trips Today"
          value={`${driverStats.completedTrips} Trips`}
          icon={Car}
        />
        <StatCard
          title="Driver Rating"
          value={`${driverStats.rating} ★`}
          icon={Star}
          iconBgColor="bg-amber-500/10"
          iconTextColor="text-amber-400"
        />
        <StatCard
          title="Acceptance Rate"
          value="98.5%"
          isPositive={true}
          icon={CheckCircle2}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-400"
        />
      </div>

      {/* Active Trip Banner if any */}
      {activeTrip && (
        <div className="bg-blue-950/40 border border-blue-500/50 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span> Active Trip in Progress
            </span>
            <h3 className="text-lg font-bold text-white">Passenger: {activeTrip.passengerName}</h3>
            <p className="text-xs text-slate-300">Pickup: {activeTrip.pickup} ➔ Drop: {activeTrip.destination}</p>
          </div>

          <button
            onClick={() => navigate('/driver/active-trip')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg transition text-sm flex items-center gap-1.5 shrink-0"
          >
            Manage Active Trip <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Incoming Requests & Recent Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Incoming Requests */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-400" /> Incoming Ride Requests ({pendingRequests.length})
            </h3>
            <button
              onClick={() => navigate('/driver/requests')}
              className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
            >
              View Requests Portal <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <div key={req.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="font-bold text-white text-base">{req.passengerName}</h4>
                      <p className="text-xs text-slate-400">{req.vehicleType} • {req.distance}</p>
                    </div>
                    <span className="text-xl font-bold text-emerald-400">₹{req.fare}</span>
                  </div>

                  <div className="py-3 space-y-2 text-xs">
                    <p className="text-slate-300 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> From: <span className="font-semibold text-white">{req.pickup}</span>
                    </p>
                    <p className="text-slate-300 flex items-center gap-2">
                      <Navigation className="w-3.5 h-3.5 text-blue-400 shrink-0" /> To: <span className="font-semibold text-white">{req.destination}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex gap-3">
                    <button
                      onClick={() => {
                        updateBookingStatus(req.id, 'accepted');
                        navigate('/driver/active-trip');
                      }}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition"
                    >
                      Accept Ride
                    </button>
                    <button
                      onClick={() => updateBookingStatus(req.id, 'cancelled')}
                      className="py-2.5 px-4 bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-8 text-center bg-slate-900 border border-slate-800 rounded-2xl">
              No new pending ride requests right now. Stay online!
            </p>
          )}
        </div>

        {/* Quick Driver Tools */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h4 className="font-bold text-white text-base">Quick Driver Actions</h4>
            <div className="space-y-2 text-xs font-semibold">
              <button
                onClick={() => navigate('/driver/requests')}
                className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 transition flex items-center justify-between"
              >
                <span>View Ride Requests</span> <ChevronRight className="w-4 h-4 text-blue-400" />
              </button>
              <button
                onClick={() => navigate('/driver/earnings')}
                className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 transition flex items-center justify-between"
              >
                <span>Earnings & Payout Analytics</span> <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
              <button
                onClick={() => navigate('/driver/profile')}
                className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 transition flex items-center justify-between"
              >
                <span>Driver Profile & Documents</span> <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
