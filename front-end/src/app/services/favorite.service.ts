import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  create(token: string): Observable<string> {
    const body = {};
    return this.http.post<string>(`${this.baseUrl}/favorites/create`, body, {
      headers: {
        Authorization: token,
      },
    });
  }
}
