import { TaskItem, PlannerScheduleItem, SyllabusTopic, QuizQuestion, NotificationItem } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1VMUD4Amlr6HNzayC1kTUElNFNJiBBL33VAkvmYUlu_Q1BTWXmrkGv4Z55DxlyL238IvMaiRvYHKLBvPe2FNbs4YZeZzyRjE0j_rFB3AI96_Ljd6NuOkYLngZ0EP-LJRIzlijiV6o6hM_lG1NALwXj9uZ3t6ybv1_MONmlv6Ad7ueaQEVsOJGHX4WwSZi_C5G25a2lBSCcHOd5mawDkw5APTElbcd4o63JWSzIgRJJuqakJM3PDwQkGxg0',
  alexAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnjh3EJ71Ck1l10d5pvGtrBbbQG_7wAL9LZ__rS6TkZYCc9yQppizQLqVm7-Pqo_Sxr_7LFPeFno9jQi57WlRl5qAjAWBhUloBByXNelorLMXGa84_8tzHlaWyyVlcKzJdIYS0yrCfuOnmU7IeS-MYapf9LOzHHwFhRpWFIMmfLVHP_NUulT6Cj8wkbeA2LgFzgGFcfaBsy9u-KbjSXbyrWWMQRlVsVF9UBEFKsPoS5ND5EFHwmcgg',
  alexTestimonial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALIx4csS9anN8eHKV48BK-qbvQWTuRvmDZjqzE6EnFBN_0SlZ1to0Z8kJ8RhY7u5rvLe5f515eZQPhrPS3t9ljRBYEySHMYo3vTUSw2pEQPV7FoEEVhVzrjcwJs7HL8bMCL6CUNBHO3Ccz4pwbni8rheZJAJn2zNQBw3qMMIsyI6-SEXieWjTgtjtUgvPNkUrvQ3zQoCrVb6ODbANveaQiytwj9SR5MLh8wPcRUbB__o2Mwiz-MBTq',
  studyCoachBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm2IU0z0piajJiGSpSdzo3gRADlvx6Z_JCdKF0xS35zqStjL2fqGzPdN0ufTwE-xcyWCsJ2cs8M9KKqFm3iIyreE7ILwlvAZK0GfPW_H9lY_3NIlLlfyxGh7SxKqN4dTyRuloa8NhJmk0Ee7RKbI514znSvTa5w8OAhctwVpZ5yuJ3kZke3y_1H44qUuaKjWuEAnLNL1ZRmZsgKW4dyc9IduMwKTvnpTahdChLyv1mhxy9TQYxJwj-',
  alexSettingsProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlML4-atryETHU6E5bVcUanCFmEmjU8RucBwJoB_zXoaRgKOri8R8kY73E6mi2R6AOUzXRmJRuaBKgjx812wyaMLyrW6hl7UEsx85K_sTb_gd5oTYol-lG96O-TEs0LBszynSbfePp_lV-BAg0Lm2-1Y6Sj2fMiANg9Tqh8FzXxuVtxI_sy68x7WvZ50neL513CGKuEot-iuI09JANfhSW68xcH-nP_Z_9euVymprS2WyFHC20YHkc'
};

export const INITIAL_FOCUS_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Data Structures: AVL Trees Rotation',
    duration: 45,
    completed: true,
    subject: 'Data Structures',
    priority: 'P2',
    xpReward: 50
  },
  {
    id: 'task-2',
    title: 'Operating Systems: Memory Paging vs Segmentation',
    duration: 30,
    completed: false,
    subject: 'Operating Systems',
    priority: 'URGENT',
    dueText: 'Due in 2 hrs',
    xpReward: 45
  },
  {
    id: 'task-3',
    title: 'Discrete Math: Graph Coloring Theorem',
    duration: 40,
    completed: false,
    subject: 'Discrete Math',
    priority: 'P3',
    scheduledText: 'Scheduled 7:00 PM',
    xpReward: 40
  }
];

