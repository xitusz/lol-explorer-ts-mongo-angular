import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IChampionDetails, IChampionDetailsResponse, ISkillVideos } from '../interfaces/champion-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ChampionDetailsService {
  private baseUrl = `http://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion/`;

  constructor(private http: HttpClient) {}

  getChampionDetails(championName: string): Observable<IChampionDetails[]> {
    return this.http.get<IChampionDetailsResponse>(`${this.baseUrl}${championName}.json`).pipe(map((response) => Object.values(response.data)));
  }

  getSkillVideos(): Observable<ISkillVideos> {
    return this.http.get<ISkillVideos>('../../assets/data/skillVideos.json');
  }
}
