import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const SCHEDULE_ROUTES: Routes = [
  {
    path: 'history',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/hour-history/hour-history.component').then(m => m.HourHistoryComponent),
  },
];
