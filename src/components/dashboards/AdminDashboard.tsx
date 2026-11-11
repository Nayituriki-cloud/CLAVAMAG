import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, DollarSign, Users, CheckCircle, XCircle, Search, FileText, CheckCircle2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { payments, courses, gyms, currency } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'momo' | 'airtel' | 'card'>('all');
  const [searchTx, setSearchTx] = useState('');
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  // Pending gym / instructor approvals
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'app-1', entity: 'Rubavu Beach Fighters Dojo', type: 'Partner Gym', location: 'Lake Kivu, Rubavu', submittedBy: 'Kru Patrick Mugabo', status: 'Pending Review' },
    { id: 'app-2', entity: 'Coach Amina Kayitesi', type: 'Senior Boxing Instructor', location: 'Kigali, Rwanda', submittedBy: 'Amina K.', status: 'Pending Review' },
    { id: 'app-3', entity: 'Gisenyi Grappling Club', type: 'Partner Gym', location: 'Western Province', submittedBy: 'Damas N.', status: 'Pending Review' },
  ]);

  const handleApprove = (id: string, name: string) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== id));
    setAdminNotice(`Accreditation Granted: "${name}" has been officially approved onto CRAVA MAGA International.`);
    setTimeout(() => setAdminNotice(null), 4000);
  };

  const handleReject = (id: string, name: string) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== id));
    setAdminNotice(`Application for "${name}" deferred for additional safety credentials.`);
    setTimeout(() => setAdminNotice(null), 4000);
  };

  const filteredPayments = payments.filter(tx => {
    const matchesSearch =
      tx.userName.toLowerCase().includes(searchTx.toLowerCase()) ||
      tx.referenceCode.toLowerCase().includes(searchTx.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchTx.toLowerCase());

    if (filterType === 'momo') return matchesSearch && tx.paymentMethod.includes('MTN');
    if (filterType === 'airtel') return matchesSearch && tx.paymentMethod.includes('Airtel');
    if (filterType === 'card') return matchesSearch && tx.paymentMethod.includes('Visa');
    return matchesSearch;
  });

  const totalRevenueRwf = payments.reduce((acc, p) => (p.currency === 'RWF' ? acc + p.amount : acc + p.amount * 1300), 0);

  return (
    <div className="space-y-8 text-neutral-100">
      {/* Top Banner */}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs text-red-500 font-bold uppercase tracking-wider">
            Super Administrator Console
          </div>
          <h2 className="text-xl font-bold text-white">Global CRAVA MAGA Command</h2>
          <div className="text-xs text-neutral-400 mt-0.5">
            Real-time multi-currency settlement · East Africa & International Federation
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAdminNotice('Consolidated financial statement exported to CSV/PDF.');
              setTimeout(() => setAdminNotice(null), 4000);
            }}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Export Financial Audit</span>
          </button>
        </div>
      </div>

      {adminNotice && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{adminNotice}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Settled Platform Volume</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>{totalRevenueRwf.toLocaleString()} RWF</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">~${Math.round(totalRevenueRwf / 1300).toLocaleString()} USD</div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Active Fighters & Users</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>3,248</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Pending Accreditations</div>
          <div className="font-display text-2xl font-bold text-amber-400 tabular-nums mt-1 flex items-center gap-2">
            <span>{pendingApprovals.length} pending</span>
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Payment Gateway Health</div>
          <div className="font-display text-2xl font-bold text-emerald-400 tabular-nums mt-1 flex items-center gap-2">
            <span>99.9% Uptime</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">MTN MoMo, Airtel, Visa live</div>
        </div>
      </div>

      {/* Pending Accreditation Approvals Queue */}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold uppercase text-white">
            Instructor & Gym Accreditation Review Queue
          </h3>
          <span className="text-xs text-amber-500 font-semibold">{pendingApprovals.length} Awaiting Verification</span>
        </div>

        {pendingApprovals.length === 0 ? (
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-400 text-center">
            All dojo accreditations and instructor certifications are up to date!
          </div>
        ) : (
          <div className="divide-y divide-neutral-800">
            {pendingApprovals.map(item => (
              <div key={item.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-white text-sm">{item.entity}</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">
                    Type: <span className="text-neutral-300 font-medium">{item.type}</span> · Location: {item.location} · Applicant: {item.submittedBy}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(item.id, item.entity)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleReject(item.id, item.entity)}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded flex items-center gap-1 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Online Payments Transaction Ledger */}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-white">
              Online Payments & Settlement Ledger
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live audit of MTN Mobile Money (*182#), Airtel Money (*500#), and Card purchases.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-neutral-950 rounded border border-neutral-800 text-[11px]">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded ${filterType === 'all' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('momo')}
                className={`px-2.5 py-1 rounded ${filterType === 'momo' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400'}`}
              >
                MTN MoMo
              </button>
              <button
                onClick={() => setFilterType('airtel')}
                className={`px-2.5 py-1 rounded ${filterType === 'airtel' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400'}`}
              >
                Airtel
              </button>
              <button
                onClick={() => setFilterType('card')}
                className={`px-2.5 py-1 rounded ${filterType === 'card' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400'}`}
              >
                Card
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchTx}
            onChange={e => setSearchTx(e.target.value)}
            placeholder="Search by student, ref code, or item..."
            className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-xs text-white placeholder-neutral-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Reference Code</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredPayments.map(tx => (
                <tr key={tx.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3 px-4 text-neutral-400 font-mono text-[11px]">{tx.date}</td>
                  <td className="py-3 px-4 font-bold text-white">{tx.userName}</td>
                  <td className="py-3 px-4 text-neutral-300">{tx.description}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.paymentMethod.includes('MTN')
                        ? 'bg-yellow-950/60 text-yellow-400 border border-yellow-500/30'
                        : tx.paymentMethod.includes('Airtel')
                        ? 'bg-red-950/60 text-red-400 border border-red-500/30'
                        : 'bg-blue-950/60 text-blue-400 border border-blue-500/30'
                    }`}>
                      {tx.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">{tx.referenceCode}</td>
                  <td className="py-3 px-4 text-right font-display font-bold text-white tabular-nums">
                    {tx.amount.toLocaleString()} {tx.currency}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-400 font-semibold text-[11px]">
                      ✓ {tx.status}
                    </span>
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
