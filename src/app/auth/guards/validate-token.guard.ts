import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces/auth-status-enum';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

export const validateTokenAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  return authService.revalidateTokenAdmin()
    .pipe(
      tap((ok: boolean | any) => {
        if(ok != true){
          router.navigateByUrl('/auth')
          Swal.fire({
            title: 'Acceso inválido',
            text: ok.msg,
            icon: 'info',
            iconColor: 'white',
            background: '#3fc3ee',
            color: 'white',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
          })
        }
      })
    )
};
