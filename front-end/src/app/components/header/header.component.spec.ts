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

  describe('when user is logged in', () => {
    beforeEach(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', 'token');
    });

    it('should render profile and exit buttons', () => {
      fixture.detectChanges();

      const profileButton = fixture.nativeElement.querySelector('.profile-button');
      const exitButton = fixture.nativeElement.querySelector('.exit-button');

      expect(profileButton).toBeTruthy();
      expect(exitButton).toBeTruthy();
    });

    it('should redirect to profile page when profile button is clicked', () => {
      spyOn(router, 'navigateByUrl');

      fixture.detectChanges();

      const profileButton = fixture.nativeElement.querySelector('.profile-button');

      profileButton.click();

      fixture.detectChanges();

      expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/profile'), {
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      });
    });

    it('should clear token and isLoggedIn in localStorage and redirect to login page when exit button is clicked', () => {
      spyOn(router, 'navigateByUrl');

      fixture.detectChanges();

      const exitButton = fixture.nativeElement.querySelector('.exit-button');

      exitButton.click();

      fixture.detectChanges();

      expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/login'), {
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      });
    });
  });

  describe('navigation', () => {
    it('should renders correctly', () => {
      fixture.detectChanges();

      const homeButton = fixture.nativeElement.querySelector('.home-button');
      const championButton = fixture.nativeElement.querySelector('.champion-button');
      const regionButton = fixture.nativeElement.querySelector('.region-button');

      expect(homeButton).toBeTruthy();
      expect(championButton).toBeTruthy();
      expect(regionButton).toBeTruthy();
    });

    it('should redirect to home page when home button is clicked', () => {
      spyOn(router, 'navigateByUrl');

      fixture.detectChanges();

      const homeButton = fixture.nativeElement.querySelector('.home-button');

      homeButton.click();

      fixture.detectChanges();

      expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/'), {
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      });
    });

    it('should redirect to champion page when champion button is clicked', () => {
      spyOn(router, 'navigateByUrl');

      fixture.detectChanges();

      const championButton = fixture.nativeElement.querySelector('.champion-button');

      championButton.click();

      fixture.detectChanges();

      expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/champion'), {
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      });
    });

    it('should redirect to region page when region button is clicked', () => {
      spyOn(router, 'navigateByUrl');

      fixture.detectChanges();

      const regionButton = fixture.nativeElement.querySelector('.region-button');

      regionButton.click();

      fixture.detectChanges();

      expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/region'), {
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      });
    });

    // it('should render display button on small screens', () => {});
  });
});
