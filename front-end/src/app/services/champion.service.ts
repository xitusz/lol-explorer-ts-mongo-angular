import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IChampion, IChampionResponse } from '../interfaces/champion.interface';

@Injectable({
  providedIn: 'root',
})
export class ChampionService {
  private baseUrl = 'http://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion.json';

  constructor(private httpClient: HttpClient) {}

  getChampions(): Observable<IChampion[]> {
    return this.httpClient.get<IChampionResponse>(this.baseUrl).pipe(map((response) => Object.values(response.data)));
  }
}
