import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrainingAcademy } from './components/TrainingAcademy';
import { DisciplinesSection } from './components/DisciplinesSection';
import { SelfDefenseSystem } from './components/SelfDefenseSystem';
import { FitnessSection } from './components/FitnessSection';
import { FindGym } from './components/FindGym';
import { InstructorsSection } from './components/InstructorsSection';
import { CompetitionsSection } from './components/CompetitionsSection';
import { CommunityHub } from './components/CommunityHub';
import { MembershipSection } from './components/MembershipSection';
import { DashboardView } from './components/dashboards/DashboardView';
import { LessonPlayerModal } from './components/LessonPlayerModal';
import { CertificateModal } from './components/CertificateModal';
import { PaymentModal } from './components/PaymentModal';
import { Footer } from './components/Footer';
import { Shield, Home, BookOpen, MapPin, Award, User, Flame } from 'lucide-react';
import { DisciplineId } from './types';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { lang, openPayment } = useApp();

  const handleSelectDiscipline = (discId: DisciplineId) => {
    setActiveTab('academy');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white pb-16 lg:pb-0">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onExploreAcademy={() => setActiveTab('academy')}
              onFindGym={() => setActiveTab('gyms')}
              onExploreSelfDefense={() => setActiveTab('self-defense')}
            />

            {/* Quick Spotlight Section on Home */}
            <section className="py-12 bg-neutral-900/40 border-b border-neutral-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="text-xs font-bold text-red-500 uppercase tracking-wider">
                      Academy Core Curriculum
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mt-1">
                      Featured Training Tracks
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('academy')}
                    className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1"
                  >
                    <span>View all courses & certifications →</span>
                  </button>
                </div>

                {/* Training Academy preview */}
                <div className="pt-2">
                  <TrainingAcademy />
                </div>
              </div>
            </section>

            {/* Self-Defense Spotlight */}
            <section className="py-12 bg-neutral-950 border-b border-neutral-800">
              <SelfDefenseSystem />
            </section>

            {/* Fitness Section preview */}
            <section className="py-12 bg-neutral-900/40 border-b border-neutral-800">
              <FitnessSection />
            </section>

            {/* Gyms & Dojos */}
            <section className="py-12 bg-neutral-950 border-b border-neutral-800">
              <FindGym />
            </section>

            {/* Competitions */}
            <section className="py-12 bg-neutral-900/40 border-b border-neutral-800">
              <CompetitionsSection />
            </section>

            {/* Membership */}
            <section className="py-12 bg-neutral-950">
              <MembershipSection />
            </section>
          </>
        )}

        {activeTab === 'academy' && <TrainingAcademy />}
        {activeTab === 'disciplines' && <DisciplinesSection onSelectDiscipline={handleSelectDiscipline} />}
        {activeTab === 'self-defense' && <SelfDefenseSystem />}
        {activeTab === 'fitness' && <FitnessSection />}
        {activeTab === 'gyms' && <FindGym />}
        {activeTab === 'instructors' && <InstructorsSection />}
        {activeTab === 'competitions' && <CompetitionsSection />}
        {activeTab === 'community' && <CommunityHub />}
        {activeTab === 'membership' && <MembershipSection />}
        {activeTab === 'dashboard' && <DashboardView />}
      </main>

      {/* Global Modals */}
      <LessonPlayerModal />
      <CertificateModal />
      <PaymentModal />

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Mobile Ergonomic Bottom Tab Bar (Pattern 1 from Mobile reference) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 grid grid-cols-5 items-center h-16 px-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center min-h-[44px] ${
            activeTab === 'home' ? 'text-red-500 font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('academy')}
          className={`flex flex-col items-center justify-center min-h-[44px] ${
            activeTab === 'academy' ? 'text-red-500 font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Academy</span>
        </button>

        <button
          onClick={() => setActiveTab('fitness')}
          className={`flex flex-col items-center justify-center min-h-[44px] ${
            activeTab === 'fitness' ? 'text-red-500 font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Flame className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Timer</span>
        </button>

        <button
          onClick={() => setActiveTab('gyms')}
          className={`flex flex-col items-center justify-center min-h-[44px] ${
            activeTab === 'gyms' ? 'text-red-500 font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Gyms</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center min-h-[44px] ${
            activeTab === 'dashboard' ? 'text-red-500 font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">My Pass</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
