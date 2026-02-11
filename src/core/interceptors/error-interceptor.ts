import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap, throwError } from "rxjs";
import { LoginService } from "../../shares/services/login/login.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  return next(req).pipe(
    tap((event: any) => {
      if (event.body?.errors) {
        const hasAuthError: boolean = event.body.errors.some((error: any) => {
          return error.extensions?.code === 'UNAUTHENTICATED';
        })

        if (hasAuthError) {
          loginService.logout('reason', 'session-expired');
          throw new Error('Unauthorized');
        }

      }
    })
  )
};

