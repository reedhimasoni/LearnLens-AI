import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { ASSETS } from '../../data/mockData';

interface MoreScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenFlashcards: (topic?: string) => void;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({ onNavigate, onOpenFlashcards }) => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'settings'>('calendar');
  const [selectedDay, setSelectedDay] = useState(15);
  const [studyGoal, setStudyGoal] = useState(3.5);
  const [peakWindow, setPeakWindow] = useState('Morning Focus (8:00 AM - 12:00 PM)');
  const [spacedRepetition, setSpacedRepetition] = useState(true);
  const [dailyStreakAlerts, setDailyStreakAlerts] = useState(true);
  const [aiDynamicReschedule, setAiDynamicReschedule] = useState(true);
  const [autoFillToast, setAutoFillToast] = useState(false);
  const [addBlockOpen, setAddBlockOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleAutoFill = () => {
    setAutoFillToast(true);
    setTimeout(() => setAutoFillToast(false), 2500);
  };

  const handleExport = (type: string) => {
    setExportNotice(`${type} generated successfully!`);
    setTimeout(() => setExportNotice(null), 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 space-y-4">
      {/* Segmented View Switcher */}
      <div className="w-full p-1.5 bg-surface-container rounded-2xl flex items-center shadow-xs">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-headline text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
            activeTab === 'calendar'
              ? 'bg-white text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          <span>Revision Calendar</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-headline text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-white text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
          <span>Profile &amp; Settings</span>
        </button>
      </div>

      {/* Notice / Toast */}
      {exportNotice && (
        <div className="p-3 bg-slate-900 text-white rounded-2xl text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <span>{exportNotice}</span>
          <span className="text-emerald-400 font-bold">Done</span>
        </div>
      )}

      {/* AutoFill Toast */}
      {autoFillToast && (
        <div className="p-3 bg-primary text-white rounded-2xl text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <span>Buffer hours assigned to Dijkstra's Algorithm practice!</span>
          <span className="font-mono font-bold">+2.0h</span>
        </div>
      )}

      {/* VIEW 1: REVISION CALENDAR */}
      {activeTab === 'calendar' ? (
        <div className="flex flex-col w-full space-y-4 animate-in fade-in duration-200">
          {/* Month Header & Week Strip */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-surface-container/70">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">event_repeat</span>
                </div>
                <div>
                  <h2 className="font-headline text-base font-bold text-on-surface">November 2024</h2>
                  <p className="text-xs text-on-surface-variant">Week 46 • Algorithmic Pace Active</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Horizontal Day Pill Strip */}
            <div className="grid grid-cols-7 gap-1 pt-1">
              {[
                { day: 'M', date: 13, dot: 'bg-tertiary-fixed-dim' },
                { day: 'T', date: 14, dot: 'bg-secondary' },
                { day: 'W', date: 15, active: true, dot: 'bg-white' },
                { day: 'T', date: 16, dot: 'bg-primary' },
                { day: 'F', date: 17, dot: 'bg-secondary-container' },
                { day: 'S', date: 18, isExam: true, dot: 'bg-error' },
                { day: 'S', date: 19, dot: 'bg-outline-variant' }
              ].map((item) => {
                const isSelected = selectedDay === item.date;
                return (
                  <button
                    key={item.date}
                    onClick={() => setSelectedDay(item.date)}
                    className={`flex flex-col items-center py-2.5 px-1 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-medium ${
                        isSelected ? 'text-on-primary-container' : 'text-on-surface-variant'
                      }`}
                    >
                      {item.day}
                    </span>
                    <span
                      className={`font-headline text-xs sm:text-sm mt-1 font-bold ${
                        isSelected ? 'text-white' : item.isExam ? 'text-error' : 'text-on-surface'
                      }`}
                    >
                      {item.date}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-1.5 ${item.dot} ${
                        isSelected ? 'animate-ping' : ''
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buffer Time Suggestion Card */}
          <div className="bg-gradient-to-r from-primary-fixed/40 to-tertiary-fixed/30 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs border border-primary-fixed/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs sm:text-sm text-on-surface truncate">
                  2 hours buffer time available today
                </p>
                <p className="text-xs text-on-surface-variant truncate">
                  Ideal for Dijkstra practice or resting brain cells
                </p>
              </div>
            </div>
            <button
              onClick={handleAutoFill}
              className="px-3 py-1.5 rounded-xl bg-white text-primary text-xs font-bold hover:bg-surface-bright transition-all shrink-0 shadow-xs cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>

          {/* Upcoming Exam Milestones Bento */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-headline text-base font-bold text-on-surface">Target Milestones</span>
              <span className="font-mono text-[10px] text-primary flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[13px]">alarm</span> HIGH PRIORITY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Milestone 1 */}
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-surface-container/70 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-error-container/40 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold">
                      3 days left
                    </span>
                    <h3 className="font-headline text-sm font-bold text-on-surface mt-2">
                      Operating Systems Midterm
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Coverage: Concurrency, Virtual Memory, Deadlocks
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-error-container/60 text-error flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 flex items-center justify-between -mx-4 -mb-4 px-4 py-2 rounded-b-3xl bg-surface-container-low/70">
                  <span className="font-mono text-[10px] text-on-surface-variant">NOV 18 • 10:00 AM</span>
                  <span className="text-xs text-primary font-bold">84% Readiness</span>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-surface-container/70 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary-fixed/40 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-bold">
                      12 days left
                    </span>
                    <h3 className="font-headline text-sm font-bold text-on-surface mt-2">
                      Algorithms Final Exam
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Coverage: Dynamic Prog, NP-Completeness, Graphs
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">account_tree</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 flex items-center justify-between -mx-4 -mb-4 px-4 py-2 rounded-b-3xl bg-surface-container-low/70">
                  <span className="font-mono text-[10px] text-on-surface-variant">NOV 27 • 02:00 PM</span>
                  <span className="text-xs text-secondary font-bold">62% Readiness</span>
                </div>
              </div>
            </div>
          </div>

          {/* Color-coded Daily Revision Agenda List */}
          <div className="flex flex-col space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="font-headline text-base font-bold text-on-surface">Today's Agenda</span>
              <button
                onClick={() => setAddBlockOpen(true)}
                className="text-xs text-primary flex items-center gap-0.5 font-bold hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span> Add Block
              </button>
            </div>

            {/* Item 1: Completed */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-surface-container/70">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center justify-center pt-0.5">
                  <div className="w-6 h-6 rounded-full bg-tertiary-container text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <div className="w-0.5 h-10 bg-surface-container-high mt-1 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[10px] text-on-surface-variant">08:30 AM - 09:45 AM</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                      OS Core
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-on-surface-variant line-through mt-0.5">
                    Virtual Memory Concept Review
                  </h4>
                  <p className="text-xs text-on-surface-variant">Paging mechanics &amp; TLB miss latencies</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-tertiary-container flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-[14px]">verified</span> Mastered 18/20 items
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2: Up Next / Reschedule */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-surface-container/70 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-3xl" />
              <div className="flex items-start gap-3 pl-1">
                <div className="flex flex-col items-center justify-center pt-0.5">
                  <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-mono text-[9px] font-bold">
                    NOW
                  </div>
                  <div className="w-0.5 h-12 bg-surface-container-high mt-1 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[10px] text-primary font-bold">11:00 AM - 12:30 PM</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                      DSA Mastery
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-on-surface mt-0.5">
                    Graph Dijkstra &amp; Prim Practice
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Minimum spanning trees &amp; shortest path edge weights
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => onOpenFlashcards('Graph Dijkstra & Prim')}
                      className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-xs flex items-center gap-1 hover:bg-primary-container transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span> Start Drill
                    </button>
                    <button
                      onClick={() => {
                        alert('Session postponed to 2:00 PM buffer window.');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">schedule</span> Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3: Evening Session */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-surface-container/70">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center justify-center pt-0.5">
                  <div className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px]">radio_button_unchecked</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[10px] text-on-surface-variant">04:30 PM - 05:15 PM</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                      OS Core
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-on-surface mt-0.5">
                    Pomodoro Flashcards: Banker's Algorithm
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Safe states, resource allocation matrices &amp; deadlock mitigation
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-secondary flex items-center gap-1 font-bold">
                      <span className="material-symbols-outlined text-[14px]">timer</span> 25m Focus + 5m Break
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: PROFILE & SETTINGS */
        <div className="flex flex-col w-full space-y-4 animate-in fade-in duration-200">
          {/* Profile Card with Visual Representation */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-surface-container/70 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  className="w-16 h-16 rounded-2xl object-cover shadow-md ring-2 ring-primary/20"
                  src={ASSETS.alexSettingsProfile}
                  alt="Alex Rivera"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-tertiary-container text-white flex items-center justify-center ring-2 ring-white text-[11px]">
                  <span className="material-symbols-outlined text-[12px]">school</span>
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline text-base font-bold text-on-surface truncate">Reedhima Rivera</h3>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">
                    5th Sem
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">Computer Science • Tech University</p>
                <p className="font-mono text-[10px] text-outline truncate mt-0.5">reedhima.rivera@techuniv.edu</p>
              </div>
            </div>

            {/* Quick Micro-metrics Row */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 bg-surface-container-low/60 -mx-5 -mb-5 px-5 py-3 rounded-b-3xl">
              <div className="flex flex-col items-center text-center">
                <span className="font-headline text-base text-primary font-bold">14</span>
                <span className="text-[10px] text-on-surface-variant font-medium">Day Streak 🔥</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="font-headline text-base text-secondary font-bold">89%</span>
                <span className="text-[10px] text-on-surface-variant font-medium">Retention</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="font-headline text-base text-tertiary-container font-bold">42h</span>
                <span className="text-[10px] text-on-surface-variant font-medium">Nov Logged</span>
              </div>
            </div>
          </div>

          {/* Academic & Cognitive Preferences */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-surface-container/70 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-on-surface">Study Engine Preferences</h3>
            </div>

            {/* Stepper: Daily Study Goal */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low">
              <div className="flex flex-col">
                <span className="font-bold text-xs sm:text-sm text-on-surface">Daily Study Target</span>
                <span className="text-[11px] text-on-surface-variant">Cognitive load threshold</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-xs border border-surface-container">
                <button
                  type="button"
                  onClick={() => setStudyGoal((g) => Math.max(1, g - 0.5))}
                  className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-base active:scale-95 transition-all cursor-pointer"
                >
                  -
                </button>
                <span className="font-bold text-xs sm:text-sm text-primary px-1.5 min-w-[64px] text-center">
                  {studyGoal.toFixed(1)} hrs
                </span>
                <button
                  type="button"
                  onClick={() => setStudyGoal((g) => Math.min(8, g + 0.5))}
                  className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-base active:scale-95 transition-all cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Cognitive Window */}
            <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-surface-container-low">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-on-surface">Peak Cognitive Window</span>
                <span className="font-mono text-[9px] text-primary font-bold uppercase">AI SCHEDULED</span>
              </div>
              <div className="relative mt-1">
                <select
                  value={peakWindow}
                  onChange={(e) => setPeakWindow(e.target.value)}
                  className="w-full appearance-none bg-white text-on-surface text-xs font-semibold py-2.5 px-3 rounded-xl shadow-xs border border-surface-container focus:outline-none"
                >
                  <option>Morning Focus (8:00 AM - 12:00 PM)</option>
                  <option>Afternoon Flow (1:00 PM - 5:00 PM)</option>
                  <option>Night Owl (8:00 PM - 12:00 AM)</option>
                  <option>Segmented Pomodoro (Bi-modal)</option>
                </select>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Active Recall Distribution */}
            <div className="p-3.5 rounded-2xl bg-surface-container-low space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-on-surface">Active Recall Blend</span>
                <span className="text-xs text-secondary font-bold">Quiz Heavy</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                60% Interactive MCQs / Flashcards vs. 40% Deep Concept Reading
              </p>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden flex">
                <div className="h-full bg-primary" style={{ width: '60%' }} />
                <div className="h-full bg-secondary-fixed-dim" style={{ width: '40%' }} />
              </div>
              <div className="flex justify-between font-mono text-[9px] text-on-surface-variant pt-0.5 font-bold">
                <span>60% PRACTICE DRILLS</span>
                <span>40% THEORY</span>
              </div>
            </div>
          </div>

          {/* App & Notification Settings */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-surface-container/70 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-on-surface">Automation &amp; Alerts</h3>
            </div>

            {/* Toggle 1: Spaced Repetition */}
            <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low transition-colors">
              <div className="flex flex-col pr-2">
                <span className="font-medium text-xs sm:text-sm text-on-surface">
                  Spaced Repetition Reminders
                </span>
                <span className="text-[11px] text-on-surface-variant">Ebbinghaus forgetting curve triggers</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={spacedRepetition}
                  onChange={(e) => setSpacedRepetition(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            {/* Toggle 2: Daily Streak Alerts */}
            <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low transition-colors">
              <div className="flex flex-col pr-2">
                <span className="font-medium text-xs sm:text-sm text-on-surface">Daily Streak Alerts</span>
                <span className="text-[11px] text-on-surface-variant">Gentle nudges at 7:00 PM if behind pace</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={dailyStreakAlerts}
                  onChange={(e) => setDailyStreakAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            {/* Toggle 3: AI Auto Adjust */}
            <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low transition-colors">
              <div className="flex flex-col pr-2">
                <span className="font-medium text-xs sm:text-sm text-on-surface">
                  AI Plan Dynamic Rescheduling
                </span>
                <span className="text-[11px] text-on-surface-variant">Rebalance calendar if test scores drop</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={aiDynamicReschedule}
                  onChange={(e) => setAiDynamicReschedule(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            {/* Theme Mode Preview Selector */}
            <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">light_mode</span>
                <div>
                  <span className="font-bold text-xs text-on-surface block">Visual Theme</span>
                  <span className="text-[11px] text-on-surface-variant">Adaptive Bright Crystalline</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Adaptive Bright is active. Night Owl theme syncs with your device preference.')}
                className="px-3 py-1 rounded-xl bg-white text-on-surface text-xs font-semibold shadow-xs flex items-center gap-1 hover:bg-surface transition-all cursor-pointer border border-surface-container"
              >
                <span>Dark (Auto)</span>
                <span className="material-symbols-outlined text-[14px]">bedtime</span>
              </button>
            </div>
          </div>

          {/* Danger & Data Zone */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-surface-container/70 space-y-3 mb-4">
            <span className="font-mono text-[10px] text-outline block font-bold">
              DATA PORTABILITY &amp; SESSION
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleExport('PDF Study Schedule Report')}
                className="p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">ios_share</span>
                <span className="text-xs font-bold text-on-surface">Export PDF Report</span>
              </button>
              <button
                onClick={() => handleExport('iCal / Google Calendar Feed')}
                className="p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col items-center justify-center gap-1 text-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-secondary text-[20px]">calendar_add_on</span>
                <span className="text-xs font-bold text-on-surface">Sync to iCal / GCal</span>
              </button>
            </div>

            <button
              onClick={() => {
                if (confirm('Log out of LearnLens AI session?')) {
                  onNavigate('landing');
                }
              }}
              className="w-full py-3 rounded-2xl bg-error-container text-error text-xs font-bold flex items-center justify-center gap-2 hover:bg-error-container/80 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Log Out of LearnLens AI</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Agenda Block Modal */}
      {addBlockOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-3 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h4 className="font-headline font-bold text-base text-on-surface">Add Agenda Block</h4>
              <button
                onClick={() => setAddBlockOpen(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-on-surface-variant font-semibold">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Consensus Drill"
                  className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs border border-transparent focus:border-primary outline-none mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-on-surface-variant font-semibold">Time Window</label>
                  <input
                    type="text"
                    defaultValue="05:30 PM - 06:30 PM"
                    className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs border border-transparent focus:border-primary outline-none mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-on-surface-variant font-semibold">Category</label>
                  <select className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs border border-transparent focus:border-primary outline-none mt-1">
                    <option>OS Core</option>
                    <option>DSA Mastery</option>
                    <option>Discrete Math</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setAddBlockOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAddBlockOpen(false);
                  handleExport('New Study Block');
                }}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
              >
                Add Block
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
