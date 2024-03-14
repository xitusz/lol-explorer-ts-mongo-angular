import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { RegionDetailsComponent } from './region-details.component';

describe('RegionDetailsComponent', () => {
  let component: RegionDetailsComponent;
  let fixture: ComponentFixture<RegionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionDetailsComponent, HttpClientModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render the region details correctly - icon, name, video, description', () => {});

  // it('should render the champion details correctly - champions', () => {});

  // it('should redirect to card details when card is clicked', () => {});
});
