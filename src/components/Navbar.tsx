import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, LanguageCode } from '../types';
import { Shield, Sun, Moon, Globe, Menu, X, ChevronDown, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { lang, setLang, theme, toggleTheme, role, setRole, user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'academy', label: lang === 'rw' ? 'Ishuri' : lang === 'fr' ? 'Académie' : 'Academy' },
    { id: 'disciplines', label: lang === 'rw' ? 'Imikino' : lang === 'fr' ? 'Disciplines' : 'Disciplines' },
    { id: 'self-defense', label: lang === 'rw' ? 'Kwirwanaho' : lang === 'fr' ? 'Auto-Défense' : 'Self-Defense' },
    { id: 'fitness', label: lang === 'rw' ? 'Imyitozo' : lang === 'fr' ? 'Conditionnement' : 'Fitness' },
    { id: 'gyms', label: lang === 'rw' ? 'Ama-Gym' : lang === 'fr' ? 'Dojos' : 'Find Gym' },
    { id: 'competitions', label: lang === 'rw' ? 'Amarushanwa' : lang === 'fr' ? 'Tournois' : 'Tournaments' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const rolesList: { id: UserRole; label: string; desc: string }[] = [
    { id: 'student', label: 'Student', desc: 'Practitioner, Courses & Certificates' },
    { id: 'instructor', label: 'Instructor', desc: 'Teach, Upload Classes & Grade' },
    { id: 'gym_owner', label: 'Gym Manager', desc: 'Dojo Roster, Attendance & Plans' },
    { id: 'admin', label: 'Administrator', desc: 'Global Platform, Audits & MoMo Ledger' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-md bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-600/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-neutral-900 dark:text-white uppercase whitespace-nowrap">
              CRAVA MAGA
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 hover:text-red-600 dark:hover:text-red-400 relative ${
                  isActive
                    ? 'text-red-600 dark:text-red-400 font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setPersonaDropdownOpen(false);
              }}
              className="flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              title="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span className="uppercase">{lang}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl py-1 z-50 text-xs">
                <button
                  onClick={() => {
                    setLang('en');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between ${
                    lang === 'en' ? 'text-red-600 font-bold' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span>English (EN)</span>
                  {lang === 'en' && <span>✓</span>}
                </button>
                <button
                  onClick={() => {
                    setLang('fr');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between ${
                    lang === 'fr' ? 'text-red-600 font-bold' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span>Français (FR)</span>
                  {lang === 'fr' && <span>✓</span>}
                </button>
                <button
                  onClick={() => {
                    setLang('rw');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between ${
                    lang === 'rw' ? 'text-red-600 font-bold' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span>Kinyarwanda (RW)</span>
                  {lang === 'rw' && <span>✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark and Light theme"
            className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* Persona / Role Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setPersonaDropdownOpen(!personaDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="capitalize">{role.replace('_', ' ')}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {personaDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl py-1 z-50 text-xs">
                <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 font-semibold uppercase text-[10px] tracking-wider">
                  Switch Active Persona
                </div>
                {rolesList.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setRole(item.id);
                      setPersonaDropdownOpen(false);
                      setActiveTab('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                      role === item.id ? 'bg-red-50 dark:bg-red-950/30 text-red-600 font-semibold' : 'text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <div className="font-medium text-xs">{item.label}</div>
                    <div className="text-[10px] text-neutral-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA: Dashboard / My Training */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-all shadow-md shadow-red-600/20 whitespace-nowrap shrink-0"
          >
            {activeTab === 'dashboard'
              ? (lang === 'rw' ? 'Icyicaro' : lang === 'fr' ? 'Espace Pro' : 'Active Center')
              : (lang === 'rw' ? 'Amahugurwa Yanjye' : lang === 'fr' ? 'Mon Espace' : 'My Training')}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium pb-2 border-b border-neutral-200 dark:border-neutral-800">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-md ${
                  activeTab === link.id
                    ? 'bg-red-600/10 text-red-600 font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('community')}
              className="text-left px-3 py-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              {lang === 'rw' ? 'Umuryango' : lang === 'fr' ? 'Communauté' : 'Community'}
            </button>
            <button
              onClick={() => handleNavClick('membership')}
              className="text-left px-3 py-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              {lang === 'rw' ? 'Ifatabuguzi' : lang === 'fr' ? 'Abonnement' : 'Membership'}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
            <span>Role:</span>
            <div className="flex gap-1">
              {(['student', 'instructor', 'gym_owner', 'admin'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    handleNavClick('dashboard');
                  }}
                  className={`px-2 py-1 rounded text-[11px] capitalize ${
                    role === r ? 'bg-red-600 text-white font-bold' : 'bg-neutral-100 dark:bg-neutral-800'
                  }`}
                >
                  {r.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
