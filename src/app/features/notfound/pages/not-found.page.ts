import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-background px-4">
      <div class="max-w-md text-center">
        <h1 class="text-7xl font-bold text-foreground">404</h1>

        <h2 class="mt-4 text-xl font-semibold text-foreground">
          {{ 'notFound.title' | translate }}
        </h2>

        <p class="mt-2 text-sm text-muted-foreground">
          {{ 'notFound.description' | translate }}
        </p>

        <div class="mt-6">
          <a
            routerLink="/"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {{ 'notFound.goHome' | translate }}
          </a>
        </div>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}