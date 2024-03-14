import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*describe('when user is not logged in', () => {
    it('should render login and register buttons', () => {});

    it('should redirect to login page when login button is clicked', () => {});

    it('should redirect to register page when register button is clicked', () => {});
  });*/

  /*describe('when user is logged in', () => {
    it('should render profile and exit buttons', () => {});

    it('should redirect to profile page when profile button is clicked', () => {});

    it('should clear token and isLoggedIn in localStorage and redirect to login page when exit button is clicked', () => {});
  });*/

  /*describe('navigation', () => {
    it('should renders correctly', () => {});

    it('should redirect to home page when home button is clicked', () => {});

    it('should redirect to champion page when champion button is clicked', () => {});

    it('should redirect to region page when region button is clicked', () => {});

    it('should render display button on small screens', () => {});
  });*/
});
