import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render the champion', () => {});

  // it('should render the region', () => {});

  // it('should redirect to champion page when image is clicked', () => {});

  // it('should redirect to region page when image is clicked', () => {});

  // it('should redirect to champion page when heading is clicked', () => {});

  // it('should redirect to region page when heading is clicked', () => {});
});
