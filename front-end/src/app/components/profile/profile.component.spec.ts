import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ProfileComponent } from './profile.component';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../interfaces/profile.interface';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let service: ProfileService;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, HttpClientModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProfileService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Perfil');
  });

  it('should render the card correctly', () => {
    const profileDiv = fixture.nativeElement.querySelector('.profile-div');

    expect(profileDiv).toBeTruthy();
  });

  it('should render the user info in card correctly', () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    spyOn(service, 'getProfile').and.returnValue(of(mock));

    fixture.detectChanges();

    const profileDiv = fixture.nativeElement.querySelector('.profile-div');

    expect(profileDiv.textContent).toContain('Bem Vindo, User');
    expect(profileDiv.textContent).toContain('test@example.com');
  });

  it('should render the favorites button', () => {
    fixture.detectChanges();

    const favoriteButton = fixture.nativeElement.querySelector('.btn-primary');

    expect(favoriteButton).toBeTruthy();
    expect(favoriteButton.textContent).toContain('Ocultar Favoritos');
  });

  it("should render the favorites card when the 'Show Favorites' button is active", () => {
    component.favorites = ['Aatrox', 'Ahri'];

    fixture.detectChanges();

    const cardTitle = fixture.nativeElement.querySelectorAll('.card-title');

    expect(cardTitle.length).toBe(2);
    expect(cardTitle[0].textContent).toContain('Aatrox');
    expect(cardTitle[1].textContent).toContain('Ahri');
  });

  it("should hide the favorites card when the 'Hide Favorites' button is active", () => {
    component.favorites = ['Aatrox', 'Ahri'];

    fixture.detectChanges();

    const favoriteButton = fixture.nativeElement.querySelector('.btn-primary');

    favoriteButton.click();

    fixture.detectChanges();

    const cardTitle = fixture.nativeElement.querySelectorAll('.card-title');

    expect(favoriteButton).toBeTruthy();
    expect(favoriteButton.textContent).toContain('Mostrar Favoritos');
    expect(cardTitle.length).toBe(0);
  });

  it('should redirect to profile edit page when setting icon is clicked', () => {
    spyOn(router, 'navigateByUrl');

    const settings = fixture.nativeElement.querySelector('[routerLink="/profile/edit"]');

    settings.click();

    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/profile/edit'), {
      skipLocationChange: false,
      replaceUrl: false,
      state: undefined,
      info: undefined,
    });
  });
});
