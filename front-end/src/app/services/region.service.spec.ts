import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RegionService } from './region.service';

describe('RegionService', () => {
  let service: RegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('getRegions', () => {});
});
