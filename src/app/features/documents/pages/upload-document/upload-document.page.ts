import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { UploadService } from '../../services/upload.service';
import { TranslatePipe } from '@ngx-translate/core';

export type UploadStatus = 'IDLE' | 'UPLOADING' | 'PROCESSING' | 'SUCCESS' | 'ERROR';

@Component({
  selector: 'app-upload-document-page',
  standalone: true,
  imports: [DecimalPipe, TranslatePipe, RouterLink],
  templateUrl: './upload-document.page.html',
  styleUrl: './upload-document.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDocumentPage {
  private uploadService = inject(UploadService);
  private destroyRef = inject(DestroyRef);

  status = signal<UploadStatus>('IDLE');
  selectedFile = signal<File | null>(null);
  uploadProgress = this.uploadService.uploadProgress;
  errorMessage = signal<string | null>(null);

  private pollingTimer: ReturnType<typeof setInterval> | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.startUpload(file);
    }
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.startUpload(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private startUpload(file: File): void {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      this.errorMessage.set('Only PDF files are currently supported by the backend.');
      return;
    }

    this.errorMessage.set(null);
    this.selectedFile.set(file);
    this.status.set('UPLOADING');

    this.uploadService.uploadDocument(file).subscribe({
      next: (response) => {
        if (response) {
          this.pollDocumentStatus(response.documentId);
        }
      },
      error: (err) => {
        console.error('Upload error details:', err);
        const detailedError = err.error?.message
          || `Error ${err.status}: ${err.statusText || 'Unable to connect to server'}`;
        this.errorMessage.set(detailedError);
        this.status.set('IDLE');
      }
    });
  }

  private pollDocumentStatus(documentId: string): void {
    this.status.set('PROCESSING');
    this.stopPolling();

    this.pollingTimer = setInterval(() => {
      this.uploadService.getDocumentStatus(documentId).subscribe({
        next: (doc) => {
          const status = doc.status?.toLowerCase();
          if (status === 'ready') {
            this.stopPolling();
            this.status.set('SUCCESS');
          } else if (status === 'error') {
            this.stopPolling();
            this.errorMessage.set('Document processing failed. Please try again.');
            this.status.set('ERROR');
          }
          // if still 'processing', keep polling
        },
        error: () => {
          this.stopPolling();
          this.errorMessage.set('Failed to check document status.');
          this.status.set('ERROR');
        }
      });
    }, 3000);

    this.destroyRef.onDestroy(() => this.stopPolling());
  }

  private stopPolling(): void {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = null;
    }
  }

  reset(): void {
    this.stopPolling();
    this.status.set('IDLE');
    this.selectedFile.set(null);
    this.errorMessage.set(null);
  }
  
}


