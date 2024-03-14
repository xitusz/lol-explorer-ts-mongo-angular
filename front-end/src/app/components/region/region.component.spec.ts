import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RegionComponent } from './region.component';

describe('RegionComponent', () => {
  let component: RegionComponent;
  let fixture: ComponentFixture<RegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render the title correctly', () => {});

  // it('should render component with name, image and icon', () => {});

  // it('should render component when image and icon not provided', () => {});

  // it('should render the Regions correctly', () => {});

  // it('should redirect to region details when region is clicked', () => {});

  /*describe('Filter Regions', () => {
    describe('Input search', () => {
      it('should render the input search correctly', () => {});

      it('should filter according to the text in the input', () => {});

      it("should render the message 'Nenhuma região encontrada.' correctly", () => {});
    });
  });*/
});
