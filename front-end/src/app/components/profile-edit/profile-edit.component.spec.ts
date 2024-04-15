import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { ProfileEditComponent } from './profile-edit.component';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';

describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent;
  let profileService: ProfileService;
  let fixture: ComponentFixture<ProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditComponent);
    profileService = TestBed.inject(ProfileService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Meus Dados');
  });

  it('should render the card correctly', () => {
    const profileInfo = fixture.nativeElement.querySelector('.form-field');

    expect(profileInfo).toBeTruthy();
  });

  it('should render the user info in card correctly', () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    component.profileInfo = mock;

    fixture.detectChanges();

    const nameInput = fixture.nativeElement.querySelector('.name-input');
    const emailInput = fixture.nativeElement.querySelector('.email-input');
    const passwordInput = fixture.nativeElement.querySelector('.password-input');

    expect(nameInput.value).toContain(mock.name);
    expect(emailInput.value).toContain(mock.email);
    expect(passwordInput.value).toContain('*********');
  });

  it('should render the input edit name when setting icon name is clicked', () => {
    fixture.detectChanges();

    const iconSetting = fixture.nativeElement.querySelector('.icon-setting');

    iconSetting.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const editNameInput = fixture.nativeElement.querySelector('.edit-name-input');
    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    expect(editNameInput).toBeTruthy();
    expect(editNameInput.placeholder).toContain('Digite seu novo nome');
    expect(fixture.nativeElement.textContent).toContain('Seu nome deve ter no mínimo 2 caracteres.');
    expect(buttonSave).toBeTruthy();
  });

  it("should save the value input name when 'save' button is clicked", () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    component.profileInfo = mock;
    component.showEditName = true;

    fixture.detectChanges();

    const newName = 'Gabriel';

    const editNameInput = fixture.nativeElement.querySelector('.edit-name-input');

    editNameInput.value = newName;
    editNameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    buttonSave.click();

    fixture.detectChanges();

    const nameInput = fixture.nativeElement.querySelector('.name-input');

    expect(nameInput.value).toContain(newName);
    expect(component.showEditName).toBeFalsy();
  });

  it('should throw an error when new name is invalid', () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    component.profileInfo = mock;
    component.showEditName = true;

    fixture.detectChanges();

    const newName = 'G';

    const editNameInput = fixture.nativeElement.querySelector('.edit-name-input');

    editNameInput.value = newName;
    editNameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    buttonSave.click();

    fixture.detectChanges();

    const nameInput = fixture.nativeElement.querySelector('.name-input');
    const alert = fixture.nativeElement.querySelector('.alert');

    expect(nameInput.value).not.toContain(newName);
    expect(component.showEditName).toBeTruthy();
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain('O nome deve ter pelo menos 2 caracteres.');
  });

  it('should render the input edit email when setting icon email is clicked', () => {
    fixture.detectChanges();

    const iconSettings = fixture.nativeElement.querySelectorAll('.icon-setting');

    iconSettings[1].dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const editEmailInput = fixture.nativeElement.querySelector('.edit-email-input');
    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    expect(editEmailInput).toBeTruthy();
    expect(editEmailInput.placeholder).toContain('Digite seu novo email');
    expect(fixture.nativeElement.textContent).toContain('Seu email deve ser um email válido.');
    expect(buttonSave).toBeTruthy();
  });

  it("should save the value input email when 'save' button is clicked", () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    spyOn(profileService, 'existingUser').and.returnValue(of(false));

    component.profileInfo = mock;
    component.showEditEmail = true;

    fixture.detectChanges();

    const newEmail = 'gabriel@email.com';

    const editEmailInput = fixture.nativeElement.querySelector('.edit-email-input');

    editEmailInput.value = newEmail;
    editEmailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    buttonSave.click();

    fixture.detectChanges();

    const emailInput = fixture.nativeElement.querySelector('.email-input');

    expect(emailInput.value).toContain(newEmail);
    expect(component.showEditEmail).toBeFalsy();
  });

  it('should throw an error when new email is invalid', () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    component.profileInfo = mock;
    component.showEditEmail = true;

    fixture.detectChanges();

    const newEmail = 'gabriel';

    const editEmailInput = fixture.nativeElement.querySelector('.edit-email-input');

    editEmailInput.value = newEmail;
    editEmailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    buttonSave.click();

    fixture.detectChanges();

    const emailInput = fixture.nativeElement.querySelector('.email-input');
    const alert = fixture.nativeElement.querySelector('.alert');

    expect(emailInput.value).not.toContain(newEmail);
    expect(component.showEditEmail).toBeTruthy();
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain('Insira um email válido.');
  });

  it('should throw an error when new email is already registered', () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    spyOn(profileService, 'existingUser').and.returnValue(of(true));

    component.profileInfo = mock;
    component.showEditEmail = true;

    fixture.detectChanges();

    const newEmail = 'gabriel@email.com';

    const editEmailInput = fixture.nativeElement.querySelector('.edit-email-input');

    editEmailInput.value = newEmail;
    editEmailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    buttonSave.click();

    fixture.detectChanges();

    const emailInput = fixture.nativeElement.querySelector('.email-input');
    const alert = fixture.nativeElement.querySelector('.alert');

    expect(emailInput.value).not.toContain(newEmail);
    expect(component.showEditEmail).toBeTruthy();
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain('Este email já está registrado.');
  });

  it('should render the input edit password when setting icon password is clicked', () => {
    fixture.detectChanges();

    const iconSettings = fixture.nativeElement.querySelectorAll('.icon-setting');

    iconSettings[2].dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const editPasswordInput = fixture.nativeElement.querySelector('.edit-password-input');
    const editConfirmPasswordInput = fixture.nativeElement.querySelector('.edit-confirm-password-input');
    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    expect(editPasswordInput).toBeTruthy();
    expect(editPasswordInput.placeholder).toContain('Digite sua nova senha');
    expect(fixture.nativeElement.textContent).toContain('Sua senha deve ter de 6 a 12 caracteres.');
    expect(editConfirmPasswordInput).toBeTruthy();
    expect(editConfirmPasswordInput.placeholder).toContain('Confirme sua nova senha');
    expect(fixture.nativeElement.textContent).toContain('Digite sua senha novamente.');
    expect(buttonSave).toBeTruthy();
  });

  it("should save the value input password when 'save' button is clicked", () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    component.profileInfo = mock;
    component.showEditPassword = true;

    fixture.detectChanges();

    const newPassword = 'password';
    const newConfirmPassword = 'password';

    const editPasswordInput = fixture.nativeElement.querySelector('.edit-password-input');
    const editConfirmPasswordInput = fixture.nativeElement.querySelector('.edit-confirm-password-input');

    editPasswordInput.value = newPassword;
    editPasswordInput.dispatchEvent(new Event('input'));
    editConfirmPasswordInput.value = newConfirmPassword;
    editConfirmPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    buttonSave.click();

    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert');

    expect(alert).toBeFalsy();
    expect(component.showEditPassword).toBeFalsy();
  });

  it('should throw an error when new password length is invalid', () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    component.profileInfo = mock;
    component.showEditPassword = true;

    fixture.detectChanges();

    const newPassword = 'wrong';

    const editPasswordInput = fixture.nativeElement.querySelector('.edit-password-input');

    editPasswordInput.value = newPassword;
    editPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    buttonSave.click();

    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert');

    expect(component.showEditPassword).toBeTruthy();
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain('A senha deve ter de 6 e 12 caracteres.');
  });

  it('should throw an error when confirmPassword is invalid', () => {
    const mock: IProfile = { name: 'User', email: 'test@example.com' };

    component.profileInfo = mock;
    component.showEditPassword = true;

    fixture.detectChanges();

    const newPassword = 'password';
    const newConfirmPassword = 'wrongPassword';

    const editPasswordInput = fixture.nativeElement.querySelector('.edit-password-input');
    const editConfirmPasswordInput = fixture.nativeElement.querySelector('.edit-confirm-password-input');

    editPasswordInput.value = newPassword;
    editPasswordInput.dispatchEvent(new Event('input'));
    editConfirmPasswordInput.value = newConfirmPassword;
    editConfirmPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const buttonSave = fixture.nativeElement.querySelector('.btn-primary');

    buttonSave.click();

    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert');

    expect(component.showEditPassword).toBeTruthy();
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain('As senhas não são iguais.');
  });

  // it("should delete account when 'delete' button is clicked", () => {});

  // it("should save new infos when 'save' button is clicked", () => {});
});
