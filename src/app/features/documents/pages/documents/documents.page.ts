import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { DocStat } from "../../interfaces/document-statistics.interface";
import { DocFilter, DocSort, DocAction, DocStatus } from "../../types/document.type";
import { DocumentToolbarComponent } from "../../components/document-toolbar/document-toolbar.component";
import { DocumentCardComponent } from "../../components/document-card/document-card.component";
import { DocumentStatisticsComponent } from "../../components/document-statistics/document-statistics.component";
import { EmptyDocumentsComponent } from "../../components/empty-documents/empty-documents.component";
import { LoadingSkeletonComponent } from "../../components/loading-skeleton/loading-skeleton.component";
import { DocumentPaginationComponent } from "../../components/document-pagination/document-pagination.component";
import { DocumentService } from "../../services/document.service";
import { DocumentUploadResponse } from "../../interfaces/document-upload-response.interface";
import { DocumentCardModel } from "../../interfaces/document-card.interface";

function normalizeStatus(status: string | null | undefined): DocStatus {
  switch ((status ?? "").trim().toLowerCase()) {
    case "processing":
      return "processing";
    case "ready":
    case "completed":
      return "completed";
    case "failed":
    case "error":
      return "failed";
    default:
      return "processing";
  }
}

function toCard(doc: DocumentUploadResponse): DocumentCardModel {
  const status = normalizeStatus(doc.status);
  const uploadedAt = new Date(doc.createdAt);
  const extension = doc.fileName.split(".").pop()?.toUpperCase() || "FILE";

  return {
    id: doc.documentId,
    userId: doc.userId,
    title: doc.fileName.replace(/\.[^.]+$/, ""),
    type: extension,
    createdAt: doc.createdAt,
    updatedAtRaw: uploadedAt.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status,
    progress: status === "completed" ? 100 : status === "processing" ? 48 : 12,
    emoji: status === "completed" ? "✅" : status === "processing" ? "⏳" : "⚠️",
    color:
      status === "completed"
        ? "from-emerald-500 to-cyan-500"
        : status === "processing"
          ? "from-amber-500 to-orange-500"
          : "from-rose-500 to-red-500",
    aiSummary: status === "completed" ? "ready" : status === "processing" ? "generating" : "pending",
    quiz: status === "completed" ? "ready" : "pending",
    flashcards: status === "completed" ? "ready" : "pending",
  };
}

@Component({
  selector: "app-documents-page",
  standalone: true,
  imports: [TranslatePipe, DocumentCardComponent, DocumentToolbarComponent, DocumentStatisticsComponent, EmptyDocumentsComponent, LoadingSkeletonComponent, DocumentPaginationComponent],
  templateUrl: "./documents.page.html",
  styleUrl: "./documents.page.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsPage implements OnInit {
  readonly pageSize = 8;

  private readonly documentService = inject(DocumentService);

  readonly loading = signal(true);
  readonly errorKey = signal<string | null>(null);
  readonly allDocs = signal<DocumentCardModel[]>([]);
  readonly search = signal("");
  readonly filter = signal<DocFilter>("all");
  readonly sort = signal<DocSort>("recent");
  readonly page = signal(1);

  ngOnInit(): void {
    this.loadDocuments();
  }

  private loadDocuments(): void {
    this.loading.set(true);
    this.errorKey.set(null);

    this.documentService.getUserDocuments().subscribe({
      next: (docs) => {
        this.allDocs.set(docs.map(toCard));
        this.page.set(1);
        this.loading.set(false);
      },
      error: () => {
        this.allDocs.set([]);
        this.errorKey.set("documents.errors.loadFailed");
        this.loading.set(false);
      },
    });
  }

  onRetry(): void {
    this.loadDocuments();
  }

  readonly stats = computed<DocStat[]>(() => {
    const docs = this.allDocs();
    const by = (s: DocumentCardModel["status"]) => docs.filter((d) => d.status === s).length;
    return [
      { key: "total",      labelKey: "documents.stats.total",      value: docs.length,    icon: "📚", tone: "bg-brand-soft text-brand-deep" },
      { key: "processing", labelKey: "documents.stats.processing", value: by("processing"), icon: "⏳", tone: "bg-warning/25 text-warning-foreground" },
      { key: "completed",  labelKey: "documents.stats.completed",  value: by("completed"),  icon: "✅", tone: "bg-brand text-white" },
      { key: "failed",     labelKey: "documents.stats.failed",     value: by("failed"),     icon: "⚠️", tone: "bg-destructive/15 text-destructive" },
    ];
  });

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const f = this.filter();
    let out = this.allDocs();
    if (f !== "all") out = out.filter((d) => d.status === f);
    if (q) out = out.filter((d) => d.title.toLowerCase().includes(q));
    switch (this.sort()) {
      case "name":
        out = [...out].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: break;
    }
    return out;
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));

  readonly paginated = computed(() => {
    const start = (Math.min(this.page(), this.totalPages()) - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  onSearch(v: string) { this.search.set(v); this.page.set(1); }
  onFilter(v: DocFilter) { this.filter.set(v); this.page.set(1); }
  onSort(v: DocSort) { this.sort.set(v); this.page.set(1); }

  onCardAction(e: { id: string; action: DocAction }) {
    if (e.action === "delete") {
      this.allDocs.update((list) => list.filter((d) => d.id !== e.id));
    }
    // Other actions are wired to real handlers when the API is connected.
  }
}
