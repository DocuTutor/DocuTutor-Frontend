import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { DocumentCardModel } from "../../interfaces/document-card.interface";
import { documents } from "../../../workspace/models/workspace.mock";
import { TranslatePipe } from "@ngx-translate/core";
import { DocStat } from "../../interfaces/document-statistics.interface";
import { DocFilter, DocSort, DocAction } from "../../types/document.type";
import { DocumentToolbarComponent } from "../../components/document-toolbar/document-toolbar.component";
import { DocumentCardComponent } from "../../components/document-card/document-card.component";
import { DocumentStatisticsComponent } from "../../components/document-statistics/document-statistics.component";
import { EmptyDocumentsComponent } from "../../components/empty-documents/empty-documents.component";
import { LoadingSkeletonComponent } from "../../components/loading-skeleton/loading-skeleton.component";
import { DocumentPaginationComponent } from "../../components/document-pagination/document-pagination.component";


const STATUS_CYCLE: DocumentCardModel["status"][] = ["completed", "processing", "completed", "failed"];
const FEATURE_CYCLE: DocumentCardModel["aiSummary"][] = ["ready", "generating", "pending"];

function toCard(d: (typeof documents)[number], i: number): DocumentCardModel {
  return {
    ...d,
    status: STATUS_CYCLE[i % STATUS_CYCLE.length],
    aiSummary: FEATURE_CYCLE[i % 3],
    quiz: FEATURE_CYCLE[(i + 1) % 3],
    flashcards: FEATURE_CYCLE[(i + 2) % 3],
  };
}

// Expand mock data so pagination has something to page through.
const SEED: DocumentCardModel[] = Array.from({ length: 11 }, (_, i) =>
  toCard(documents[i % documents.length], i),
).map((d, i) => ({ ...d, id: `${d.id}-${i}` }));

@Component({
  selector: "app-documents-page",
  standalone: true,
  imports: [TranslatePipe,DocumentCardComponent,DocumentToolbarComponent,DocumentStatisticsComponent,EmptyDocumentsComponent,LoadingSkeletonComponent,DocumentPaginationComponent,],
  templateUrl: "./documents.page.html",
  styleUrl: "./documents.page.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsPage {
  readonly pageSize = 8;

  readonly loading = signal(false);
  readonly allDocs = signal<DocumentCardModel[]>(SEED);
  readonly search = signal("");
  readonly filter = signal<DocFilter>("all");
  readonly sort = signal<DocSort>("recent");
  readonly page = signal(1);

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
      case "name": out = [...out].sort((a, b) => a.title.localeCompare(b.title)); break;
      case "size": out = [...out].sort((a, b) => b.pages - a.pages); break;
      default: break;
    }
    return out;
  });

  readonly paginated = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  onSearch(v: string) { this.search.set(v); this.page.set(1); }
  onFilter(v: DocFilter) { this.filter.set(v); this.page.set(1); }
  onSort(v: DocSort) { this.sort.set(v); }

  onCardAction(e: { id: string; action: DocAction }) {
    if (e.action === "delete") {
      this.allDocs.update((list) => list.filter((d) => d.id !== e.id));
    }
    // Other actions are wired to real handlers when the API is connected.
  }
}
