import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { RegionDetailsComponent } from './region-details.component';
import { RegionDetailsService } from '../../services/region-details.service';
import { IRegion } from '../../interfaces/region.interface';

describe('RegionDetailsComponent', () => {
  let component: RegionDetailsComponent;
  let service: RegionDetailsService;
  let fixture: ComponentFixture<RegionDetailsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionDetailsComponent, HttpClientModule, RouterTestingModule],
      providers: [
        RegionDetailsService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { regionName: 'BandleCity' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RegionDetailsService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the region details correctly - icon, name, video, description', () => {
    const mock: IRegion = {
      name: 'BandleCity',
      nameBR: 'Bandópolis',
      img: 'https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt57ea8bb74f8733f3/60ee0b95bc44fe5b48ba2a02/bandle-city_splash.jpg',
      regionVideo:
        'https://assets.contentstack.io/v3/assets/blt187521ff0727be24/bltf967832218cc82da/60ee0b96191da52267d909b6/bandle-city-splashvideo.webm',
      icon: 'https://universe.leagueoflegends.com/images/bandle_city_crest_icon.png',
      description:
        'Há muita controvérsia sobre onde exatamente fica o lar dos yordles, embora vários mortais afirmem ter atravessado portais invisíveis para uma terra de estranho encantamento além do reino material. Falam de um lugar com magia ilimitada, onde os incautos, atraídos por uma infinidade de elementos fantásticos, podem acabar perdidos em um sonho sem volta. Em Bandópolis, dizem que todas as sensações são amplificadas para os não yordles. As cores são mais vívidas. A comida e a bebida embriagam os sentidos por anos e, uma vez provadas, jamais podem ser esquecidas. A luz do sol é eternamente dourada, as águas são completamente cristalinas e toda colheita é extremamente frutífera. Talvez alguns desses relatos sejam verdadeiros, mas talvez nenhum seja, pois não há duas pessoas neste mundo que concordem sobre o que realmente viram. Só uma coisa é certa: Bandópolis e seus habitantes carregam um poder atemporal. Isso deve explicar por que muitos mortais que encontram seu caminho de volta parecem ter envelhecido bruscamente, embora a maioria sequer retorne.',
      champions: ['Corki', 'Lulu', 'Rumble', 'Teemo', 'Tristana', 'Veigar', 'Yuumi'],
    };

    spyOn(service, 'getRegionByName').and.returnValue(of(mock));

    fixture.detectChanges();

    const regionIcon = fixture.nativeElement.querySelector('.region-details-icon img');
    const regionName = fixture.nativeElement.querySelector('h1');
    const regionVideo = fixture.nativeElement.querySelector('video');
    const regionDescription = fixture.nativeElement.querySelector('.region-description');

    expect(regionIcon).toBeTruthy();
    expect(regionIcon.src).toContain(mock.icon);
    expect(regionIcon.alt).toContain(mock.nameBR);
    expect(regionName.textContent).toContain(mock.nameBR);
    expect(regionVideo.querySelector('source').src).toContain(mock.regionVideo);
    expect(regionDescription.textContent).toContain(mock.description);
  });

  it('should render the champions correctly', () => {
    const mock: IRegion = {
      name: 'BandleCity',
      nameBR: 'Bandópolis',
      img: 'https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt57ea8bb74f8733f3/60ee0b95bc44fe5b48ba2a02/bandle-city_splash.jpg',
      regionVideo:
        'https://assets.contentstack.io/v3/assets/blt187521ff0727be24/bltf967832218cc82da/60ee0b96191da52267d909b6/bandle-city-splashvideo.webm',
      icon: 'https://universe.leagueoflegends.com/images/bandle_city_crest_icon.png',
      description:
        'Há muita controvérsia sobre onde exatamente fica o lar dos yordles, embora vários mortais afirmem ter atravessado portais invisíveis para uma terra de estranho encantamento além do reino material. Falam de um lugar com magia ilimitada, onde os incautos, atraídos por uma infinidade de elementos fantásticos, podem acabar perdidos em um sonho sem volta. Em Bandópolis, dizem que todas as sensações são amplificadas para os não yordles. As cores são mais vívidas. A comida e a bebida embriagam os sentidos por anos e, uma vez provadas, jamais podem ser esquecidas. A luz do sol é eternamente dourada, as águas são completamente cristalinas e toda colheita é extremamente frutífera. Talvez alguns desses relatos sejam verdadeiros, mas talvez nenhum seja, pois não há duas pessoas neste mundo que concordem sobre o que realmente viram. Só uma coisa é certa: Bandópolis e seus habitantes carregam um poder atemporal. Isso deve explicar por que muitos mortais que encontram seu caminho de volta parecem ter envelhecido bruscamente, embora a maioria sequer retorne.',
      champions: ['Corki', 'Lulu', 'Rumble', 'Teemo', 'Tristana', 'Veigar', 'Yuumi'],
    };

    spyOn(service, 'getRegionByName').and.returnValue(of(mock));

    fixture.detectChanges();

    const image = fixture.nativeElement.querySelectorAll('.card-img-top');
    const cardTitle = fixture.nativeElement.querySelectorAll('.card-title');

    expect(image.length).toBe(7);
    expect(cardTitle[0].textContent).toContain('Corki');
    expect(image[0]).toBeTruthy();
    expect(image[0].src).toContain('https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Corki_0.jpg');
    expect(image[0].alt).toBe('Corki');
  });

  it('should redirect to card details when card is clicked', () => {
    const mock: IRegion = {
      name: 'BandleCity',
      nameBR: 'Bandópolis',
      img: 'https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt57ea8bb74f8733f3/60ee0b95bc44fe5b48ba2a02/bandle-city_splash.jpg',
      regionVideo:
        'https://assets.contentstack.io/v3/assets/blt187521ff0727be24/bltf967832218cc82da/60ee0b96191da52267d909b6/bandle-city-splashvideo.webm',
      icon: 'https://universe.leagueoflegends.com/images/bandle_city_crest_icon.png',
      description:
        'Há muita controvérsia sobre onde exatamente fica o lar dos yordles, embora vários mortais afirmem ter atravessado portais invisíveis para uma terra de estranho encantamento além do reino material. Falam de um lugar com magia ilimitada, onde os incautos, atraídos por uma infinidade de elementos fantásticos, podem acabar perdidos em um sonho sem volta. Em Bandópolis, dizem que todas as sensações são amplificadas para os não yordles. As cores são mais vívidas. A comida e a bebida embriagam os sentidos por anos e, uma vez provadas, jamais podem ser esquecidas. A luz do sol é eternamente dourada, as águas são completamente cristalinas e toda colheita é extremamente frutífera. Talvez alguns desses relatos sejam verdadeiros, mas talvez nenhum seja, pois não há duas pessoas neste mundo que concordem sobre o que realmente viram. Só uma coisa é certa: Bandópolis e seus habitantes carregam um poder atemporal. Isso deve explicar por que muitos mortais que encontram seu caminho de volta parecem ter envelhecido bruscamente, embora a maioria sequer retorne.',
      champions: ['Corki', 'Lulu', 'Rumble', 'Teemo', 'Tristana', 'Veigar', 'Yuumi'],
    };

    spyOn(service, 'getRegionByName').and.returnValue(of(mock));

    fixture.detectChanges();
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    const cardCorki = fixture.nativeElement.querySelectorAll('.card-title');

    cardCorki[0].click();

    expect(router.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('/champion/Corki'), { skipLocationChange: false });
  });
});
