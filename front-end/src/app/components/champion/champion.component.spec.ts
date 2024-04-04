import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { ChampionComponent } from './champion.component';
import { ChampionService } from '../../services/champion.service';
import { IChampion } from '../../interfaces/champion.interface';
import { Router } from '@angular/router';

describe('ChampionComponent', () => {
  let component: ChampionComponent;
  let service: ChampionService;
  let fixture: ComponentFixture<ChampionComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChampionComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ChampionService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    expect(fixture.nativeElement.textContent).toContain('Personagens');
  });

  it('should render the champions correctly', () => {
    const mock = {
      Aatrox: { id: 'Aatrox', name: 'Aatrox' },
    };

    spyOn(service, 'getChampions').and.returnValue(of(Object.values(mock) as IChampion[]));

    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('.card-img-top');

    expect(fixture.nativeElement.textContent).toContain('Aatrox');
    expect(image).toBeTruthy();
    expect(image.src).toContain(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg`);
    expect(image.alt).toBe('Aatrox');
  });

  it('should redirect to card details when card is clicked', () => {
    const mock = {
      Aatrox: { id: 'Aatrox', name: 'Aatrox' },
      Ahri: { id: 'Ahri', name: 'Ahri' },
    };

    spyOn(service, 'getChampions').and.returnValue(of(Object.values(mock) as IChampion[]));
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    const cardAatrox = fixture.nativeElement.querySelector('.card-title');
    cardAatrox.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/champion/Aatrox'), { skipLocationChange: false });
  });

  // it('should render the loading message correctly', () => {});

  // it('should favorite when clicking on the star icon if it is unfavorited and unfavorite if it is favorited while user logged in', () => {});

  // it('should show an alert when attempting to favorite a champion while user not logged in, and the champion remains unfavorited', () => {});

  describe('Filter champions', () => {
    describe('Input search', () => {
      it('should render the input search correctly', () => {
        const input = fixture.nativeElement.querySelector('input');
        expect(input).toBeTruthy();
      });

      it('should filter according to the text in the input', () => {
        const mock = {
          Aatrox: { id: 'Aatrox', name: 'Aatrox' },
          Ahri: { id: 'Ahri', name: 'Ahri' },
        };

        spyOn(service, 'getChampions').and.returnValue(of(Object.values(mock) as IChampion[]));

        component.searchChampion = 'Aatrox';

        fixture.detectChanges();

        const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

        expect(championsList.length).toBe(1);
      });

      it("should render the message 'Nenhum campeão encontrado.' correctly", () => {
        const mock = {
          Aatrox: { id: 'Aatrox', name: 'Aatrox' },
          Ahri: { id: 'Ahri', name: 'Ahri' },
        };

        spyOn(service, 'getChampions').and.returnValue(of(Object.values(mock) as IChampion[]));

        component.searchChampion = 'zzz';

        fixture.detectChanges();

        const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

        expect(championsList.length).toBe(0);
        expect(fixture.nativeElement.textContent).toContain('Nenhum campeão encontrado.');
      });
    });

    /*describe('Filter Button', () => {
      it('should render the buttons correctly', () => {});

      it("should correctly activate the 'Todos' button and deactivate the other filter buttons", () => {});

      it("should correctly activate all filter buttons except the 'Todos' button", () => {});

      describe('should render the correct card based on the selected button.', () => {
        it("button 'Assassinos'", () => {});

        it("button 'Magos'", () => {});

        it("button 'Tanques'", () => {});

        it("button 'Lutadores'", () => {});

        it("button 'Atiradores'", () => {});

        it("button 'Suportes'", () => {});

        it("button 'Todos'", () => {});

        it("two buttons 'Tanques' and 'Lutadores'", () => {});

        it("various buttons 'Assassinos', 'Magos', 'Tanques', 'Lutadores', 'Atiradores', 'Suportes' ", () => {});

        it("button 'Favoritos'", () => {});

        it("button 'Limpar Favoritos'", () => {});
      });
    });*/
  });
});
