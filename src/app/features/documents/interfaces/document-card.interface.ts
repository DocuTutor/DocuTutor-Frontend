import { DashboardDocumentCard } from "../../dashboard/models/dashboard.models";
import { DocStatus } from "../types/document.type";

export interface DocumentCardModel extends DashboardDocumentCard {
  status: DocStatus;
  aiSummary: "ready" | "generating" | "pending";
  quiz: "ready" | "generating" | "pending";
  flashcards: "ready" | "generating" | "pending";
}

