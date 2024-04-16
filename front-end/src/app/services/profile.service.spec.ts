import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProfile', () => {
    const mockToken = 'token';
    const mockResponse = { name: 'User', email: 'user@example.com' };

    service.getProfile(mockToken).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/profile');

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    req.flush(mockResponse);
  });

  it('existingUser', () => {
    const mockEmail = 'user@example.com';
    const mockResponse = true;

    service.existingUser(mockEmail).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/profile/validate/email');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ newEmail: mockEmail });

    req.flush(mockResponse);
  });
});
