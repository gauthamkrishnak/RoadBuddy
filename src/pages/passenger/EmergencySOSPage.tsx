import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Modal } from '../../components/common/Modal';
import { AlertTriangle, ShieldAlert, PhoneCall, Radio, CheckCircle2, MapPin, XCircle } from 'lucide-react';
import { EmergencyAlert } from '../../types';

export const EmergencySOSPage: React.FC = () => {
  const { emergencies, triggerEmergency, cancelEmergency } = useApp();

  const [activeAlert, setActiveAlert] = useState<EmergencyAlert | null>(
    emergencies.find((e) => e.status !== 'Cancelled' && e.status !== 'Resolved') || null
  );

  const [selectedType, setSelectedType] = useState<EmergencyAlert['type'] | null>(null);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const handleSosClick = () => {
    setSelectedType('Ambulance');
  };

  const handleConfirmTrigger = (type: EmergencyAlert['type']) => {
    const alert = triggerEmergency(type, 'NH 544 Near Aluva Flyover, Kochi');
    setActiveAlert(alert);
    setSelectedType(null);
  };

  const handleCancelClick = () => {
    setShowConfirmCancel(true);
  };

  const handleConfirmCancelEmergency = () => {
    if (activeAlert) {
      cancelEmergency(activeAlert.id);
      setActiveAlert(null);
    }
    setShowConfirmCancel(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="24/7 Emergency SOS Assistance"
        subtitle="One-tap dispatch for Police, Ambulance, and Fire Rescue with live telemetry broadcasting."
      />

      {/* If No Active Emergency: Show Large Glowing SOS Button Screen */}
      {!activeAlert ? (
        <div className="glass-panel border border-rose-500/30 p-8 sm:p-12 text-center shadow-2xl space-y-8 relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-4 py-1.5 rounded-full border border-rose-500/20 shadow-sm">
              Immediate Danger & Safety Patrol
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Emergency Assistance</h2>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">
              Press the SOS button below to instantly broadcast your live GPS coordinates to emergency services and emergency contacts.
            </p>
          </div>

          {/* Giant SOS Button */}
          <div className="py-6 flex justify-center">
            <button
              onClick={handleSosClick}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 text-white font-black text-4xl sm:text-5xl shadow-glow-sos hover:scale-105 transition-all duration-300 animate-sos flex flex-col items-center justify-center border-4 border-white/20"
            >
              <AlertTriangle className="w-14 h-14 mb-2 animate-bounce" />
              <span>SOS</span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest mt-1 opacity-90">Press to Trigger</span>
            </button>
          </div>

          {/* Emergency Options Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
            {[
              { type: 'Ambulance', icon: '🚑', label: 'Ambulance' },
              { type: 'Police', icon: '👮', label: 'Police Patrol' },
              { type: 'Fire & Rescue', icon: '🚒', label: 'Fire & Rescue' },
              { type: 'Other Emergency', icon: '⚠', label: 'Other Emergency' },
            ].map((opt) => (
              <button
                key={opt.type}
                onClick={() => handleConfirmTrigger(opt.type as any)}
                className="bg-[#080c14]/90 border border-slate-800/80 hover:border-rose-500/60 p-4 rounded-2xl text-center transition-all duration-200 hover:-translate-y-1 shadow-lg"
              >
                <span className="text-3xl block mb-2 group-hover:scale-110 transition">{opt.icon}</span>
                <span className="text-xs font-extrabold text-white block">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Active Emergency Screen */
        <div className="bg-rose-950/30 backdrop-blur-xl border-2 border-rose-500/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-rose-500/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/50 animate-ping">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Active Emergency Triggered
                </span>
                <h3 className="text-2xl font-black text-white">{activeAlert.type} Dispatched</h3>
              </div>
            </div>

            <div className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span> Live GPS Transmitting
            </div>
          </div>

          {/* Animated Status Indicator */}
          <div className="p-4 bg-slate-950/80 border border-rose-500/30 rounded-2xl text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-rose-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="animate-pulse">Emergency services notified & dispatched!</span>
            </div>
            <p className="text-xs text-slate-300">
              Responder Unit: <span className="font-bold text-white">{activeAlert.assignedResponder}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block font-medium">Broadcasted Location</span>
              <p className="font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" /> {activeAlert.location}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block font-medium">Emergency Contacts Alerted</span>
              <p className="font-bold text-emerald-400">Anjali Sharma (+91 98950 12345), Rajesh Kumar</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:112"
              className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-xl transition flex items-center justify-center gap-2 text-sm"
            >
              <PhoneCall className="w-5 h-5" /> Direct Call Emergency 112
            </a>
            <button
              onClick={handleCancelClick}
              className="py-3.5 px-6 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl transition text-sm flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5 text-slate-400" /> Cancel Emergency
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog Modal for Cancel */}
      <Modal
        isOpen={showConfirmCancel}
        onClose={() => setShowConfirmCancel(false)}
        title="Cancel Emergency SOS?"
      >
        <div className="space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-300">
            Are you sure you want to cancel the active emergency alert? Emergency response units will be stood down.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleConfirmCancelEmergency}
              className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg transition text-sm"
            >
              Yes, Cancel Alert
            </button>
            <button
              onClick={() => setShowConfirmCancel(false)}
              className="flex-1 py-3 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-sm font-semibold transition"
            >
              Keep Emergency Active
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
