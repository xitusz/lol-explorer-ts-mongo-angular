import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProfileEditComponent } from './profile-edit.component';

describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent;
  let fixture: ComponentFixture<ProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render the title correctly', () => {});

  // it('should render the card correctly', () => {});

  // it("should render the user info in card correctly", () => {});

  // it('should render the input edit name when setting icon name is clicked', () => {});

  // it("should save the value input name when 'save' button is clicked", () => {});

  // it('should throw an error when new name is invalid', () => {});

  // it('should render the input edit email when setting icon email is clicked', () => {});

  // it("should save the value input email when 'save' button is clicked", () => {});

  // it('should throw an error when new email is invalid', () => {});

  // it('should throw an error when new email is already registered', () => {});

  // it('should render the input edit password when setting icon password is clicked', () => {});

  // it("should save the value input password when 'save' button is clicked", () => {});

  // it('should throw an error when new password length is invalid', () => {});

  // it('should throw an error when confirmPassword is invalid', () => {});

  // it("should delete account when 'delete' button is clicked", () => {});

  // it("should save new infos when 'save' button is clicked", () => {});
});
