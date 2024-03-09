import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileEditService } from '../../services/profile-edit.service';
import { ProfileService } from '../../services/profile.service';
import Validation from '../../utils/validation';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent implements OnInit {
  editForm: FormGroup;
  profileInfo: IProfile = {
    name: '',
    email: '',
  };
  newPassword: string = '';
  showEditName: boolean = false;
  showEditEmail: boolean = false;
  showEditPassword: boolean = false;
  errorName: string = '';
  errorEmail: string = '';
  errorPassword: string = '';
  token: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private profileEditService: ProfileEditService
  ) {
    this.editForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [Validation.matchPassword('password', 'confirmPassword')],
      }
    );
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token') || '';
    }

    this.fetchUserInfo();
  }

  onSubmit(): void {
    const { name, email, password } = this.editForm.value;

    const confirmSave = window.confirm('Tem certeza que deseja salvar os novos dados?');

    if (confirmSave) {
      if (name) {
        this.profileEditService.editName(this.profileInfo.name, this.token).subscribe();
      }

      if (email) {
        this.profileEditService.editEmail(this.profileInfo.email, this.token).subscribe();
      }

      if (password) {
        this.profileEditService.editPassword(this.newPassword, this.token).subscribe();
      }

      this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
        window.location.href = '/profile';
      });
    }
  }

  fetchUserInfo(): void {
    this.profileService.getProfile(this.token).subscribe((profile) => {
      this.profileInfo = profile;
    });
  }

  handleSaveName(): void {
    const { name } = this.editForm.value;
    if (name !== '') {
      if (this.editForm.get('name')?.errors?.['minlength']) {
        this.errorName = 'O nome deve ter pelo menos 2 caracteres.';
      } else {
        this.profileInfo.name = name;
        this.showEditName = false;
        this.errorName = '';
      }
    } else {
      this.errorName = '';
      this.showEditName = false;
    }
  }

  handleSaveEmail(): void {
    const { email } = this.editForm.value;

    if (email !== '') {
      if (this.editForm.get('email')?.errors?.['email']) {
        this.errorEmail = 'Insira um email válido.';
      } else if (email !== this.profileInfo.email) {
        this.checkExistingUser(email);
      } else if (email == this.profileInfo.email) {
        this.profileInfo.email = email;
        this.showEditEmail = false;
        this.errorEmail = '';
      }
    } else {
      this.errorEmail = '';
      this.showEditEmail = false;
    }
  }

  checkExistingUser(email: string): void {
    this.profileService.existingUser(email).subscribe((data) => {
      if (data) {
        this.errorEmail = 'Este email já está registrado.';
      } else {
        this.profileInfo.email = email;
        this.showEditEmail = false;
        this.errorEmail = '';
      }
    });
  }

  handleSavePassword(): void {
    const { password, confirmPassword } = this.editForm.value;

    if (password !== '') {
      if (this.editForm.get('password')?.errors?.['minlength'] || this.editForm.get('password')?.errors?.['maxlength']) {
        this.errorPassword = 'A senha deve ter de 6 e 12 caracteres.';
      } else if (this.editForm.get('confirmPassword')?.errors?.['matching']) {
        this.errorPassword = 'As senhas não são iguais.';
      } else {
        this.newPassword = confirmPassword;
        this.showEditPassword = false;
        this.errorPassword = '';
      }
    } else {
      this.errorPassword = '';
      this.showEditPassword = false;
    }
  }

  handleDeleteButtonClick(): void {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.');

    if (confirmDelete && this.token) {
      this.profileEditService.deleteUser(this.token).subscribe();

      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        window.location.href = '';
      });
    }
  }

  toggleEditName(): void {
    this.showEditName = !this.showEditName;
  }

  toggleEditEmail(): void {
    this.showEditEmail = !this.showEditEmail;
  }

  toggleEditPassword(): void {
    this.showEditPassword = !this.showEditPassword;
  }
}
