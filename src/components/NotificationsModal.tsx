import React from 'react';
import { NotificationItem, ScreenType } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNavigate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-surface-container bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">notifications_active</span>
            <h3 className="font-headline font-bold text-base text-on-surface">Cognitive Alerts</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              Mark Read
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl transition-all ${
                item.read ? 'bg-surface-container-low opacity-75' : 'bg-surface-container-lowest ring-1 ring-primary/20 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {item.type === 'urgent' && (
                    <span className="w-2 h-2 rounded-full bg-error animate-ping" />
                  )}
                  {item.type === 'ai' && (
                    <span className="material-symbols-outlined text-secondary text-[16px]">psychology</span>
                  )}
                  {item.type === 'streak' && <span className="text-sm">🔥</span>}
                  <h4 className="font-headline font-bold text-xs text-on-surface">{item.title}</h4>
                </div>
                <span className="font-mono text-[10px] text-on-surface-variant">{item.time}</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.message}</p>
              <div className="mt-2 flex items-center justify-end gap-2">
                {item.type === 'urgent' && (
                  <button
                    onClick={() => {
                      onNavigate('planner');
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-primary text-white text-[11px] font-semibold"
                  >
                    View Plan
                  </button>
                )}
                {item.type === 'ai' && (
                  <button
                    onClick={() => {
                      onNavigate('quiz');
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-secondary text-white text-[11px] font-semibold"
                  >
                    Start 15m Quiz
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
