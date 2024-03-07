import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegionList } from '../interfaces/region.interface';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private http: HttpClient) {}

  getRegions(): Observable<IRegionList> {
    return this.http.get<IRegionList>('../../assets/data/regions.json');
  }
}
