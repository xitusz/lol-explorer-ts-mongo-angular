import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RegionDetailsService } from './region-details.service';

describe('RegionDetailsService', () => {
  let service: RegionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RegionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('getRegionByName', () => {});
});
