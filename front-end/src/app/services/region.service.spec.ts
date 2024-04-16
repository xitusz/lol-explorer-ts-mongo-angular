import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RegionService } from './region.service';

describe('RegionService', () => {
  let service: RegionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(RegionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRegions', () => {
    const mock = {
      BandleCity: {
        name: 'BandleCity',
        nameBR: 'Bandópolis',
        img: 'https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt57ea8bb74f8733f3/60ee0b95bc44fe5b48ba2a02/bandle-city_splash.jpg',
        regionVideo:
          'https://assets.contentstack.io/v3/assets/blt187521ff0727be24/bltf967832218cc82da/60ee0b96191da52267d909b6/bandle-city-splashvideo.webm',
        icon: 'https://universe.leagueoflegends.com/images/bandle_city_crest_icon.png',
        description:
          'Há muita controvérsia sobre onde exatamente fica o lar dos yordles, embora vários mortais afirmem ter atravessado portais invisíveis para uma terra de estranho encantamento além do reino material. Falam de um lugar com magia ilimitada, onde os incautos, atraídos por uma infinidade de elementos fantásticos, podem acabar perdidos em um sonho sem volta. Em Bandópolis, dizem que todas as sensações são amplificadas para os não yordles. As cores são mais vívidas. A comida e a bebida embriagam os sentidos por anos e, uma vez provadas, jamais podem ser esquecidas. A luz do sol é eternamente dourada, as águas são completamente cristalinas e toda colheita é extremamente frutífera. Talvez alguns desses relatos sejam verdadeiros, mas talvez nenhum seja, pois não há duas pessoas neste mundo que concordem sobre o que realmente viram. Só uma coisa é certa: Bandópolis e seus habitantes carregam um poder atemporal. Isso deve explicar por que muitos mortais que encontram seu caminho de volta parecem ter envelhecido bruscamente, embora a maioria sequer retorne.',
        champions: ['Corki', 'Lulu', 'Rumble', 'Teemo', 'Tristana', 'Veigar', 'Yuumi'],
      },
      Bilgewater: {
        name: 'Bilgewater',
        nameBR: 'Águas de Sentina',
        img: 'https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt8efd86a20a7fc6ca/60ee0bd126ed9249f5484b8c/bilgewater_splash.jpg',
        regionVideo:
          'https://assets.contentstack.io/v3/assets/blt187521ff0727be24/blt3fc71202462d4990/60ee0bd2975ffd4ff25ec27c/bilgewater-splashvideo.webm',
        icon: 'https://universe.leagueoflegends.com/images/bilgewater_crest_icon.png',
        description:
          "Situada no arquipélago das Ilhas da Chama Azul, Águas de Sentina é uma cidade portuária sem igual, cheia de mercenários, gangues das docas e contrabandistas do mundo inteiro. Aqui, fortunas crescem e ambições desmoronam em um piscar de olhos. É uma cidade de recomeços para quem está fugindo da justiça, de dívidas ou de perseguições, já que nestas ruas tortuosas ninguém se importa com o seu passado. Mesmo assim, a cada manhã, corpos de viajantes descuidados são encontrados flutuando no mar perto das docas, com os bolsos vazios e suas gargantas cortadas... Embora seja perigosíssima, Águas de Sentina fervilha com novas oportunidades, já que não é limitada pelas amarras de um governo formal e regulações de mercado. Quem tem dinheiro pode comprar quase tudo aqui, desde itens hextec proibidos até a lealdade de um senhor do crime. Com a destituição do último 'rei dos ladrões', Águas de Sentina entrou em um período de transição enquanto os capitães mais proeminentes tentam chegar a um acordo sobre o futuro da cidade. Mas, havendo navios em condições de navegar e homens dispostos a tripulá-los, Águas de Sentina continuará sendo um dos lugares mais peculiares e bem relacionados de Runeterra.",
        champions: ['Fizz', 'Gangplank', 'Graves', 'Illaoi', 'MissFortune', 'Nautilus', 'Pyke', 'TahmKench', 'TwistedFate'],
      },
    };

    service.getRegions().subscribe((regions) => {
      expect(regions).toEqual(mock);
    });

    const req = httpMock.expectOne('../../assets/data/regions.json');

    expect(req.request.method).toBe('GET');

    req.flush(mock);
  });
});
