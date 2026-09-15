import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { User, Phone, Mail, Car, ShieldCheck, Star, Award, FileText } from 'lucide-react';

export const DriverProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Driver Partner Profile"
        subtitle="View vehicle registration, partner ratings, and compliance documents."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            alt="Driver"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-xl mx-auto"
          />
          <div>
            <h3 className="text-xl font-bold text-white">{user?.name || 'Rahul Verma'}</h3>
            <p className="text-xs text-slate-400 font-mono">Driver Partner ID: DRV-9041</p>
          </div>

          <div className="flex justify-center gap-3">
            <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
              <Star className="w-4 h-4 fill-amber-400" /> 4.92 Rating
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" /> Verified Partner
            </span>
          </div>

          <div className="pt-4 border-t border-slate-800 text-left space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Trips Completed:</span>
              <span className="font-bold text-white">1,420</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Driving License:</span>
              <span className="font-mono text-blue-400 font-bold">KL-01-2018-09941</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Phone:</span>
              <span className="text-slate-200">{user?.phone || '+91 98470 11223'}</span>
            </div>
          </div>
        </div>

        {/* Assigned Vehicle & Compliance Documents */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-400" /> Assigned Vehicle Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Vehicle Name & Model</span>
                <p className="font-bold text-white">RoadBuddy Sedan Premier (Honda City)</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Registration Number</span>
                <p className="font-mono text-blue-400 font-bold text-base">KL 01 BT 8890</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Seating Capacity</span>
                <p className="font-semibold text-slate-200">4 Passengers + Driver</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Fuel Type</span>
                <p className="font-semibold text-emerald-400">Electric / Hybrid</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" /> Verification Documents Status
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { title: 'Commercial Driving License', status: 'Verified', date: 'Valid till 2030' },
                { title: 'Vehicle Registration Certificate (RC)', status: 'Verified', date: 'Valid till 2029' },
                { title: 'Vehicle Insurance Policy', status: 'Verified', date: 'Valid till 2027' },
                { title: 'Police Background Verification', status: 'Verified', date: 'Passed 100%' },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <span className="font-bold text-white block text-sm">{doc.title}</span>
                    <span className="text-slate-400">{doc.date}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
