import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { RegionComponent } from './region.component';
import { RegionService } from '../../services/region.service';

describe('RegionComponent', () => {
  let component: RegionComponent;
  let service: RegionService;
  let fixture: ComponentFixture<RegionComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RegionService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    expect(fixture.nativeElement.textContent).toContain('Regiões');
  });

  it('should render the Regions correctly', () => {
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
    };

    spyOn(service, 'getRegions').and.returnValue(of(mock));

    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('.card-region-image');

    expect(fixture.nativeElement.textContent).toContain(mock.BandleCity.nameBR);
    expect(image).toBeTruthy();
    expect(image.src).toContain(mock.BandleCity.img);
    expect(image.alt).toBe(mock.BandleCity.nameBR);
  });

  it('should redirect to region details when region is clicked', () => {
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
    };

    spyOn(service, 'getRegions').and.returnValue(of(mock));
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    const cardBandleCity = fixture.nativeElement.querySelector('.card-region-image');
    cardBandleCity.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/region/BandleCity'), { skipLocationChange: false });
  });

  describe('Filter Regions', () => {
    describe('Input search', () => {
      it('should render the input search correctly', () => {
        const input = fixture.nativeElement.querySelector('input');
        expect(input).toBeTruthy();
      });

      it('should filter according to the text in the input', () => {
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

        spyOn(service, 'getRegions').and.returnValue(of(mock));

        component.searchRegion = 'Águas';

        fixture.detectChanges();

        const regionList = fixture.nativeElement.querySelectorAll('.region-card');
        const image = fixture.nativeElement.querySelector('.card-region-image');

        expect(regionList.length).toBe(1);
        expect(fixture.nativeElement.textContent).toContain(mock.Bilgewater.nameBR);
        expect(image).toBeTruthy();
        expect(image.src).toContain(mock.Bilgewater.img);
        expect(image.alt).toBe(mock.Bilgewater.nameBR);
      });

      it("should render the message 'Nenhuma região encontrada.' correctly", () => {
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

        spyOn(service, 'getRegions').and.returnValue(of(mock));

        component.searchRegion = 'zzz';

        fixture.detectChanges();

        const regionList = fixture.nativeElement.querySelectorAll('.region-card');

        expect(regionList.length).toBe(0);
        expect(fixture.nativeElement.textContent).toContain('Nenhuma região encontrada.');
      });
    });
  });
});
