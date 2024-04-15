import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChampionDetailsComponent } from './champion-details.component';
import { ChampionDetailsService } from '../../services/champion-details.service';
import { IChampionDetails } from '../../interfaces/champion-details.interface';

describe('ChampionDetailsComponent', () => {
  let component: ChampionDetailsComponent;
  let service: ChampionDetailsService;
  let fixture: ComponentFixture<ChampionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionDetailsComponent, HttpClientModule, RouterTestingModule],
      providers: [
        ChampionDetailsService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { championName: 'Aatrox' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChampionDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ChampionDetailsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the loading message correctly', () => {
    component.loading = true;

    fixture.detectChanges();

    const loading = fixture.nativeElement.querySelector('.spinner-border');

    expect(loading).toBeTruthy();
    expect(loading.getAttribute('role')).toBe('status');
    expect(fixture.nativeElement.textContent).toContain('Carregando');
  });

  it('should render the champion details correctly - name, title, tags, image, lore', () => {
    const mock: IChampionDetails = {
      id: 'Aatrox',
      name: 'Aatrox',
      title: 'a Espada Darkin',
      lore: 'Antes defensores honrados de Shurima contra o temido Vazio',
      tags: ['Fighter', 'Tank'],
      passive: {
        name: '',
        description: '',
        image: {
          full: '',
        },
      },
      spells: [],
      skins: [],
    };

    spyOn(service, 'getChampionDetails').and.returnValue(of([mock]));

    fixture.detectChanges();

    const championName = fixture.nativeElement.querySelector('h1');
    const championTitle = fixture.nativeElement.querySelector('h2');
    const championLore = fixture.nativeElement.querySelector('.champion-lore');
    const championTags = fixture.nativeElement.querySelectorAll('.champion-tag');
    const image = fixture.nativeElement.querySelector('.champion-image');

    expect(championName.textContent).toContain(mock.name);
    expect(championTitle.textContent).toContain(mock.title);
    expect(championLore.textContent).toContain(mock.lore);
    expect(championTags.length).toBe(2);
    expect(championTags[0].textContent).toContain(mock.tags[0]);
    expect(championTags[1].textContent).toContain(mock.tags[1]);
    expect(image).toBeTruthy();
    expect(image.src).toContain(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg`);
    expect(image.alt).toBe(mock.name);
  });

  it('should render the champion details correctly - skills', () => {
    const mock: IChampionDetails = {
      id: 'Aatrox',
      name: 'Aatrox',
      title: 'a Espada Darkin',
      lore: 'Antes defensores honrados de Shurima contra o temido Vazio',
      tags: ['Fighter', 'Tank'],
      passive: {
        name: 'Postura do Arauto da Morte',
        description: 'Periodicamente, o próximo ataque básico de Aatrox causa',
        image: {
          full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/passive/Aatrox_Passive.png',
        },
      },
      spells: [
        {
          id: 'Q',
          name: 'A Espada Darkin',
          description: 'Aatrox bate sua espada no chão, causando Dano Físico.',
          image: {
            full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/AatroxQ.png',
          },
        },
        {
          id: 'W',
          name: 'Correntes Infernais',
          description: 'Aatrox bate no chão, causando dano ao primeiro inimigo atingido.',
          image: {
            full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/AatroxW.png',
          },
        },
        {
          id: 'E',
          name: 'Avanço Umbral',
          description: 'Passivamente, Aatrox se cura quando causa dano a Campeões inimigos.',
          image: {
            full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/AatroxE.png',
          },
        },
        {
          id: 'R',
          name: 'Aniquilador de Mundos',
          description: 'Aatrox libera sua forma demoníaca, aterrorizando tropas inimigas próximas,',
          image: {
            full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/AatroxR.png',
          },
        },
      ],
      skins: [],
    };

    const mockVideo = {
      Aatrox: {
        P: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_P1.webm',
        Q: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_Q1.webm',
        W: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_W1.webm',
        E: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_E1.webm',
        R: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_R1.webm',
      },
    };

    spyOn(service, 'getChampionDetails').and.returnValue(of([mock]));
    spyOn(service, 'getSkillVideos').and.returnValue(of(mockVideo));

    fixture.detectChanges();

    const skillButtons = fixture.nativeElement.querySelectorAll('.btn-spell');
    const videoElement = fixture.nativeElement.querySelector('video');
    const skillOrder = fixture.nativeElement.querySelector('.skill-order');

    expect(skillButtons.length).toBe(5);
    expect(skillButtons[0].querySelector('.button-img').alt).toContain(mock.passive.name);
    expect(skillButtons[0].querySelector('.button-img').src).toContain(mock.passive.image.full);
    expect(skillButtons[1].querySelector('.button-img').alt).toContain(mock.spells[0].name);
    expect(skillButtons[1].querySelector('.button-img').src).toContain(mock.spells[0].image.full);
    expect(skillButtons[2].querySelector('.button-img').alt).toContain(mock.spells[1].name);
    expect(skillButtons[2].querySelector('.button-img').src).toContain(mock.spells[1].image.full);
    expect(skillButtons[3].querySelector('.button-img').alt).toContain(mock.spells[2].name);
    expect(skillButtons[3].querySelector('.button-img').src).toContain(mock.spells[2].image.full);
    expect(skillButtons[4].querySelector('.button-img').alt).toContain(mock.spells[3].name);
    expect(skillButtons[4].querySelector('.button-img').src).toContain(mock.spells[3].image.full);
    expect(videoElement.querySelector('source').src).toContain(mockVideo.Aatrox.P);
    expect(skillOrder.textContent).toContain('Passiva');
    expect(fixture.nativeElement.textContent).toContain(mock.passive.name);
    expect(fixture.nativeElement.textContent).toContain(mock.passive.description);
  });

  it('should render the champion details correctly - skins', () => {
    const mock: IChampionDetails = {
      id: 'Aatrox',
      name: 'Aatrox',
      title: 'a Espada Darkin',
      lore: 'Antes defensores honrados de Shurima contra o temido Vazio',
      tags: ['Fighter', 'Tank'],
      passive: {
        name: '',
        description: '',
        image: {
          full: '',
        },
      },
      spells: [],
      skins: [
        {
          id: '',
          num: 0,
          name: 'Aatrox',
        },
        {
          id: '',
          num: 1,
          name: 'Aatrox Justiceiro',
        },
        {
          id: '',
          num: 2,
          name: 'Mech Aatrox',
        },
        {
          id: '',
          num: 3,
          name: 'Aatrox Caçador dos Mares',
        },
      ],
    };

    spyOn(service, 'getChampionDetails').and.returnValue(of([mock]));

    component.skinState = mock.skins[1].name;

    fixture.detectChanges();

    const skinButtons = fixture.nativeElement.querySelectorAll('.btn-skin');
    const skinImg = fixture.nativeElement.querySelector('.skin-img');

    expect(skinButtons.length).toBe(4);
    expect(skinButtons[0].querySelector('.button-img').alt).toContain(mock.skins[0].name);
    expect(skinButtons[0].querySelector('.button-img').src).toContain('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg');
    expect(skinButtons[1].querySelector('.button-img').alt).toContain(mock.skins[1].name);
    expect(skinButtons[1].querySelector('.button-img').src).toContain('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_1.jpg');
    expect(skinButtons[2].querySelector('.button-img').alt).toContain(mock.skins[2].name);
    expect(skinButtons[2].querySelector('.button-img').src).toContain('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_2.jpg');
    expect(skinButtons[3].querySelector('.button-img').alt).toContain(mock.skins[3].name);
    expect(skinButtons[3].querySelector('.button-img').src).toContain('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_3.jpg');
    expect(skinImg).toBeTruthy();
    expect(skinImg.src).toContain('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_1.jpg');
    expect(skinImg.alt).toContain(mock.skins[1].name);
  });

  it('should toggle skill on button click', async () => {
    const mock: IChampionDetails = {
      id: 'Aatrox',
      name: 'Aatrox',
      title: 'a Espada Darkin',
      lore: 'Antes defensores honrados de Shurima contra o temido Vazio',
      tags: ['Fighter', 'Tank'],
      passive: {
        name: 'Postura do Arauto da Morte',
        description: 'Periodicamente, o próximo ataque básico de Aatrox causa',
        image: {
          full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/passive/Aatrox_Passive.png',
        },
      },
      spells: [
        {
          id: 'Q',
          name: 'A Espada Darkin',
          description: 'Aatrox bate sua espada no chão, causando Dano Físico.',
          image: {
            full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/AatroxQ.png',
          },
        },
        {
          id: 'W',
          name: 'Correntes Infernais',
          description: 'Aatrox bate no chão, causando dano ao primeiro inimigo atingido.',
          image: {
            full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/AatroxW.png',
          },
        },
        {
          id: 'E',
          name: 'Avanço Umbral',
          description: 'Passivamente, Aatrox se cura quando causa dano a Campeões inimigos.',
          image: {
            full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/AatroxE.png',
          },
        },
        {
          id: 'R',
          name: 'Aniquilador de Mundos',
          description: 'Aatrox libera sua forma demoníaca, aterrorizando tropas inimigas próximas,',
          image: {
            full: 'http://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/AatroxR.png',
          },
        },
      ],
      skins: [],
    };

    const mockVideo = {
      Aatrox: {
        P: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_P1.webm',
        Q: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_Q1.webm',
        W: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_W1.webm',
        E: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_E1.webm',
        R: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_R1.webm',
      },
    };

    spyOn(service, 'getChampionDetails').and.returnValue(of([mock]));
    spyOn(service, 'getSkillVideos').and.returnValue(of(mockVideo));

    fixture.detectChanges();

    const skillButtons = fixture.nativeElement.querySelectorAll('.btn-spell');

    skillButtons[1].click();

    await fixture.whenStable();

    fixture.detectChanges();

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
    
    const videoElement = fixture.nativeElement.querySelector('video');
    const skillOrder = fixture.nativeElement.querySelector('.skill-order');

    expect(videoElement.querySelector('source').src).toContain(mockVideo.Aatrox.Q);
    expect(skillOrder.textContent).toContain('Q');
    expect(fixture.nativeElement.textContent).toContain(mock.spells[0].name);
    expect(fixture.nativeElement.textContent).toContain(mock.spells[0].description);
  });

  it('should toggle skin on button click', () => {
    const mock: IChampionDetails = {
      id: 'Aatrox',
      name: 'Aatrox',
      title: 'a Espada Darkin',
      lore: 'Antes defensores honrados de Shurima contra o temido Vazio',
      tags: ['Fighter', 'Tank'],
      passive: {
        name: '',
        description: '',
        image: {
          full: '',
        },
      },
      spells: [],
      skins: [
        {
          id: '',
          num: 0,
          name: 'Aatrox',
        },
        {
          id: '',
          num: 1,
          name: 'Aatrox Justiceiro',
        },
        {
          id: '',
          num: 2,
          name: 'Mech Aatrox',
        },
        {
          id: '',
          num: 3,
          name: 'Aatrox Caçador dos Mares',
        },
      ],
    };

    spyOn(service, 'getChampionDetails').and.returnValue(of([mock]));

    component.skinState = mock.skins[1].name;

    fixture.detectChanges();

    const skinButtons = fixture.nativeElement.querySelectorAll('.btn-skin');

    skinButtons[2].click();

    fixture.detectChanges();

    const skinImg = fixture.nativeElement.querySelector('.skin-img');

    expect(skinImg).toBeTruthy();
    expect(skinImg.src).toContain('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_2.jpg');
    expect(skinImg.alt).toContain(mock.skins[2].name);
  });
});
