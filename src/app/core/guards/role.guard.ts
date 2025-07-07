import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  if (typeof window === 'undefined') {
    console.log('roleGuard SSR: localStorage no disponible');
    router.navigate(['/login']);
    return false;
  }

  const token = localStorage.getItem('token');
  console.log('roleGuard ejecutado. Token:', token);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    console.log('Decoded JWT:', decoded);
    const userRole = decoded.authority || decoded.role;

    const allowedRoles = route.data['roles'] as string[];

    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  } catch (err) {
    router.navigate(['/login']);
    return false;
  }
};
