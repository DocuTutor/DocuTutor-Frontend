import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { SummaryData } from '../models/workspace.models';


@Injectable({ providedIn: 'root' })
export class SummaryService {

  private readonly baseUrl = 'https://<your-langflow-host>';
  private readonly flowId = '242799cb-75a5-4c55-a900-de4c11c17a58';

  constructor(private http: HttpClient) {}

 
  getSummary(question: string, documentId?: string): Observable<SummaryData> {
    const url = `${this.baseUrl}/api/v1/run/${this.flowId}?stream=false`;

    const body: any = {
      input_value: question,
      output_type: 'chat',
      input_type: 'chat',
    };

    // Only send tweaks if you need to override the retriever's document_id per request
    if (documentId) {
      body.tweaks = {
        'CustomComponent-qDfj4': {
          document_id: documentId,
        },
      };
    }

    return this.http.post<LangflowRunResponse>(url, body).pipe(
      map((res) => this.extractSummary(res)),
      catchError((err) => {
        console.error('Failed to fetch summary from Langflow', err);
        return throwError(() => err);
      })
    );
  }

  private extractSummary(res: LangflowRunResponse): SummaryData {
    const rawText = res.outputs?.[0]?.outputs?.[0]?.results?.message?.text ?? '';
    const cleaned = rawText.replace(/```json|```/g, '').trim();

    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      throw new Error('Model did not return valid JSON: ' + rawText);
    }

    return {
      title: parsed.title ?? '',
      reading: parsed.reading ?? '',
      generated: parsed.generated || 'just now',
      sections: parsed.sections ?? [],
      keyTerms: (parsed.key_terms ?? []).map((k: any) => ({
        term: k.term ?? '',
        def: k.def ?? '',
      })),
      studyTips: parsed.study_tips ?? [],
    };
  }
}