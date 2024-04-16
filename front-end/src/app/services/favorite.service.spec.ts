import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(FavoriteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create', () => {
    const mockToken = 'token';
    const mockResponse = 'Favorito criado com sucesso';

    service.create(mockToken).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/favorites/create');

    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    req.flush(mockResponse);
  });

  it('getFavorites', () => {
    const mockToken = 'token';
    const mockResponse = ['Aatrox', 'Ahri'];

    service.getFavorites(mockToken).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/favorites');

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    req.flush(mockResponse);
  });

  it('addFavorite', () => {
    const mockToken = 'token';
    const mockFavoriteName = 'Aatrox';
    const mockResponse = 'Favorito adicionado com sucesso';

    service.addFavorite(mockToken, mockFavoriteName).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/favorites');

    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);
    expect(req.request.body).toEqual({ favoriteName: mockFavoriteName });

    req.flush(mockResponse);
  });

  it('deleteFavorite', () => {
    const mockToken = 'token';
    const mockFavoriteName = 'Aatrox';
    const mockResponse = 'Favorito removido com sucesso';

    service.deleteFavorite(mockToken, mockFavoriteName).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/favorites');

    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);
    expect(req.request.body).toEqual({ favoriteName: mockFavoriteName });

    req.flush(mockResponse);
  });

  it('clearFavorites', () => {
    const mockToken = 'token';
    const mockResponse = 'Todos os favoritos foram removidos com sucesso';

    service.clearFavorites(mockToken).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/favorites/clear');

    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    req.flush(mockResponse);
  });
});
