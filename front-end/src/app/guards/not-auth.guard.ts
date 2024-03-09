import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notAuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  let isLoggedIn;
  let token;

  if (typeof localStorage !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn');
    token = localStorage.getItem('token');
  }

  if (!isLoggedIn && !token) {
    return true;
  } else {
    router.navigateByUrl('');
    return false;
  }
};
