import { Component, ChangeDetectionStrategy, signal, inject, DestroyRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from '../../../../layouts/auth/auth-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  // 🔹 Modern DI
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // 🔹 Model
  model = {
    email: '',
    password: ''
  };

  // 🔹 Signals (same as register)
  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.model)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);

          if (res.isSuccess) {
            console.log('LOGIN RESPONSE:', res);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage.set(res.message || 'Login failed');
          }
        },

        error: (err) => {
          this.isLoading.set(false);

          const response = err.error;
          console.log('LOGIN ERROR:', response);

          this.errorMessage.set(response?.message || 'Login failed');
        }
      });
  }
}