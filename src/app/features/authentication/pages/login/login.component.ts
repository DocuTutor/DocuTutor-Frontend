import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from '../../../../layouts/auth/auth-layout.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,AuthLayoutComponent,RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  model = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.model).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res.isSuccess) {
          console.log(res)
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}