import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string /*recaptcha: string*/): Observable<string> {
    const body = { name, email, password /*recaptcha*/ };
    return this.http.post<string>(`${this.baseUrl}/register`, body);
  }
}
