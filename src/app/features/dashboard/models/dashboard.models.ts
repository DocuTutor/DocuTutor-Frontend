export interface DashboardStatCard {
  keyLabel: string;
  value: string;
  keyDescription: string;
  tone: string;
}

export interface DashboardQuickAction {
  icon: string;
  keyLabel: string;
}
export interface Document{
  
}

export interface DashboardDocumentCard {
  id: string;
  title: string;
  type: string;
  pages: number;
  size: string;
  updatedAtKey?: string;
  updatedAtRaw?: string;
  progress: number;
  emoji: string;
  color: string;
}

export interface DashboardTipCard {
  keyEyebrow: string;
  keyTitle: string;
  keyButton: string;
}