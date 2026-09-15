import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Car, ShieldCheck, Compass } from 'lucide-react';

interface SimulatedMapProps {
  pickup?: string;
  destination?: string;
  driverName?: string;
  vehicleNumber?: string;
  eta?: string;
  isMoving?: boolean;
}

export const SimulatedMap: React.FC<SimulatedMapProps> = ({
  pickup = 'InfoPark, Kakkanad, Kochi',
  destination = 'Cochin International Airport (COK)',
  driverName = 'Rahul Verma',
  vehicleNumber = 'KL 01 BT 8890',
  eta = '14 mins',
  isMoving = true,
}) => {
  const [carProgress, setCarProgress] = useState(25);

  useEffect(() => {
    if (!isMoving) return;
    const interval = setInterval(() => {
      setCarProgress((prev) => (prev >= 85 ? 20 : prev + 1.5));
    }, 400);
    return () => clearInterval(interval);
  }, [isMoving]);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] bg-[#070b12] border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl bg-grid-pattern">
      {/* Top Map Status Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3">
        <div className="bg-[#080c14]/90 border border-slate-800/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Live GPS Tracking</span>
            <p className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Route Verified • Safe Trip
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 border border-indigo-400/30 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center gap-2">
          <Navigation className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-extrabold text-white tracking-wide">ETA: {eta}</span>
        </div>
      </div>

      {/* Map Simulated Graphic elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-full stroke-indigo-500/30" style={{ filter: 'drop-shadow(0 0 12px rgba(99,102,241,0.4))' }}>
          {/* Main Highway line */}
          <path
            d="M 80 340 C 200 280, 350 380, 500 240 C 650 100, 800 200, 950 150"
            fill="none"
            strokeWidth="6"
            strokeDasharray="10 6"
            className="animate-pulse"
          />
          {/* Active completed route */}
          <path
            d="M 80 340 C 200 280, 350 380, 500 240 C 650 100, 800 200, 950 150"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="8"
            strokeDasharray="1000"
            strokeDashoffset={1000 - carProgress * 10}
          />
          <defs>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Pickup Marker */}
        <div className="absolute left-[10%] bottom-[25%] z-10 flex flex-col items-center">
          <div className="bg-emerald-500/20 p-2 rounded-full border border-emerald-500/40 animate-pulse-ring">
            <div className="bg-emerald-500 p-2 rounded-full text-slate-950 shadow-lg">
              <MapPin className="w-5 h-5 fill-slate-950 text-emerald-500" />
            </div>
          </div>
          <div className="mt-1 bg-[#080c14]/90 border border-slate-800 text-[11px] px-2.5 py-1 rounded-xl text-emerald-400 font-bold shadow-lg max-w-[160px] truncate">
            {pickup}
          </div>
        </div>

        {/* Moving Vehicle Marker */}
        <div
          className="absolute z-30 transition-all duration-300 ease-linear flex flex-col items-center"
          style={{
            left: `${carProgress}%`,
            top: `${55 - carProgress * 0.35}%`,
          }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-md animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-2xl border-2 border-cyan-300 flex items-center justify-center transform -rotate-12">
              <Car className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-1.5 bg-[#0b1222] border border-indigo-500/50 px-2.5 py-1 rounded-xl text-center shadow-xl">
            <span className="text-[10px] font-extrabold text-white block">{driverName}</span>
            <span className="text-[9px] font-mono text-cyan-400 font-bold block">{vehicleNumber}</span>
          </div>
        </div>

        {/* Destination Marker */}
        <div className="absolute right-[8%] top-[25%] z-10 flex flex-col items-center">
          <div className="bg-rose-500/20 p-2 rounded-full border border-rose-500/40 animate-pulse-ring">
            <div className="bg-rose-500 p-2 rounded-full text-white shadow-lg">
              <Navigation className="w-5 h-5 fill-white text-rose-500" />
            </div>
          </div>
          <div className="mt-1 bg-[#080c14]/90 border border-slate-800 text-[11px] px-2.5 py-1 rounded-xl text-rose-400 font-bold shadow-lg max-w-[160px] truncate">
            {destination}
          </div>
        </div>
      </div>

      {/* Bottom Map Controls / Compass overlay */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        <div className="bg-[#080c14]/90 border border-slate-800 p-2.5 rounded-2xl text-slate-400 shadow-xl">
          <Compass className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
      </div>
    </div>
  );
};
