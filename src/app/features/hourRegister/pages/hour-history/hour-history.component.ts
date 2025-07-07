import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../services/schedule.service';
import { HourRegister } from '../../interfaces/hour-register.interface';
import { MATERIAL_STANDALONE } from '../../../../shared/material/material.standalone';

@Component({
  selector: 'app-hour-history',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_STANDALONE],
  templateUrl: './hour-history.component.html',
  styleUrls: ['./hour-history.component.css'],
})
export class HourHistoryComponent implements OnInit {
  history: HourRegister[] = [];
  displayedColumns: string[] = ['type', 'register'];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.getHourHistory().subscribe({
      next: (res) => {
        this.history = res.data;
      },
      error: (err) => {
        console.error('Error al obtener historial de horarios:', err);
      },
    });
  }

  formatDate(isoString?: string): string {
    return isoString ? new Date(isoString).toLocaleString() : 'No registrado';
  }
}
