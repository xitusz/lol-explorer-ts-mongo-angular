import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  login(email: string, password: string /*recaptcha: string*/): Observable<LoginResponse> {
    const body = { email, password /*recaptcha*/ };
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body);
  }
}
