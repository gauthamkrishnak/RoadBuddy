import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { StatCard } from "../../components/common/StatCard";
import { PageHeader } from "../../components/common/PageHeader";
import { StatusBadge } from "../../components/common/StatusBadge";
import { MOCK_CHART_DATA } from "../../mockData";
import {
  Users,
  UserCheck,
  Car,
  DollarSign,
  AlertTriangle,
  Wrench,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    emergencies,
    roadsideRequests,
    vehicles,
    drivers,
    usersList,
  } = useApp();
  const navigate = useNavigate();

  const activeBookings = bookings.filter(
    (b) => b.status === "in_progress" || b.status === "accepted",
  );

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3 inline-block">
            Platform Master Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Administrator Command Center
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Real-time overview of users, bookings, emergency SOS alerts,
            roadside dispatches, and platform revenue.
          </p>
        </div>
      </div>

      {/* Admin Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard title="Total Users" value={usersList.length} icon={Users} />
        <StatCard
          title="Active Drivers"
          value={drivers.length}
          icon={UserCheck}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-400"
        />
        <StatCard
          title="Active Trips"
          value={activeBookings.length}
          icon={Car}
          iconBgColor="bg-cyan-500/10"
          iconTextColor="text-cyan-400"
        />
        <StatCard
          title="Platform Revenue"
          value="₹5.14L"
          isPositive={true}
          change="24%"
          icon={DollarSign}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-400"
        />
        <StatCard
          title="Emergency SOS"
          value={emergencies.length}
          icon={AlertTriangle}
          iconBgColor="bg-rose-500/10"
          iconTextColor="text-rose-400"
        />
        <StatCard
          title="Roadside Requests"
          value={roadsideRequests.length}
          icon={Wrench}
          iconBgColor="bg-amber-500/10"
          iconTextColor="text-amber-400"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">
            Weekly Revenue Trend (₹)
          </h3>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA.revenueWeekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fill="#2563eb"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">
            Daily Completed Booking Volume
          </h3>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA.revenueWeekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="trips" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">
            Recent Platform Bookings
          </h3>
          <button
            onClick={() => navigate("/admin/bookings")}
            className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
          >
            View All Bookings <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold tracking-wider">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Passenger</th>
                <th className="pb-3">Pickup ➔ Drop</th>
                <th className="pb-3">Vehicle</th>
                <th className="pb-3">Fare</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 font-mono text-blue-400 font-bold">
                    {b.id}
                  </td>
                  <td className="py-3 font-bold text-white">
                    {b.passengerName}
                  </td>
                  <td className="py-3 text-slate-300 max-w-xs truncate">
                    {b.pickup} ➔ {b.destination}
                  </td>
                  <td className="py-3 text-slate-300">{b.vehicleName}</td>
                  <td className="py-3 font-bold text-emerald-400">₹{b.fare}</td>
                  <td className="py-3">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
