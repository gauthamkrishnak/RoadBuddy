import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { Car, MapPin, Navigation, CheckCircle, XCircle } from 'lucide-react';

export const DriverRequestsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useApp();
  const navigate = useNavigate();

  const pendingRequests = bookings.filter((b) => b.status === 'pending');

  const handleAccept = (id: string) => {
    updateBookingStatus(id, 'accepted');
    navigate('/driver/active-trip');
  };

  const handleReject = (id: string) => {
    updateBookingStatus(id, 'cancelled');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Incoming Ride Requests"
        subtitle="Accept or decline ride requests in your immediate geographic radius."
      />

      {pendingRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingRequests.map((req) => (
            <div
              key={req.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-blue-500/50 transition"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">{req.passengerName}</h3>
                  <p className="text-xs text-slate-400 font-mono">Phone: {req.passengerPhone}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-400">₹{req.fare}</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">{req.paymentMethod}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Pickup Point</span>
                    <span className="font-semibold text-white">{req.pickup}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Destination</span>
                    <span className="font-semibold text-white">{req.destination}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between text-xs text-slate-400 font-semibold">
                <span>Distance: {req.distance}</span>
                <span>Estimated ETA: {req.eta}</span>
              </div>

              <div className="pt-4 border-t border-slate-800 flex gap-3">
                <button
                  onClick={() => handleAccept(req.id)}
                  className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
                >
                  <CheckCircle className="w-4 h-4" /> Accept Ride
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="py-3.5 px-6 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 font-bold rounded-2xl transition text-sm flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Car}
          title="No Ride Requests"
          description="There are currently no active ride requests in your area. Keep your status online to receive dispatch alerts."
        />
      )}
    </div>
  );
};
