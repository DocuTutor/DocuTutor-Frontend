import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent  {

  model = {
    password: '',
    confirmPassword: ''
  };

  email: string | null = null;
  token: string | null = null;

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.email || !this.token) {
      this.errorMessage = 'Invalid or expired reset link.';
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.model.password !== this.model.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.email || !this.token) {
      this.errorMessage = 'Invalid request.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      email: this.email,
      token: this.token,
      newPassword: this.model.password
    };

    // this.authService.resetPassword(payload).subscribe({
    //   next: (res: any) => {
    //     this.isLoading = false;

    //     console.log('RESET PASSWORD RESPONSE:', res);

    //     this.successMessage = 'Password reset successfully! Redirecting...';

    //     // 🔥 redirect after success
    //     setTimeout(() => {
    //       this.router.navigate(['/auth/login']);
    //     }, 2000);
    //   },
    //   error: (err) => {
    //     this.isLoading = false;

    //     console.error('RESET PASSWORD ERROR:', err);

    //     this.errorMessage =
    //       err.error?.message || 'Something went wrong';
    //   }
    // });
  }
}