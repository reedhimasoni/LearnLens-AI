import React, { useState, useEffect } from 'react';
import { ScreenType, QuizQuestion } from '../../types';
import { QUIZ_QUESTIONS } from '../../data/mockData';
import { generateAdaptiveQuestion } from '../../services/aiService';

interface QuizScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onRewardXP: (amount: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onNavigate, onRewardXP }) => {
  const [questionsList, setQuestionsList] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('B');
  const [difficulty, setDifficulty] = useState<'easy' | 'med' | 'hard'>('med');
  const [hintOpen, setHintOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(522); // 08:42
  const [isPaused, setIsPaused] = useState(false);
  const [streak, setStreak] = useState(3);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [loadingNewQ, setLoadingNewQ] = useState(false);

  const currentQ = questionsList[currentIndex] || QUIZ_QUESTIONS[0];

  // Timer countdown
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSecondsRemaining((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOption(optId);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questionsList.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption('');
      setHintOpen(false);
      setIsSubmitted(false);
    } else {
      // Loop or fetch new AI question
      handleGenerateAiQuestion();
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(questionsList[currentIndex - 1]?.correctAnswerId || '');
      setHintOpen(false);
      setIsSubmitted(true);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctAnswerId) {
      setStreak((s) => s + 1);
      onRewardXP(20);
    }
  };

  const handleDifficultyChange = async (diff: 'easy' | 'med' | 'hard') => {
    setDifficulty(diff);
    setLoadingNewQ(true);
    try {
      const newQ = await generateAdaptiveQuestion(currentQ.subCategory || 'Virtual Memory', diff);
      setQuestionsList((prev) => [newQ, ...prev]);
      setCurrentIndex(0);
      setSelectedOption('');
      setIsSubmitted(false);
    } finally {
      setLoadingNewQ(false);
    }
  };

  const handleGenerateAiQuestion = async () => {
    setLoadingNewQ(true);
    try {
      const newQ = await generateAdaptiveQuestion('Operating Systems Scheduling', difficulty);
      setQuestionsList((prev) => [...prev, newQ]);
      setCurrentIndex(questionsList.length);
      setSelectedOption('');
      setIsSubmitted(false);
    } finally {
      setLoadingNewQ(false);
    }
  };

  const isCorrect = selectedOption === currentQ.correctAnswerId;

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 space-y-4">
      {/* Top Context Header & Topic Badge */}
      <section className="flex flex-col space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              aria-label="Go Back"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h1 className="font-headline text-lg sm:text-xl font-bold text-on-surface leading-none">
                AI Practice Arena
              </h1>
              <span className="font-mono text-[10px] text-primary font-bold">
                ADAPTIVE ENGINE v2.4
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            aria-label="Save Question"
            className={`w-9 h-9 rounded-full bg-surface-container flex items-center justify-center transition-colors cursor-pointer ${
              isBookmarked ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>

        {/* Active Topic Pill Strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/15 text-secondary text-xs font-semibold shrink-0">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              memory
            </span>
            <span>OS • {currentQ.subCategory}</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs shrink-0 font-medium">
            <span>CS301</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs shrink-0 font-medium">
            <span className="material-symbols-outlined text-[14px]">psychology</span>
            <span>Diagnostic MCQ</span>
          </div>
        </div>
      </section>

      {/* Setup Filter & Difficulty Dynamic Switch */}
      <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between shadow-xs border border-surface-container">
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant font-medium">Difficulty:</span>
          <div className="flex bg-surface-container p-0.5 rounded-full">
            {(['easy', 'med', 'hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => handleDifficultyChange(d)}
                className={`px-2.5 py-0.5 rounded-full text-xs transition-all cursor-pointer capitalize ${
                  difficulty === d
                    ? 'bg-primary text-white shadow-xs font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                {d === 'med' ? 'Medium' : d}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-secondary font-mono text-[11px] font-bold shadow-xs border border-surface-container">
          <span className="material-symbols-outlined text-[14px]">bolt</span>
          <span>XP x1.5</span>
        </div>
      </div>

      {/* Progress, Streak & Interactive Countdown Timer */}
      <section className="p-4 rounded-3xl bg-white shadow-sm border border-surface-container/70 space-y-3">
        <div className="flex items-center justify-between text-on-surface">
          <div className="flex items-center gap-2">
            <span className="font-headline text-lg font-bold text-primary">
              Q{currentIndex + 1}
            </span>
            <span className="text-xs text-on-surface-variant">/ 10</span>
            <span className="ml-1 text-[10px] font-mono text-on-surface-variant tracking-wider uppercase bg-surface-container px-2 py-0.5 rounded-full font-bold">
              {Math.round(((currentIndex + 1) / 10) * 100)}% Done
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Streak pill */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface text-xs font-bold">
              <span className="material-symbols-outlined text-[16px] text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              <span>{streak} Streak!</span>
            </div>

            {/* Timer badge */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed font-mono text-xs font-bold transition-all cursor-pointer ${
                isPaused ? 'opacity-70 ring-2 ring-error' : 'hover:bg-primary-fixed'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">timer</span>
              <span>{formatTimer(secondsRemaining)}</span>
              <span className="material-symbols-outlined text-[14px]">
                {isPaused ? 'play_arrow' : 'pause'}
              </span>
            </button>
          </div>
        </div>

        {/* Dual-layer gradient progress bar */}
        <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
          />
        </div>
      </section>

      {/* Distraction-Free Question Surface */}
      <article className="p-5 rounded-3xl bg-white shadow-sm border border-surface-container/70 space-y-4 relative overflow-hidden">
        {loadingNewQ && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-20 flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-secondary animate-spin text-[32px]">refresh</span>
            <span className="text-xs font-bold text-on-surface">Generating AI Adaptive Problem...</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-mono text-[10px] uppercase tracking-wider font-bold">
            FIFO Simulation
          </span>
          <div className="flex items-center gap-1 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[15px]">auto_stories</span>
            <span>Standard Page Trace</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-headline text-base sm:text-lg text-on-surface leading-snug font-bold">
            {currentQ.question}
          </p>

          {/* Reference String Micro-Visualizer */}
          {currentQ.referenceTrace && (
            <div className="p-2.5 rounded-2xl bg-surface-container-low overflow-x-auto flex items-center gap-1.5 no-scrollbar">
              <span className="font-mono text-[11px] text-on-surface-variant uppercase mr-1 font-bold">
                Trace:
              </span>
              {currentQ.referenceTrace.map((char, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-xl font-mono text-xs font-bold shadow-xs ${
                    idx === 3
                      ? 'bg-secondary/15 text-secondary ring-1 ring-secondary/30'
                      : 'bg-white text-on-surface'
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 4 Interactive Option Cards */}
        <div className="space-y-2.5 pt-1">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <label
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`group flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-primary-fixed/30 border-primary/40 shadow-xs'
                    : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl font-headline flex items-center justify-center text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-surface-container text-on-surface-variant group-hover:bg-surface-container-high'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span
                    className={`text-xs sm:text-sm text-on-surface ${
                      isSelected ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    {opt.text}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <span className="font-mono text-[9px] text-primary font-bold hidden xs:inline">
                      CURRENT SELECTION
                    </span>
                  )}
                  <input
                    type="radio"
                    name="quiz_option"
                    checked={isSelected}
                    onChange={() => handleSelectOption(opt.id)}
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                </div>
              </label>
            );
          })}
        </div>

        {/* AI Scaffold Hint Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setHintOpen(!hintOpen)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
              <span className="text-xs sm:text-sm font-semibold text-on-surface">
                AI Concept Hint • FIFO Queue Logic
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              {hintOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {/* Collapsible Hint Pane */}
          {hintOpen && (
            <div className="mt-2 p-3.5 rounded-2xl bg-secondary-fixed/30 border border-secondary/20 text-on-surface space-y-1.5 text-xs animate-in fade-in">
              <div className="flex items-center gap-1.5 text-secondary font-mono text-[10px] font-bold">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                <span>SCAFFOLDED INSIGHT (NO PENALTY)</span>
              </div>
              <p className="text-xs leading-relaxed text-on-surface">{currentQ.hint}</p>
            </div>
          )}
        </div>

        {/* Instant Feedback & Explanation Container */}
        {isSubmitted && (
          <div className="p-4 rounded-2xl bg-surface-container-low space-y-3 border border-surface-container animate-in fade-in">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs ${
                  isCorrect
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                    : 'bg-error-container text-error'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isCorrect ? 'check_circle' : 'cancel'}
                </span>
                <span>{isCorrect ? 'Correct! (+20 XP)' : 'Incorrect (Review Below)'}</span>
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant font-bold">
                CONFIDENCE 96%
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-on-surface font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[15px]">neurology</span>
                AI Deep Explanation:
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>

            {/* Compact Frame Diagram Pill Row */}
            {currentQ.framesTrace && (
              <div className="grid grid-cols-4 gap-1.5 pt-1 text-center font-mono text-[11px]">
                {currentQ.framesTrace.map((f, i) => (
                  <div
                    key={i}
                    className={`p-1.5 rounded-xl shadow-xs ${
                      i === currentQ.framesTrace!.length - 1
                        ? 'bg-primary-fixed text-on-primary-fixed font-bold'
                        : 'bg-white text-on-surface'
                    }`}
                  >
                    {f.label}: {f.val}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </article>

      {/* Navigation Action Bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={handlePrevQuestion}
          disabled={currentIndex === 0}
          className="flex-1 py-3 px-3 rounded-2xl bg-surface-container text-on-surface text-xs sm:text-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={handleNextQuestion}
          className="flex-[1.5] py-3 px-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm font-semibold hover:opacity-95 shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Next Question</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="py-3 px-4 rounded-2xl bg-surface-container-high text-primary text-xs sm:text-sm font-bold hover:bg-surface-container-highest transition-colors cursor-pointer"
        >
          Submit
        </button>
      </div>

      {/* Real-time Diagnostic Preview / Post-Quiz Summary Card */}
      <section className="p-5 rounded-3xl bg-white shadow-sm border border-surface-container/70 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <h2 className="font-headline text-base font-bold text-on-surface">Performance Pulse</h2>
          </div>
          <span className="font-mono text-xs text-secondary font-bold">DIAGNOSTIC LIVE</span>
        </div>

        {/* Score & Weak topic split panel */}
        <div className="grid grid-cols-2 gap-3">
          {/* Accuracy Card */}
          <div className="p-3 rounded-2xl bg-surface-container-low flex flex-col justify-between">
            <span className="text-xs text-on-surface-variant font-medium">Live Accuracy</span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="font-headline text-2xl font-bold text-primary">85%</span>
              <span className="text-xs text-on-surface-variant font-medium">(8/10)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          {/* Weak Area Flag Card */}
          <div className="p-3 rounded-2xl bg-error-container/40 border border-error-container/60 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-error text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px]">flag</span>
              <span>Knowledge Gap</span>
            </div>
            <p className="text-xs text-on-error-container font-bold line-clamp-2 my-1">
              Thrashing &amp; Working Set Model
            </p>
            <span className="font-mono text-[9px] text-error font-bold uppercase">
              NEEDS REVISION
            </span>
          </div>
        </div>

        {/* Targeted Remediation Callout & CTA */}
        <div className="p-3 rounded-2xl bg-surface-container flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">target</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-on-surface truncate">Custom AI Remediation Loop</p>
              <p className="text-[11px] text-on-surface-variant truncate">3 adaptive flash questions queued</p>
            </div>
          </div>
          <button
            onClick={handleGenerateAiQuestion}
            className="shrink-0 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-container transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Practice Now</span>
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
          </button>
        </div>
      </section>
    </div>
  );
};
