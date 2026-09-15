import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Modal } from '../../components/common/Modal';
import { PaymentTransaction } from '../../types';
import { CreditCard, Wallet, QrCode, DollarSign, FileText, CheckCircle, Download } from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const { transactions } = useApp();
  const [selectedTxn, setSelectedTxn] = useState<PaymentTransaction | null>(null);

  const totalSpent = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Payments & Wallet"
        subtitle="Manage saved payment methods, view transaction history, and download digital invoices."
      />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Lifetime Spent"
          value={`₹${totalSpent.toLocaleString()}`}
          change="12%"
          isPositive={true}
          icon={CreditCard}
        />
        <StatCard
          title="RoadBuddy Wallet Balance"
          value="₹1,250.00"
          icon={Wallet}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-400"
        />
        <StatCard
          title="Active Payment Methods"
          value="3 Saved"
          icon={QrCode}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-400"
        />
      </div>

      {/* Saved Payment Methods Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Payment Options Supported</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'UPI AutoPay', desc: 'Google Pay, PhonePe, Paytm', icon: QrCode },
            { title: 'Credit / Debit Cards', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
            { title: 'RoadBuddy Wallet', desc: 'Instant 1-tap checkout', icon: Wallet },
            { title: 'Cash on Arrival', desc: 'Pay directly to driver', icon: DollarSign },
          ].map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <Icon className="w-6 h-6 text-blue-400 mb-2" />
                <h4 className="font-bold text-white text-xs">{m.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Transaction History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase tracking-wider font-bold">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 font-mono text-slate-300">{txn.id}</td>
                  <td className="py-3.5 font-bold text-white max-w-xs truncate">{txn.description}</td>
                  <td className="py-3.5 text-slate-400">{txn.date}</td>
                  <td className="py-3.5 text-slate-300">{txn.method}</td>
                  <td className="py-3.5 font-bold text-emerald-400">₹{txn.amount}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setSelectedTxn(txn)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg transition font-bold inline-flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Receipt Modal */}
      {selectedTxn && (
        <Modal
          isOpen={!!selectedTxn}
          onClose={() => setSelectedTxn(null)}
          title="Digital Tax Invoice"
        >
          <div className="space-y-6 text-slate-200">
            <div className="border-b border-slate-800 pb-4 text-center">
              <span className="font-extrabold text-xl text-white tracking-wide">
                ROAD<span className="text-blue-500">BUDDY</span>
              </span>
              <p className="text-xs text-slate-400 mt-1">Official Tax Invoice • GSTIN: 32AAAAA0000A1Z5</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Invoice ID:</span>
                <span className="font-mono text-white font-bold">{selectedTxn.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span className="text-white">{selectedTxn.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Mode:</span>
                <span className="text-white">{selectedTxn.method}</span>
              </div>
            </div>

            <div className="py-3 border-y border-slate-800 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{selectedTxn.description}</span>
                <span className="font-bold text-white">₹{selectedTxn.amount}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>GST (5%)</span>
                <span>Included</span>
              </div>
            </div>

            <div className="flex items-center justify-between font-bold text-lg text-white">
              <span>Total Paid:</span>
              <span className="text-emerald-400">₹{selectedTxn.amount}</span>
            </div>

            <button
              onClick={() => setSelectedTxn(null)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PDF Receipt
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
