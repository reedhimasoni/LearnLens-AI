import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { ASSETS } from '../../data/mockData';

interface LandingScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onNavigate }) => {
  const [flipped, setFlipped] = useState(false);
  const [mastery, setMastery] = useState(78);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const triggerConfetti = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const colors = ['#4f46e5', '#712ae2', '#006a7c', '#ecfdf5', '#d2bbff'];
    const newDots = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: originX + (Math.random() - 0.5) * 80,
      y: originY + (Math.random() - 0.5) * 80,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setParticles(newDots);
    setTimeout(() => setParticles([]), 750);
  };

  const handleQuickQuizClick = (e: React.MouseEvent) => {
    triggerConfetti(e);
    setMastery(94);
    setQuizCompleted(true);
  };

  return (
    <div className="flex flex-col w-full text-on-surface pt-16 select-none relative">
      {/* Dynamic confetti container */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute w-2 h-2 rounded-full transition-all duration-700 ease-out animate-ping"
            style={{
              backgroundColor: p.color,
              left: `${p.x}px`,
              top: `${p.y}px`
            }}
          />
        ))}
      </div>

      {/* Hero Content Area */}
      <section className="relative px-4 pt-6 pb-8 overflow-hidden">
        {/* Ambient Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-primary-fixed-dim/40 via-secondary-fixed/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          {/* Live Version Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-fixed/60 text-on-primary-fixed shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="font-mono text-[10px] tracking-wide uppercase font-bold">
              ✨ Powered by Next-Gen Academic LLMs • v2.4 Live
            </span>
          </div>

          {/* Hero Heading */}
          <h1 className="font-headline text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface mb-3 leading-tight">
            Study Smarter.<br />
            <span className="bg-gradient-to-r from-primary via-secondary to-tertiary-container bg-clip-text text-transparent">
              Learn Faster.
            </span><br />
            Achieve More.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-on-surface-variant mb-6 max-w-md mx-auto leading-relaxed">
            Your AI-powered personal study companion that turns dense syllabi, lecture slides, and notes into an adaptive daily roadmap.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-md mb-6">
            <button
              onClick={(e) => {
                triggerConfetti(e);
                setTimeout(() => onNavigate('dashboard'), 200);
              }}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary text-white font-bold text-sm sm:text-base shadow-lg shadow-primary/30 hover:shadow-primary/45 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Learning</span>
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('feature-bento');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-surface-container-high text-on-surface font-semibold text-sm sm:text-base hover:bg-surface-container-highest active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">play_circle</span>
              <span>Explore Features</span>
            </button>
          </div>

          {/* Social Proof Stats Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-xs text-on-surface-variant border border-surface-container">
            <span className="text-base">🔥</span>
            <span className="text-xs font-medium">
              <strong className="text-on-surface font-bold">45,000+</strong> exams aced •{' '}
              <strong className="text-primary font-bold">4.9/5</strong> rating
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Mini Dashboard Preview Section */}
      <section className="px-4 pb-12">
        <div className="max-w-md mx-auto relative">
          {/* Floating Badges Layer */}
          <div className="absolute -top-3 -left-2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md text-error border border-surface-container">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              timer
            </span>
            <span className="text-xs font-bold">Exam in 4 days</span>
          </div>
          <div className="absolute -top-3 -right-2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md text-tertiary border border-surface-container">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              trending_up
            </span>
            <span className="text-xs font-bold">+32% Recall boost</span>
          </div>

          {/* Main Dashboard Glass Card */}
          <div className="bg-white rounded-3xl p-5 shadow-xl border border-surface-container overflow-hidden relative">
            <div className="flex items-center justify-between mb-4 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                </div>
                <div>
                  <div className="font-headline text-sm font-bold leading-tight">Neurobiology 301</div>
                  <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider">
                    Midterm Prep Module
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-mono text-[10px] font-bold">
                Adaptive
              </span>
            </div>

            {/* Daily Cognitive Focus Progress */}
            <div className="bg-surface-container-low rounded-2xl p-3 mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-on-surface-variant font-medium">Topic Mastery Target</span>
                <span className="text-xs text-primary font-bold">{mastery}%</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700"
                  style={{ width: `${mastery}%` }}
                />
              </div>
            </div>

            {/* Interactive Flashcard preview inside dashboard */}
            <div
              onClick={() => setFlipped(!flipped)}
              className={`rounded-2xl p-4 cursor-pointer transition-all active:scale-[0.98] select-none shadow-xs border ${
                flipped ? 'bg-primary-fixed/30 border-primary/20' : 'bg-surface-container border-transparent hover:bg-surface-container-high'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-primary font-bold tracking-wider">
                  TAP TO FLIP RECALL CARD
                </span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">sync</span>
              </div>
              <div className="font-headline text-sm sm:text-base font-semibold text-on-surface mb-1">
                {flipped ? (
                  <span className="text-on-surface leading-relaxed block">
                    ✨ Strengthening of synapses based on recent patterns of activity; the core cellular basis for memory formation!
                  </span>
                ) : (
                  <span>"What is the primary role of Long-Term Potentiation (LTP)?"</span>
                )}
              </div>
            </div>

            {/* Bottom Mini Action */}
            <div className="mt-4 flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-secondary">insights</span>
                <span className="text-xs">
                  Optimal study window: <strong className="text-on-surface">3:30 PM - 5:00 PM</strong>
                </span>
              </div>
              <button
                onClick={handleQuickQuizClick}
                className={`px-3 py-1.5 rounded-full text-white text-xs font-semibold active:scale-90 transition-all cursor-pointer ${
                  quizCompleted ? 'bg-tertiary' : 'bg-primary hover:bg-primary-container'
                }`}
              >
                {quizCompleted ? 'Completed!' : 'Quick Quiz'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Props & Feature Cards Bento */}
      <section id="feature-bento" className="px-4 py-8 bg-surface-container-low">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full bg-surface-container-highest text-primary font-mono text-[10px] uppercase tracking-wider font-bold">
              Next-Gen Capabilities
            </span>
            <h2 className="font-headline text-2xl font-bold mt-2 text-on-surface">
              Precision Learning Tools
            </h2>
            <p className="text-xs text-on-surface-variant mt-1">Engineered for intense academic and professional rigor.</p>
          </div>

          <div className="space-y-3">
            {/* Feature 1 */}
            <div
              onClick={() => onNavigate('syllabus')}
              className="bg-white rounded-3xl p-4 shadow-xs border border-surface-container cursor-pointer hover:border-primary/40 transition-all active:scale-[0.99]"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">document_scanner</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline text-sm sm:text-base font-bold text-on-surface truncate">
                      AI Syllabus Analyzer
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed-dim/40 text-on-primary-fixed font-mono text-[9px] font-bold uppercase">
                      Fast
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Drop your PDF or lecture slides. Get an instant topic breakdown, conceptual dependencies, and difficulty estimates in seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => onNavigate('planner')}
              className="bg-white rounded-3xl p-4 shadow-xs border border-surface-container cursor-pointer hover:border-secondary/40 transition-all active:scale-[0.99]"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">calendar_clock</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline text-sm sm:text-base font-bold text-on-surface truncate">
                      Personalized AI Study Planner
                    </h3>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Dynamic daily schedules automatically tailored to your cognitive peak hours and spaced repetition algorithms.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => onNavigate('quiz')}
              className="bg-white rounded-3xl p-4 shadow-xs border border-surface-container cursor-pointer hover:border-tertiary/40 transition-all active:scale-[0.99]"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">quiz</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline text-sm sm:text-base font-bold text-on-surface truncate">
                      Smart Adaptive Quizzes
                    </h3>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Adaptive MCQ &amp; flashcard practice targeting your exact weak spots before they become exam bottlenecks.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => onNavigate('stats')}
              className="bg-white rounded-3xl p-4 shadow-xs border border-surface-container cursor-pointer hover:border-primary/40 transition-all active:scale-[0.99]"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary-container shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">query_stats</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline text-sm sm:text-base font-bold text-on-surface truncate">
                      Performance Analytics
                    </h3>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Deep predictive exam score tracking, memory decay alerts, and momentum streaks to keep motivation at maximum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works 3-Step Timeline */}
      <section className="px-4 py-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full bg-primary-fixed/40 text-primary font-mono text-[10px] uppercase tracking-wider font-bold">
              Seamless Onboarding
            </span>
            <h2 className="font-headline text-2xl font-bold mt-2 text-on-surface">Mastery in 3 Steps</h2>
          </div>

          <div className="relative pl-6 space-y-5">
            <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-secondary to-tertiary-fixed-dim rounded-full" />

            {/* Step 1 */}
            <div className="relative flex items-start gap-3 group">
              <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-primary text-white font-mono text-[11px] font-bold flex items-center justify-center shadow-md">
                1
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-surface-container flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[20px] text-primary">upload_file</span>
                  <h4 className="font-headline text-sm font-bold text-on-surface">Upload Syllabus or Slides</h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Feed your course material, lecture recordings, or reading packets into the secure LLM vault.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start gap-3 group">
              <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-secondary text-white font-mono text-[11px] font-bold flex items-center justify-center shadow-md">
                2
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-surface-container flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[20px] text-secondary">magic_button</span>
                  <h4 className="font-headline text-sm font-bold text-on-surface">AI Generates Schedule</h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Your personalized pacing guide adapts instantly when life happens, so you never fall behind.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start gap-3 group">
              <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-tertiary text-white font-mono text-[11px] font-bold flex items-center justify-center shadow-md">
                3
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-xs border border-surface-container flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">military_tech</span>
                  <h4 className="font-headline text-sm font-bold text-on-surface">Practice &amp; Master</h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Engage with dynamic flashcards and active recall challenges with real-time feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonial Card */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-primary-fixed/30 via-secondary-fixed/20 to-white p-5 rounded-3xl shadow-md border border-surface-container relative overflow-hidden">
            <span className="material-symbols-outlined text-[80px] text-primary/10 absolute -right-2 -bottom-4 pointer-events-none select-none">
              format_quote
            </span>
            <div className="flex items-center gap-1 text-secondary mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <p className="text-sm italic text-on-surface mb-4 leading-relaxed font-medium">
              "Cut my exam prep stress in half! LearnLens turned my chaotic 90-page Operating Systems syllabus into crisp daily micro-goals. Aced my final with a 96%!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-primary/20 shrink-0 ring-2 ring-primary/30">
                <img
                  className="w-full h-full object-cover"
                  src={ASSETS.alexTestimonial}
                  alt="Reedhima Rivera"
                />
              </div>
              <div>
                <div className="font-headline text-sm font-bold text-on-surface leading-tight">Reedhima Rivera</div>
                <div className="text-xs text-on-surface-variant">CS Major @ Tech Univ • Class of '25</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Call to Action Banner */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto bg-gradient-to-r from-primary to-secondary text-white rounded-3xl p-6 shadow-xl text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <h3 className="font-headline text-xl font-bold mb-2">Ready to level up your grades?</h3>
          <p className="text-xs text-on-primary-container mb-4">
            Join over 45,000 students learning with cognitive AI precision today.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full py-3.5 px-6 rounded-full bg-white text-primary font-bold text-sm shadow-md hover:bg-surface-bright active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              rocket_launch
            </span>
            <span>Launch Prototype Dashboard</span>
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-white px-4 py-8 border-t border-surface-container">
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_stories
              </span>
              <span className="font-headline text-sm font-bold">LearnLens AI</span>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant">© 2025 ALL RIGHTS RESERVED</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-on-surface-variant text-xs">
            <button onClick={() => onNavigate('syllabus')} className="hover:text-primary transition-colors py-1 flex items-center gap-1 text-left">
              <span className="material-symbols-outlined text-[14px]">chevron_right</span> Syllabus Engine
            </button>
            <button onClick={() => onNavigate('more')} className="hover:text-primary transition-colors py-1 flex items-center gap-1 text-left">
              <span className="material-symbols-outlined text-[14px]">chevron_right</span> Privacy &amp; Ethics
            </button>
            <button onClick={() => onNavigate('planner')} className="hover:text-primary transition-colors py-1 flex items-center gap-1 text-left">
              <span className="material-symbols-outlined text-[14px]">chevron_right</span> Academic Discount
            </button>
            <button onClick={() => onNavigate('quiz')} className="hover:text-primary transition-colors py-1 flex items-center gap-1 text-left">
              <span className="material-symbols-outlined text-[14px]">chevron_right</span> Help Center
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
