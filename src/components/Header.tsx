import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  screenTitle?: string;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  screenTitle,
  unreadNotificationsCount,
  onOpenNotifications
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // If on landing screen, show landing header
  if (currentScreen === 'landing') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between max-w-screen-md mx-auto px-4 py-3">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20 transition-transform active:scale-95">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_stories
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-lg font-bold text-on-surface tracking-tight leading-none">
                LearnLens<span className="text-primary">.ai</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                Cognitive AI
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 rounded-full text-on-surface-variant hover:text-primary font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs sm:text-sm shadow-md shadow-primary/25 hover:opacity-95 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Launch App</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // If on Syllabus screen, show back arrow header matching Screen 2
  if (currentScreen === 'syllabus') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-[#ffffff]/85 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(79,70,229,0.08)] pt-safe">
        <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-md mx-auto">
          <div className="flex items-center gap-2 min-w-0">
            <button
              aria-label="Go Back"
              className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
              onClick={() => onNavigate('dashboard')}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="LearnLens AI Logo"
              className="h-8 w-auto object-contain hidden xs:block"
              src={ASSETS.logo}
            />
            <h1 className="font-headline text-lg sm:text-xl font-bold text-on-surface truncate">
              Ai Syllabus Analyzer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('more')}
              className="relative flex items-center cursor-pointer"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                src={ASSETS.alexAvatar}
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Default App Header (Screens 1, 4, 5, 6, 7)
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#ffffff]/85 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(79,70,229,0.08)] pt-safe">
        <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-md mx-auto">
          <div className="flex items-center gap-2 min-w-0">
            <button
              aria-label="Menu Drawer"
              className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <img
                alt="LearnLens AI Logo"
                className="h-8 w-auto object-contain"
                src={ASSETS.logo}
              />
              <span className="font-headline text-lg font-bold text-on-surface tracking-tight hidden xs:inline">
                LearnLens
              </span>
            </button>
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed/60 text-primary font-mono text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>AI ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {screenTitle && (
              <div className="flex flex-col text-right hidden sm:block">
                <span className="font-medium text-xs text-on-surface">{screenTitle}</span>
              </div>
            )}
            <button
              aria-label="Notifications"
              onClick={onOpenNotifications}
              className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary ring-2 ring-white animate-pulse" />
              )}
            </button>
            <button
              onClick={() => onNavigate('more')}
              className="relative flex items-center cursor-pointer"
              aria-label="Profile Settings"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 hover:scale-105 transition-transform"
                src={ASSETS.alexAvatar}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <img src={ASSETS.logo} alt="Logo" className="h-8 w-auto" />
                  <span className="font-headline font-bold text-lg text-on-surface">LearnLens AI</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* User Mini Profile */}
              <div className="py-4 flex items-center gap-3">
                <img src={ASSETS.alexAvatar} alt="Alex" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary" />
                <div>
                  <h4 className="font-headline font-bold text-sm text-on-surface">Reedhima Rivera</h4>
                  <p className="text-xs text-on-surface-variant">CS 301 • Midterm Nov 18</p>
                  <span className="text-[10px] font-mono text-secondary font-bold">1,420 XP Earned</span>
                </div>
              </div>

              {/* Navigation List */}
              <nav className="space-y-1 pt-2">
                {[
                  { id: 'dashboard', label: 'Student Dashboard', icon: 'dashboard' },
                  { id: 'planner', label: 'AI Study Planner', icon: 'calendar_month' },
                  { id: 'quiz', label: 'AI Practice Arena', icon: 'psychology_alt' },
                  { id: 'stats', label: 'Performance Analytics', icon: 'insights' },
                  { id: 'syllabus', label: 'AI Syllabus Analyzer', icon: 'document_scanner' },
                  { id: 'more', label: 'Revision Calendar & Settings', icon: 'grid_view' },
                  { id: 'landing', label: 'Product Tour & Landing', icon: 'rocket_launch' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id as ScreenType);
                      setDrawerOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium text-sm transition-colors cursor-pointer ${
                      currentScreen === item.id
                        ? 'bg-primary text-white font-semibold shadow-sm'
                        : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-surface-container-high text-xs text-on-surface-variant flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span>Model Engine:</span>
                <span className="font-mono text-primary font-bold">Gemini 3.8 Flash</span>
              </div>
              <p className="text-[11px] text-outline">v2.4 Live • Cognitive Spaced Repetition</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
