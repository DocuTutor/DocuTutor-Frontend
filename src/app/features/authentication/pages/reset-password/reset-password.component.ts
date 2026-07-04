import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  // ✅ Form model (keep template-driven)
  model = {
    password: '',
    confirmPassword: ''
  };

  // ✅ Signals (state)
  email = signal<string | null>(null);
  token = signal<string | null>(null);

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  // ✅ Modern DI
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    const rawToken = this.route.snapshot.queryParamMap.get('token');

    const token = rawToken
      ? decodeURIComponent(rawToken).replace(/ /g, '+')
      : null;

    this.email.set(email);
    this.token.set(token);

    if (!email || !token) {
      this.errorMessage.set('Invalid or expired reset link.');
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const email = this.email();
    const token = this.token();

    // ✅ safer + avoids "!"
    if (!email || !token) {
      this.errorMessage.set('Invalid request.');
      return;
    }

    if (this.model.password !== this.model.confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const payload = {
      email,
      token,
      password: this.model.password,
      confirmPassword: this.model.confirmPassword
    };

    this.authService.resetPassword(payload).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.successMessage.set(res.message);

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        } else {
          this.errorMessage.set(res.message || 'Failed to reset password');
        }

        this.isLoading.set(false);
      },

      error: (err) => {
        const apiError = err?.error;

        if (apiError?.errors?.length) {
          this.errorMessage.set(apiError.errors.join(', '));
        } else {
          this.errorMessage.set(
            apiError?.message || 'Something went wrong'
          );
        }

        this.isLoading.set(false);
      }
    });
  }
}