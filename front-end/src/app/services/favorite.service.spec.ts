import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(FavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('create', () => {});

  // it('getFavorites', () => {});

  // it('addFavorite', () => {});

  // it('deleteFavorite', () => {});

  // it('clearFavorites', () => {});
});
