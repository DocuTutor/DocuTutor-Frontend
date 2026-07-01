import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-billing-cancel-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <span class="grid h-14 w-14 place-items-center rounded-full bg-warning/15 text-warning">
        <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </span>
      <h1 class="font-display text-3xl font-bold text-foreground">Checkout canceled</h1>
      <p class="text-muted-foreground">
        No worries, you haven't been charged. You can pick a plan again whenever you're ready.
      </p>
      <a routerLink="/pricing" class="mt-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
        Back to pricing
      </a>
    </div>
  `,
})
export class BillingCancelPage {}
