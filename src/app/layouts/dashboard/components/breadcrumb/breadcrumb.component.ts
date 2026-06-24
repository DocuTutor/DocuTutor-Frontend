import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Breadcrumb Component
 * 
 * Recommendations:
 * - Display current navigation path
 * - Link to parent pages for quick navigation
 * - Show current page without link
 * - Use arrow/chevron separators
 * - Home icon as first breadcrumb
 * - Mobile: collapse to just current page with dropdown
 */
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {}
