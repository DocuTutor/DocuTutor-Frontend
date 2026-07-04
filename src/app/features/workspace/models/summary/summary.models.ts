export interface SummarySection {
  heading: string;
  body: string;
}

export interface KeyTerm {
  term: string;
  def: string;
}

export interface SummaryData {
  title: string;
  reading: string;
  generated: string;
  sections: SummarySection[];
  keyTerms: KeyTerm[];
  studyTips: string[];
}