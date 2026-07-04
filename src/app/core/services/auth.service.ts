// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import {
//   LoginRequest, RegisterRequest,
//   ApiResponse, LoginResponseData
// } from '../../features/authentication/models/auth.models';
// import { tap } from 'rxjs';
// import { AuthStateService } from './auth-state.service';

// @Injectable({ providedIn: 'root' })
// export class AuthService {

//   baseUrl = 'https://your-api-url/api/auth';

//   constructor(
//     private http: HttpClient,
//     private state: AuthStateService
//   ) {}

//   login(model: LoginRequest) {
//     return this.http.post<ApiResponse<LoginResponseData>>(
//       `${this.baseUrl}/login`, model
//     ).pipe(
//       tap(res => res.isSuccess && this.state.setUser(res.data))
//     );
//   }

//   register(model: RegisterRequest) {
//     return this.http.post<ApiResponse<string>>(
//       `${this.baseUrl}/register`, model
//     );
//   }

//   refreshToken() {
//     return this.http.post<ApiResponse<LoginResponseData>>(
//       `${this.baseUrl}/refresh-token`,
//       {
//         accessToken: this.state.getAccessToken(),
//         refreshToken: this.state.getRefreshToken()
//       }
//     ).pipe(
//       tap(res => res.isSuccess && this.state.setUser(res.data))
//     );
//   }

//   logout() {
//     this.state.clear();
//   }
// }
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ApiResponse, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from '../../features/authentication/models/auth.models';
import { EmailValidator } from '@angular/forms';
import { ForgotPasswordDto } from '../../features/authentication/models/forgot-password-request.model';
import { ResetPasswordDto } from '../../features/authentication/models/reset-password-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router = inject(Router);
  private baseUrl = 'http://localhost:5008/api/Auth';
  readonly isAuthenticated = signal(this.hasStoredToken());

  private accessToken: string | null = null;
  private refreshTokenValue: string | null = null;

  constructor(private http: HttpClient) { }



  register(model: any) { //Registerrequest
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/register`, {
      fullName: model.name,
      email: model.email,
      password: model.password,
      confirmPassword: model.confirmPassword
    });
  }

  login(model: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, {
      Email: model.email,
      Password: model.password
    }
    ).pipe(
      tap(res => {
        if (res.isSuccess) {
          this.setSession(res.data);
        }
      })
    );
  }

  // core/services/auth.service.ts

  forgotPassword(data: ForgotPasswordDto) {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/forgotpassword`, data);
  }
  resetPassword(data: ResetPasswordDto) {
    return this.http.post<ApiResponse<string>>(
      `${this.baseUrl}/resetpassword`,
      data
    );
  }
  // refreshToken(model: RefreshTokenRequest) {
  //   return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/refresh-token`,
  //     {
  //       accessToken: model.accessToken,
  //       refreshToken: model.refreshToken
  //     }
  //   );

  // }
  //This flow will be updated
  refreshToken(): Observable<ApiResponse<RefreshTokenResponse>> {
    const request: RefreshTokenRequest = {
      accessToken: this.getAccessToken()!,
      refreshToken: this.getRefreshToken()!
    };

    return this.http.post<ApiResponse<RefreshTokenResponse>>(
      `${this.baseUrl}/refresh-token`,
      request
    ).pipe(
      tap(res => {
        if (res.isSuccess) {
          this.setSession(res.data);
        }
      })
    );
  }

  private setSession(data: any) {
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data));
    this.isAuthenticated.set(true);
  }

  private hasStoredToken(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): Observable<ApiResponse<string>> {
    if (!this.getAccessToken()) {
      this.clearSession();

      return of({
        isSuccess: true,
        data: '',
        message: 'Already signed out',
        statusCode: 200,
        errors: []
      });
    }

    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => this.clearSession()),
      catchError(err => {
        this.clearSession();

        const errorResponse: ApiResponse<string> = {
          isSuccess: false,
          data: '',
          message: err?.error?.message || 'Logout failed',
          statusCode: err?.status || 500,
          errors: err?.error?.errors || []
        };

        return of(errorResponse); // ✅ return ApiResponse instead of throwError
      })
    );
  }
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }


  clearSession() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.isAuthenticated.set(false);
  }
  forceLogout() {
    this.clearSession();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}



