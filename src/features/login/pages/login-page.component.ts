import { ChangeDetectionStrategy, Component, DestroyRef, signal } from '@angular/core';
import { debounce, email, form, FormField, required } from '@angular/forms/signals';
import { LoginService } from '../../../shares/services/login/login.service';
import { User } from '../../../shares/interfaces/user.interface';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

export interface LoginData {
  email: string;
  password: string;
}

export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email);
};

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  imports: [FormField, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  public constructor(
    private readonly loginService: LoginService, private readonly destroyRef: DestroyRef
  ) {}

  protected readonly errorMessage = signal<string>('');

  protected readonly loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  protected loginForm = form(this.loginModel, (schemaPath) => {
    debounce(schemaPath.email, 500);
    required(schemaPath.email, { message: "L'adresse email est requise." });
    email(schemaPath.email, { message: 'Veuillez saisir une adresse email valide.' });
    debounce(schemaPath.password, 500);
    required(schemaPath.password, { message: 'Vous devez saisir un mot de passe.' });
  });

  protected onSubmit(event: Event) {
    event.preventDefault();

    const credentials: LoginData = this.loginModel();

    this.loginService.login(credentials).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (user: User) => {
        this.loginModel.set({email: '', password: ''});
        this.loginForm().reset();
      },
      error: (error: Error) => {
        this.errorMessage.set(`Erreur de connexion : ${error.message}`);
        console.error("Erreur de connexion", error);

      }
    });
  }
}
