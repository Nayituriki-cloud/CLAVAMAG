import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Competition } from '../types';
import { Trophy, Calendar, MapPin, Users, Ticket, CheckCircle, ShieldAlert, Award } from 'lucide-react';

export const CompetitionsSection: React.FC = () => {
  const { competitions, registerForTournament, openPayment, currency, user, lang } = useApp();

  const [activeFighterRegModal, setActiveFighterRegModal] = useState<Competition | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [fighterWeight, setFighterWeight] = useState<string>('70 kg');
  const [fighterAffiliation, setFighterAffiliation] = useState<string>('CRAVA MAGA Kigali Hub');
  const [medicalAgreed, setMedicalAgreed] = useState<boolean>(true);
  const [ticketSuccessMessage, setTicketSuccessMessage] = useState<string | null>(null);

  const handleOpenFighterReg = (comp: Competition) => {
    setActiveFighterRegModal(comp);
    setSelectedDivision(comp.divisions[0] || '');
  };

  const handleFighterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFighterRegModal) return;

    openPayment({
      itemType: 'competition',
      title: `Fighter Registration: ${activeFighterRegModal.title} (${selectedDivision})`,
      amountRwf: activeFighterRegModal.registrationFeeRwf,
      amountUsd: activeFighterRegModal.registrationFeeUsd,
      onSuccess: () => {
        registerForTournament(activeFighterRegModal.id, selectedDivision, user.name);
        setTicketSuccessMessage(`Fighter Badge Confirmed! ${user.name} is enrolled in ${selectedDivision} for ${activeFighterRegModal.title}. Weigh-ins start at 07:30.`);
        setActiveFighterRegModal(null);
        setTimeout(() => setTicketSuccessMessage(null), 6000);
      },
    });
  };

  const handleBuySpectatorTicket = (comp: Competition) => {
    openPayment({
      itemType: 'competition',
      title: `Spectator Arena Ticket: ${comp.title}`,
      amountRwf: comp.spectatorTicketRwf,
      amountUsd: comp.spectatorTicketUsd,
      onSuccess: () => {
        setTicketSuccessMessage(`Spectator Pass Confirmed for ${comp.title} at ${comp.location}! E-Ticket sent to ${user.email}.`);
        setTimeout(() => setTicketSuccessMessage(null), 6000);
      },
    });
  };

  return (
    <div className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>International Martial Arts Circuit</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            {lang === 'rw' ? 'Amarushanwa n’Amahugurwa Akomeye' : lang === 'fr' ? 'Championnats, Tournois & Stages' : 'Competitions & Tactical Seminars'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Test your skills under unified international rules. Discover official tournaments, pro fight nights, and tactical law-enforcement seminars.
          </p>
        </div>

        {ticketSuccessMessage && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{ticketSuccessMessage}</span>
          </div>
        )}

        {/* Competitions Cards */}
        <div className="space-y-6">
          {competitions.map(comp => (
            <div
              key={comp.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image banner */}
              <div className="lg:col-span-5 relative h-56 lg:h-auto bg-neutral-950">
                <img
                  src={comp.image}
                  alt={comp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-900 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded text-xs border border-neutral-800 font-semibold text-white uppercase">
                  {comp.discipline}
                </div>

                <div className="absolute bottom-4 left-4 text-xs font-bold text-red-500 bg-neutral-950/90 px-2.5 py-1 rounded">
                  {comp.status}
                </div>
              </div>

              {/* Body */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span>{comp.date} ({comp.time})</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span>{comp.location}, {comp.city}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase text-white leading-tight">
                    {comp.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {comp.description}
                  </p>

                  {/* Divisions */}
                  <div>
                    <div className="text-[11px] font-semibold text-neutral-400 mb-1.5 uppercase">
                      Open Divisions & Brackets:
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-xs text-neutral-300">
                      {comp.divisions.map((div, i) => (
                        <span key={i} className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded">
                          {div}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and Registration buttons */}
                <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <div className="text-neutral-500 text-[10px]">Fighter Entry:</div>
                      <div className="font-display text-base font-bold text-white tabular-nums">
                        {currency === 'RWF'
                          ? `${comp.registrationFeeRwf.toLocaleString()} RWF`
                          : `$${comp.registrationFeeUsd} USD`}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500 text-[10px]">Spectator Ticket:</div>
                      <div className="font-display text-base font-bold text-white tabular-nums">
                        {currency === 'RWF'
                          ? `${comp.spectatorTicketRwf.toLocaleString()} RWF`
                          : `$${comp.spectatorTicketUsd} USD`}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500 text-[10px]">Slots Filled:</div>
                      <div className="font-bold text-amber-400 tabular-nums">
                        {comp.registeredFighters} / {comp.maxFighters}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBuySpectatorTicket(comp)}
                      className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Spectator Pass</span>
                    </button>

                    <button
                      onClick={() => handleOpenFighterReg(comp)}
                      disabled={comp.status === 'Sold Out'}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 text-white text-xs font-bold rounded-md shadow-md shadow-red-600/30 transition-all flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Register as Fighter</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fighter Registration Modal */}
        {activeFighterRegModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-5 text-neutral-100">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <div className="text-xs text-red-500 font-bold uppercase">Official Athlete Registration</div>
                  <h3 className="font-bold text-white text-base mt-0.5">{activeFighterRegModal.title}</h3>
                </div>
                <button onClick={() => setActiveFighterRegModal(null)} className="text-neutral-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleFighterSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-300 font-semibold">Athlete Name:</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    required
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 font-semibold">Weight Category:</label>
                    <input
                      type="text"
                      value={fighterWeight}
                      onChange={e => setFighterWeight(e.target.value)}
                      required
                      placeholder="e.g. -77 kg"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-300 font-semibold">Home Club / Dojo:</label>
                    <input
                      type="text"
                      value={fighterAffiliation}
                      onChange={e => setFighterAffiliation(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Division / Belt Rank:</label>
                  <select
                    value={selectedDivision}
                    onChange={e => setSelectedDivision(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                  >
                    {activeFighterRegModal.divisions.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded space-y-1.5">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Medical & Safety Acknowledgment</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Fighter agrees to submit to weigh-ins on event morning, wear required safety equipment (mouthguard, groin guard, official rashguard), and adhere to referee stoppage commands.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-md shadow-red-600/30"
                >
                  Proceed to Payment ({currency === 'RWF' ? `${activeFighterRegModal.registrationFeeRwf.toLocaleString()} RWF` : `$${activeFighterRegModal.registrationFeeUsd} USD`})
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