export const INITIAL_PLANNER_SCHEDULE: PlannerScheduleItem[] = [
  {
    id: 'plan-1',
    timeRange: '09:00 AM - 10:30 AM',
    durationMin: 90,
    type: 'work',
    category: 'Deep Work',
    title: 'Deadlock Handling & Bankers Algorithm',
    subtitle: 'Resource allocation graph verification',
    subjectTag: 'Operating Systems',
    priorityTag: 'P1 Priority',
    completed: true
  },
  {
    id: 'plan-2',
    timeRange: '10:30 AM - 10:45 AM',
    durationMin: 15,
    type: 'break',
    category: 'Pomodoro AI Brain Break',
    title: 'Coffee & Hydration Pause',
    subtitle: 'Step away from screen for mental reboot',
    completed: false
  },
  {
    id: 'plan-3',
    timeRange: '10:45 AM - 12:15 PM',
    durationMin: 90,
    type: 'work',
    category: 'Focused Study',
    title: 'Page Replacement Algorithms (FIFO vs LRU)',
    subtitle: "Cover Belady's Anomaly and stack algorithms before self-testing.",
    subjectTag: 'Operating Systems',
    priorityTag: 'P1 Priority',
    completed: false,
    inProgress: true
  },
  {
    id: 'plan-4',
    timeRange: '02:00 PM - 03:00 PM',
    durationMin: 60,
    type: 'work',
    category: 'Active Recall',
    title: 'Smart Quiz: 15 MCQs on Memory',
    subtitle: 'Adaptive self-test on TLBs and demand paging',
    subjectTag: 'Interactive Quiz',
    priorityTag: 'P2 Medium',
    completed: false
  },
  {
    id: 'plan-5',
    timeRange: '03:00 PM - 03:15 PM',
    durationMin: 15,
    type: 'break',
    category: 'Walk & Hydration Break',
    title: 'Brisk Walk & Sunlight exposure',
    subtitle: 'Refreshes dopamine levels',
    completed: false
  },
  {
    id: 'plan-6',
    timeRange: '04:00 PM - 05:00 PM',
    durationMin: 60,
    type: 'work',
    category: 'Light Revision',
    title: 'Spaced Repetition Flashcards',
    subtitle: 'Rapid fire recall on CS 301 and discrete concepts',
    subjectTag: 'Anki / LearnLens Deck',
    priorityTag: 'P3 Review',
    completed: false
  }
];

