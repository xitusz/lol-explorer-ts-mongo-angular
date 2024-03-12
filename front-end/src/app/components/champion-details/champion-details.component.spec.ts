import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ChampionDetailsComponent } from './champion-details.component';

describe('ChampionDetailsComponent', () => {
  let component: ChampionDetailsComponent;
  let fixture: ComponentFixture<ChampionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionDetailsComponent, HttpClientModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChampionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render the loading message correctly', () => {});

  // it('should render the champion details correctly - name, title, tags, image, lore', () => {});

  // it('should render the champion details correctly - skills', () => {});

  // it('should render the champion details correctly - skins', () => {});

  // it('should toggle skill on button click', () => {});

  // it('should toggle skin on button click', () => {});
});
