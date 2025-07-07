import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleService } from '../../services/schedule.service';
import { HourRegister } from '../../interfaces/hour-register.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_STANDALONE } from '../../../../shared/material/material.standalone';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_STANDALONE,
  ],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  history: HourRegister[] = [];
  types: string[] = ['in', 'out'];
  lastType: 'in' | 'out' | null = null;
  lastRegisterTime: string | null = null;
  minDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private hourService: ScheduleService
  ) {
    this.scheduleForm = this.fb.group({
      type: ['', Validators.required],
      date: [this.minDate, Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadScheduleHistory();
  }

  loadScheduleHistory(): void {
    this.hourService.getHourHistory().subscribe({
      next: (res) => {
        this.history = res.data;
        const last = this.history[this.history.length - 1];
        this.lastType = last?.type || null;
        this.lastRegisterTime = last?.register || null;
      },
      error: () => {
        this.snackBar.open('Error al cargar historial', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  onSubmit(): void {
    if (this.scheduleForm.invalid) return;

    const { type, date, time } = this.scheduleForm.value;

    const fullDateTime = new Date(
      `${date.toISOString().split('T')[0]}T${time}:00`
    ).toISOString();

    if (this.lastType === 'in' && type === 'in') {
      this.snackBar.open(
        'Ya tienes una entrada registrada. Registra una salida antes.',
        'Cerrar',
        { duration: 4000 }
      );
      return;
    }

    if (this.lastType === 'in' && type === 'out' && this.lastRegisterTime) {
      const last = new Date(this.lastRegisterTime);
      const current = new Date(fullDateTime);
      if (current <= last) {
        this.snackBar.open(
          'La salida debe ser posterior a la última entrada.',
          'Cerrar',
          { duration: 4000 }
        );
        return;
      }
    }

    const data: HourRegister = {
      type,
      register: fullDateTime,
    };

    this.hourService.registerHour(data).subscribe({
      next: () => {
        this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
        this.scheduleForm.reset({ date: new Date(), time: '' });
        this.loadScheduleHistory();
      },
      error: (err) => {
        this.snackBar.open(
          err?.error?.message || 'Error al registrar horario',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }
}
