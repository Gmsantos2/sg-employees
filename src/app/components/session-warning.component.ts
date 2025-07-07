import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-warning-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div>
      <h2>⚠️ Tu sesión está por expirar</h2>
      <p>Tiempo restante: {{ countdown }} segundos</p>
      <button (click)="extend()">Extender sesión</button>
      <button (click)="logout()">Cerrar sesión</button>
    </div>
  `,
})
export class SessionWarningDialogComponent implements OnInit {
  countdown = 60;
  intervalId: any;

  constructor(
    private dialogRef: MatDialogRef<SessionWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exp: number }
  ) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.dialogRef.close('logout');
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  extend() {
    this.dialogRef.close('extend');
    clearInterval(this.intervalId);
  }

  logout() {
    this.dialogRef.close('logout');
    clearInterval(this.intervalId);
  }
}
