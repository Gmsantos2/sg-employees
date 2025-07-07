import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // ✅ Evitar error en SSR (localStorage no existe en Node)
  if (typeof window === 'undefined') {
    console.log('authGuard SSR: localStorage no disponible');
    return false;
  }

  const token = localStorage.getItem('token');
  console.log('authGuard ejecutado. Token:', token);

  if (token) return true;

  router.navigate(['/login']);
  return false;

};