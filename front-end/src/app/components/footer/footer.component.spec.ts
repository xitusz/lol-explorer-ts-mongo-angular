import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*describe('back to the top icon', () => {
    it('should render the back to the top icon', () => {});

    it('should scroll to the top when the arrow icon is clicked.', () => {});
  });*/

  /*describe('contact icons', () => {
    it('should render the LinkedIn icon', () => {});

    it('should render the LinkedIn link', () => {});

    it('should render the Gmail icon', () => {});

    it('should render the Gmail link', () => {});

    it('should render the Github icon', () => {});

    it('should render the Github link', () => {});
  });*/

  /*describe('copyright message', () => {
    it('should render the copyright message', () => {});

    it("should render 'gabriel alves' with a link to the GitHub profile", () => {});
  });*/
});
