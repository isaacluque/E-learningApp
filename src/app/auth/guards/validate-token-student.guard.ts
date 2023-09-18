import { CanActivateFn } from '@angular/router';

export const validateTokenStudentGuard: CanActivateFn = (route, state) => {
  return true;
};
