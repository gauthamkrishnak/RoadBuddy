import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { User } from '../../types';
import { Users, Search, Eye } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { usersList } = useApp();
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PageHeader title="User Account Management" subtitle="Manage registered passengers, drivers, fleet owners, and admins." />

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase font-bold tracking-wider">
                <th className="pb-3">User ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 font-mono text-slate-400">{u.id}</td>
                  <td className="py-3.5 font-bold text-white text-sm">{u.name}</td>
                  <td className="py-3.5 text-slate-300">{u.email}</td>
                  <td className="py-3.5 text-slate-400 font-mono">{u.phone}</td>
                  <td className="py-3.5 font-bold uppercase text-blue-400">{u.role}</td>
                  <td className="py-3.5 text-slate-400">{u.joinedDate || '2026-01-10'}</td>
                  <td className="py-3.5"><StatusBadge status={u.status || 'active'} /></td>
                  <td className="py-3.5 text-right">
                    <button onClick={() => setSelectedUser(u)} className="p-2 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-slate-800 transition">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} title="User Account Telemetry">
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-lg">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{selectedUser.name}</h4>
                <p className="text-xs text-slate-400">{selectedUser.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">User ID:</span>
                <span className="font-mono text-white">{selectedUser.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Phone:</span>
                <span className="text-white">{selectedUser.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Platform Role:</span>
                <span className="font-bold text-blue-400 uppercase">{selectedUser.role}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
