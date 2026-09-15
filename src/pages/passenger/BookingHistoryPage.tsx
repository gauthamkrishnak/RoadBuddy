import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { BookingCard } from '../../components/common/BookingCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Search, Filter, History } from 'lucide-react';

export const BookingHistoryPage: React.FC = () => {
  const { bookings } = useApp();
  const [activeTab, setActiveTab] = useState<'completed' | 'upcoming' | 'cancelled'>('completed');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const matchesTab =
      activeTab === 'completed'
        ? b.status === 'completed'
        : activeTab === 'upcoming'
        ? b.status === 'accepted' || b.status === 'in_progress' || b.status === 'pending'
        : b.status === 'cancelled';

    const matchesSearch =
      b.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Booking History"
        subtitle="Review past trips, view digital receipts, and inspect ride details."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by location, ID or vehicle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-bold w-full sm:w-auto">
          {[
            { id: 'completed', label: 'Completed' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((b) => (
            <BookingCard key={b.id} booking={b} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={History}
          title={`No ${activeTab} trips found`}
          description="There are no trips matching your current search filters or category."
        />
      )}
    </div>
  );
};
