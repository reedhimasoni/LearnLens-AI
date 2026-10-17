import React, { useState } from 'react';
import { ScreenType, PlannerScheduleItem } from '../../types';
import { ASSETS } from '../../data/mockData';

interface PlannerScreenProps {
  schedule: PlannerScheduleItem[];
  onToggleScheduleItem: (itemId: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export const PlannerScreen: React.FC<PlannerScreenProps> = ({
  schedule,
  onToggleScheduleItem,
  onNavigate,
  onRegenerate,
  isRegenerating
}) => {
  const [rationaleOpen, setRationaleOpen] = useState(true);
  const [activeDay, setActiveDay] = useState<'Wed' | 'Thu' | 'Fri' | 'Sat'>('Wed');
  const [exportToast, setExportToast] = useState(false);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [blockLength, setBlockLength] = useState('90');

  const workItems = schedule.filter(s => s.type === 'work');
  const completedWorkItems = workItems.filter(s => s.completed);

  const completedMinutes = completedWorkItems.reduce((acc, curr) => acc + curr.durationMin, 0);
  const totalMinutes = workItems.reduce((acc, curr) => acc + curr.durationMin, 0);
  const remainingMinutes = Math.max(0, totalMinutes - completedMinutes);

  const progressPercent = workItems.length > 0 ? (completedWorkItems.length / workItems.length) * 100 : 0;

  const handleExportCal = () => {
    setExportToast(true);
    setTimeout(() => setExportToast(false), 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 space-y-4">
      {/* Header Title & AI Status */}
      <div className="flex flex-col gap-1.5 pt-2">
        <div className="flex items-center justify-between">
          <h1 className="font-headline text-2xl font-extrabold text-on-surface">AI Study Planner</h1>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] font-bold shadow-xs">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            AI V4.2
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full w-fit">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span className="text-xs font-semibold">Schedule Optimized for Nov 18 Exam</span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-75"
        >
          <span className={`material-symbols-outlined text-[18px] ${isRegenerating ? 'animate-spin' : ''}`}>
            magic_button
          </span>
          <span>{isRegenerating ? 'Recalculating...' : 'Regenerate Plan'}</span>
        </button>
        <button
          onClick={() => setAdjustModalOpen(true)}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container-high text-on-surface text-xs sm:text-sm font-semibold shadow-xs active:scale-95 transition-all cursor-pointer hover:bg-surface-container-highest"
        >
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">tune</span>
          <span>Adjust Schedule</span>
        </button>
        <button
          onClick={handleExportCal}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container-high text-on-surface text-xs sm:text-sm font-semibold shadow-xs active:scale-95 transition-all cursor-pointer hover:bg-surface-container-highest"
        >
          <span className="material-symbols-outlined text-[18px] text-primary">event_upcoming</span>
          <span>Export to Google Cal</span>
        </button>
      </div>

      {/* Export Toast */}
      {exportToast && (
        <div className="p-3 bg-slate-900 text-white rounded-2xl text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">calendar_month</span>
            <span>Exported 6 study blocks to your Google Calendar!</span>
          </div>
          <span className="text-primary-fixed-dim font-bold">Synced</span>
        </div>
      )}

      {/* AI Rationale / Explanation Panel (Collapsible) */}
      <div className="bg-white rounded-3xl shadow-sm border border-surface-container/70 overflow-hidden transition-all duration-300">
        <button
          onClick={() => setRationaleOpen(!rationaleOpen)}
          className="w-full flex items-center justify-between p-4 text-left bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs sm:text-sm text-on-surface">Cognitive Rationale</span>
              <span className="text-[11px] text-on-surface-variant">Why this schedule was generated</span>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
              rationaleOpen ? 'rotate-0' : 'rotate-180'
            }`}
          >
            expand_less
          </span>
        </button>

        {rationaleOpen && (
          <div className="p-4 bg-white space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-2xl select-none">🧠</span>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                We prioritized <span className="font-bold text-primary">Virtual Memory</span> and{' '}
                <span className="font-bold text-primary">Semaphores</span> early because your diagnostic quiz indicated{' '}
                <span className="font-bold text-error">58% accuracy</span> here, and your final exam is in{' '}
                <span className="font-bold text-on-surface">72 hours</span>. Spaced recall buffers are interspersed for peak synaptic retention.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-4 text-on-surface-variant text-xs">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                High Urgency
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-tertiary" />
                Target: +28% Mastery
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Daily Mastery Progress Tracker */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-surface-container/70 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
            <span className="font-bold text-xs sm:text-sm text-on-surface">Today's Daily Target</span>
          </div>
          <span className="font-headline text-sm sm:text-base font-bold text-primary">
            {completedWorkItems.length} / {workItems.length} Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
          <span>
            Completed: <strong className="text-on-surface font-semibold">{(completedMinutes / 60).toFixed(1)} hrs</strong>
          </span>
          <span>
            Remaining: <strong className="text-on-surface font-semibold">{(remainingMinutes / 60).toFixed(1)} hrs</strong>
          </span>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {[
          { id: 'Wed', label: 'Today', sub: 'Wed' },
          { id: 'Thu', label: 'Thu', sub: 'Nov 16' },
          { id: 'Fri', label: 'Fri', sub: 'Nov 17' },
          { id: 'Sat', label: 'Sat (Exam)', sub: 'Nov 18', isExam: true }
        ].map((tab) => {
          const isSelected = activeDay === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDay(tab.id as any)}
              className={`flex-1 min-w-[85px] py-2.5 px-2 rounded-2xl text-center shadow-xs transition-all flex flex-col items-center cursor-pointer ${
                isSelected
                  ? 'bg-primary text-white font-bold'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              <span className={`text-xs ${tab.isExam && !isSelected ? 'text-error font-bold' : ''}`}>
                {tab.label}
              </span>
              <span className={`text-[11px] ${isSelected ? 'opacity-90' : 'text-on-surface-variant'}`}>
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeline Schedule Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-headline text-base font-bold text-on-surface">Timeline Schedule</h2>
          <span className="text-xs text-on-surface-variant">Tap cards to toggle</span>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 space-y-3 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-container-highest">
          {schedule.map((item) => {
            if (item.type === 'break') {
              return (
                <div key={item.id} className="relative">
                  <span className="absolute -left-[25px] top-3.5 w-4 h-4 rounded-full bg-tertiary-container ring-4 ring-[#faf8ff]" />
                  <div className="bg-surface-container-low p-3 rounded-2xl flex items-center justify-between text-on-surface border border-surface-container">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">☕</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs sm:text-sm text-on-surface">{item.category}</span>
                        <span className="font-mono text-[10px] text-on-surface-variant">
                          {item.timeRange} ({item.durationMin} min)
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-tertiary text-[20px]">air</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                onClick={() => onToggleScheduleItem(item.id)}
                className="relative cursor-pointer group"
              >
                <span
                  className={`status-marker absolute -left-[27px] top-4 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-[#faf8ff] shadow-xs transition-all ${
                    item.completed
                      ? 'bg-primary text-white'
                      : item.inProgress
                      ? 'bg-secondary text-white animate-pulse'
                      : 'bg-surface-container-highest text-transparent'
                  }`}
                >
                  {item.completed && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                  {item.inProgress && !item.completed && (
                    <span className="material-symbols-outlined text-[14px]">timelapse</span>
                  )}
                </span>

                <div
                  className={`p-4 rounded-3xl shadow-xs border transition-all flex flex-col gap-1.5 ${
                    item.completed
                      ? 'bg-surface-container-low border-transparent opacity-85'
                      : 'bg-white border-surface-container/70 hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[11px] ${
                        item.inProgress ? 'text-secondary font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      {item.timeRange}
                    </span>
                    {item.inProgress && !item.completed ? (
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-[9px] font-bold">
                          In Progress
                        </span>
                      </div>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-mono text-[10px]">
                        {item.durationMin} min
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] text-primary font-semibold">{item.category}</span>
                      <h4
                        className={`font-headline text-xs sm:text-sm truncate font-bold text-on-surface ${
                          item.completed ? 'line-through text-on-surface-variant' : ''
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[22px] shrink-0 ${
                        item.completed ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'
                      }`}
                      style={{ fontVariationSettings: item.completed ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {item.completed ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>

                  {item.subtitle && (
                    <p className="text-xs text-on-surface-variant line-clamp-1">{item.subtitle}</p>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    {item.subjectTag && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">
                        {item.subjectTag}
                      </span>
                    )}
                    {item.priorityTag && (
                      <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-semibold">
                        {item.priorityTag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject-wise Time Allocation Section */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-surface-container/70 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-base font-bold text-on-surface">Subject-wise Time Allocation</h3>
          <span className="font-mono text-xs text-on-surface-variant">Total: 23.5 hrs</span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-surface-container-high">
          <div className="h-full bg-primary" style={{ width: '60%' }} title="OS: 60%" />
          <div className="h-full bg-secondary-container" style={{ width: '25%' }} title="Data Structures: 25%" />
          <div className="h-full bg-tertiary-fixed-dim" style={{ width: '15%' }} title="Discrete Math: 15%" />
        </div>

        {/* Allocation Legends */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-2xl">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs text-on-surface truncate font-medium">OS</span>
            </div>
            <span className="font-bold text-sm text-primary">60%</span>
            <span className="font-mono text-[10px] text-on-surface-variant">14 hrs</span>
          </div>

          <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-2xl">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
              <span className="text-xs text-on-surface truncate font-medium">Data Struct</span>
            </div>
            <span className="font-bold text-sm text-secondary">25%</span>
            <span className="font-mono text-[10px] text-on-surface-variant">6 hrs</span>
          </div>

          <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-2xl">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim" />
              <span className="text-xs text-on-surface truncate font-medium">Discrete</span>
            </div>
            <span className="font-bold text-sm text-tertiary">15%</span>
            <span className="font-mono text-[10px] text-on-surface-variant">3.5 hrs</span>
          </div>
        </div>
      </div>

      {/* Topic Priority Matrix */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-surface-container/70 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">
              format_list_bulleted_add
            </span>
            <h3 className="font-headline text-base font-bold text-on-surface">Topic Priority Matrix</h3>
          </div>
          <span className="text-xs text-primary font-bold">Exam in 72h</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* P1 High Priority Card */}
          <div
            onClick={() => onNavigate('quiz')}
            className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2 py-1 rounded-full bg-error-container text-on-error-container font-mono text-[10px] font-bold shrink-0">
                P1 HIGH
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs sm:text-sm text-on-surface truncate">
                  Virtual Memory &amp; Semaphores
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Diagnostic: 58% | Urgency: Critical
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-error text-[20px]">priority_high</span>
          </div>

          {/* P2 Medium Priority Card */}
          <div
            onClick={() => onNavigate('quiz')}
            className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2 py-1 rounded-full bg-surface-container-high text-on-surface font-mono text-[10px] font-bold shrink-0">
                P2 MED
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs sm:text-sm text-on-surface truncate">
                  B-Trees &amp; Graph Traversals
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Diagnostic: 74% | Practice required
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">schedule</span>
          </div>

          {/* P3 Review Priority Card */}
          <div
            onClick={() => onNavigate('quiz')}
            className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2 py-1 rounded-full bg-surface-container text-on-surface-variant font-mono text-[10px] font-bold shrink-0">
                P3 REV
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs sm:text-sm text-on-surface truncate">
                  Propositional Logic &amp; Sets
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Diagnostic: 91% | Maintenance flashcards
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">check</span>
          </div>
        </div>
      </div>

      {/* Study Context Visual Banner */}
      <div
        className="relative w-full rounded-3xl overflow-hidden shadow-sm h-32 flex items-center justify-between p-5 text-white"
        style={{
          backgroundImage: `url('${ASSETS.studyCoachBanner}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-primary/75 backdrop-blur-xs" />
        <div className="relative z-10 flex flex-col gap-1 max-w-[70%]">
          <span className="font-mono text-[10px] text-on-primary-container uppercase font-bold tracking-wider">
            Study Coach Advice
          </span>
          <span className="font-headline text-lg text-white font-extrabold leading-tight">
            Stick to 90m blocks.
          </span>
          <span className="text-xs text-on-primary-container leading-snug">
            Cortisol stays balanced, memory consolidation hits top performance.
          </span>
        </div>
        <div className="relative z-10 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
          <span className="material-symbols-outlined text-white text-[24px]">psychology</span>
        </div>
      </div>

      {/* Adjust Schedule Modal */}
      {adjustModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h4 className="font-headline font-bold text-base text-on-surface">Adjust Session Layout</h4>
              <button
                onClick={() => setAdjustModalOpen(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-on-surface-variant font-semibold">Deep Work Session Length</label>
                <select
                  value={blockLength}
                  onChange={(e) => setBlockLength(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs border border-transparent focus:border-primary outline-none mt-1"
                >
                  <option value="45">45 Minutes (Ultradian Sprint)</option>
                  <option value="60">60 Minutes (Standard Hour)</option>
                  <option value="90">90 Minutes (Optimal Peak Cognitive)</option>
                  <option value="120">120 Minutes (Deep Dive Marathon)</option>
                </select>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                LearnLens automatically spaces 15-minute hydration and active recall pauses around your selected session length.
              </p>
            </div>
            <button
              onClick={() => {
                setAdjustModalOpen(false);
                onRegenerate();
              }}
              className="w-full py-3 rounded-2xl bg-primary text-white text-xs font-bold"
            >
              Apply &amp; Rebalance Timeline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
