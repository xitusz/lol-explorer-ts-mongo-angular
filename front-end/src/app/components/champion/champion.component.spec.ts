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

  it('should render the loading message correctly', () => {
    component.loading = true;

    fixture.detectChanges();

    const loading = fixture.nativeElement.querySelector('.spinner-border');

    expect(loading).toBeTruthy();
    expect(loading.getAttribute('role')).toBe('status');
    expect(fixture.nativeElement.textContent).toContain('Carregando');
  });

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
        const image = fixture.nativeElement.querySelector('.card-img-top');

        expect(championsList.length).toBe(1);
        expect(fixture.nativeElement.textContent).toContain('Aatrox');
        expect(image).toBeTruthy();
        expect(image.src).toContain(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg`);
        expect(image.alt).toBe('Aatrox');
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

    describe('Filter Button', () => {
      it('should render the buttons correctly', () => {
        fixture.detectChanges();

        const filterButtons = fixture.nativeElement.querySelectorAll('.filter-button');

        expect(filterButtons.length).toBe(9);
        expect(fixture.nativeElement.textContent).toContain('Todos');
        expect(fixture.nativeElement.textContent).toContain('Assassinos');
        expect(fixture.nativeElement.textContent).toContain('Magos');
        expect(fixture.nativeElement.textContent).toContain('Tanques');
        expect(fixture.nativeElement.textContent).toContain('Lutadores');
        expect(fixture.nativeElement.textContent).toContain('Atiradores');
        expect(fixture.nativeElement.textContent).toContain('Suportes');
        expect(fixture.nativeElement.textContent).toContain('Favoritos');
        expect(fixture.nativeElement.textContent).toContain('Limpar Favoritos');
      });

      it("should correctly activate the 'Todos' button and deactivate the other filter buttons", () => {
        fixture.detectChanges();

        component.filterTypes = ['Assassin', 'Mage', 'Tank', 'Fighter', 'Marksman', 'Support'];

        fixture.detectChanges();

        const buttonAll = fixture.nativeElement.querySelector('.filter-button');
        const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');

        expect(buttonAll.classList.contains('active')).toBe(false);
        expect(activeButtons.length).toBe(6);

        buttonAll.click();

        fixture.detectChanges();

        const activeButton = fixture.nativeElement.querySelectorAll('.filter-button.active');

        expect(buttonAll.classList.contains('active')).toBe(true);
        expect(activeButton.length).toBe(1);
      });

      describe('should render the correct card based on the selected button.', () => {
        beforeEach(() => {
          const mock = {
            Aatrox: { id: 'Aatrox', name: 'Aatrox', tags: ['Fighter', 'Tank'] },
            Ahri: { id: 'Ahri', name: 'Ahri', tags: ['Assassin', 'Mage'] },
            Akali: { id: 'Akali', name: 'Akali', tags: ['Assassin'] },
            Akshan: { id: 'Akshan', name: 'Akshan', tags: ['Assassin', 'Marksman'] },
            Alistar: { id: 'Alistar', name: 'Alistar', tags: ['Support', 'Tank'] },
            Amumu: { id: 'Amumu', name: 'Amumu', tags: ['Mage', 'Tank'] },
          };

          spyOn(service, 'getChampions').and.returnValue(of(Object.values(mock) as IChampion[]));
        });

        it("button 'Assassinos'", () => {
          fixture.detectChanges();

          const allButtons = fixture.nativeElement.querySelectorAll('.filter-button');

          allButtons[1].click();

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(allButtons[1].classList.contains('active')).toBe(true);
          expect(activeButtons.length).toBe(1);
          expect(championsList.length).toBe(3);
          expect(fixture.nativeElement.textContent).toContain('Ahri');
          expect(fixture.nativeElement.textContent).toContain('Akali');
          expect(fixture.nativeElement.textContent).toContain('Akshan');
        });

        it("button 'Magos'", () => {
          fixture.detectChanges();

          const allButtons = fixture.nativeElement.querySelectorAll('.filter-button');

          allButtons[2].click();

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(allButtons[2].classList.contains('active')).toBe(true);
          expect(activeButtons.length).toBe(1);
          expect(championsList.length).toBe(2);
          expect(fixture.nativeElement.textContent).toContain('Ahri');
          expect(fixture.nativeElement.textContent).toContain('Amumu');
        });

        it("button 'Tanques'", () => {
          fixture.detectChanges();

          const allButtons = fixture.nativeElement.querySelectorAll('.filter-button');

          allButtons[3].click();

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(allButtons[3].classList.contains('active')).toBe(true);
          expect(activeButtons.length).toBe(1);
          expect(championsList.length).toBe(3);
          expect(fixture.nativeElement.textContent).toContain('Aatrox');
          expect(fixture.nativeElement.textContent).toContain('Alistar');
          expect(fixture.nativeElement.textContent).toContain('Amumu');
        });

        it("button 'Lutadores'", () => {
          fixture.detectChanges();

          const allButtons = fixture.nativeElement.querySelectorAll('.filter-button');

          allButtons[4].click();

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(allButtons[4].classList.contains('active')).toBe(true);
          expect(activeButtons.length).toBe(1);
          expect(championsList.length).toBe(1);
          expect(fixture.nativeElement.textContent).toContain('Aatrox');
        });

        it("button 'Atiradores'", () => {
          fixture.detectChanges();

          const allButtons = fixture.nativeElement.querySelectorAll('.filter-button');

          allButtons[5].click();

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(allButtons[5].classList.contains('active')).toBe(true);
          expect(activeButtons.length).toBe(1);
          expect(championsList.length).toBe(1);
          expect(fixture.nativeElement.textContent).toContain('Akshan');
        });

        it("button 'Suportes'", () => {
          fixture.detectChanges();

          const allButtons = fixture.nativeElement.querySelectorAll('.filter-button');

          allButtons[6].click();

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(allButtons[6].classList.contains('active')).toBe(true);
          expect(activeButtons.length).toBe(1);
          expect(championsList.length).toBe(1);
          expect(fixture.nativeElement.textContent).toContain('Alistar');
        });

        it("button 'Todos'", () => {
          fixture.detectChanges();

          const allButtons = fixture.nativeElement.querySelectorAll('.filter-button');

          allButtons[0].click();

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(allButtons[0].classList.contains('active')).toBe(true);
          expect(activeButtons.length).toBe(1);
          expect(championsList.length).toBe(6);
          expect(fixture.nativeElement.textContent).toContain('Aatrox');
          expect(fixture.nativeElement.textContent).toContain('Ahri');
          expect(fixture.nativeElement.textContent).toContain('Akali');
          expect(fixture.nativeElement.textContent).toContain('Akshan');
          expect(fixture.nativeElement.textContent).toContain('Alistar');
          expect(fixture.nativeElement.textContent).toContain('Amumu');
        });

        it("two buttons 'Tanques' and 'Lutadores'", () => {
          fixture.detectChanges();

          component.filterTypes = ['Tank', 'Fighter'];

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(activeButtons.length).toBe(2);
          expect(championsList.length).toBe(1);
          expect(fixture.nativeElement.textContent).toContain('Aatrox');
        });

        it("various buttons 'Assassinos', 'Magos', 'Tanques', 'Lutadores', 'Atiradores', 'Suportes' ", () => {
          fixture.detectChanges();

          component.filterTypes = ['Assassin', 'Mage', 'Tank', 'Fighter', 'Marksman', 'Support'];

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(activeButtons.length).toBe(6);
          expect(championsList.length).toBe(0);
          expect(fixture.nativeElement.textContent).toContain('Nenhum campeão encontrado.');
        });

        it("button 'Favoritos'", () => {
          fixture.detectChanges();

          component.favorites = ['Aatrox', 'Ahri', 'Akali'];

          const allButtons = fixture.nativeElement.querySelectorAll('.filter-button');

          allButtons[7].click();

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(allButtons[7].classList.contains('active')).toBe(true);
          expect(activeButtons.length).toBe(2);
          expect(championsList.length).toBe(3);
          expect(fixture.nativeElement.textContent).toContain('Aatrox');
          expect(fixture.nativeElement.textContent).toContain('Ahri');
          expect(fixture.nativeElement.textContent).toContain('Akali');
        });

        it("button 'Limpar Favoritos'", () => {
          fixture.detectChanges();

          component.favorites = ['Aatrox', 'Ahri', 'Akali'];

          const allButtons = fixture.nativeElement.querySelectorAll('.filter-button');

          allButtons[8].click();

          fixture.detectChanges();

          const activeButtons = fixture.nativeElement.querySelectorAll('.filter-button.active');
          const championsList = fixture.nativeElement.querySelectorAll('.champion-card');

          expect(allButtons[0].classList.contains('active')).toBe(true);
          expect(activeButtons.length).toBe(1);
          expect(championsList.length).toBe(6);
        });
      });
    });
  });
});
