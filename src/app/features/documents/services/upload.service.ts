import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { DocumentUploadResponse } from '../interfaces/document-upload-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = '/api/Document';

  uploadProgress = signal<number>(0);

  private http = inject(HttpClient);

  uploadDocument(file: File): Observable<DocumentUploadResponse> {
    this.uploadProgress.set(0);

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<DocumentUploadResponse>(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress.set(Math.round((100 * event.loaded) / event.total));
        }
      }),
      filter(event => event.type === HttpEventType.Response),
      map(event => {
        return (event as any).body as DocumentUploadResponse;
      })
    );
  }

  getDocumentStatus(documentId: string): Observable<DocumentUploadResponse> {
    return this.http.get<DocumentUploadResponse>(`${this.apiUrl}/${documentId}`);
  }
}


