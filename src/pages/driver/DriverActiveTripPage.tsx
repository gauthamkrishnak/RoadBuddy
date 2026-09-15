import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { SimulatedMap } from '../../components/common/SimulatedMap';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Phone, CheckCircle, Navigation, MapPin, ShieldAlert, ArrowRight } from 'lucide-react';
import { BookingStatus } from '../../types';

export const DriverActiveTripPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useApp();
  const navigate = useNavigate();

  const activeTrip = bookings.find(
    (b) => b.status === 'accepted' || b.status === 'arrived' || b.status === 'in_progress'
  ) || bookings[0];

  const handleNextStage = () => {
    if (!activeTrip) return;
    if (activeTrip.status === 'accepted') {
      updateBookingStatus(activeTrip.id, 'arrived');
    } else if (activeTrip.status === 'arrived') {
      updateBookingStatus(activeTrip.id, 'in_progress');
    } else if (activeTrip.status === 'in_progress') {
      updateBookingStatus(activeTrip.id, 'completed');
      navigate('/driver/dashboard');
    }
  };

  const getStageButtonText = (status: BookingStatus) => {
    switch (status) {
      case 'accepted':
        return 'Mark "Arrived at Pickup"';
      case 'arrived':
        return 'Start Trip (OTP Verified)';
      case 'in_progress':
        return 'Complete Trip & Collect Payment';
      default:
        return 'Trip Completed';
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Active Passenger Trip"
        subtitle="Manage live navigation stages, passenger pickup, and trip completion."
      />

      {/* Simulated Map Visual */}
      <SimulatedMap
        pickup={activeTrip?.pickup}
        destination={activeTrip?.destination}
        driverName="Rahul Verma (You)"
        vehicleNumber={activeTrip?.vehicleNumber || 'KL 01 BT 8890'}
        eta={activeTrip?.eta || '12 mins'}
      />

      {/* Trip Workflow Steps Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Trip Stage</span>
            <h3 className="text-xl font-bold text-white mt-1 font-mono">Trip ID: {activeTrip?.id}</h3>
          </div>
          <StatusBadge status={activeTrip?.status || 'accepted'} />
        </div>

        {/* 4-Step Progress indicator */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
          <div className={`p-3 rounded-xl border ${activeTrip?.status === 'accepted' ? 'bg-blue-600 border-blue-500 text-white shadow' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
            1. Navigate
          </div>
          <div className={`p-3 rounded-xl border ${activeTrip?.status === 'arrived' ? 'bg-blue-600 border-blue-500 text-white shadow' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
            2. Arrived
          </div>
          <div className={`p-3 rounded-xl border ${activeTrip?.status === 'in_progress' ? 'bg-blue-600 border-blue-500 text-white shadow' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
            3. In Progress
          </div>
          <div className={`p-3 rounded-xl border ${activeTrip?.status === 'completed' ? 'bg-emerald-600 border-emerald-500 text-white shadow' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
            4. Complete
          </div>
        </div>

        {/* Passenger details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-sm">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Passenger Name & Phone</span>
            <p className="font-bold text-white text-base">{activeTrip?.passengerName}</p>
            <p className="text-xs text-blue-400 font-mono mt-0.5">{activeTrip?.passengerPhone}</p>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Fare & Payment</span>
            <p className="font-bold text-emerald-400 text-base">₹{activeTrip?.fare}</p>
            <p className="text-xs text-slate-300 font-semibold uppercase">{activeTrip?.paymentMethod} ({activeTrip?.paymentStatus})</p>
          </div>
        </div>

        {/* Workflow Advance Button */}
        <div className="flex gap-4">
          <button
            onClick={handleNextStage}
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl shadow-xl shadow-blue-600/30 transition flex items-center justify-center gap-2 text-base"
          >
            {getStageButtonText(activeTrip?.status || 'accepted')} <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href={`tel:${activeTrip?.passengerPhone}`}
            className="py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition flex items-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4" /> Call Passenger
          </a>
        </div>
      </div>
    </div>
  );
};
