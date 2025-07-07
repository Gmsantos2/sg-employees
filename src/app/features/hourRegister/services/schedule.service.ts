import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HourRegister } from '../../../features/hourRegister/interfaces/hour-register.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private baseUrl = 'http://54.145.135.54/employee-service';

  constructor(private http: HttpClient) {}

  registerHour(data: HourRegister): Observable<any> {
  console.log(data);
  return this.http.post(`${this.baseUrl}/hour-register`, data);
}

  getHourHistory(): Observable<{ data: HourRegister[] }> {
    return this.http.get<{ data: HourRegister[] }>(
      `${this.baseUrl}/hour-register`
    );
  }
}
