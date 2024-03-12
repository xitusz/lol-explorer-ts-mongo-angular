import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, HttpClientModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render the title correctly', () => {});

  // it('should render the card correctly', () => {});

  // it("should render the user info in card correctly", () => {});

  // it('should render the favorites button', () => {});

  // it("should render the favorites card when the 'Show Favorites' button is active", () => {});

  // it("should hide the favorites card when the 'Hide Favorites' button is active", () => {});

  // it("should redirect to profile edit page when setting icon is clicked", () => {});
});
