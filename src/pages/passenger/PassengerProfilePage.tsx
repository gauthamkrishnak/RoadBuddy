import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Modal } from '../../components/common/Modal';
import { EmergencyContact } from '../../types';
import { User, Mail, Phone, ShieldAlert, Plus, Trash2, Edit, Save, Star } from 'lucide-react';

export const PassengerProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(user?.name || 'Gautham S.');
  const [email, setEmail] = useState(user?.email || 'gautham@roadbuddy.ai');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');

  // Emergency Contacts local state
  const [contacts, setContacts] = useState<EmergencyContact[]>(
    user?.emergencyContacts || [
      { id: 'c1', name: 'Anjali Sharma', relationship: 'Sister', phone: '+91 98950 12345' },
      { id: 'c2', name: 'Rajesh Kumar', relationship: 'Father', phone: '+91 94470 67890' },
    ]
  );

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, phone, emergencyContacts: contacts });
    setIsEditingProfile(false);
  };

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: EmergencyContact = {
      id: `c_${Date.now()}`,
      name: newContactName,
      relationship: newContactRelation,
      phone: newContactPhone,
    };
    const updated = [...contacts, newContact];
    setContacts(updated);
    updateUser({ emergencyContacts: updated });
    setIsContactModalOpen(false);
    setNewContactName('');
    setNewContactRelation('');
    setNewContactPhone('');
  };

  const handleDeleteContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    updateUser({ emergencyContacts: updated });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Passenger Profile & Safety Contacts"
        subtitle="Manage your personal details and SOS emergency contact broadcasts."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
              }
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-xl"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{user?.name}</h3>
              <p className="text-xs text-slate-400 font-mono">Passenger Account</p>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.90 Rating
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditingProfile}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-60"
              />
            </div>

            {isEditingProfile ? (
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition text-sm flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" /> Edit Details
              </button>
            )}
          </form>
        </div>

        {/* Emergency Contacts Manager */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" /> Emergency SOS Contacts
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                These contacts receive instant SMS & live GPS coordinates whenever SOS is pressed.
              </p>
            </div>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Emergency Contact
            </button>
          </div>

          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-sm">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{contact.name}</h4>
                    <p className="text-xs text-slate-400">{contact.relationship} • <span className="font-mono text-slate-300">{contact.phone}</span></p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Add Emergency Contact"
      >
        <form onSubmit={handleAddContactSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Contact Name
            </label>
            <input
              type="text"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Relationship (e.g. Sister, Spouse, Friend)
            </label>
            <input
              type="text"
              value={newContactRelation}
              onChange={(e) => setNewContactRelation(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={newContactPhone}
              onChange={(e) => setNewContactPhone(e.target.value)}
              required
              placeholder="+91 98765 00000"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg transition text-sm mt-4"
          >
            Save Emergency Contact
          </button>
        </form>
      </Modal>
    </div>
  );
};
