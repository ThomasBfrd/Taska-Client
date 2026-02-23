import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { debounce, email, form, FormField, required } from '@angular/forms/signals';
import { LoginService } from '../../../shares/services/login/login.service';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationState } from '../../../core/interfaces/navigation-state.interface';
import { LoginData } from '../../../shares/interfaces/login-data.interface';
import { DragLogs } from '../components/drag-logs/drag-logs.component';
import { sanitizeInput } from '../../../shares/utils/input-validations';

export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailPattern.test(email);
};

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  imports: [FormField, NgClass, DragLogs],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  public constructor(
    private readonly loginService: LoginService,
    private readonly destroyRef: DestroyRef,
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

  protected accounts: WritableSignal<Record<string, LoginData>> = signal<Record<string, LoginData>>({
    "employee": {email: "employee@demo.com", password: "Demo123!"},
    "manager": {email: "manager@demo.com", password: "Demo456!"},
  });

  public ngOnInit(): void {
    const state: NavigationState = history.state;
    if (state?.reason === 'session-expired') {
      this.errorMessage.set('Votre session a expiré, veuillez vous reconnecter.');
    }
  }

  protected onSubmit(event: Event) {
    event.preventDefault();

    const credentials: LoginData = {
      email: this.loginModel().email.trim(),
      password: sanitizeInput(this.loginModel().password.trim())
    };

    this.loginService
      .login(credentials)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loginModel.set({ email: '', password: '' });
          this.loginForm().reset();
        },
        error: (error: Error) => {
          this.errorMessage.set(`Erreur de connexion : ${error.message}`);
        },
      });
  }
}
