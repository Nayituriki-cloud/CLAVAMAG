import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Users, Calendar, QrCode, CheckCircle, TrendingUp, Clock, Plus, Shield } from 'lucide-react';

export const GymDashboard: React.FC = () => {
  const { gyms, currency } = useApp();
  const currentGym = gyms[0]; // Kigali Central Combat Hub

  const [checkInInput, setCheckInInput] = useState('');
  const [checkInLog, setCheckInLog] = useState([
    { id: 'ck-1', name: 'Fiston Nayituriki', plan: 'Pro Warrior Pass', time: '06:28 CAT', status: 'Approved' },
    { id: 'ck-2', name: 'Jean-Luc Habimana', plan: 'Pro Warrior Pass', time: '06:31 CAT', status: 'Approved' },
    { id: 'ck-3', name: 'Grace Uwase', plan: 'All-Dojo Pass', time: '11:55 CAT', status: 'Approved' },
  ]);
  const [scannerNotice, setScannerNotice] = useState<string | null>(null);

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInInput.trim()) return;

    const newLog = {
      id: `ck-${Date.now()}`,
      name: checkInInput,
      plan: 'Pro Warrior Pass',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Approved',
    };

    setCheckInLog(prev => [newLog, ...prev]);
    setScannerNotice(`Member QR Verified: ${checkInInput} admitted to Tatami Mat A.`);
    setCheckInInput('');
    setTimeout(() => setScannerNotice(null), 4000);
  };

  return (
    <div className="space-y-8 text-neutral-100">
      {/* Top Banner */}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs text-red-500 font-bold uppercase tracking-wider">
            Dojo Facility Command
          </div>
          <h2 className="text-xl font-bold text-white">{currentGym.name}</h2>
          <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>{currentGym.address} · {currentGym.city}, {currentGym.country}</span>
          </div>
        </div>

        <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs space-y-1">
          <div className="text-neutral-400 text-[10px] uppercase font-bold">Today's Mat Status</div>
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Tatami Sanitized & Ready for Sparring</span>
          </div>
        </div>
      </div>

      {scannerNotice && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{scannerNotice}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Active Dojo Members</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>285 fighters</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Mat Capacity Peak</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>82% peak</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Mat Check-Ins Today</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>{checkInLog.length + 42} check-ins</span>
            <Clock className="w-4 h-4 text-red-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Monthly Dojo Membership Revenue</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>{currency === 'RWF' ? '18,525,000 RWF' : '$14,250 USD'}</span>
            <Shield className="w-4 h-4 text-amber-500" />
          </div>
        </div>
      </div>

      {/* QR Mat Access Terminal Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-white text-base">QR Door & Mat Scanner</h3>
          </div>
          <p className="text-xs text-neutral-400">
            Simulate a student scanning their mobile app QR pass upon arriving at the Kigali dojo front desk.
          </p>

          <form onSubmit={handleSimulateScan} className="space-y-3 pt-2">
            <div>
              <label className="text-neutral-300 text-xs font-semibold">Student Name or Pass ID:</label>
              <input
                type="text"
                value={checkInInput}
                onChange={e => setCheckInInput(e.target.value)}
                placeholder="e.g. Marie Claire or CM-PASS-8841"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Simulate Mat Check-In</span>
            </button>
          </form>
        </div>

        {/* Live Attendance Activity Log */}
        <div className="lg:col-span-7 p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Live Mat Entrance Activity Log</h3>
            <span className="text-[11px] text-neutral-400">Updated seconds ago</span>
          </div>

          <div className="divide-y divide-neutral-800 max-h-56 overflow-y-auto">
            {checkInLog.map(item => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-[11px] text-neutral-400">{item.plan} · {item.time}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Schedule Overview */}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4">
        <h3 className="font-display text-xl font-bold uppercase text-white">
          Active Dojo Class Timetable
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {currentGym.schedule.map((day, idx) => (
            <div key={idx} className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
              <div className="font-bold text-red-500 uppercase">{day.day}</div>
              <div className="space-y-2">
                {day.classes.map((cls, cIdx) => (
                  <div key={cIdx} className="pb-1.5 border-b border-neutral-900 last:border-0">
                    <div className="font-semibold text-white">{cls.name}</div>
                    <div className="text-[11px] text-neutral-400">{cls.time}</div>
                    <div className="text-[11px] text-neutral-500">Coach: {cls.instructor}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
