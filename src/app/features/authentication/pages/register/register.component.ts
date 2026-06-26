import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from '../../../../layouts/auth/auth-layout.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule,AuthLayoutComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  model = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.model.password !== this.model.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.model).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res.isSuccess) {
          console.log('REGISTER RESPONSE:', res); 

          this.router.navigate(['auth/login']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Register failed';
      }
    });
  }
}