import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ChampionDetailsService } from './champion-details.service';
import { IChampionDetails } from '../interfaces/champion-details.interface';

describe('ChampionDetailsService', () => {
  let service: ChampionDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(ChampionDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getChampionDetails', () => {
    const championName = 'Aatrox';
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

    service.getChampionDetails(championName).subscribe((details) => {
      expect(details[0]).toBe(mock);
    });

    const req = httpMock.expectOne(`http://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion/${championName}.json`);

    expect(req.request.method).toBe('GET');

    req.flush({ data: { Aatrox: mock } });
  });

  it('getSkillVideos', () => {
    const mockVideo = {
      Aatrox: {
        P: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_P1.webm',
        Q: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_Q1.webm',
        W: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_W1.webm',
        E: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_E1.webm',
        R: 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0266/ability_0266_R1.webm',
      },
    };

    service.getSkillVideos().subscribe((videos) => {
      expect(videos).toBe(mockVideo);
    });

    const req = httpMock.expectOne('../../assets/data/skillVideos.json');

    expect(req.request.method).toBe('GET');

    req.flush(mockVideo);
  });
});
