import { TestBed } from '@angular/core/testing';

import { RegionDetailsService } from './region-details.service';

describe('RegionDetailsService', () => {
  let service: RegionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
