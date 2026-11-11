import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GymLocation } from '../types';
import { MapPin, Calendar, Clock, CheckCircle2, Shield, Star, Plus, Users, Award } from 'lucide-react';

export const FindGym: React.FC = () => {
  const { gyms, bookGymClass, openPayment, user, currency, lang } = useApp();
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [activeGymScheduleModal, setActiveGymScheduleModal] = useState<GymLocation | null>(null);
  const [bookedSuccessMessage, setBookedSuccessMessage] = useState<string | null>(null);
  const [showRegisterGymModal, setShowRegisterGymModal] = useState(false);

  // New Gym form
  const [newGymName, setNewGymName] = useState('');
  const [newGymCity, setNewGymCity] = useState('Kigali');
  const [newGymAddress, setNewGymAddress] = useState('');
  const [newGymCoach, setNewGymCoach] = useState('');

  const cities = ['all', 'Kigali', 'Rubavu', 'Paris'];

  const filteredGyms = gyms.filter(gym => {
    if (selectedCity === 'all') return true;
    return gym.city.toLowerCase() === selectedCity.toLowerCase();
  });

  const handleBookClass = (gymName: string, className: string, day: string, time: string) => {
    bookGymClass(gymName, className, day, time);
    setBookedSuccessMessage(`Class Confirmed: ${className} on ${day} (${time}) at ${gymName}!`);
    setTimeout(() => {
      setBookedSuccessMessage(null);
    }, 4000);
  };

  const handleBuyGymMembership = (gym: GymLocation) => {
    openPayment({
      itemType: 'membership',
      title: `Monthly All-Access Pass: ${gym.name}`,
      amountRwf: gym.monthlyFeeRwf,
      amountUsd: gym.monthlyFeeUsd,
      onSuccess: () => {
        setBookedSuccessMessage(`Monthly pass activated for ${gym.name}! QR code ready in your dashboard.`);
        setTimeout(() => setBookedSuccessMessage(null), 4000);
      },
    });
  };

  return (
    <div className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>International Dojo Network</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              {lang === 'rw' ? 'Ibyumba By’Imyitozo na Gyms' : lang === 'fr' ? 'Dojos & Centres d’Entraînement' : 'Find a Combat Gym & Dojo'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              Train on international-standard mats with certified masters. From Kigali to Paris, your CRAVA MAGA membership gives you mat access anywhere.
            </p>
          </div>

          <button
            onClick={() => setShowRegisterGymModal(true)}
            className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-red-500" />
            <span>Register a Partner Dojo</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {bookedSuccessMessage && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{bookedSuccessMessage}</span>
          </div>
        )}

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400 font-medium">Filter by City:</span>
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors capitalize ${
                selectedCity === c
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {c === 'all' ? 'All Locations' : c}
            </button>
          ))}
        </div>

        {/* Gyms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGyms.map(gym => (
            <div
              key={gym.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              {/* Gym Image */}
              <div className="relative h-60 w-full overflow-hidden bg-neutral-950">
                <img
                  src={gym.image}
                  alt={gym.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded text-xs border border-neutral-800 font-semibold text-white">
                  {gym.city}, {gym.country}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{gym.rating}</span>
                    <span className="text-neutral-400 text-[11px]">({gym.reviewCount} reviews)</span>
                  </div>
                  <div className="font-semibold text-white">
                    Head Coach: {gym.headCoach}
                  </div>
                </div>
              </div>

              {/* Gym Content */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-display text-2xl font-bold uppercase text-white">
                    {gym.name}
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-neutral-400">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{gym.address}</span>
                  </div>

                  {/* Amenities */}
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-neutral-400 mb-2 uppercase">
                      Facility Amenities:
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-neutral-300">
                      {gym.amenities.map((am, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-300"
                        >
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-neutral-400">All-Inclusive Mat Pass:</div>
                    <div className="font-display text-lg font-bold text-white tabular-nums">
                      {currency === 'RWF'
                        ? `${gym.monthlyFeeRwf.toLocaleString()} RWF/mo`
                        : `$${gym.monthlyFeeUsd} USD/mo`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveGymScheduleModal(gym)}
                      className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Class Schedule</span>
                    </button>

                    <button
                      onClick={() => handleBuyGymMembership(gym)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-md shadow-md shadow-red-600/30 transition-all"
                    >
                      Join Dojo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Modal */}
        {activeGymScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-6 text-neutral-100">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <div className="text-xs text-red-500 font-bold uppercase tracking-wider">
                    {activeGymScheduleModal.city} Dojo Timetable
                  </div>
                  <h3 className="text-lg font-bold text-white">{activeGymScheduleModal.name}</h3>
                </div>
                <button
                  onClick={() => setActiveGymScheduleModal(null)}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {activeGymScheduleModal.schedule.map((daySchedule, dIdx) => (
                  <div key={dIdx} className="space-y-2">
                    <div className="text-xs font-bold uppercase text-red-400 tracking-wider">
                      {daySchedule.day}
                    </div>
                    <div className="space-y-1.5">
                      {daySchedule.classes.map((cls, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-white">{cls.name}</div>
                            <div className="text-neutral-400 text-[11px]">
                              {cls.time} · Coach: {cls.instructor}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              handleBookClass(
                                activeGymScheduleModal.name,
                                cls.name,
                                daySchedule.day,
                                cls.time
                              );
                              setActiveGymScheduleModal(null);
                            }}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-[11px] transition-colors"
                          >
                            Book Spot
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Register Gym Modal */}
        {showRegisterGymModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-5 text-neutral-100">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="font-bold text-white text-base">Register Partner Gym or Dojo</h3>
                <button onClick={() => setShowRegisterGymModal(false)} className="text-neutral-400 hover:text-white">✕</button>
              </div>

              <form
                onSubmit={e => {
                  e.preventDefault();
                  setShowRegisterGymModal(false);
                  setBookedSuccessMessage(`Dojo Application for "${newGymName}" submitted! Admin verification team will inspect credentials.`);
                  setTimeout(() => setBookedSuccessMessage(null), 5000);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="text-neutral-300 font-semibold">Academy / Gym Name:</label>
                  <input
                    type="text"
                    required
                    value={newGymName}
                    onChange={e => setNewGymName(e.target.value)}
                    placeholder="e.g. Kigali Combat Club"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 font-semibold">City:</label>
                    <input
                      type="text"
                      required
                      value={newGymCity}
                      onChange={e => setNewGymCity(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-semibold">Head Coach:</label>
                    <input
                      type="text"
                      required
                      value={newGymCoach}
                      onChange={e => setNewGymCoach(e.target.value)}
                      placeholder="e.g. Sensei Patrick"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Physical Mat Location Address:</label>
                  <input
                    type="text"
                    required
                    value={newGymAddress}
                    onChange={e => setNewGymAddress(e.target.value)}
                    placeholder="Street, District, Landmark"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded mt-2"
                >
                  Submit for Accreditation
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
