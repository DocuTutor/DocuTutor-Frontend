import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatComponent } from '../../components/chat/chat.component';
import { DocumentService } from '../../services/document.service';

/**
 * Document Details Page
 * Displays document information and allows users to interact with it via chat
 */
@Component({
  selector: 'app-document-details',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './document-details.page.html',
  styleUrls: ['./document-details.page.css']
})
export class DocumentDetailsPage implements OnInit {
  
  /**
   * Document ID from route parameters
   */
  documentId = signal<string | null>(null);

  /**
   * Document name/title (you can load this from your document service)
   */
  documentName = signal<string>('Document');

  private readonly route = inject(ActivatedRoute);
  private readonly documentService = inject(DocumentService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const id = params.get('id');
      this.documentId.set(id);

      if (!id) {
        this.documentName.set('Document');
        return;
      }

      this.documentService.getDocument(id).subscribe({
        next: (doc) => this.documentName.set(doc.fileName),
        error: () => this.documentName.set('Document'),
      });
    });
  }
}
