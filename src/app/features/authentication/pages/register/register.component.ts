import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  DestroyRef
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from '../../../../layouts/auth/auth-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  // 🔹 Inject (modern way)
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // 🔹 Model (can stay normal with template-driven forms)
  model = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // 🔹 Signals (Reactive State)
  isLoading = signal(false);
  errorMessage = signal('');
  errorList = signal<string[]>([]);

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.model.password !== this.model.confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.errorList.set([]);

    this.authService.register(this.model)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);

          if (res.isSuccess) {
            console.log('REGISTER RESPONSE:', res);
            this.router.navigate(['auth/login']);
          } else {
            this.errorMessage.set(res.message || '');

            if (res.errors?.length) {
              this.errorList.set(res.errors);
            }
          }
        },

        error: (err) => {
          this.isLoading.set(false);

          const response = err.error;
          console.log('REGISTER RESPONSE:', response);

          this.errorMessage.set('');
          this.errorList.set([]);

          if (response?.errors?.length) {
            this.errorList.set(response.errors);
          } else {
            this.errorMessage.set(response?.message || 'Register failed');
          }
        }
      });
  }
}