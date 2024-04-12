import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should render login and register buttons', () => {
      fixture.detectChanges();

      const loginButton = fixture.nativeElement.querySelector('.login-button');
      const registerButton = fixture.nativeElement.querySelector('.register-button');

      expect(loginButton).toBeTruthy();
      expect(registerButton).toBeTruthy();
    });

    it('should redirect to login page when login button is clicked', () => {
      spyOn(router, 'navigateByUrl');

      fixture.detectChanges();

      const loginButton = fixture.nativeElement.querySelector('.login-button');

      loginButton.click();

      fixture.detectChanges();

      expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/login'), {
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      });
    });

    it('should redirect to register page when register button is clicked', () => {
      spyOn(router, 'navigateByUrl');

      fixture.detectChanges();

      const registerButton = fixture.nativeElement.querySelector('.register-button');

      registerButton.click();

      fixture.detectChanges();

      expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/register'), {
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      });
    });
  });

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
