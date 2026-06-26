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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:3658/m1/1212435-1208182-default/api/Auth';

  private accessToken: string | null = null;
  private refreshTokenValue: string | null = null;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        this.setSession(res.data);
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh-token`, {
      accessToken: this.accessToken,
      refreshToken: this.refreshTokenValue
    }).pipe(
      tap((res: any) => {
        this.setSession(res.data);
      })
    );
  }

  private setSession(data: any) {
    this.accessToken = data.token;
    this.refreshTokenValue = data.refreshToken;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshTokenValue;
  }

  logout() {
    this.accessToken = null;
    this.refreshTokenValue = null;
  }
}