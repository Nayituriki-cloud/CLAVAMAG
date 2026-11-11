import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, Shield, CheckCircle, Printer, Download, Share2 } from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { activeCertificate, closeCertificate } = useApp();

  if (!activeCertificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-auto text-neutral-100">
        {/* Modal Controls */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>Official Academy Credential Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={closeCertificate}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Area */}
        <div className="p-6 sm:p-10 bg-neutral-950">
          <div className="relative p-8 sm:p-12 border-4 border-double border-red-700/60 rounded-xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 shadow-2xl text-center space-y-6">
            {/* Top Emblem */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600/10 border-2 border-red-600 flex items-center justify-center text-red-500 shadow-lg shadow-red-600/20">
                <Shield className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-red-500 font-bold">
                CRAVA MAGA INTERNATIONAL MARTIAL ARTS ACADEMY
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-white uppercase">
                Certificate of Completion
              </h1>
              <div className="text-xs text-neutral-400 tracking-wide">
                KIGALI · NAIROBI · PARIS · INTERNATIONAL COMBAT FEDERATION
              </div>
            </div>

            <div className="py-2">
              <div className="text-xs text-neutral-400 italic">This certifies that</div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase mt-1 border-b border-red-600/40 pb-2 inline-block px-8">
                {activeCertificate.studentName}
              </div>
            </div>

            <div className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-300 leading-relaxed">
              has successfully completed all rigorous tactical requirements, combat simulations, and technical evaluations for
              <div className="font-bold text-white text-base mt-1 text-red-400">
                {activeCertificate.courseTitle}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Discipline: <span className="text-white font-medium">{activeCertificate.discipline}</span> · Distinction: <span className="text-emerald-400 font-medium">{activeCertificate.grade}</span>
              </div>
            </div>

            {/* Footer with Signatures and QR Code */}
            <div className="pt-8 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-xs">
              <div className="text-left space-y-1">
                <div className="font-serif italic text-sm text-neutral-300">
                  {activeCertificate.instructorName}
                </div>
                <div className="w-32 border-b border-neutral-700" />
                <div className="text-[11px] text-neutral-500 uppercase tracking-wider">
                  Lead Master Instructor
                </div>
              </div>

              {/* QR Verification Stamp */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 p-1 bg-white rounded border border-neutral-700 flex items-center justify-center">
                  <div className="w-full h-full bg-neutral-900 grid grid-cols-3 gap-0.5 p-1">
                    <div className="bg-white" />
                    <div className="bg-neutral-900" />
                    <div className="bg-white" />
                    <div className="bg-neutral-900" />
                    <div className="bg-white" />
                    <div className="bg-white" />
                    <div className="bg-white" />
                    <div className="bg-white" />
                    <div className="bg-neutral-900" />
                  </div>
                </div>
                <div className="text-[10px] font-mono text-neutral-500 mt-1">
                  {activeCertificate.certificateCode}
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-neutral-300 font-medium">
                  {activeCertificate.issueDate}
                </div>
                <div className="w-32 ml-auto border-b border-neutral-700" />
                <div className="text-[11px] text-neutral-500 uppercase tracking-wider">
                  Date of Conferral
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
