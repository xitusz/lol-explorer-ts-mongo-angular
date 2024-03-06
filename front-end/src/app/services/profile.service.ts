import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getProfile(token: string): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.baseUrl}/profile`, { headers: { Authorization: token } });
  }

  existingUser(email: string): Observable<boolean> {
    const body = { newEmail: email };
    return this.http.post<boolean>(`${this.baseUrl}/profile/validate/email`, body);
  }
}
