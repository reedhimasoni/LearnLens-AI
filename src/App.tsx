/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, TaskItem, PlannerScheduleItem, SyllabusTopic, NotificationItem } from './types';
import {
  INITIAL_FOCUS_TASKS,
  INITIAL_PLANNER_SCHEDULE,
  INITIAL_SYLLABUS_TOPICS,
  INITIAL_NOTIFICATIONS
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { NotificationsModal } from './components/NotificationsModal';
import { QuickFlashcardModal } from './components/QuickFlashcardModal';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { SyllabusScreen } from './components/screens/SyllabusScreen';
import { LandingScreen } from './components/screens/LandingScreen';
import { PlannerScreen } from './components/screens/PlannerScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { StatsScreen } from './components/screens/StatsScreen';
import { MoreScreen } from './components/screens/MoreScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => {
    const saved = localStorage.getItem('learnlens_screen');
    return (saved as ScreenType) || 'dashboard';
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('learnlens_tasks');
    return saved ? JSON.parse(saved) : INITIAL_FOCUS_TASKS;
  });

  const [plannerSchedule, setPlannerSchedule] = useState<PlannerScheduleItem[]>(() => {
    const saved = localStorage.getItem('learnlens_planner');
    return saved ? JSON.parse(saved) : INITIAL_PLANNER_SCHEDULE;
  });

  const [syllabusTopics, setSyllabusTopics] = useState<SyllabusTopic[]>(() => {
    const saved = localStorage.getItem('learnlens_topics');
    return saved ? JSON.parse(saved) : INITIAL_SYLLABUS_TOPICS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('learnlens_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('learnlens_xp');
    return saved ? parseInt(saved, 10) : 1420;
  });

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [flashcardOpen, setFlashcardOpen] = useState(false);
  const [flashcardTopic, setFlashcardTopic] = useState<string | undefined>(undefined);
  const [isRegeneratingPlanner, setIsRegeneratingPlanner] = useState(false);
  const [xpToast, setXpToast] = useState<{ amount: number; message: string } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('learnlens_screen', currentScreen);
  }, [currentScreen]);

  useEffect(() => {
    localStorage.setItem('learnlens_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('learnlens_planner', JSON.stringify(plannerSchedule));
  }, [plannerSchedule]);

  useEffect(() => {
    localStorage.setItem('learnlens_topics', JSON.stringify(syllabusTopics));
  }, [syllabusTopics]);

  useEffect(() => {
    localStorage.setItem('learnlens_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('learnlens_xp', xp.toString());
  }, [xp]);

  // Window scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentScreen]);

  const handleRewardXP = (amount: number, message = 'XP Earned!') => {
    setXp((prev) => prev + amount);
    setXpToast({ amount, message });
    setTimeout(() => setXpToast(null), 2000);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) {
            handleRewardXP(t.xpReward, `Completed ${t.title.slice(0, 24)}...`);
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const handleTogglePlannerItem = (itemId: string) => {
    setPlannerSchedule((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextState = !item.completed;
          if (nextState) {
            handleRewardXP(30, 'Study block completed!');
          }
          return { ...item, completed: nextState, inProgress: false };
        }
        return item;
      })
    );
  };

  const handleRegeneratePlanner = () => {
    setIsRegeneratingPlanner(true);
    setTimeout(() => {
      // Re-shuffle order and calibrate
      setPlannerSchedule((prev) => [
        ...prev.map((p, idx) => ({
          ...p,
          completed: idx === 0 ? false : p.completed,
          inProgress: idx === 0
        }))
      ]);
      setIsRegeneratingPlanner(false);
      handleRewardXP(15, 'Schedule recalibrated by AI!');
    }, 1200);
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleOpenFlashcards = (topic?: string) => {
    setFlashcardTopic(topic);
    setFlashcardOpen(true);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const screenTitles: Record<ScreenType, string> = {
    dashboard: 'Student Dashboard',
    planner: 'Personalized Ai Study Planner',
    quiz: 'Smart Quiz & Practice',
    stats: 'Performance Analytics',
    more: 'Revision Calendar & Settings',
    syllabus: 'Ai Syllabus Analyzer',
    landing: 'Cognitive AI'
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-body selection:bg-primary/20">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        screenTitle={screenTitles[currentScreen]}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16">
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onNavigate={setCurrentScreen}
            xp={xp}
            onOpenFlashcards={handleOpenFlashcards}
          />
        )}

        {currentScreen === 'syllabus' && (
          <SyllabusScreen
            topics={syllabusTopics}
            onUpdateTopics={setSyllabusTopics}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'landing' && (
          <LandingScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'planner' && (
          <PlannerScreen
            schedule={plannerSchedule}
            onToggleScheduleItem={handleTogglePlannerItem}
            onNavigate={setCurrentScreen}
            onRegenerate={handleRegeneratePlanner}
            isRegenerating={isRegeneratingPlanner}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            onNavigate={setCurrentScreen}
            onRewardXP={(amount) => handleRewardXP(amount, 'Correct Answer!')}
          />
        )}

        {currentScreen === 'stats' && (
          <StatsScreen
            onNavigate={setCurrentScreen}
            onOpenFlashcards={handleOpenFlashcards}
          />
        )}

        {currentScreen === 'more' && (
          <MoreScreen
            onNavigate={setCurrentScreen}
            onOpenFlashcards={handleOpenFlashcards}
          />
        )}
      </main>

      {/* Sticky Bottom Navigation (Screens 1, 4, 5, 6, 7 & 2) */}
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />

      {/* Floating XP Reward Toast */}
      {xpToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-xs font-bold shadow-2xl flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-3 pointer-events-none">
          <span className="material-symbols-outlined text-[16px] text-amber-300" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
          <span>+{xpToast.amount} XP</span>
          <span className="text-white/80 font-normal">· {xpToast.message}</span>
        </div>
      )}

      {/* Notifications Drawer Modal */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onNavigate={setCurrentScreen}
      />

      {/* Quick Flashcard Modal */}
      <QuickFlashcardModal
        isOpen={flashcardOpen}
        onClose={() => setFlashcardOpen(false)}
        onRewardXP={(amount) => handleRewardXP(amount, 'Flashcard Recalled!')}
        initialTopic={flashcardTopic}
      />
    </div>
  );
}
