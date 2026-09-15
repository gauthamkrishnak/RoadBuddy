import React from 'react';
import { Vehicle } from '../../types';
import { Users, Clock, Star, CheckCircle } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected?: boolean;
  onSelect?: (vehicle: Vehicle) => void;
  estimatedFare?: number;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isSelected,
  onSelect,
  estimatedFare,
}) => {
  return (
    <div
      onClick={() => onSelect && onSelect(vehicle)}
      className={`relative border rounded-2xl p-4 transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? 'bg-gradient-to-r from-indigo-950/60 to-blue-950/40 border-indigo-500 shadow-xl shadow-indigo-500/15 ring-1 ring-indigo-500'
          : 'glass-card-hover'
      }`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 text-indigo-400 bg-indigo-500/10 p-1 rounded-full border border-indigo-500/30">
          <CheckCircle className="w-5 h-5 fill-indigo-500 text-white" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full sm:w-36 h-24 object-cover rounded-xl border border-slate-800/80 shadow-md"
        />
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              {vehicle.type}
            </span>
            {vehicle.rating && (
              <span className="flex items-center text-xs font-bold text-amber-400 gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {vehicle.rating}
              </span>
            )}
          </div>

          <h4 className="text-base font-extrabold text-white mt-2">{vehicle.name}</h4>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" /> Up to {vehicle.capacity} seats
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> {vehicle.eta} away
            </span>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium">Rate: ₹{vehicle.pricePerKm}/km</span>
            <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              ₹{estimatedFare ? estimatedFare : vehicle.baseFare}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
