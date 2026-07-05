import { Injectable, Inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  // readonly summaryData = signal<SummaryData | null>(null);

  // constructor(@Inject('SummaryService') private summaryService: any) {}

  // loadSummary(question: string) {
  //   this.summaryService.getSummary(question).subscribe({
  //     next: (data) => this.summaryData.set(data),
  //     error: (err) => console.error(err),
  //   });
  // }

}
