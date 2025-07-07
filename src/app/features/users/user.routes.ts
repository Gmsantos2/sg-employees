import { Routes } from "@angular/router";
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';

export const USER_ROUTES: Routes = [
  {
    path: 'create',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'], label: 'Crear usuario', icon: 'person_add' },
    loadComponent: () =>
      import('./pages/user-create/user-create.component').then(m => m.UserCreateComponent),
  },
  {
    path: 'list',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'], label: 'Lista de usuarios', icon: 'list' },
    loadComponent: () =>
      import('./pages/user-list/user-list.component').then(m => m.UserListComponent),
  }
];
