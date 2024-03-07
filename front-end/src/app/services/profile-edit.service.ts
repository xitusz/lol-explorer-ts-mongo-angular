import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileEditService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  editName(newName: string, token: string): Observable<string> {
    const body = { newName };
    return this.http.put<string>(`${this.baseUrl}/profile/edit/name`, body, { headers: { Authorization: token } });
  }

  editEmail(newEmail: string, token: string): Observable<string> {
    const body = { newEmail };
    return this.http.put<string>(`${this.baseUrl}/profile/edit/email`, body, { headers: { Authorization: token } });
  }

  editPassword(newPassword: string, token: string): Observable<string> {
    const body = { newPassword };
    return this.http.put<string>(`${this.baseUrl}/profile/edit/password`, body, { headers: { Authorization: token } });
  }

  deleteUser(token: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/profile`, { headers: { Authorization: token } });
  }
}
