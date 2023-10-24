import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces/auth-status-enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  // const url = state.url

  // console.log({url})

  const authservice = inject(AuthServiceService);
  const router = inject(Router);

  if(authservice.authStatus() ===  AuthStatus.authenticated) {
    return true
  }

  router.navigateByUrl('/auth/login');

  return false
};
