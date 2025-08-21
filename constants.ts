
import { Question } from './types';

export const ASSESSMENT_QUESTIONS: Question[] = [
  // Section 1: Passion
  { text: 'What excites you most about this role or industry?', category: 'Passion' },
  { text: 'Can you share a project or activity you pursued outside your formal responsibilities because of genuine interest?', category: 'Passion' },
  { text: 'How do you stay updated on new trends, tools, or practices in your field?', category: 'Passion' },
  { text: 'What’s a professional achievement you are proud of, and why?', category: 'Passion' },
  { text: 'How would you handle a task you’re not passionate about?', category: 'Passion' },

  // Section 2: Motivation
  { text: 'What motivates you to perform at your best?', category: 'Motivation' },
  { text: 'Describe a time you overcame a significant challenge—what kept you going?', category: 'Motivation' },
  { text: 'How do you set and track personal and professional goals?', category: 'Motivation' },
  { text: 'What drives you to seek new responsibilities or challenges?', category: 'Motivation' },
  { text: 'How do you stay motivated during routine or repetitive work?', category: 'Motivation' },

  // Section 3: Skills & Learning
  { text: 'List three of your strongest skills and provide examples of when you used them successfully.', category: 'Skills' },
  { text: 'What’s a skill you’ve improved significantly in the last year, and how?', category: 'Skills' },
  { text: 'How do you approach learning a new technology or tool?', category: 'Skills' },
  { text: 'Describe a situation where you had to adapt quickly to a new process or system.', category: 'Skills' },
  { text: 'How do you prefer to receive feedback on your work, and how do you act on it?', category: 'Skills' },

  // Section 4: Behavior & Workstyle
  { text: 'Do you prefer working independently, collaboratively, or with a mix? Why?', category: 'Behavior' },
  { text: 'Describe a time when you had a conflict at work and how you resolved it.', category: 'Behavior' },
  { text: 'How do you manage stress or tight deadlines?', category: 'Behavior' },
  { text: 'How do you organize and prioritize your workload?', category: 'Behavior' },
  { text: 'Give an example of how you’ve contributed to a team’s success.', category: 'Behavior' },

  // Section 5: Adaptability, Leadership, Culture & Ethics
  { text: 'Tell us about a time you had to quickly adapt to an unexpected change. What did you do?', category: 'Behavior' },
  { text: 'What role do you usually take in team situations, and how do you support others?', category: 'Behavior' },
  { text: 'How would you describe your ideal work culture or environment?', category: 'Behavior' },
  { text: 'Share an instance where you faced an ethical dilemma at work. How did you handle it?', category: 'Behavior' },
  { text: 'How do you ensure your actions align with the company’s mission and values?', category: 'Motivation' },
];