export const INITIAL_SYLLABUS_TOPICS: SyllabusTopic[] = [
  {
    id: 'top-1',
    unitNumber: '01',
    title: 'Process Synchronization & Semaphores',
    description: 'Critical sections, mutex locks, monitors, and dining philosophers dilemma.',
    difficulty: 'Hard',
    estHours: 3.5
  },
  {
    id: 'top-2',
    unitNumber: '02',
    title: 'Virtual Memory & Page Replacement',
    description: 'TLBs, demand paging, FIFO, LRU, and thrashing prevention mechanics.',
    difficulty: 'Hard',
    estHours: 4.0
  },
  {
    id: 'top-3',
    unitNumber: '03',
    title: 'CPU Scheduling Algorithms',
    description: 'Round robin, shortest job first, multilevel feedback queues & turnaround time math.',
    difficulty: 'Medium',
    estHours: 2.0
  },
  {
    id: 'top-4',
    unitNumber: '04',
    title: 'File Systems & Disk Management',
    description: 'Inodes, directory structures, RAID levels, and disk arm scheduling policies.',
    difficulty: 'Easy',
    estHours: 1.5
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    category: 'Operating Systems',
    subCategory: 'Virtual Memory',
    difficulty: 'med',
    question: 'In a demand paging system with 3 frames using the FIFO replacement algorithm, what is the total number of page faults for this reference string?',
    referenceTrace: ['7', '0', '1', '2', '0', '3', '0', '4', '2', '3'],
    options: [
      { id: 'A', text: '7 Page Faults' },
      { id: 'B', text: '9 Page Faults' },
      { id: 'C', text: '10 Page Faults' },
      { id: 'D', text: '12 Page Faults' }
    ],
    correctAnswerId: 'B',
    explanation: 'Initial misses occur sequentially on [7], [7,0], and [7,0,1]. When [2] arrives, it replaces the oldest page [7], yielding [2,0,1]. Step-by-step trace demonstrates a total of exactly 9 page faults across the 10 references.',
    hint: "Remember FIFO replaces the page that has been in memory for the longest time. Write out a table with 3 row slots, keeping track of page entry timestamps. When reference '0' appears again, verify if it's already present in one of the 3 slots!",
    framesTrace: [
      { label: 'Frame 1', val: '[2]' },
      { label: 'Frame 2', val: '[0]' },
      { label: 'Frame 3', val: '[3]' },
      { label: 'Faults', val: '9' }
    ]
  },
  {
    id: 'q-2',
    category: 'Operating Systems',
    subCategory: 'Virtual Memory',
    difficulty: 'hard',
    question: "Which of the following page replacement algorithms is immune to Belady's Anomaly (where increasing the number of page frames leads to more page faults)?",
    options: [
      { id: 'A', text: 'First-In First-Out (FIFO)' },
      { id: 'B', text: 'Least Recently Used (LRU - Stack Algorithm)' },
      { id: 'C', text: 'Second Chance Clock Algorithm' },
      { id: 'D', text: 'Random Replacement Algorithm' }
    ],
    correctAnswerId: 'B',
    explanation: "LRU is a 'stack algorithm'. In stack algorithms, the set of pages in memory for N frames is strictly a subset of the pages for N+1 frames. Therefore, Belady's anomaly can never occur.",
    hint: "Stack algorithms guarantee that the set of pages in memory for n frames is always a subset of the set of pages for n+1 frames.",
    framesTrace: [
      { label: 'Class', val: 'Stack Alg' },
      { label: 'Subset', val: 'M(n) ⊆ M(n+1)' },
      { label: 'Anomaly', val: 'Impossible' },
      { label: 'Optimal', val: 'Belady Proof' }
    ]
  },
  {
    id: 'q-3',
    category: 'Operating Systems',
    subCategory: 'Process Synchronization',
    difficulty: 'easy',
    question: 'In Dijkstra counting semaphores, what does a wait() or P() operation execute when the semaphore value is currently <= 0?',
    options: [
      { id: 'A', text: 'Increments the semaphore and exits immediately' },
      { id: 'B', text: 'Suspends (blocks) the calling process until signal() / V() occurs' },
      { id: 'C', text: 'Terminates the process with a segmentation fault' },
      { id: 'D', text: 'Spawns an asynchronous deadlock recovery routine' }
    ],
    correctAnswerId: 'B',
    explanation: 'The wait() (or P()) operation decrements the semaphore counter. If the value is less than or equal to zero, the executing process is suspended on the semaphore wait queue until another process calls signal() (V()).',
    hint: 'P() stands for proberen (to test/wait). If no resource permits are available, the thread cannot enter its critical section.',
    framesTrace: [
      { label: 'Op', val: 'wait(S)' },
      { label: 'Check', val: 'S.val <= 0' },
      { label: 'State', val: 'BLOCKED' },
      { label: 'Wakeup', val: 'signal(S)' }
    ]
  },
  {
    id: 'q-4',
    category: 'Operating Systems',
    subCategory: 'Deadlocks',
    difficulty: 'med',
    question: "Under the Banker's Algorithm for deadlock avoidance, a system state is formally declared 'Safe' if and only if:",
    options: [
      { id: 'A', text: 'No processes are currently running in user mode' },
      { id: 'B', text: 'There exists a safe execution sequence of all processes that avoids deadlock' },
      { id: 'C', text: 'Total available resources strictly exceed maximum matrix sum' },
      { id: 'D', text: 'All semaphores are initialized to 1' }
    ],
    correctAnswerId: 'B',
    explanation: 'A state is safe if there exists a safe sequence <P1, P2, ..., Pn> such that for each Pi, the resources that Pi can still request can be satisfied by current available resources plus resources held by all Pj (with j < i).',
    hint: 'Look for the definition of safe sequence where each process can finish and release its claimed resources.',
    framesTrace: [
      { label: 'Condition', val: 'Safe Seq <Pi>' },
      { label: 'Need[i]', val: '<= Available' },
      { label: 'Return', val: 'All Complete' },
      { label: 'Deadlock', val: 'Avoided' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Exam in 72 Hours',
    message: 'Operating Systems Midterm is on Nov 18, 10:00 AM. 3 high-yield topics require review.',
    time: '10m ago',
    read: false,
    type: 'urgent'
  },
  {
    id: 'notif-2',
    title: 'Retention Decay Warning',
    message: 'Cognitive Engine detected 42% retention drop in Semaphore logic. 15m review scheduled.',
    time: '1h ago',
    read: false,
    type: 'ai'
  },
  {
    id: 'notif-3',
    title: '12-Day Study Streak! 🔥',
    message: "You've logged study sessions 12 days in a row! +120 bonus XP added.",
    time: 'Today',
    read: true,
    type: 'streak'
  }
];
