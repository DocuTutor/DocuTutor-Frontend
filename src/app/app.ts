import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from "./shared/components/theme-toggle/theme-toggle";
import { LogoComponent } from './shared/components/logo-component/logo-component';
import { MarketingLayoutComponent } from "./layouts/marketing/marketing-layout.component";
import { SettingsComponent } from "./features/settings/components/settings-component/settings-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeToggleComponent, LogoComponent, MarketingLayoutComponent, SettingsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DocuTutor');
}
