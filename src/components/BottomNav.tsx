import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // If user is on landing page, don't show the bottom nav or show floating quick launcher
  if (currentScreen === 'landing') {
    return null;
  }

  const navItems: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Home', icon: 'dashboard' },
    { id: 'planner', label: 'Planner', icon: 'calendar_month' },
    { id: 'quiz', label: 'Quiz', icon: 'psychology_alt' },
    { id: 'stats', label: 'Stats', icon: 'insights' },
    { id: 'more', label: 'More', icon: 'grid_view' }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-white/90 backdrop-blur-2xl shadow-[0_-8px_24px_rgba(15,23,42,0.06)] border-t border-surface-container">
      <div className="flex items-center justify-around h-16 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.id ||
            (item.id === 'dashboard' && currentScreen === 'syllabus');

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 w-14 h-14 transition-all cursor-pointer ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-medium text-[11px] leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
