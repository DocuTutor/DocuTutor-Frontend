import { Component, EventEmitter, input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DocFilter, DocSort } from '../../types/document.type';

@Component({
  selector: 'app-document-toolbar',
  templateUrl: './document-toolbar.component.html',
  imports:[TranslatePipe,FormsModule,RouterLink],
})
export class DocumentToolbarComponent  {

  readonly search = input<string>("");
  readonly filter = input<DocFilter>("all");
  readonly sort = input<DocSort>("recent");

  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<DocFilter>();
  @Output() sortChange = new EventEmitter<DocSort>();


}
