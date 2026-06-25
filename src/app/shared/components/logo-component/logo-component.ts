import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logo-component.html',
})
export class LogoComponent {
  readonly to = input<string>('/');
  readonly invert = input<boolean>(false);
  readonly compact = input<boolean>(false);
}