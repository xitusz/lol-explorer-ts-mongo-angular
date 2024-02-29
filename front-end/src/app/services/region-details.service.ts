import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegion, IRegionList } from '../interfaces/region.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionDetailsService {
  constructor(private http: HttpClient) {}

  getRegionByName(regionName: string): Observable<IRegion> {
    return this.http.get<IRegionList>('../../assets/data/regions.json').pipe(map((regions) => regions[regionName]));
  }
}
