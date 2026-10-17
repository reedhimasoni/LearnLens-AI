import React, { useState } from 'react';
import { ScreenType, TaskItem } from '../../types';

interface DashboardScreenProps {
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
  onNavigate: (screen: ScreenType) => void;
  xp: number;
  onOpenFlashcards: (topic?: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  tasks,
  onToggleTask,
  onNavigate,
  xp,
  onOpenFlashcards
}) => {
  const [synced, setSynced] = useState(false);
  const [selectedVelocityDay, setSelectedVelocityDay] = useState<string | null>('Thu');

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleSyncCalendar = () => {
    setSynced(true);
    setTimeout(() => setSynced(false), 2500);
  };

  const daysVelocity = [
    { day: 'M', hours: '2.8h', height: 56, isPeak: false },
    { day: 'T', hours: '3.5h', height: 70, isPeak: false },
    { day: 'W', hours: '3.1h', height: 62, isPeak: false },
    { day: 'T', hours: '4.2h', height: 84, isPeak: true },
    { day: 'F', hours: '3.8h', height: 76, isPeak: false },
    { day: 'S', hours: '2.4h', height: 48, isPeak: false },
    { day: 'S', hours: '2.0h', height: 40, isPeak: false }
  ];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 space-y-4">
      {/* Header Section with Student Context & XP Sparkle */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="font-headline text-2xl font-extrabold text-on-surface">
              Welcome back, Reedhima!
            </h1>
            <span className="inline-block animate-bounce text-xl">👋</span>
          </div>
          <p className="text-sm text-on-surface-variant">
            You are <span className="font-bold text-primary">78% on track</span> for Midterm Finals week.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
          <span className="font-mono text-xs tracking-wider font-extrabold">
            {xp.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Hero Banner: AI Study Plan Generator Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-container via-primary to-secondary p-5 shadow-xl text-white">
        {/* Atmospheric Ambient Glow Rings */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-secondary-container/40 blur-2xl pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-white/15 blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[13px]">auto_awesome</span> Adaptive Copilot
            </span>
            <span className="text-xs text-on-primary-container flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-ping" /> Live sync
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="font-headline text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Generate My Study Plan
            </h2>
            <p className="text-xs sm:text-sm text-on-primary-container/90 max-w-[290px] leading-relaxed">
              AI reorganized your schedule around 2 midterms to prevent cognitive overload.
            </p>
          </div>
          <div className="pt-1 flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('syllabus')}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-primary font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all hover:bg-surface-bright cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">document_scanner</span>
              <span>Analyze New Syllabus</span>
            </button>
            <button
              onClick={handleSyncCalendar}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-medium text-xs sm:text-sm transition-all cursor-pointer"
            >
              <span className={`material-symbols-outlined text-[18px] ${synced ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>{synced ? 'Synced Google Cal!' : 'Sync Calendar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Today's Goals & Task Checklist + Progress Dial Bento Card */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-surface-container/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-on-surface">Today's Focus Tasks</h3>
              <p className="text-xs text-on-surface-variant">Prioritized by memory retention urgency</p>
            </div>
          </div>
          {/* Mini Progress Dial Metric */}
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-surface-container-high"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-primary transition-all duration-700 ease-out"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${progressPercent}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute font-mono text-xs font-bold text-on-surface">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Interactive Checklist */}
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`group flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                task.completed
                  ? 'bg-surface-container-low border-transparent'
                  : 'bg-surface-container/40 border-surface-container hover:bg-surface-container-high/60'
              }`}
            >
              <button
                type="button"
                className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shadow-xs transition-all ${
                  task.completed
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary border border-outline-variant/60 group-hover:border-primary'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    task.completed ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                  }`}
                >
                  done
                </span>
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p
                    className={`font-semibold text-xs sm:text-sm text-on-surface truncate ${
                      task.completed ? 'line-through opacity-70 text-on-surface-variant' : ''
                    }`}
                  >
                    {task.title}
                  </p>
                  <span className="font-mono text-xs text-secondary font-bold whitespace-nowrap">
                    +{task.xpReward} XP
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-on-surface-variant">{task.duration}m</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant" />
                  {task.completed ? (
                    <span className="text-xs text-tertiary-container font-medium flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                    </span>
                  ) : task.dueText ? (
                    <span className="text-xs text-error font-medium flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {task.dueText}
                    </span>
                  ) : (
                    <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span> {task.scheduledText}
                    </span>
                  )}
                  {task.priority === 'URGENT' && !task.completed && (
                    <span className="ml-auto px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container font-mono text-[9px] font-bold">
                      URGENT
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Learning Resume Card */}
      <div className="rounded-3xl bg-[#f2f3ff] p-4 sm:p-5 shadow-sm border border-surface-container flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[24px]">play_arrow</span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed text-[9px] font-bold">
              OS
            </span>
          </div>
          <div className="min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold block">
              Resume Lecture Module
            </span>
            <h4 className="font-headline text-sm sm:text-base text-on-surface font-bold truncate">
              Process Synchronization
            </h4>
            <p className="text-xs text-on-surface-variant truncate">
              Critical Section Problem &amp; Semaphores
            </p>
          </div>
        </div>
        <button
          onClick={() => onOpenFlashcards('Process Synchronization')}
          className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-transform shrink-0 hover:bg-primary-container cursor-pointer"
        >
          Resume
        </button>
      </div>

      {/* Upcoming Exams Countdown Mosaic */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline text-base font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">event_upcoming</span>
            Exam Countdown
          </h3>
          <button
            onClick={() => onNavigate('syllabus')}
            className="text-xs text-primary font-semibold hover:underline cursor-pointer"
          >
            View syllabus
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {/* OS Exam Card (High Priority) */}
          <div
            onClick={() => onNavigate('planner')}
            className="rounded-3xl bg-white p-3.5 sm:p-4 shadow-sm border border-surface-container/70 flex flex-col justify-between cursor-pointer hover:border-error/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-mono text-[10px] font-bold">
                  3 DAYS LEFT
                </span>
                <span className="w-2 h-2 rounded-full bg-error animate-ping" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-on-surface leading-snug">
                Operating Systems Midterm
              </h4>
              <p className="text-xs text-on-surface-variant mt-1">Mon, Nov 18 • 10:00 AM</p>
            </div>
            <div className="mt-3 pt-2.5 bg-surface-container-low rounded-xl px-2.5 py-1.5 flex items-center justify-between">
              <span className="text-[11px] text-on-surface-variant">Readiness</span>
              <span className="text-xs font-bold text-error">64% (Risk)</span>
            </div>
          </div>

          {/* Algorithms Exam Card (Medium Priority) */}
          <div
            onClick={() => onNavigate('planner')}
            className="rounded-3xl bg-white p-3.5 sm:p-4 shadow-sm border border-surface-container/70 flex flex-col justify-between cursor-pointer hover:border-primary/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-mono text-[10px] font-bold">
                  8 DAYS LEFT
                </span>
                <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-on-surface leading-snug">
                Algorithms &amp; Data Structures
              </h4>
              <p className="text-xs text-on-surface-variant mt-1">Sat, Nov 23 • 2:00 PM</p>
            </div>
            <div className="mt-3 pt-2.5 bg-surface-container-low rounded-xl px-2.5 py-1.5 flex items-center justify-between">
              <span className="text-[11px] text-on-surface-variant">Readiness</span>
              <span className="text-xs font-bold text-primary">92% (Solid)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Study Hours Visual Bar Chart */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-surface-container/70 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-base font-bold text-on-surface">Weekly Study Velocity</h3>
            <p className="text-xs text-on-surface-variant">Target: 3.5 hrs / day • Peak: 4.2h on Thursday</p>
          </div>
          <div className="text-right">
            <span className="font-headline text-lg font-bold text-primary">21.8h</span>
            <span className="text-[11px] text-on-surface-variant block">Total this week</span>
          </div>
        </div>

        {/* Custom Bar Chart with Interactive Tooltips */}
        <div className="pt-2">
          <div className="flex items-end justify-between gap-2 h-28 px-1">
            {daysVelocity.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedVelocityDay(item.day)}
                className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
              >
                <span
                  className={`font-mono text-[10px] transition-opacity ${
                    item.isPeak || selectedVelocityDay === item.day
                      ? 'text-primary font-bold opacity-100'
                      : 'text-on-surface-variant opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {item.hours}
                </span>
                <div
                  className={`w-full rounded-t-xl transition-all duration-300 ${
                    item.isPeak
                      ? 'bg-gradient-to-t from-primary to-secondary shadow-md'
                      : idx === 6
                      ? 'bg-secondary-container'
                      : 'bg-surface-container-high group-hover:bg-primary-fixed-dim'
                  }`}
                  style={{ height: `${item.height}px` }}
                />
                <span
                  className={`font-mono text-[11px] ${
                    item.isPeak
                      ? 'font-bold text-primary'
                      : idx === 6
                      ? 'font-bold text-secondary'
                      : 'text-on-surface-variant'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Mastery Breakdown Bento Box */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-surface-container/70 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-base font-bold text-on-surface">Subject Mastery</h3>
            <p className="text-xs text-on-surface-variant">AI calculated from flashcards &amp; quiz attempts</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">psychology</span>
        </div>

        {/* Strong Subjects */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold block">
            Strong Mastery (Keep Warm)
          </span>
          <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary" />
                <p className="font-semibold text-xs sm:text-sm text-on-surface truncate">
                  Data Structures &amp; Algo
                </p>
              </div>
              <div className="w-36 h-1.5 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-tertiary rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-tertiary">92%</span>
          </div>

          <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p className="font-semibold text-xs sm:text-sm text-on-surface truncate">
                  Computer Networks
                </p>
              </div>
              <div className="w-36 h-1.5 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '88%' }} />
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-primary">88%</span>
          </div>
        </div>

        {/* Weak Subjects with Direct Practice Micro-CTA */}
        <div className="space-y-2 pt-1">
          <span className="font-mono text-[10px] text-error uppercase tracking-wider font-bold block">
            Requires Urgent Attention
          </span>
          <div className="p-3.5 rounded-2xl bg-error-container/25 border border-error-container/40 flex items-center justify-between">
            <div className="min-w-0 pr-2 flex-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-xs sm:text-sm text-on-surface truncate">Operating Systems</p>
                <span className="font-mono text-xs font-bold text-error">64%</span>
              </div>
              <div className="w-full h-1.5 bg-error-container rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-error rounded-full" style={{ width: '64%' }} />
              </div>
            </div>
            <button
              onClick={() => onNavigate('quiz')}
              className="ml-3 px-3 py-1.5 rounded-xl bg-error text-white font-bold text-xs shadow-xs active:scale-95 transition-transform flex items-center gap-1 cursor-pointer hover:bg-error/90"
            >
              <span>Practice</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div className="min-w-0 pr-2 flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-xs sm:text-sm text-on-surface truncate">Discrete Mathematics</p>
                <span className="font-mono text-xs font-bold text-on-surface-variant">71%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '71%' }} />
              </div>
            </div>
            <button
              onClick={() => onOpenFlashcards('Discrete Mathematics')}
              className="ml-3 px-3 py-1.5 rounded-xl bg-surface-container-highest text-primary font-bold text-xs active:scale-95 transition-transform cursor-pointer hover:bg-surface-container-high"
            >
              Review
            </button>
          </div>
        </div>
      </div>

      {/* Recent Quiz Scores & AI Recommendation Diagnostic */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-surface-container/70 space-y-3 mb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-base font-bold text-on-surface">Recent Performance</h3>
          <span className="font-mono text-xs text-primary font-semibold">Past 7 Days</span>
        </div>

        {/* Badges Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <div className="px-3 py-2 rounded-2xl bg-surface-container-low flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-tertiary-fixed flex items-center justify-center font-mono text-xs font-bold text-on-tertiary-fixed">
              90%
            </div>
            <div>
              <span className="font-bold text-xs text-on-surface block">Tree Traversal</span>
              <span className="font-mono text-[10px] text-on-surface-variant">Yesterday</span>
            </div>
          </div>

          <div className="px-3 py-2 rounded-2xl bg-error-container/30 border border-error-container/50 flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-error-container flex items-center justify-center font-mono text-xs font-bold text-on-error-container">
              75%
            </div>
            <div>
              <span className="font-bold text-xs text-on-surface block">OS Virtual Mem</span>
              <span className="font-mono text-[10px] text-error font-medium">Needs Attention</span>
            </div>
          </div>

          <div className="px-3 py-2 rounded-2xl bg-surface-container-low flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-primary-fixed flex items-center justify-center font-mono text-xs font-bold text-on-primary-fixed">
              85%
            </div>
            <div>
              <span className="font-bold text-xs text-on-surface block">Combinatorics</span>
              <span className="font-mono text-[10px] text-on-surface-variant">3 days ago</span>
            </div>
          </div>
        </div>

        {/* AI Prescription Callout Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-primary-fixed/40 via-surface-container-low to-secondary-fixed/30 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold block">
              Smart Diagnostic
            </span>
            <p className="text-xs text-on-surface font-medium leading-relaxed">
              “OS Virtual Memory needs 20m review before tomorrow. You repeatedly missed Page Fault Replacement algorithms on Thursday’s quiz.”
            </p>
            <button
              onClick={() => onOpenFlashcards('OS Virtual Memory')}
              className="text-xs text-secondary font-bold hover:underline flex items-center gap-1 pt-0.5 cursor-pointer"
            >
              Start 20m Focused Flashcards <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
