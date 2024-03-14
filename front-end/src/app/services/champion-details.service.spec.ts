import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ChampionDetailsService } from './champion-details.service';

describe('ChampionDetailsService', () => {
  let service: ChampionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ChampionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('getChampionDetails', () => {});

  // it('getSkillVideos', () => {});
});
