export type WorkspaceTab = 'chat' | 'quiz' | 'summary';

export interface WorkspaceTabOption {
  id: WorkspaceTab;
  label: string;
}

export interface Citation {
  page: number;
  label: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
}

export interface WorkspaceDocument {
  id: string;
  title: string;
  type: string;
  pages: number;
  updatedAt: string;
  emoji: string;
  color: string;
  size: string;
  progress: number;
}

export interface QuizQuestion {
  id: string;
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface SummarySection {
  heading: string;
  body: string;
}

export interface SummaryKeyTerm {
  term: string;
  def: string;
}

export interface SummaryData {
  title: string;
  reading: string;
  generated: string;
  sections: SummarySection[];
  keyTerms: SummaryKeyTerm[];
  studyTips: string[];
}