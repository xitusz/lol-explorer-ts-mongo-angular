import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProfileEditService } from './profile-edit.service';

describe('ProfileEditService', () => {
  let service: ProfileEditService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(ProfileEditService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('editName', () => {
    const newName = 'newName';
    const mockToken = 'token';

    service.editName(newName, mockToken).subscribe((response) => {
      expect(response).toBe(newName);
    });

    const req = httpMock.expectOne('http://localhost:3001/profile/edit/name');

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ newName });
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    req.flush(newName);
  });

  it('editEmail', () => {
    const newEmail = 'newEmail';
    const mockToken = 'token';

    service.editEmail(newEmail, mockToken).subscribe((response) => {
      expect(response).toBe(newEmail);
    });

    const req = httpMock.expectOne('http://localhost:3001/profile/edit/email');

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ newEmail });
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    req.flush(newEmail);
  });

  it('editPassword', () => {
    const newPassword = 'newPassword';
    const mockToken = 'token';

    service.editPassword(newPassword, mockToken).subscribe((response) => {
      expect(response).toBe(newPassword);
    });

    const req = httpMock.expectOne('http://localhost:3001/profile/edit/password');

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ newPassword });
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    req.flush(newPassword);
  });

  it('deleteUser', () => {
    const mockToken = 'token';
    const mockResponse = 'Usuário excluído com sucesso!';

    service.deleteUser(mockToken).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/profile');

    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    req.flush(mockResponse);
  });
});
