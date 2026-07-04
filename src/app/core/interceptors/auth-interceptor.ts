import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const isAuthRequest =
    req.url.includes('/login') ||
    req.url.includes('/register') ||
    req.url.includes('/refresh') ||
    req.url.includes('/forgot-password') ||
    req.url.includes('/reset-password');

  if (isAuthRequest) {
    return next(req);
  }

  const token = authService.getAccessToken();

  let clonedReq = req;

  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {

        const refreshToken = authService.getRefreshToken();

        if (!refreshToken) {
          authService.forceLogout();
          return throwError(() => error);
        }

        return authService.refreshToken().pipe(
          switchMap(res => {
            if (!res.isSuccess) {
              authService.forceLogout();
              return throwError(() => error);
            }

            const newToken = res.data.token;

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });

            return next(retryReq);
          }),
          catchError(err => {
            authService.forceLogout();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};