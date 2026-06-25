
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-upload-document-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './upload-document.page.html',
  styleUrl: './upload-document.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDocumentPage {
  
}