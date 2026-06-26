import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

  email = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // this.authService.forgotPassword(this.email).subscribe({
    //   next: (res: any) => {
    //     this.isLoading = false;

    //     console.log('FORGOT PASSWORD RESPONSE:', res);

    //     this.successMessage = 'Reset link sent! Check your email.';
    //   },
    //   error: (err) => {
    //     this.isLoading = false;

    //     console.error('FORGOT PASSWORD ERROR:', err);

    //     this.errorMessage = err.error?.message || 'Something went wrong';
    //   }
    // });
  }
}