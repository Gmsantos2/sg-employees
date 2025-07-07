import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, timer } from 'rxjs';
import { SessionWarningDialogComponent } from '../components/session-warning.component';

interface DecodedToken {
  exp: number;
  username: string;
  authority: string;
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  private warningTimerSub?: Subscription;
  private logoutTimerSub?: Subscription;

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  startSessionWatcher(token?: string): void {
    if (typeof window === 'undefined') return;

    token = token ?? localStorage.getItem('token') ?? undefined;
    if (!token) return;

    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); 
    const timeLeft = decoded.exp - currentTime;

    if (timeLeft <= 0) {
      this.logout();
      return;
    }

    const warningTime = timeLeft - 60;

  
    this.warningTimerSub = timer(warningTime * 1000).subscribe(() => {
      this.openCountdownDialog(decoded.exp);
    });

  
    this.logoutTimerSub = timer(timeLeft * 1000).subscribe(() => {
      this.logout();
    });
  }


  clearTimers(): void {
    this.warningTimerSub?.unsubscribe();
    this.logoutTimerSub?.unsubscribe();
  }

 
  logout(): void {
    this.clearTimers();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  extendSession(newToken: string): void {
    localStorage.setItem('token', newToken);
    this.clearTimers();
    this.startSessionWatcher(newToken);
  }

 
  openCountdownDialog(exp: number): void {
    const dialogRef = this.dialog.open(SessionWarningDialogComponent, {
      data: { exp },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: 'extend' | 'logout' | 'ignore') => {
      if (result === 'extend') {
        const currentToken = localStorage.getItem('token') || '';
        this.extendSession(currentToken);
      } else if (result === 'logout') {
        this.logout();
      }
    });
  }
}
