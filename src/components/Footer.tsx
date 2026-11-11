import React from 'react';
import { Shield, MapPin, Mail, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { lang } = useApp();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Federation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-bold">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-white uppercase">
                CRAVA MAGA
              </span>
            </div>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              International martial arts, self-defense, and combat conditioning academy. Founded on tactical efficiency, mutual respect, and life preservation.
            </p>
            <div className="space-y-1 text-neutral-500 text-[11px]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Headquarters: KN 3 Ave, Kimihurura, Kigali, Rwanda</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>contact@cravamaga.rw</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>+250 788 456 789 / +33 1 42 68 00 00</span>
              </div>
            </div>
          </div>

          {/* Academy Disciplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Disciplines
            </h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li><button onClick={() => onNavigate('disciplines')} className="hover:text-white transition-colors">Krav Maga Tactical</button></li>
              <li><button onClick={() => onNavigate('disciplines')} className="hover:text-white transition-colors">Brazilian Jiu-Jitsu</button></li>
              <li><button onClick={() => onNavigate('disciplines')} className="hover:text-white transition-colors">Championship Boxing</button></li>
              <li><button onClick={() => onNavigate('disciplines')} className="hover:text-white transition-colors">Muay Thai & Clinch</button></li>
              <li><button onClick={() => onNavigate('disciplines')} className="hover:text-white transition-colors">Mixed Martial Arts</button></li>
              <li><button onClick={() => onNavigate('disciplines')} className="hover:text-white transition-colors">Street Self-Defense</button></li>
            </ul>
          </div>

          {/* Platform Centers */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Platform
            </h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li><button onClick={() => onNavigate('academy')} className="hover:text-white transition-colors">Online Video Academy</button></li>
              <li><button onClick={() => onNavigate('self-defense')} className="hover:text-white transition-colors">Tactical Self-Defense</button></li>
              <li><button onClick={() => onNavigate('fitness')} className="hover:text-white transition-colors">Round Timer & Conditioning</button></li>
              <li><button onClick={() => onNavigate('gyms')} className="hover:text-white transition-colors">Find a Dojo Mat</button></li>
              <li><button onClick={() => onNavigate('competitions')} className="hover:text-white transition-colors">Tournaments & Tickets</button></li>
              <li><button onClick={() => onNavigate('community')} className="hover:text-white transition-colors">Fighter Community</button></li>
            </ul>
          </div>

          {/* Regional Payment Channels */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Settlement Channels
            </h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Instant mobile and card activations supported in RWF, USD, and EUR:
            </p>
            <div className="space-y-1 text-[11px] text-neutral-300">
              <div>• MTN Mobile Money (*182#)</div>
              <div>• Airtel Money (*500#)</div>
              <div>• Visa & Mastercard</div>
              <div>• Direct Bank of Kigali (BK) Wire</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} CRAVA MAGA International Martial Arts & Fitness Academy. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>Train Strong</span>
            <span>·</span>
            <span>Fight Smart</span>
            <span>·</span>
            <span>Stay Safe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
