import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgxCaptchaModule, ReCaptcha2Component } from 'ngx-captcha';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, CommonModule, NgxCaptchaModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component | undefined;
  loggingForm: FormGroup;
  error: string = '';
  siteKey: string = environment.RECAPTCHA_SITE_KEY;
  isBrowser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private favoriteService: FavoriteService,
    @Inject(PLATFORM_ID) private platformId: 'browser'
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loggingForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      recaptcha: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    const { email, password, recaptcha } = this.loggingForm.value;

    if (this.loggingForm.invalid) {
      this.error = 'Preencha todos os campos.';
    } else if (!recaptcha) {
      this.error = 'Captcha inválido';
    } else {
      this.handleLogin(email, password /*recaptcha*/);
    }
  }

  handleLogin(email: string, password: string /*recaptcha*/): void {
    this.loginService.login(email, password /*recaptcha*/).subscribe({
      next: ({ token }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        this.createFavorites(token);
        this.navigateTo('');
      },
      error: () => {
        this.error = 'Email ou senha inválida.';
        if (this.captchaElem) {
          this.captchaElem.resetCaptcha();
        }
      },
    });
  }

  createFavorites(token: string): void {
    this.favoriteService.create(token).subscribe({
      next: () => {},
    });
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route, { skipLocationChange: true }).then(() => {
      window.location.href = route;
    });
  }
}
