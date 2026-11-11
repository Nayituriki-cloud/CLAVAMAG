import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { instructorsList } from '../data/initialData';
import { Instructor } from '../types';
import { Shield, Star, Award, Calendar, CheckCircle, Video, Clock, DollarSign } from 'lucide-react';

export const InstructorsSection: React.FC = () => {
  const { currency, openPayment, lang } = useApp();
  const [selectedInstructorForBooking, setSelectedInstructorForBooking] = useState<Instructor | null>(null);
  const [bookingDate, setBookingDate] = useState('Next Tuesday');
  const [bookingTime, setBookingTime] = useState('14:00 - 15:00 CAT');
  const [coachingGoal, setCoachingGoal] = useState('Private Tactical Self-Defense Assessment & Strike Mechanics');
  const [bookingSuccessNotice, setBookingSuccessNotice] = useState<string | null>(null);

  const handleConfirmPrivateCoaching = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInstructorForBooking) return;

    openPayment({
      itemType: 'coaching',
      title: `1-on-1 Coaching: ${selectedInstructorForBooking.name} (${bookingDate})`,
      amountRwf: selectedInstructorForBooking.hourlyRateRwf,
      amountUsd: selectedInstructorForBooking.hourlyRateUsd,
      onSuccess: () => {
        setBookingSuccessNotice(`Private Session Confirmed with ${selectedInstructorForBooking.name} on ${bookingDate} at ${bookingTime}! Link and dojo invitation sent to your email.`);
        setSelectedInstructorForBooking(null);
        setTimeout(() => setBookingSuccessNotice(null), 6000);
      },
    });
  };

  return (
    <div className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Master Faculty</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            {lang === 'rw' ? 'Abarimu Babifitiye Impamyabumenyi' : lang === 'fr' ? 'Maîtres & Instructeurs Certifiés' : 'Certified International Instructors'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Train directly with federation masters, world champions, and military self-defense tacticians. Book private coaching or follow their online curricula.
          </p>
        </div>

        {bookingSuccessNotice && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{bookingSuccessNotice}</span>
          </div>
        )}

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {instructorsList.map(inst => (
            <div
              key={inst.id}
              className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-6 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-red-600/60 shrink-0"
                  />
                  <div>
                    <div className="text-xs text-red-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span>{inst.rank}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase text-white mt-0.5">
                      {inst.name}
                    </h3>
                    <div className="text-xs text-neutral-400">
                      {inst.role} · {inst.city}, {inst.country}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-neutral-400 mt-2">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{inst.rating}</span>
                      </span>
                      <span>·</span>
                      <span>{inst.studentsCount} students</span>
                      <span>·</span>
                      <span>{inst.experienceYears} yrs experience</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {inst.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {inst.disciplines.map(d => (
                    <span key={d} className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-400 uppercase">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking & Rates Row */}
              <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-neutral-400">Private 1-on-1 Coaching:</div>
                  <div className="font-display text-lg font-bold text-white tabular-nums">
                    {currency === 'RWF'
                      ? `${inst.hourlyRateRwf.toLocaleString()} RWF / hr`
                      : `$${inst.hourlyRateUsd} USD / hr`}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedInstructorForBooking(inst)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-md shadow-md shadow-red-600/30 flex items-center gap-1.5 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Private Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Private Coaching Modal */}
        {selectedInstructorForBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-5 text-neutral-100">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <div className="text-xs text-red-500 font-bold uppercase">1-on-1 Master Consultation</div>
                  <h3 className="font-bold text-white text-base mt-0.5">Session with {selectedInstructorForBooking.name}</h3>
                </div>
                <button onClick={() => setSelectedInstructorForBooking(null)} className="text-neutral-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleConfirmPrivateCoaching} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 font-semibold">Preferred Day:</label>
                    <input
                      type="text"
                      value={bookingDate}
                      onChange={e => setBookingDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-semibold">Time Window (CAT):</label>
                    <input
                      type="text"
                      value={bookingTime}
                      onChange={e => setBookingTime(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Coaching Focus / Objective:</label>
                  <textarea
                    rows={3}
                    value={coachingGoal}
                    onChange={e => setCoachingGoal(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                  />
                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded text-[11px] text-neutral-400 space-y-1">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    <span>Format Options:</span>
                  </div>
                  <div>In-Person at Kigali Central Dojo Mat OR Private High-Definition Video Stream.</div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-md shadow-red-600/30"
                >
                  Proceed to Payment ({currency === 'RWF' ? `${selectedInstructorForBooking.hourlyRateRwf.toLocaleString()} RWF` : `$${selectedInstructorForBooking.hourlyRateUsd} USD`})
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
