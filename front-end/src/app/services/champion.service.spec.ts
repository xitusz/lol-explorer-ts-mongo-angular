import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ChampionService } from './champion.service';

describe('ChampionService', () => {
  let service: ChampionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(ChampionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getChampions', () => {
    const mock = {
      data: {
        Aatrox: {
          id: 'Aatrox',
          name: 'Aatrox',
        },
        Ahri: {
          id: 'Ahri',
          name: 'Ahri',
        },
      },
    };

    service.getChampions().subscribe((champions) => {
      expect(champions[0].id).toBe('Aatrox');
      expect(champions[0].name).toBe('Aatrox');
      expect(champions[1].id).toBe('Ahri');
      expect(champions[1].name).toBe('Ahri');
    });

    const req = httpMock.expectOne('http://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});
