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

  getFavorites(token: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/favorites`, { headers: { Authorization: token } });
  }

  addFavorite(token: string, favoriteName: string): Observable<string> {
    const body = { favoriteName };
    return this.http.post<string>(`${this.baseUrl}/favorites`, body, { headers: { Authorization: token } });
  }

  deleteFavorite(token: string, favoriteName: string): Observable<string> {
    const body = { favoriteName };
    return this.http.request<string>('delete', `${this.baseUrl}/favorites`, { body, headers: { Authorization: token } });
  }

  clearFavorites(token: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/favorites/clear`, { headers: { Authorization: token } });
  }
}
