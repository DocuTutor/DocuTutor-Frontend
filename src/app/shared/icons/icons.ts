import { Component, ChangeDetectionStrategy, input } from '@angular/core';

/**
 * Icon Base Component
 *
 * Base component for rendering SVG icons.
 * Extend this component to create specific icon components.
 *
 * Features:
 * - Configurable size
 * - Custom color support
 * - Accessibility attributes
 * - OnPush change detection for performance
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.html',
  styleUrl: './icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.app-icon]': 'true',
  },
})
export class IconComponent {
  /**
   * Icon size
   */
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  /**
   * Icon color
   */
  color = input<string>('currentColor');

  /**
   * ARIA label for accessibility
   */
  ariaLabel = input<string>('');
}

/**
 * Success Icon Component
 *
 * Renders a checkmark icon indicating success.
 *
 * @example
 * ```html
 * <app-icon-success size="md"></app-icon-success>
 * ```
 */
@Component({
  selector: 'app-icon-success',
  standalone: true,
  imports: [IconComponent],
  template: `<app-icon [size]="size()" [color]="color()" [ariaLabel]="'Success'">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  </app-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSuccessComponent {
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  color = input<string>('#22c55e');
}

/**
 * Error Icon Component
 *
 * Renders an X icon indicating error.
 *
 * @example
 * ```html
 * <app-icon-error size="md"></app-icon-error>
 * ```
 */
@Component({
  selector: 'app-icon-error',
  standalone: true,
  imports: [IconComponent],
  template: `<app-icon [size]="size()" [color]="color()" [ariaLabel]="'Error'">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  </app-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconErrorComponent {
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  color = input<string>('#dc2626');
}

/**
 * Warning Icon Component
 *
 * Renders a warning triangle icon.
 *
 * @example
 * ```html
 * <app-icon-warning size="md"></app-icon-warning>
 * ```
 */
@Component({
  selector: 'app-icon-warning',
  standalone: true,
  imports: [IconComponent],
  template: `<app-icon [size]="size()" [color]="color()" [ariaLabel]="'Warning'">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.04h16.94a2 2 0 0 0 1.71-3.04l-8.47-14.14a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  </app-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconWarningComponent {
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  color = input<string>('#f59e0b');
}

/**
 * Info Icon Component
 *
 * Renders an info circle icon.
 *
 * @example
 * ```html
 * <app-icon-info size="md"></app-icon-info>
 * ```
 */
@Component({
  selector: 'app-icon-info',
  standalone: true,
  imports: [IconComponent],
  template: `<app-icon [size]="size()" [color]="color()" [ariaLabel]="'Info'">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  </app-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconInfoComponent {
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  color = input<string>('#3b82f6');
}

/**
 * Chevron Down Icon Component
 *
 * Renders a downward chevron icon.
 *
 * @example
 * ```html
 * <app-icon-chevron-down size="md"></app-icon-chevron-down>
 * ```
 */
@Component({
  selector: 'app-icon-chevron-down',
  standalone: true,
  imports: [IconComponent],
  template: `<app-icon [size]="size()" [color]="color()" [ariaLabel]="'Chevron down'">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </app-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconChevronDownComponent {
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  color = input<string>('currentColor');
}

/**
 * Menu Icon Component
 *
 * Renders a hamburger menu icon.
 *
 * @example
 * ```html
 * <app-icon-menu size="md"></app-icon-menu>
 * ```
 */
@Component({
  selector: 'app-icon-menu',
  standalone: true,
  imports: [IconComponent],
  template: `<app-icon [size]="size()" [color]="color()" [ariaLabel]="'Menu'">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </app-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconMenuComponent {
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  color = input<string>('currentColor');
}

/**
 * Close Icon Component
 *
 * Renders an X/close icon.
 *
 * @example
 * ```html
 * <app-icon-close size="md"></app-icon-close>
 * ```
 */
@Component({
  selector: 'app-icon-close',
  standalone: true,
  imports: [IconComponent],
  template: `<app-icon [size]="size()" [color]="color()" [ariaLabel]="'Close'">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </app-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCloseComponent {
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  color = input<string>('currentColor');
}
