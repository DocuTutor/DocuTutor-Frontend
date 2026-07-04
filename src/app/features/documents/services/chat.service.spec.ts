import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChatService } from './chat.service';
import { ChatResponse } from '../interfaces/chat.interface';
import { API_ENDPOINTS } from '../constants/api.constants';

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatService]
    });

    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('ask method', () => {
    it('should send POST request with correct payload', () => {
      const documentId = '123e4567-e89b-12d3-a456-426614174000';
      const question = 'What is this document about?';
      const mockResponse: ChatResponse = {
        answer: 'This document is about Angular development.'
      };

      service.ask(documentId, question).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        documentId,
        question
      });

      req.flush(mockResponse);
    });

    it('should handle successful response', (done) => {
      const documentId = 'test-id';
      const question = 'Test question?';
      const mockResponse: ChatResponse = {
        answer: 'Test answer'
      };

      service.ask(documentId, question).subscribe({
        next: (response) => {
          expect(response.answer).toBe('Test answer');
          done();
        }
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      req.flush(mockResponse);
    });

    it('should handle 400 Bad Request error', (done) => {
      const documentId = 'test-id';
      const question = '';
      const errorResponse = {
        message: 'Question is required',
        error: 'Validation error',
        type: 'ValidationException'
      };

      service.ask(documentId, question).subscribe({
        error: (error) => {
          expect(error.message).toContain('Question is required');
          done();
        }
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });
    });

    it('should handle 401 Unauthorized error', (done) => {
      const documentId = 'test-id';
      const question = 'Test?';

      service.ask(documentId, question).subscribe({
        error: (error) => {
          expect(error.message).toContain('not authorized');
          done();
        }
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      req.flush({}, { status: 401, statusText: 'Unauthorized' });
    });

    it('should handle 404 Not Found error', (done) => {
      const documentId = 'invalid-id';
      const question = 'Test?';

      service.ask(documentId, question).subscribe({
        error: (error) => {
          expect(error.message).toContain('not found');
          done();
        }
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      req.flush({}, { status: 404, statusText: 'Not Found' });
    });

    it('should handle 500 Server Error', (done) => {
      const documentId = 'test-id';
      const question = 'Test?';
      const errorResponse = {
        message: 'An error occurred while processing your request',
        error: 'NullReferenceException',
        type: 'SystemException'
      };

      service.ask(documentId, question).subscribe({
        error: (error) => {
          expect(error.message).toContain('error occurred');
          done();
        }
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      req.flush(errorResponse, { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle network errors', (done) => {
      const documentId = 'test-id';
      const question = 'Test?';

      service.ask(documentId, question).subscribe({
        error: (error) => {
          expect(error.message).toContain('Network error');
          done();
        }
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      req.error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });
    });

    it('should handle empty response', (done) => {
      const documentId = 'test-id';
      const question = 'Test?';
      const mockResponse: ChatResponse = {
        answer: ''
      };

      service.ask(documentId, question).subscribe({
        next: (response) => {
          expect(response.answer).toBe('');
          done();
        }
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      req.flush(mockResponse);
    });

    it('should handle long responses', (done) => {
      const documentId = 'test-id';
      const question = 'Explain in detail';
      const longAnswer = 'A'.repeat(10000); // Very long answer
      const mockResponse: ChatResponse = {
        answer: longAnswer
      };

      service.ask(documentId, question).subscribe({
        next: (response) => {
          expect(response.answer.length).toBe(10000);
          done();
        }
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      req.flush(mockResponse);
    });

    it('should handle special characters in question', (done) => {
      const documentId = 'test-id';
      const question = 'What about <script>alert("test")</script> in the document?';
      const mockResponse: ChatResponse = {
        answer: 'Safe answer'
      };

      service.ask(documentId, question).subscribe({
        next: (response) => {
          expect(response.answer).toBe('Safe answer');
          done();
        }
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHAT.ASK);
      expect(req.request.body.question).toBe(question);
      req.flush(mockResponse);
    });

    it('should handle multiple simultaneous requests', () => {
      const documentId1 = 'doc-1';
      const documentId2 = 'doc-2';
      const question1 = 'Question 1?';
      const question2 = 'Question 2?';

      service.ask(documentId1, question1).subscribe();
      service.ask(documentId2, question2).subscribe();

      const requests = httpMock.match(API_ENDPOINTS.CHAT.ASK);
      expect(requests.length).toBe(2);

      expect(requests[0].request.body.documentId).toBe(documentId1);
      expect(requests[1].request.body.documentId).toBe(documentId2);

      requests[0].flush({ answer: 'Answer 1' });
      requests[1].flush({ answer: 'Answer 2' });
    });
  });
});
