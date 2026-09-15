import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { RoadsideServiceType, RoadsideRequest } from '../../types';
import { Wrench, Truck, Fuel, Disc, BatteryCharging, MapPin, CheckCircle, Clock, Phone } from 'lucide-react';

export const RoadsideAssistancePage: React.FC = () => {
  const { roadsideRequests, createRoadsideRequest, cancelRoadsideRequest } = useApp();

  const [selectedService, setSelectedService] = useState<RoadsideServiceType>('Flat Tyre');
  const [location, setLocation] = useState('Kalamassery Toll Plaza, Kochi');
  const [description, setDescription] = useState('Rear right tyre punctured. Spare wheel available in boot.');
  const [isSearching, setIsSearching] = useState(false);
  const [activeRequest, setActiveRequest] = useState<RoadsideRequest | null>(
    roadsideRequests.find((r) => r.status !== 'cancelled' && r.status !== 'completed') || null
  );

  const services = [
    { type: 'Towing' as RoadsideServiceType, icon: Truck, label: 'Towing Service', desc: 'Flatbed or wheel-lift tow truck' },
    { type: 'Fuel Delivery' as RoadsideServiceType, icon: Fuel, label: 'Fuel Delivery', desc: '5L Petrol/Diesel delivered' },
    { type: 'Flat Tyre' as RoadsideServiceType, icon: Disc, label: 'Flat Tyre Repair', desc: 'Puncture repair or spare swap' },
    { type: 'Battery Support' as RoadsideServiceType, icon: BatteryCharging, label: 'Battery Jumpstart', desc: 'Battery jump or replacement' },
    { type: 'Mechanical Repair' as RoadsideServiceType, icon: Wrench, label: 'Mechanical Repair', desc: 'On-site mobile mechanic' },
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      const req = createRoadsideRequest(selectedService, location, description);
      setActiveRequest(req);
      setIsSearching(false);
    }, 1800);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Roadside Assistance"
        subtitle="24/7 breakdown dispatch for flat tyres, towing, fuel, battery support, and mechanical repair."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Service Selection & Request Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Cards */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Select Assistance Service</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((s) => {
                const Icon = s.icon;
                const isSelected = selectedService === s.type;
                return (
                  <button
                    key={s.type}
                    type="button"
                    onClick={() => setSelectedService(s.type)}
                    className={`p-4 rounded-2xl border text-left transition duration-200 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-amber-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm">{s.label}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-tight">{s.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Request Breakdown Dispatch</h3>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Current Breakdown Location
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Issue Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl shadow-xl transition flex items-center justify-center gap-2 text-base"
              >
                {isSearching ? 'Finding Nearby Providers...' : `Request ${selectedService}`}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Active Provider Assignment Telemetry */}
        <div className="space-y-6">
          {activeRequest ? (
            <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Assistance Dispatched
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">{activeRequest.id}</span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Assigned Provider</span>
                  <p className="font-bold text-white text-base">{activeRequest.providerName}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Estimated Arrival:</span>
                  <span className="font-bold text-emerald-400 text-base">{activeRequest.eta}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Standard Service Fee:</span>
                  <span className="font-bold text-amber-400 text-base">₹{activeRequest.cost}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${activeRequest.providerPhone}`}
                  className="py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4" /> Call Provider Mechanic
                </a>
                <button
                  onClick={() => {
                    cancelRoadsideRequest(activeRequest.id);
                    setActiveRequest(null);
                  }}
                  className="py-2 text-xs text-rose-400 hover:underline font-semibold text-center"
                >
                  Cancel Assistance Request
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-base">No Active Breakdown Requests</h4>
              <p className="text-xs text-slate-400">Select a service on the left to dispatch an emergency mechanic unit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
