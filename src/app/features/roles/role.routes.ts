import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';

export const ROLE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ADMIN'], label: 'Crear rol', icon: 'add_circle' },
        loadComponent: () =>
          import('./pages/role-create/role-create.component').then(m => m.RoleCreateComponent),
      },
      {
        path: 'list',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ADMIN'], label: 'Lista de roles', icon: 'assignment' },
        loadComponent: () =>
          import('./pages/role-list/role-list.component').then(m => m.RoleListComponent),
      }
    ]
  }
];
