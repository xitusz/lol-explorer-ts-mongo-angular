import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProfileEditService } from './profile-edit.service';

describe('ProfileEditService', () => {
  let service: ProfileEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ProfileEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('editName', () => {});

  // it('editEmail', () => {});

  // it('editPassword', () => {});

  // it('deleteUser', () => {});
});
