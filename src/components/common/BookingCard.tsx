import React from 'react';
import { Booking } from '../../types';
import { StatusBadge } from './StatusBadge';
import { MapPin, Navigation, Calendar, Clock, Car, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
  const navigate = useNavigate();

  return (
    <div className="glass-card-hover p-5 border border-slate-800/80 rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-sm">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-base">{booking.vehicleName}</h4>
            <p className="text-xs text-slate-400 font-mono">ID: {booking.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={booking.status} />
          <span className="font-extrabold text-lg text-emerald-400">₹{booking.fare}</span>
        </div>
      </div>

      <div className="py-4 space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Pickup</span>
            <p className="text-sm font-semibold text-slate-200">{booking.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Navigation className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Destination</span>
            <p className="text-sm font-semibold text-slate-200">{booking.destination}</p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {booking.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-400" /> {booking.time}
          </span>
          {booking.distance && <span className="text-slate-400">{booking.distance}</span>}
        </div>

        <div className="flex items-center gap-2">
          {booking.status === 'in_progress' || booking.status === 'accepted' ? (
            <button
              onClick={() => navigate('/passenger/tracking')}
              className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold flex items-center gap-1 transition text-xs shadow-md shadow-indigo-600/20"
            >
              Track Live <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : null}

          {booking.status === 'pending' && onCancel && (
            <button
              onClick={() => onCancel(booking.id)}
              className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl font-bold transition text-xs"
            >
              Cancel Ride
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
