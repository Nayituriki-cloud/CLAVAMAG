import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { StudentDashboard } from './StudentDashboard';
import { InstructorDashboard } from './InstructorDashboard';
import { GymDashboard } from './GymDashboard';
import { AdminDashboard } from './AdminDashboard';
import { UserCheck, Shield, GraduationCap, Building2, UserCog } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { role, setRole } = useApp();

  const roleButtons: { id: UserRole; label: string; icon: any; note: string }[] = [
    { id: 'student', label: 'Student Fighter', icon: GraduationCap, note: 'Course progress, video player, verifiable certificates, booked dojo classes' },
    { id: 'instructor', label: 'Master Instructor', icon: Shield, note: 'Course builder, student grading, belt certificate issuer, class attendance' },
    { id: 'gym_owner', label: 'Dojo Manager', icon: Building2, note: 'QR mat check-in terminal, timetable scheduler, facility occupancy' },
    { id: 'admin', label: 'Super Admin', icon: UserCog, note: 'Global payments ledger (MTN MoMo, Airtel), dojo accreditation queue' },
  ];

  return (
    <div className="py-8 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Quick Role Switcher Toolbar */}
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider">
              <UserCheck className="w-4 h-4" />
              <span>Interactive Persona Simulation</span>
            </div>
            <span className="text-xs text-neutral-400">Switch role to test all 4 platform dashboards</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {roleButtons.map(item => {
              const Icon = item.icon;
              const isActive = role === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isActive
                      ? 'border-red-600 bg-red-600/10 text-white shadow-sm'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-neutral-500'}`} />
                    <span className={isActive ? 'text-white' : 'text-neutral-300'}>{item.label}</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1 line-clamp-1">{item.note}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Render corresponding dashboard */}
        {role === 'student' && <StudentDashboard />}
        {role === 'instructor' && <InstructorDashboard />}
        {role === 'gym_owner' && <GymDashboard />}
        {role === 'admin' && <AdminDashboard />}
      </div>
    </div>
  );
};
