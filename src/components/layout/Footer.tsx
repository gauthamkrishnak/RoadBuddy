import React from 'react';
import { Car, Shield, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Car className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-wide">
                ROAD<span className="text-blue-500">BUDDY</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered intelligent mobility and road assistance platform. Seamless vehicle booking, roadside support, and emergency SOS services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/passenger/book-ride" className="hover:text-blue-400 transition">Book a Ride</Link></li>
              <li><Link to="/passenger/scheduled-rides" className="hover:text-blue-400 transition">Scheduled & Recurring Rides</Link></li>
              <li><Link to="/passenger/roadside" className="hover:text-blue-400 transition">Roadside Assistance</Link></li>
              <li><Link to="/passenger/ai-assistant" className="hover:text-blue-400 transition">AI Travel Assistant</Link></li>
              <li><Link to="/passenger/emergency" className="hover:text-rose-400 transition">Emergency SOS</Link></li>
            </ul>
          </div>

          {/* User Roles */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Platform Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/passenger/dashboard" className="hover:text-blue-400 transition">Passenger Dashboard</Link></li>
              <li><Link to="/driver/dashboard" className="hover:text-blue-400 transition">Driver Portal</Link></li>
              <li><Link to="/fleet/dashboard" className="hover:text-blue-400 transition">Fleet Management</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-blue-400 transition">Admin Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-blue-400 transition">Login / Demo Roles</Link></li>
            </ul>
          </div>

          {/* Contact & Safety */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Safety & Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>24/7 Helpline: 1800-ROAD-BUDDY</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@roadbuddy.ai</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Tech Park, Kakkanad, Kochi, Kerala</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} RoadBuddy AI Mobility Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Smart Indian Mobility.
          </p>
        </div>
      </div>
    </footer>
  );
};
