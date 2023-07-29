import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/models/Auth.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  serverUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<Auth[]> {
    return this.http.get<Auth[]>(`${this.serverUrl}?login=${login}&password=${password}`);
  }
}