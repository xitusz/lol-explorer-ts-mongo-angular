import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login', () => {
    const mock = { email: 'test@example.com', password: 'password' };
    const mockResponse = { token: 'token' };

    service.login(mock.email, mock.password).subscribe((response) => {
      expect(response.token).toEqual(mockResponse.token);
    });

    const req = httpMock.expectOne('http://localhost:3001/login');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mock);

    req.flush(mockResponse);
  });
});
