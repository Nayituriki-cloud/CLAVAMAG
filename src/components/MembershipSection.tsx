import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Check, Star, Zap } from 'lucide-react';

export const MembershipSection: React.FC = () => {
  const { currency, openPayment, user, lang } = useApp();

  const plans = [
    {
      id: 'free',
      name: 'Cadet Free Tier',
      tagline: 'Basic foundations & workout timer',
      priceRwf: 0,
      priceUsd: 0,
      features: [
        'Introductory Krav Maga & Boxing previews',
        'Unlimited access to Championship Round Timer',
        'Community discussion board participation',
        'Local gym directory & tournament discovery',
      ],
      isPopular: false,
    },
    {
      id: 'pro',
      name: 'Pro Warrior All-Access',
      tagline: 'Complete academy courses & local dojos',
      priceRwf: 65000,
      priceUsd: 48,
      features: [
        'Full unlimited access to all 12 combat curricula',
        'Verifiable official certificates of completion',
        'In-person mat access at Kigali Central & partner dojos',
        '15% fighter discount on all championship registrations',
        'Direct instructor feedback on submitted drill videos',
      ],
      isPopular: true,
    },
    {
      id: 'elite',
      name: 'Elite Black Belt Academy',
      tagline: 'Global dojo passport & 1-on-1 master coaching',
      priceRwf: 110000,
      priceUsd: 85,
      features: [
        'Worldwide dojo passport (Kigali, Rubavu, Paris, London)',
        'Monthly 1-on-1 private session with Master Erick or Professor Tiago',
        'VIP ringside spectator pass to all regional tournaments',
        'Exclusive law-enforcement & advanced weapon tactical seminars',
        'Federation official black uniform & gear package voucher',
      ],
      isPopular: false,
    },
  ];

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (plan.id === 'free') return;

    openPayment({
      itemType: 'membership',
      title: `Membership: ${plan.name}`,
      amountRwf: plan.priceRwf,
      amountUsd: plan.priceUsd,
      onSuccess: () => {
        // Updated in context
      },
    });
  };

  return (
    <div className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Academy & Dojo Membership</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            {lang === 'rw' ? 'Hitamo Ifatabuguzi Rikubereye' : lang === 'fr' ? 'Adhésion & Abonnements' : 'Transparent Combat Membership'}
          </h2>
          <p className="text-sm text-neutral-400">
            Train online anywhere or step directly onto the mats at our certified partner dojos. Activate instantly with MTN MoMo, Airtel Money, or credit card.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map(plan => {
            const isCurrent = user.membershipPlan === (plan.id === 'pro' ? 'Pro Warrior' : plan.id === 'elite' ? 'Elite Black Belt' : 'Free');
            return (
              <div
                key={plan.id}
                className={`p-8 rounded-2xl flex flex-col justify-between transition-all relative ${
                  plan.isPopular
                    ? 'bg-neutral-900 border-2 border-red-600 shadow-2xl shadow-red-600/20'
                    : 'bg-neutral-900/60 border border-neutral-800'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-full shadow">
                    Most Popular Fighter Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">{plan.tagline}</p>
                  </div>

                  <div className="py-2 border-y border-neutral-800">
                    <div className="font-display text-4xl font-black text-white tabular-nums tracking-tight">
                      {plan.priceRwf === 0 ? (
                        'Free'
                      ) : currency === 'RWF' ? (
                        <>
                          {plan.priceRwf.toLocaleString()} <span className="text-sm font-sans font-normal text-neutral-400">RWF/mo</span>
                        </>
                      ) : (
                        <>
                          ${plan.priceUsd} <span className="text-sm font-sans font-normal text-neutral-400">USD/mo</span>
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs text-neutral-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isCurrent}
                    className={`w-full py-3 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 cursor-default'
                        : plan.isPopular
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                    }`}
                  >
                    {isCurrent ? 'Current Active Plan' : plan.priceRwf === 0 ? 'Included by Default' : 'Upgrade via MoMo / Card'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
