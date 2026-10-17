import React, { useState } from 'react';

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardXP: (xp: number) => void;
  initialTopic?: string;
}

const CARDS = [
  {
    q: 'What is the primary role of Long-Term Potentiation (LTP)?',
    a: 'Strengthening of synapses based on recent patterns of activity; the core cellular basis for memory formation!',
    tag: 'Neurobiology'
  },
  {
    q: 'How does Belady’s Anomaly manifest in FIFO page replacement?',
    a: 'Allocating more page frames can paradoxically increase the total number of page faults for specific reference strings.',
    tag: 'OS Memory'
  },
  {
    q: 'What are the 4 Coffman conditions required for a Deadlock to occur?',
    a: '1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait',
    tag: 'OS Concurrency'
  },
  {
    q: 'What is a Translation Lookaside Buffer (TLB)?',
    a: 'A high-speed hardware associative cache used to reduce page table memory lookup latencies.',
    tag: 'OS Memory'
  }
];

export const QuickFlashcardModal: React.FC<FlashcardModalProps> = ({
  isOpen,
  onClose,
  onRewardXP,
  initialTopic
}) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  if (!isOpen) return null;

  const current = CARDS[index];

  const handleNext = (confidence: 'hard' | 'good' | 'easy') => {
    setFlipped(false);
    const xp = confidence === 'easy' ? 25 : confidence === 'good' ? 20 : 10;
    onRewardXP(xp);
    setCompletedCount(prev => prev + 1);

    if (index + 1 < CARDS.length) {
      setIndex(prev => prev + 1);
    } else {
      // Loop or finish
      setIndex(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-5 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">psychology</span>
            <span className="font-headline font-bold text-sm text-on-surface">
              {initialTopic || 'Focused Recall Flashcards'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Progress header */}
        <div className="flex items-center justify-between text-xs text-on-surface-variant">
          <span>Card {index + 1} of {CARDS.length}</span>
          <span className="font-mono text-primary font-bold">+{completedCount * 20} XP Total</span>
        </div>

        {/* Interactive Flip Card */}
        <div
          onClick={() => setFlipped(!flipped)}
          className={`min-h-44 p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between select-none active:scale-[0.99] ${
            flipped
              ? 'bg-secondary-fixed/20 border-secondary/30 text-on-surface'
              : 'bg-surface-container-low border-surface-container-high hover:bg-surface-container'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-secondary font-bold">
              {flipped ? 'CONCEPT EXPLANATION' : 'ACTIVE RECALL PROMPT'}
            </span>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              sync
            </span>
          </div>

          <div className="my-2">
            {flipped ? (
              <p className="font-medium text-sm text-on-surface leading-relaxed whitespace-pre-line">
                {current.a}
              </p>
            ) : (
              <h4 className="font-headline font-semibold text-base text-on-surface leading-snug">
                "{current.q}"
              </h4>
            )}
          </div>

          <span className="text-[11px] text-on-surface-variant font-medium">
            {flipped ? 'Tap card to flip back' : 'Tap to reveal answer'}
          </span>
        </div>

        {/* Confidence Actions */}
        {flipped && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <span className="text-[11px] text-on-surface-variant font-semibold block text-center">
              How well did you recall this?
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleNext('hard')}
                className="py-2.5 rounded-xl bg-error-container text-error font-semibold text-xs hover:bg-error-container/80 transition-all cursor-pointer"
              >
                Hard (+10 XP)
              </button>
              <button
                onClick={() => handleNext('good')}
                className="py-2.5 rounded-xl bg-primary-fixed text-primary font-semibold text-xs hover:bg-primary-fixed-dim transition-all cursor-pointer"
              >
                Good (+20 XP)
              </button>
              <button
                onClick={() => handleNext('easy')}
                className="py-2.5 rounded-xl bg-tertiary-fixed text-tertiary font-semibold text-xs hover:bg-tertiary-fixed-dim transition-all cursor-pointer"
              >
                Easy (+25 XP)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
