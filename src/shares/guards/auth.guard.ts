import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../services/login/login.service";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
}
