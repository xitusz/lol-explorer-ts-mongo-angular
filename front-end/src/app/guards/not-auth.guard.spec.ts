import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { notAuthGuard } from './not-auth.guard';

describe('notAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => notAuthGuard(...guardParameters));
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access when user is not authenticated', () => {
    localStorage.clear();

    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(canActivate).toBeTruthy();
  });

  it('should redirect to home when user is authenticated', () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', 'fake-token');

    spyOn(router, 'navigateByUrl');

    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(canActivate).toBeFalsy();
    expect(router.navigateByUrl).toHaveBeenCalledWith('');
  });
});
