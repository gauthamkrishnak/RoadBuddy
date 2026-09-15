import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import {
  Car,
  Bot,
  AlertTriangle,
  Wrench,
  Navigation,
  Truck,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  MapPin,
  Star,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white bg-mesh-glow">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#080c14]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                <Car className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-xl text-white tracking-wide">
              ROAD<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">BUDDY</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition">Features</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition">How it Works</a>
            <a href="#stats" className="hover:text-cyan-400 transition">Safety & Impact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl shadow-lg shadow-indigo-500/25 transition border border-indigo-400/30"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-extrabold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Next-Gen AI Mobility Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Your Intelligent <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">Road Companion</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Book rides, plan journeys, get roadside assistance, and stay safe with AI-powered mobility.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('/passenger/book-ride')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/30 transition border border-indigo-400/30 flex items-center justify-center gap-2 text-base"
              >
                Book a Ride <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto px-8 py-4 bg-[#0f172a] hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold rounded-2xl transition text-base shadow-md"
              >
                Get Started
              </button>
            </div>

            {/* Quick stats pills */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified Fleet</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-cyan-400" /> Real-Time AI Dispatch</span>
              <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-rose-400" /> 24/7 Emergency Response</span>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="relative">
            <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
              {/* Fake UI Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">roadbuddy-live-tracking.app</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  LIVE TRIP
                </span>
              </div>

              {/* Map Preview */}
              <div className="my-4 h-56 bg-slate-950 rounded-2xl relative overflow-hidden bg-grid-pattern border border-slate-800 flex items-center justify-center">
                <div className="absolute top-3 left-3 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                  📍 InfoPark ➔ Airport
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 animate-bounce">
                  <Car className="w-6 h-6" />
                </div>
              </div>

              {/* Driver info */}
              <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                    alt="Driver"
                    className="w-11 h-11 rounded-full object-cover border border-blue-500"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">Rahul Verma</h4>
                    <p className="text-xs text-slate-400">RoadBuddy Sedan Premier (KL 01 BT 8890)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-bold block">ETA 4 Mins</span>
                  <span className="text-xs text-amber-400 font-bold flex items-center justify-end gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> 4.92
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Complete Mobility Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Designed for Every Road & Journey</h2>
            <p className="text-slate-400 text-base">From city taxi rides to long-distance tourist buses and 24/7 SOS assistance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/50 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1. Smart Vehicle Booking</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Book Taxis, Rental Cars, 12-seater Traveller Vans, or 45-seater Tourist Buses with instant fair fare calculation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/50 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2. AI Travel Assistant</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Intelligent conversational assistant for trip planning, ride booking guidance, and instant emergency resolution.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-rose-500/50 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3. Emergency SOS</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                One-tap emergency dispatch to Ambulance, Police, and Rescue services with live GPS location broadcast.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-amber-500/50 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">4. Roadside Assistance</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                On-demand Towing, Fuel Delivery, Flat Tyre repair, Battery Jumpstarts, and roadside mechanics.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-emerald-500/50 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">5. Live Tracking</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Simulated real-time vehicle movement visualization, exact arrival countdowns, and trip status alerts.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-indigo-500/50 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">6. Fleet Management</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Comprehensive dashboards for fleet owners to monitor vehicles, assign drivers, and analyze daily revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How RoadBuddy Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 'Step 1', title: 'Choose Destination', desc: 'Select pickup & drop-off locations across South India.' },
              { step: 'Step 2', title: 'Select Vehicle', desc: 'Pick from Taxi, Rental Car, Traveller Van, or Tourist Bus.' },
              { step: 'Step 3', title: 'Track Journey', desc: 'View live GPS navigation and driver ETA in real-time.' },
              { step: 'Step 4', title: 'Travel Safely', desc: 'Enjoy protected travel backed by 24/7 AI SOS assistance.' },
            ].map((s, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative">
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20 inline-block mb-3">
                  {s.step}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="py-16 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border-y border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-white">50,000+</p>
            <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Completed Journeys</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-400">99.8%</p>
            <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">On-Time Arrival Rate</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-rose-400">&lt; 3 Mins</p>
            <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">SOS Emergency Response</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-emerald-400">1,200+</p>
            <p className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Verified Drivers & Fleets</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900 to-slate-900 border border-blue-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready for a Safer, Smarter Ride?</h2>
            <p className="text-slate-300 text-base">
              Experience India's most advanced AI-powered mobility platform today.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-slate-950 font-extrabold rounded-2xl shadow-xl transition inline-flex items-center gap-2 text-base"
            >
              Get Started Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
