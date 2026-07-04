import { Component, signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './forget-password.component.html'
})
export class ForgetPasswordComponent {

  email = signal('');

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  private authService = inject(AuthService);

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const payload = {
      email: this.email(),
      clientUri: 'http://localhost:4200/auth/reset-password'
    };

    this.authService.forgotPassword(payload).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log('forget RESPONSE:', res);

          this.successMessage.set(res.message);
          form.resetForm();

          this.email.set('');
        } else {
          this.errorMessage.set(res.message || '• Failed to send reset link');
        }

        this.isLoading.set(false);
      },

      error: (err) => {
        this.errorMessage.set(
          err?.error?.message ||
          err?.error?.errors?.[0] ||
          '• Something went wrong. Please try again.'
        );

        this.isLoading.set(false);
      }
    });
  }
}