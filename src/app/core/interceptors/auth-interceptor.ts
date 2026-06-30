// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { catchError, switchMap, throwError } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);

//   const isAuthRequest =
//     req.url.includes('/login') ||
//     req.url.includes('/register') ||
//     req.url.includes('/refresh');

//   if (isAuthRequest) {
//     return next(req);
//   }

//   const token = authService.getAccessToken();

//   let clonedReq = req;

//   if (token) {
//     clonedReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }

//   return next(clonedReq).pipe(
//     catchError((error: HttpErrorResponse) => {

//       if (error.status === 401) {

//         return authService.refreshToken().pipe(
//           switchMap(res => {
//             const newToken = res.data.token;


//             const retryReq = req.clone({
//               setHeaders: {
//                 Authorization: `Bearer ${newToken}`
//               }
//             });

//             return next(retryReq);
//           }),
//           catchError(err => {
//             authService.logout();
//             return throwError(() => err);
//           })
//         );
//       }

//       return throwError(() => error);
//     })
//   );
// };


// ////-----------------------------------------












// // import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
// // import { inject } from '@angular/core';
// // import { AuthService } from '../services/auth.service';
// // import { catchError, switchMap, throwError } from 'rxjs';

// // let isRefreshing = false;

// // export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
// //   const authService = inject(AuthService);

// //   const token = authService.getAccessToken();

// //   let authReq = req;

// //   if (token) {
// //     authReq = req.clone({
// //       setHeaders: {
// //         Authorization: `Bearer ${token}`
// //       }
// //     });
// //   }

// //   return next(authReq).pipe(
// //     catchError(error => {
// //       if (error.status === 401 && !isRefreshing) {
// //         isRefreshing = true;

// //         return authService.refreshToken().pipe(
// //           switchMap((res: any) => {
// //             isRefreshing = false;

// //             const newToken = res.data.token;

// //             const newReq = req.clone({
// //               setHeaders: {
// //                 Authorization: `Bearer ${newToken}`
// //               }
// //             });

// //             return next(newReq);
// //           }),
// //           catchError(err => {
// //             isRefreshing = false;
// //             authService.logout();
// //             return throwError(() => err);
// //           })
// //         );
// //       }

// //       return throwError(() => error);
// //     })
// //   );
// // };

// // // import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
// // // import { inject } from '@angular/core';
// // // import { AuthStateService } from '../services/auth-state.service';
// // // import { AuthService } from '../services/auth.service';
// // // import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';

// // // let isRefreshing = false;
// // // const refreshSubject = new BehaviorSubject<string | null>(null);

// // // export const authInterceptor: HttpInterceptorFn = (req, next) => {

// // //   const authState = inject(AuthStateService);
// // //   const authService = inject(AuthService);

// // //   const token = authState.getAccessToken();

// // //   if (token) {
// // //     req = req.clone({
// // //       setHeaders: {
// // //         Authorization: `Bearer ${token}`
// // //       }
// // //     });
// // //   }

// // //   return next(req).pipe(
// // //     catchError((error: HttpErrorResponse) => {

// // //       // ❌ If not 401 → just return error
// // //       if (error.status !== 401) {
// // //         return throwError(() => error);
// // //       }

// // //       // ❌ If already refreshing → queue requests
// // //       if (isRefreshing) {
// // //         return refreshSubject.pipe(
// // //           filter(token => token !== null),
// // //           take(1),
// // //           switchMap(newToken => {
// // //             const newReq = req.clone({
// // //               setHeaders: { Authorization: `Bearer ${newToken}` }
// // //             });
// // //             return next(newReq);
// // //           })
// // //         );
// // //       }

// // //       // ✅ Start refresh process
// // //       isRefreshing = true;
// // //       refreshSubject.next(null);

// // //       return authService.refreshToken().pipe(
// // //         switchMap(res => {

// // //           isRefreshing = false;
// // //           const newToken = res.data.token;

// // //           refreshSubject.next(newToken);

// // //           // 🔁 retry original request
// // //           const newReq = req.clone({
// // //             setHeaders: {
// // //               Authorization: `Bearer ${newToken}`
// // //             }
// // //           });

// // //           return next(newReq);
// // //         }),
// // //         catchError(err => {

// // //           isRefreshing = false;
// // //           authState.clear(); // ❌ logout

// // //           return throwError(() => err);
// // //         })
// // //       );
// // //     })
// // //   );
// // // };