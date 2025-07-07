import { Injectable } from '@angular/core';
import { Role, RoleRes } from '../interfaces/role.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://54.145.135.54/employee-service/role';

  constructor(private http: HttpClient) { }

  createRole(role: Role): Observable<any> {
    return this.http.post(this.apiUrl, role);
  }

  getRoles(): Observable<RoleRes> {
    return this.http.get<RoleRes>(this.apiUrl);
  }
}
