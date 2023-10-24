import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces/auth-status-enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  // console.log({status: authService.authStatus()});

  if(authService.authStatus() === AuthStatus.authenticated){
    router.navigateByUrl('/main')
    return false;
  }

  return true;
};
