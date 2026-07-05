import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';
import { DocumentUploadResponse } from '../interfaces/document-upload-response.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly http = inject(HttpClient);

  getUserDocuments(): Observable<DocumentUploadResponse[]> {
    return this.http.get<DocumentUploadResponse[]>(`${API_ENDPOINTS.DOCUMENTS.BASE}/user-documents`);
  }

  getDocument(documentId: string): Observable<DocumentUploadResponse> {
    return this.http.get<DocumentUploadResponse>(`${API_ENDPOINTS.DOCUMENTS.BASE}/${documentId}`);
  }



}
