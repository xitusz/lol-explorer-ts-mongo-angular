import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
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
export class RegisterComponent {
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component | undefined;
  registrationForm: FormGroup;
  error: string = '';
  siteKey: string = environment.RECAPTCHA_SITE_KEY;
  isBrowser: boolean;

  readonly ERRORS = {
    NAME_REQUIRED: 'Nome é obrigatório.',
    NAME_ERROR: 'O nome deve ter pelo menos 2 caracteres.',
    EMAIL_REQUIRED: 'Email é obrigatório.',
    EMAIL_ERROR: 'Insira um email válido.',
    EMAIL_ALREADY_REGISTERED: 'Este email já está registrado.',
    PASSWORD_REQUIRED: 'Senha é obrigatória.',
    PASSWORD_ERROR: 'A senha deve ter de 6 a 12 caracteres.',
    CONFIRM_PASSWORD_REQUIRED: 'Confirmar senha é obrigatório.',
    CONFIRM_PASSWORD_ERROR: 'As senhas não são iguais.',
    RECAPTCHA_ERROR: 'Captcha inválido.',
    TERMS_ERROR: 'Você deve concordar com os Termos e Condições.',
    REGISTRATION_ERROR: 'Erro no registro.',
  };

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
        agreedToTerms: [null, [Validators.required]],
      },
      {
        validators: [Validation.matchPassword('password', 'confirmPassword')],
      }
    );
  }

  onSubmit(): void {
    const { name, email, password } = this.registrationForm.value;
    const {
      NAME_REQUIRED,
      NAME_ERROR,
      EMAIL_REQUIRED,
      EMAIL_ERROR,
      PASSWORD_REQUIRED,
      PASSWORD_ERROR,
      CONFIRM_PASSWORD_REQUIRED,
      CONFIRM_PASSWORD_ERROR,
      RECAPTCHA_ERROR,
      TERMS_ERROR,
    } = this.ERRORS;

    switch (true) {
      case this.checkErrorAndSetMessage('name', 'required', NAME_REQUIRED):
      case this.checkErrorAndSetMessage('name', 'minlength', NAME_ERROR):
      case this.checkErrorAndSetMessage('email', 'required', EMAIL_REQUIRED):
      case this.checkErrorAndSetMessage('email', 'email', EMAIL_ERROR):
      case this.checkErrorAndSetMessage('password', 'required', PASSWORD_REQUIRED):
      case this.checkErrorAndSetMessage('password', 'minlength', PASSWORD_ERROR):
      case this.checkErrorAndSetMessage('password', 'maxlength', PASSWORD_ERROR):
      case this.checkErrorAndSetMessage('confirmPassword', 'required', CONFIRM_PASSWORD_REQUIRED):
      case this.checkErrorAndSetMessage('confirmPassword', 'matching', CONFIRM_PASSWORD_ERROR):
      case this.checkErrorAndSetMessage('recaptcha', 'required', RECAPTCHA_ERROR):
      case this.checkErrorAndSetMessage('agreedToTerms', 'required', TERMS_ERROR):
        return;
      default:
        this.checkRegisterUser(name, email, password /*recaptcha*/);
        break;
    }
  }

  checkErrorAndSetMessage(controlName: string, errorType: string, errorMessage: string): boolean {
    const control = this.registrationForm.get(controlName);

    if (control?.hasError(errorType)) {
      this.error = errorMessage;
      return true;
    }

    return false;
  }

  checkRegisterUser(name: string, email: string, password: string /*recaptcha: string*/): void {
    this.profileService.existingUser(email).subscribe((data) => {
      if (data) {
        this.error = this.ERRORS.EMAIL_ALREADY_REGISTERED;
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
        this.error = this.ERRORS.REGISTRATION_ERROR;

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
