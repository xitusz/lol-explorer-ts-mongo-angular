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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('back to the top icon', () => {
    it('should render the back to the top icon', async () => {
      const arrowIcon = fixture.nativeElement.querySelector('.arrow-icon');

      expect(arrowIcon).toBeTruthy();
    });

    it('should scroll to the top when the arrow icon is clicked.', () => {
      const scrollTo = spyOn(window, 'scrollTo');

      const arrowIcon = fixture.nativeElement.querySelector('.arrow-icon');

      arrowIcon.dispatchEvent(new Event('click'));

      fixture.detectChanges();

      expect(scrollTo).toHaveBeenCalled();
    });
  });

  describe('contact icons', () => {
    it('should render the LinkedIn icon', () => {
      const linkedinIcon = fixture.nativeElement.querySelector('.bi-linkedin');

      expect(linkedinIcon).toBeTruthy();
    });

    it('should render the LinkedIn link', () => {
      const linkedinLink = fixture.nativeElement.querySelector('[data-testid="linkedin-link"]');

      expect(linkedinLink.getAttribute('href')).toContain('https://www.linkedin.com/in/gabrielalves1/');
    });

    it('should render the Gmail icon', () => {
      const gmailIcon = fixture.nativeElement.querySelector('.bi-envelope');

      expect(gmailIcon).toBeTruthy();
    });

    it('should render the Gmail link', () => {
      const gmailLink = fixture.nativeElement.querySelector('[data-testid="gmail-link"]');

      expect(gmailLink.getAttribute('href')).toContain('mailto:2kgabrielalves@gmail.com');
    });

    it('should render the Github icon', () => {
      const gitHubIcon = fixture.nativeElement.querySelector('.bi-github');

      expect(gitHubIcon).toBeTruthy();
    });

    it('should render the Github link', () => {
      const gitHubLink = fixture.nativeElement.querySelector('[data-testid="github-link"]');

      expect(gitHubLink.getAttribute('href')).toContain('https://github.com/xitusz');
    });
  });

  describe('copyright message', () => {
    it('should render the copyright message', () => {
      expect(fixture.nativeElement.textContent).toContain('© 2023 Gabriel Alves . All Rights Reserved.');
    });

    it("should render 'gabriel alves' with a link to the GitHub profile", () => {
      const githubLink = fixture.nativeElement.querySelector('.a-footer');

      expect(githubLink.getAttribute('href')).toBe('https://github.com/xitusz');
    });
  });
});
