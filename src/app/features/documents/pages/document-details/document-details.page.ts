import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from '../../components/chat/chat.component';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get document ID from route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.documentId.set(id);
      
      // TODO: Load document details from your document service
      // this.documentService.getDocument(id).subscribe(doc => {
      //   this.documentName.set(doc.name);
      // });
    });
  }
}
