import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private baseUrl = 'http://54.145.135.54/employee-service';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/user/profile`);
  }

  updateProfile(data: Partial<Profile>): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/update-profile`, data);
  }
}
