import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RegionDetailsService } from './region-details.service';

describe('RegionDetailsService', () => {
  let service: RegionDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(RegionDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRegionByName', () => {
    const mock = {
      BandleCity: {
        name: 'BandleCity',
        nameBR: 'Bandópolis',
        img: 'https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt57ea8bb74f8733f3/60ee0b95bc44fe5b48ba2a02/bandle-city_splash.jpg',
        regionVideo:
          'https://assets.contentstack.io/v3/assets/blt187521ff0727be24/bltf967832218cc82da/60ee0b96191da52267d909b6/bandle-city-splashvideo.webm',
        icon: 'https://universe.leagueoflegends.com/images/bandle_city_crest_icon.png',
        description: 'Há muita controvérsia sobre onde exatamente fica o lar dos yordles,',
        champions: ['Corki', 'Lulu', 'Rumble', 'Teemo', 'Tristana', 'Veigar', 'Yuumi'],
      },
    };

    service.getRegionByName('BandleCity').subscribe((region) => {
      expect(region).toEqual(mock.BandleCity);
    });

    const req = httpMock.expectOne('../../assets/data/regions.json');

    expect(req.request.method).toBe('GET');

    req.flush(mock);
  });
});
