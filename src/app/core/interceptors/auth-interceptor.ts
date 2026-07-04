import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';

const AUTH_ENDPOINTS = ['/login', '/register', '/refresh-token', '/forgotpassword', '/resetpassword'];

let isRefreshing = false;
const refreshedToken$ = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => req.url.includes(endpoint));

  const token = authService.getAccessToken();
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isAuthEndpoint) {
        return throwError(() => error);
      }

      if (!authService.getRefreshToken()) {
        authService.logout();
        router.navigate(['/auth/login']);
        return throwError(() => error);
      }

      if (isRefreshing) {
        return refreshedToken$.pipe(
          filter((newToken) => newToken !== null),
          take(1),
          switchMap((newToken) =>
            next(req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } })),
          ),
        );
      }

      isRefreshing = true;
      refreshedToken$.next(null);

      return authService.refreshToken().pipe(
        switchMap((res) => {
          isRefreshing = false;
          const newToken = res.data.token;
          refreshedToken$.next(newToken);

          return next(req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }));
        }),
        catchError((refreshError) => {
          isRefreshing = false;
          authService.logout();
          router.navigate(['/auth/login']);
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
