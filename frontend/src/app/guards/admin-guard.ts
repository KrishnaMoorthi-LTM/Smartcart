import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Not logged in → go to login
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Logged in but not admin/staff → go to home
  if (!authService.isAdminOrStaff()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};