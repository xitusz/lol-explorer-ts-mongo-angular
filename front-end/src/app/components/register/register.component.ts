import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxCaptchaModule, ReCaptcha2Component } from 'ngx-captcha';
import { RegisterService } from '../../services/register.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Validation from '../../utils/validation';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, CommonModule, NgxCaptchaModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component | undefined;
  registrationForm: FormGroup;
  error: string = '';
  siteKey: string = environment.RECAPTCHA_SITE_KEY;
  isBrowser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private profileService: ProfileService,
    @Inject(PLATFORM_ID) private platformId: 'browser'
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.registrationForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        confirmPassword: ['', [Validators.required]],
        recaptcha: [null, [Validators.required]],
        agreedToTerms: [false, [Validators.required]],
      },
      {
        validators: [Validation.matchPassword('password', 'confirmPassword')],
      }
    );
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn) {
        this.navigateTo('');
      }
    }
  }

  onSubmit(): void {
    const { name, email, password, recaptcha, agreedToTerms } = this.registrationForm.value;

    if (this.registrationForm.invalid) {
      this.error = 'Preencha todos os campos.';
    } else if (!recaptcha) {
      this.error = 'Captcha inválido';
    } else if (!agreedToTerms) {
      this.error = 'Você deve concordar com os Termos e Condições.';
    } else {
      this.checkRegisterUser(name, email, password /*recaptcha*/);
    }
  }

  checkRegisterUser(name: string, email: string, password: string /*recaptcha: string*/): void {
    this.profileService.existingUser(email).subscribe((data) => {
      if (data) {
        this.error = 'Este email já está registrado.';
      } else {
        this.handleRegister(name, email, password /*recaptcha*/);
      }
    });
  }

  handleRegister(name: string, email: string, password: string /*recaptcha: string*/): void {
    this.registerService.register(name, email, password /*recaptcha*/).subscribe({
      next: () => {
        this.navigateTo('login');
      },
      error: () => {
        this.error = 'Erro no registro.';

        if (this.captchaElem) {
          this.captchaElem.resetCaptcha();
        }
      },
    });
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route, { skipLocationChange: true }).then(() => {
      window.location.href = route;
    });
  }
}
