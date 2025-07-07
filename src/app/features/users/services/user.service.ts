import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCreate } from './../interfaces/user-create.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://54.145.135.54/';

  constructor(private http: HttpClient) { }

  createUser(user: UserCreate): Observable<any> {
    const formData = new FormData();

    if (user.file) {
      formData.append('file', user.file);
    }

    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('role', user.role);
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.post(this.api + 'employee-service/user', formData);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/employee-service/user/list`);
  }

  deleteUser(id: string): Observable<void> {
  return this.http.delete<void>(`${this.api}/employee-service/user/${id}`);
}
}
