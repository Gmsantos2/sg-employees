import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/pages/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: 'profile',
        data: { label: 'Perfil', icon: 'person' },
        loadComponent: () =>
          import('./features/profile/pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'schedule',
        data: { label: 'Horarios', icon: 'schedule' },
        loadComponent: () =>
          import(
            './features/hourRegister/pages/schedule/schedule.component'
          ).then((m) => m.ScheduleComponent),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./features/hourRegister/pages/hour-history/hour-history.component').then(
            (m) => m.HourHistoryComponent
          ),
      },
      {
        path: 'admin/users',
        canActivate: [roleGuard, authGuard],
        data: { roles: ['ADMIN'], label: 'Usuarios', icon: 'group' },
        loadChildren: () =>
          import('./features/users/user.routes').then((m) => m.USER_ROUTES),
      },
      {
        path: 'admin/roles',
        canActivate: [roleGuard, authGuard],
        data: { roles: ['ADMIN'], label: 'Roles', icon: 'security' },
        loadChildren: () =>
          import('./features/roles/role.routes').then((m) => m.ROLE_ROUTES),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/pages/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
