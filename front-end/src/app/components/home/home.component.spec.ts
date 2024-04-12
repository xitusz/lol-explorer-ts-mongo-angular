import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the champion', () => {
    const championImg = fixture.nativeElement.querySelector('[data-testid="champion-img"]');
    const championHeading = fixture.nativeElement.querySelector('[data-testid="champion-heading"]');

    expect(championImg).toBeTruthy();
    expect(championHeading).toBeTruthy();
  });

  it('should render the region', () => {
    const regionImg = fixture.nativeElement.querySelector('[data-testid="region-img"]');
    const regionHeading = fixture.nativeElement.querySelector('[data-testid="region-heading"]');

    expect(regionImg).toBeTruthy();
    expect(regionHeading).toBeTruthy();
  });

  it('should redirect to champion page when image is clicked', () => {
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    const championImg = fixture.nativeElement.querySelector('[data-testid="champion-img"]');

    championImg.click();

    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/champion'), {
      skipLocationChange: false,
      replaceUrl: false,
      state: undefined,
      info: undefined,
    });
  });

  it('should redirect to region page when image is clicked', () => {
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    const regionImg = fixture.nativeElement.querySelector('[data-testid="region-img"]');

    regionImg.click();

    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/region'), {
      skipLocationChange: false,
      replaceUrl: false,
      state: undefined,
      info: undefined,
    });
  });

  it('should redirect to champion page when heading is clicked', () => {
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    const championHeading = fixture.nativeElement.querySelector('[data-testid="champion-heading"]');

    championHeading.click();

    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/champion'), {
      skipLocationChange: false,
      replaceUrl: false,
      state: undefined,
      info: undefined,
    });
  });

  it('should redirect to region page when heading is clicked', () => {
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    const regionHeading = fixture.nativeElement.querySelector('[data-testid="region-heading"]');

    regionHeading.click();

    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/region'), {
      skipLocationChange: false,
      replaceUrl: false,
      state: undefined,
      info: undefined,
    });
  });
});
