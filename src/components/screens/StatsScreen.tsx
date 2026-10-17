import React, { useState } from 'react';
import { ScreenType } from '../../types';

interface StatsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenFlashcards: (topic?: string) => void;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ onNavigate, onOpenFlashcards }) => {
  const [filterRange, setFilterRange] = useState<'week' | 'month' | 'semester'>('week');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planSuccessToast, setPlanSuccessToast] = useState(false);

  // Dynamic stats based on filter
  const statsData = {
    week: {
      readiness: 84,
      studyHours: '34.5',
      goalHours: '40',
      accuracy: 88,
      questionsCount: 142,
      streak: 12,
      dashOffset: 40.2
    },
    month: {
      readiness: 79,
      studyHours: '118.2',
      goalHours: '130',
      accuracy: 84,
      questionsCount: 520,
      streak: 28,
      dashOffset: 55.0
    },
    semester: {
      readiness: 76,
      studyHours: '284.0',
      goalHours: '300',
      accuracy: 82,
      questionsCount: 1240,
      streak: 45,
      dashOffset: 65.3
    }
  }[filterRange];

  const handleGenerateTargetedPlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setIsGeneratingPlan(false);
      setPlanSuccessToast(true);
      setTimeout(() => {
        setPlanSuccessToast(false);
        onNavigate('planner');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 space-y-4">
      {/* Interactive Filter Tabs */}
      <div className="flex items-center justify-between pt-2">
        <div className="inline-flex p-1 rounded-full bg-surface-container shadow-xs w-full">
          <button
            onClick={() => setFilterRange('week')}
            className={`filter-btn flex-1 py-1.5 rounded-full text-center text-xs font-semibold transition-all duration-300 cursor-pointer ${
              filterRange === 'week'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setFilterRange('month')}
            className={`filter-btn flex-1 py-1.5 rounded-full text-center text-xs font-semibold transition-all duration-300 cursor-pointer ${
              filterRange === 'month'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setFilterRange('semester')}
            className={`filter-btn flex-1 py-1.5 rounded-full text-center text-xs font-semibold transition-all duration-300 cursor-pointer ${
              filterRange === 'semester'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Semester
          </button>
        </div>
      </div>

      {/* Primary Mastery Hero: Circular Readiness Dial & Quick Sparks */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-surface-container/70">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-container/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex flex-col space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-secondary font-bold">
              Mastery Index
            </span>
            <h2 className="font-headline text-xl font-bold text-on-surface leading-tight">
              Exam Readiness
            </h2>
            <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-surface-container-low text-primary w-fit">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span className="text-xs font-semibold">+6% from last week</span>
            </div>
          </div>

          {/* High-Precision Radial SVG Gauge */}
          <div className="relative flex items-center justify-center shrink-0 w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#eaedff" strokeWidth="8" />
              <circle
                className="transition-all duration-1000 ease-out"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="url(#electric-indigo-stats)"
                strokeDasharray="251.2"
                strokeDashoffset={statsData.dashOffset}
                strokeLinecap="round"
                strokeWidth="8"
              />
              <defs>
                <linearGradient id="electric-indigo-stats" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#712ae2" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="font-headline text-2xl font-bold text-on-surface leading-none">
                {statsData.readiness}
                <span className="text-secondary text-sm font-semibold">%</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant mt-0.5">
                OPTIMAL
              </span>
            </div>
          </div>
        </div>

        {/* Micro Stats Trio Bento */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 bg-surface-container-low/70 p-2.5 rounded-2xl">
          <div className="flex flex-col items-center text-center p-1">
            <span className="font-mono text-[10px] text-on-surface-variant flex items-center gap-0.5 font-bold">
              <span className="material-symbols-outlined text-[12px] text-primary">schedule</span> STUDY
            </span>
            <span className="font-headline text-base font-bold text-on-surface mt-0.5">
              {statsData.studyHours}
              <span className="text-xs font-normal text-on-surface-variant">h</span>
            </span>
            <span className="text-[10px] text-on-surface-variant">Goal: {statsData.goalHours}h</span>
          </div>

          <div className="flex flex-col items-center text-center p-1 bg-white rounded-xl shadow-xs">
            <span className="font-mono text-[10px] text-on-surface-variant flex items-center gap-0.5 font-bold">
              <span className="material-symbols-outlined text-[12px] text-tertiary-fixed-dim">verified</span> ACCURACY
            </span>
            <span className="font-headline text-base font-bold text-primary mt-0.5">
              {statsData.accuracy}%
            </span>
            <span className="text-[10px] text-on-surface-variant">{statsData.questionsCount} Qs logged</span>
          </div>

          <div className="flex flex-col items-center text-center p-1">
            <span className="font-mono text-[10px] text-on-surface-variant flex items-center gap-0.5 font-bold">
              <span className="text-xs">🔥</span> STREAK
            </span>
            <span className="font-headline text-base font-bold text-secondary mt-0.5">
              {statsData.streak}
            </span>
            <span className="text-[10px] text-secondary font-medium">Days active</span>
          </div>
        </div>
      </div>

      {/* AI Cognitive Insights Callout Card */}
      <div className="relative overflow-hidden rounded-3xl bg-surface-container-high p-4 shadow-xs border border-surface-container">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20 text-white">
            <span className="material-symbols-outlined text-[20px]">psychology</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary tracking-wide">LearnLens Cognitive Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
            </div>
            <p className="text-xs text-on-surface mt-1 leading-relaxed">
              Reedhima, your retention curve shows rapid decay in{' '}
              <strong className="text-secondary font-semibold">Semaphore logic</strong> after 48 hours. We scheduled a 15-minute spaced repetition review for Thursday evening.
            </p>
          </div>
        </div>
      </div>

      {/* Subject-Wise Mastery Progress Cards */}
      <div className="flex flex-col space-y-2.5 bg-white p-5 rounded-3xl shadow-sm border border-surface-container/70">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">bar_chart</span>
            <h3 className="font-headline text-base font-bold text-on-surface">Subject Mastery</h3>
          </div>
          <span className="font-mono text-xs text-on-surface-variant font-bold">4 MODULES</span>
        </div>

        {/* Data Structures */}
        <div className="p-3 rounded-2xl bg-surface-container-low transition-all">
          <div className="flex justify-between items-center text-on-surface">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary" />
              <span className="text-xs sm:text-sm font-semibold">Data Structures &amp; Algorithms</span>
            </div>
            <span className="font-bold text-xs sm:text-sm text-tertiary">92%</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-tertiary h-full rounded-full transition-all duration-700" style={{ width: '92%' }} />
          </div>
          <div className="flex justify-between items-center mt-1.5 text-[11px] text-on-surface-variant">
            <span>Concept mastery: High</span>
            <span className="text-tertiary font-medium">Mastered</span>
          </div>
        </div>

        {/* Computer Networks */}
        <div className="p-3 rounded-2xl bg-surface-container-low transition-all">
          <div className="flex justify-between items-center text-on-surface">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
              <span className="text-xs sm:text-sm font-semibold">Computer Networks</span>
            </div>
            <span className="font-bold text-xs sm:text-sm text-tertiary-container">88%</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-tertiary-fixed-dim h-full rounded-full transition-all duration-700" style={{ width: '88%' }} />
          </div>
          <div className="flex justify-between items-center mt-1.5 text-[11px] text-on-surface-variant">
            <span>Subnetting, TCP/IP</span>
            <span className="text-tertiary-container font-medium">Proficient</span>
          </div>
        </div>

        {/* Discrete Mathematics */}
        <div className="p-3 rounded-2xl bg-surface-container-low transition-all">
          <div className="flex justify-between items-center text-on-surface">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs sm:text-sm font-semibold">Discrete Mathematics</span>
            </div>
            <span className="font-bold text-xs sm:text-sm text-primary">74%</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: '74%' }} />
          </div>
          <div className="flex justify-between items-center mt-1.5 text-[11px] text-on-surface-variant">
            <span>Combinatorics &amp; Logic</span>
            <span className="text-primary font-medium">Moderate</span>
          </div>
        </div>

        {/* Operating Systems (Needs urgent focus) */}
        <div className="p-3 rounded-2xl bg-error-container/40 border border-error-container/60 transition-all">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-error">warning</span>
              <span className="text-xs sm:text-sm font-bold text-on-surface">Operating Systems</span>
            </div>
            <span className="font-bold text-xs sm:text-sm text-error">64%</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-error h-full rounded-full transition-all duration-700" style={{ width: '64%' }} />
          </div>
          <div className="flex justify-between items-center mt-1.5 text-[11px] text-error font-medium">
            <span>Deadlocks, Paging</span>
            <span className="font-bold">⚠️ Needs Urgent Revision</span>
          </div>
        </div>
      </div>

      {/* Study Velocity & Cognitive Curve */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-surface-container/70 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-base font-bold text-on-surface">7-Day Study Velocity</h3>
            <p className="text-xs text-on-surface-variant">Peak retention windows &amp; hourly load</p>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-mono text-[10px] font-bold">
            AVG 4.9h/d
          </div>
        </div>

        {/* Mini chart visualization using CSS bars */}
        <div className="pt-4 pb-1">
          <div className="flex items-end justify-between h-32 px-1">
            {[
              { day: 'MON', h: 56 },
              { day: 'TUE', h: 80 },
              { day: 'WED', h: 48 },
              { day: 'THU', h: 96, peak: true, val: '6.2h' },
              { day: 'FRI', h: 64 },
              { day: 'SAT', h: 80 },
              { day: 'SUN', h: 56 }
            ].map((d, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 group cursor-pointer">
                <div className="relative w-6 flex items-end justify-center h-24">
                  {d.peak && (
                    <div className="absolute -top-5 px-1 py-0.5 rounded bg-primary text-white font-mono text-[9px] shadow-xs">
                      {d.val}
                    </div>
                  )}
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      d.peak
                        ? 'bg-gradient-to-t from-primary to-secondary shadow-md'
                        : 'bg-surface-container group-hover:bg-primary/40'
                    }`}
                    style={{ height: `${d.h}px` }}
                  />
                </div>
                <span className={`font-mono text-[10px] ${d.peak ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cognitive Status Insight strip */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-surface-container-low text-on-surface">
          <span className="material-symbols-outlined text-secondary text-[20px]">psychology_alt</span>
          <span className="text-xs leading-tight">
            Optimal mental focus window detected between <strong>09:00 AM – 11:30 AM</strong> based on prompt accuracy.
          </span>
        </div>
      </div>

      {/* Weak Topics Diagnostic Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-error text-[20px]">healing</span>
            <h3 className="font-headline text-base font-bold text-on-surface">Precision Focus Areas</h3>
          </div>
          <span className="text-xs text-secondary font-bold">2 Flags</span>
        </div>

        {/* Diagnostic Item 1 */}
        <div className="p-4 rounded-3xl bg-white shadow-sm border border-surface-container/70 flex flex-col space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-error">
                <span className="material-symbols-outlined text-[16px]">report_problem</span>
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                  Critical Memory Leak
                </span>
              </div>
              <h4 className="font-headline font-bold text-sm text-on-surface mt-0.5 truncate">
                Virtual Memory Page Faults
              </h4>
              <span className="text-xs text-on-surface-variant">Last practiced 3 days ago • Operating Systems</span>
            </div>
            <div className="px-2 py-1 rounded-xl bg-error-container text-on-error-container font-mono text-xs font-bold">
              54%
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-on-surface-variant">Target accuracy: 80%</span>
            <button
              onClick={() => onOpenFlashcards('Virtual Memory Page Faults')}
              className="px-3 py-1.5 rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-white text-xs font-semibold transition-colors duration-200 flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Review Topic</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Item 2 */}
        <div className="p-4 rounded-3xl bg-white shadow-sm border border-surface-container/70 flex flex-col space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[16px]">sync_problem</span>
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                  Concurrency Drift
                </span>
              </div>
              <h4 className="font-headline font-bold text-sm text-on-surface mt-0.5 truncate">
                Process Synchronization (Semaphores)
              </h4>
              <span className="text-xs text-on-surface-variant">Last practiced yesterday • Concurrency</span>
            </div>
            <div className="px-2 py-1 rounded-xl bg-surface-container-highest text-primary font-mono text-xs font-bold">
              61%
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-on-surface-variant">Estimated time: 6 mins</span>
            <button
              onClick={() => onNavigate('quiz')}
              className="px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-white text-xs font-semibold transition-colors duration-200 flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Practice 5 MCQs</span>
              <span className="material-symbols-outlined text-[14px]">bolt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Dynamic Action Button */}
      <div className="pt-2 pb-2">
        <button
          onClick={handleGenerateTargetedPlan}
          disabled={isGeneratingPlan}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-headline text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
        >
          <span className={`material-symbols-outlined text-[20px] ${isGeneratingPlan ? 'animate-spin' : ''}`}>
            {isGeneratingPlan ? 'refresh' : 'bolt'}
          </span>
          <span>
            {isGeneratingPlan
              ? 'Synthesizing Micro-Schedule...'
              : planSuccessToast
              ? 'Targeted Plan Ready!'
              : 'Create Targeted Revision Plan'}
          </span>
        </button>
      </div>
    </div>
  );
};
