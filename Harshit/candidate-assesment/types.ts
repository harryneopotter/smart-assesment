
export interface Question {
  text: string;
  category: 'Passion' | 'Motivation' | 'Skills' | 'Behavior';
}

export interface ScoreCategory {
  score: number;
  reasoning: string;
}

export interface ScorecardData {
  scores: {
    passion: ScoreCategory;
    motivation: ScoreCategory;
    skills: ScoreCategory;
    behavior: ScoreCategory;
  };
  summary: string;
  strengths: string[];
  areasForImprovement: string[];
}
