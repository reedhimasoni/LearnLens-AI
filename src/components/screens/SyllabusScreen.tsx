import React, { useState } from 'react';
import { ScreenType, SyllabusTopic } from '../../types';
import { analyzeSyllabusAI } from '../../services/aiService';

interface SyllabusScreenProps {
  topics: SyllabusTopic[];
  onUpdateTopics: (topics: SyllabusTopic[]) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const SyllabusScreen: React.FC<SyllabusScreenProps> = ({
  topics,
  onUpdateTopics,
  onNavigate
}) => {
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [subjectName, setSubjectName] = useState('Operating Systems');
  const [courseCode, setCourseCode] = useState('CS 301');
  const [examDate, setExamDate] = useState('Nov 18, 2024');
  const [studyHours, setStudyHours] = useState(3.5);
  const [analyzing, setAnalyzing] = useState(false);
  const [fileAttached, setFileAttached] = useState(true);
  const [smartInsight, setSmartInsight] = useState(
    'Process Synchronization & Virtual Memory account for ~62% of historical final exam questions for CS 301.'
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');
  const [newTopicDiff, setNewTopicDiff] = useState<'Hard' | 'Medium' | 'Easy'>('Medium');
  const [newTopicHours, setNewTopicHours] = useState(2.0);
  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [savedDraftToast, setSavedDraftToast] = useState(false);

  const handleAiScan = async () => {
    setAnalyzing(true);
    try {
      const res = await analyzeSyllabusAI(subjectName, courseCode, studyHours);
      onUpdateTopics(res.topics);
      if (res.insight) {
        setSmartInsight(res.insight);
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDeleteTopic = (id: string) => {
    onUpdateTopics(topics.filter(t => t.id !== id));
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    const newTopic: SyllabusTopic = {
      id: `top-custom-${Date.now()}`,
      unitNumber: `0${topics.length + 1}`,
      title: newTopicTitle.trim(),
      description: newTopicDesc.trim() || 'Custom user defined unit and target concepts.',
      difficulty: newTopicDiff,
      estHours: Number(newTopicHours) || 2.0
    };

    onUpdateTopics([...topics, newTopic]);
    setNewTopicTitle('');
    setNewTopicDesc('');
    setShowAddModal(false);
  };

  const handleAutoRank = () => {
    const sorted = [...topics].sort((a, b) => {
      const diffWeight = { Hard: 3, Medium: 2, Easy: 1, Custom: 2 };
      return diffWeight[b.difficulty] - diffWeight[a.difficulty];
    });
    onUpdateTopics(sorted);
  };

  const handleSaveDraft = () => {
    setSavedDraftToast(true);
    setTimeout(() => setSavedDraftToast(false), 2000);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-36 space-y-4 select-none">
      {/* Stepper Breadcrumb / Process Status */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-mono text-[11px] font-bold">
            1
          </span>
          <span className="font-bold text-xs text-primary">Step 1 of 3: Ingestion</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-1.5 rounded-full bg-primary" />
          <div className="w-3 h-1.5 rounded-full bg-surface-container-highest" />
          <div className="w-3 h-1.5 rounded-full bg-surface-container-highest" />
        </div>
      </div>

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-primary-container via-secondary to-secondary-container p-5 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md mb-2">
            <span className="material-symbols-outlined text-[13px] text-tertiary-fixed">auto_awesome</span>
            <span className="text-[11px] text-white font-medium tracking-wide">
              AI Syllabus Engine v3.2
            </span>
          </div>
          <h2 className="font-headline text-xl font-bold text-white leading-tight">
            Deconstruct Any Syllabus in Seconds
          </h2>
          <p className="text-xs text-on-primary-container/90 mt-1 leading-relaxed">
            Upload files or sync schedule parameters to automatically extract exam weightages and high-yield milestones.
          </p>
        </div>
        <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-[130px] text-white/10 pointer-events-none select-none">
          document_scanner
        </span>
      </div>

      {/* Ingestion Zone / Drag & Drop */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-surface-container/70 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs sm:text-sm text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">upload_file</span>
            Syllabus Document
          </span>
          <span className="font-mono text-[10px] bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant font-bold">
            PDF, DOCX ≤ 25MB
          </span>
        </div>

        {/* Drop Zone Interactive Area */}
        <label
          htmlFor="fileInput"
          className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-container-low transition-all duration-300 cursor-pointer text-center hover:bg-surface-container border-2 border-dashed border-surface-container-highest"
        >
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform mb-2">
            <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
          </div>
          <p className="font-bold text-xs sm:text-sm text-on-surface">Drop syllabus PDF or tap to browse</p>
          <p className="text-xs text-on-surface-variant mt-0.5">Scans tables, grading percentages &amp; weekly calendars</p>
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={() => setFileAttached(true)}
          />
        </label>

        {/* Uploaded File Badge Preview */}
        {fileAttached && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container gap-2 transition-all">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-error-container text-error flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="font-bold text-xs sm:text-sm text-on-surface truncate">
                  CS301_Operating_Systems_Syllabus_Fall2024.pdf
                </span>
                <div className="flex items-center gap-2 text-on-surface-variant font-mono text-[10px]">
                  <span>2.4 MB</span>
                  <span>•</span>
                  <span className="text-tertiary-container font-bold flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim" /> Ready
                  </span>
                </div>
              </div>
            </div>
            <button
              aria-label="Remove preloaded file"
              type="button"
              className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
              onClick={() => setFileAttached(false)}
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Scan Time micro-validation */}
        <div className="flex items-center justify-between text-on-surface-variant text-xs px-1">
          <div className="flex items-center gap-1.5 text-tertiary-container font-medium">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>PDF parsed successfully in 1.4s</span>
          </div>
          <button
            onClick={() => setInspectModalOpen(true)}
            className="text-secondary font-semibold cursor-pointer hover:underline"
          >
            Inspect Text
          </button>
        </div>
      </div>

      {/* Manual Subject & Scope Details Accordion */}
      <div className="rounded-3xl bg-white shadow-sm border border-surface-container/70 overflow-hidden transition-all">
        <button
          className="w-full p-5 flex items-center justify-between text-left transition-colors hover:bg-surface-container-low cursor-pointer"
          onClick={() => setAccordionOpen(!accordionOpen)}
          type="button"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm sm:text-base text-on-surface">
                Subject &amp; Target Schedule
              </h3>
              <p className="text-xs text-on-surface-variant">
                {subjectName} ({courseCode}) • {studyHours}h daily
              </p>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
              accordionOpen ? 'rotate-0' : '-rotate-90'
            }`}
          >
            expand_more
          </span>
        </button>

        {accordionOpen && (
          <div className="px-5 pb-5 pt-1 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant font-semibold">Subject Name</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                    menu_book
                  </span>
                  <input
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs sm:text-sm focus:bg-white border border-transparent focus:border-primary outline-none transition-colors"
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant font-semibold">Course Code</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                    tag
                  </span>
                  <input
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs sm:text-sm focus:bg-white border border-transparent focus:border-primary outline-none transition-colors"
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Exam Date Picker Simulation */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-on-surface-variant font-semibold">Next Major Exam Date</label>
                <span className="text-[10px] font-bold text-error bg-error-container/50 px-2 py-0.5 rounded-full">
                  In 3 days
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[20px]">event</span>
                  <span className="font-bold text-xs sm:text-sm">{examDate}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newD = prompt('Enter new exam date (e.g. Nov 20, 2024):', examDate);
                    if (newD) setExamDate(newD);
                  }}
                  className="px-3 py-1 rounded-lg bg-surface-container text-primary text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Daily Study Commitment Control */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-on-surface-variant font-semibold">Daily Available Study Hours</label>
                <span className="font-mono text-xs font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-md">
                  {studyHours} hrs/day
                </span>
              </div>
              <input
                className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={studyHours}
                onChange={(e) => setStudyHours(parseFloat(e.target.value))}
              />
              <div className="flex justify-between font-mono text-[10px] text-on-surface-variant px-0.5">
                <span>1.0h (Sprint)</span>
                <span>3.5h (Target)</span>
                <span>8.0h (Deep Dive)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Action Trigger CTA Button */}
      <div className="flex flex-col items-center gap-2 pt-1">
        <button
          onClick={handleAiScan}
          disabled={analyzing}
          type="button"
          className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary-container via-primary to-secondary text-white font-headline text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
        >
          <span className="material-symbols-outlined text-tertiary-fixed-dim animate-pulse">
            auto_awesome
          </span>
          <span>{analyzing ? 'Analyzing Syllabus Structure...' : 'Analyze My Syllabus with AI'}</span>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            bolt
          </span>
        </button>

        {analyzing && (
          <div className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container text-on-surface text-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary animate-spin">refresh</span>
              <span className="font-medium text-on-surface">
                Synthesizing textbook chapters &amp; exam weights...
              </span>
            </div>
            <span className="font-mono text-primary font-bold">88%</span>
          </div>
        )}
      </div>

      {/* Extracted Results & Topic Breakdown */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-tertiary-container text-white shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">electric_bolt</span>
            </div>
            <span className="font-headline text-xs sm:text-sm font-bold tracking-tight">
              Extracted {topics.length} Units &amp; Key Topics
            </span>
          </div>
          <button
            onClick={handleAutoRank}
            className="text-xs px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors font-medium cursor-pointer"
            type="button"
          >
            Auto-Rank
          </button>
        </div>

        {/* Topic Card List */}
        <div className="flex flex-col gap-2.5">
          {topics.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-white p-4 shadow-sm border border-surface-container/60 flex flex-col gap-2 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-mono text-[10px] font-bold text-on-surface-variant">
                    {t.unitNumber}
                  </span>
                  <h4 className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                    {t.title}
                  </h4>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase shrink-0 ${
                    t.difficulty === 'Hard'
                      ? 'bg-error-container text-error'
                      : t.difficulty === 'Medium'
                      ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                      : 'bg-surface-container-highest text-tertiary'
                  }`}
                >
                  {t.difficulty}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant pl-8 leading-relaxed">
                {t.description}
              </p>
              <div className="flex items-center justify-between pt-1 pl-8">
                <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary">timer</span>
                  <span>Est. {t.estHours} hrs</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      const newT = prompt('Edit Topic Title:', t.title);
                      if (newT) {
                        onUpdateTopics(
                          topics.map((it) => (it.id === t.id ? { ...it, title: newT } : it))
                        );
                      }
                    }}
                    aria-label="Edit Topic"
                    className="p-1.5 rounded-xl hover:bg-surface-container text-on-surface-variant cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteTopic(t.id)}
                    aria-label="Delete Topic"
                    className="p-1.5 rounded-xl hover:bg-error-container text-error cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Custom Topic Action */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-surface-container-low hover:bg-surface-container text-primary font-headline text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-surface-container"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Add Custom Topic</span>
        </button>
      </div>

      {/* Ambient Learning Insights Micro-Card */}
      <div className="p-4 rounded-2xl bg-surface-container flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">psychology</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xs text-on-surface">Smart Weighting Insight</span>
          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
            {smartInsight}
          </p>
        </div>
      </div>

      {/* Floating Sticky Action Footer */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-4 bg-white/90 backdrop-blur-xl border-t border-surface-container">
        <div className="max-w-md mx-auto w-full flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            aria-label="Save Draft"
            className="w-12 h-12 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
          </button>
          <button
            onClick={() => onNavigate('planner')}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary-container text-white font-headline text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
            type="button"
          >
            <span>Proceed to Study Planner</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Saved Draft Toast */}
      {savedDraftToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-[16px] text-emerald-400">check</span>
          <span>Draft progress saved locally</span>
        </div>
      )}

      {/* Inspect Text Modal */}
      {inspectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-headline font-bold text-sm text-on-surface">Extracted Syllabus Text</h4>
              <button
                onClick={() => setInspectModalOpen(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low max-h-56 overflow-y-auto text-xs text-on-surface-variant font-mono space-y-1.5 leading-relaxed">
              <p>CS301: OPERATING SYSTEMS &amp; SYSTEM PROGRAMMING</p>
              <p>Instructor: Dr. V. Klein • Fall 2024</p>
              <p>Grading Policy: Midterm 1 (30%), Midterm 2 (25%), Final Exam (35%), Labs (10%).</p>
              <p>Unit 1: Concurrency, Critical Section, Semaphores, Mutexes.</p>
              <p>Unit 2: Memory Management, Paging, Page Faults, LRU/FIFO.</p>
              <p>Unit 3: CPU Scheduling, FCFS, SJF, Multilevel Queue.</p>
              <p>Unit 4: File Systems, Inodes, Directory structures, RAID.</p>
            </div>
            <button
              onClick={() => setInspectModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Custom Topic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <form
            onSubmit={handleAddTopic}
            className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-3 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-headline font-bold text-base text-on-surface">Add Custom Topic</h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-on-surface-variant font-semibold">Topic Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus & Raft"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs border border-transparent focus:border-primary outline-none mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-on-surface-variant font-semibold">Key Concepts</label>
                <input
                  type="text"
                  placeholder="e.g. Leader election, log replication"
                  value={newTopicDesc}
                  onChange={(e) => setNewTopicDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs border border-transparent focus:border-primary outline-none mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-on-surface-variant font-semibold">Difficulty</label>
                  <select
                    value={newTopicDiff}
                    onChange={(e: any) => setNewTopicDiff(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs border border-transparent focus:border-primary outline-none mt-1"
                  >
                    <option value="Hard">Hard</option>
                    <option value="Medium">Medium</option>
                    <option value="Easy">Easy</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-on-surface-variant font-semibold">Est. Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="10"
                    value={newTopicHours}
                    onChange={(e) => setNewTopicHours(parseFloat(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs border border-transparent focus:border-primary outline-none mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-container"
              >
                Add Topic
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
