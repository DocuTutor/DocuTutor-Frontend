import { DocStatus } from "../types/document.type";

export interface DocumentCardModel {
  id: string;
  userId: string;
  title: string;
  type: string;
  createdAt: string;
  updatedAtRaw: string;
  progress: number;
  emoji: string;
  color: string;
  status: DocStatus;
  aiSummary: "ready" | "generating" | "pending";
  quiz: "ready" | "generating" | "pending";
  flashcards: "ready" | "generating" | "pending";
}

