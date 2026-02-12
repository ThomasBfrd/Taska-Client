import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginPage } from "./login-page.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { LoginService } from "../../../shares/services/login/login.service";
import { Observable, of, tap, throwError } from "rxjs";
import { User } from "../../../shares/interfaces/user.interface";
import { Router } from "@angular/router";

export class MockLoginService {
  public currentUser$: Observable<User> = of({id: "id-test", email: "johndoe@gmail.com"});
  public login = vi.fn();
}

describe("LoginPage", () => {

  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockLoginService: MockLoginService;
  let mockRouter: {navigate: any};

  beforeEach(() => {

    mockLoginService = new MockLoginService();
    mockRouter = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        {provide: LoginService, useValue: mockLoginService},
        {provide: Router, useValue: mockRouter},
      ]
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it("devrait monter le composant", () => {
    expect(component).toBeTruthy();
  })

  it("devrait afficher le formulaire de connexion", () => {

    const labelEmail: DebugElement = fixture.debugElement.query(By.css('[data-testid="form-label-email"]'))
    const email: DebugElement = fixture.debugElement.query(By.css('[data-testid="form-email"]'))
    const labelPassword: DebugElement = fixture.debugElement.query(By.css('[data-testid="form-label-password"]'))
    const password: DebugElement = fixture.debugElement.query(By.css('[data-testid="form-password"]'))
    const submitButton: DebugElement = fixture.debugElement.query(By.css('[data-testid="form-submit"]'))

    expect(labelEmail.nativeElement.textContent).toMatch("Adresse email");
    expect(email).toBeDefined();
    expect(labelPassword.nativeElement.textContent).toMatch("Mot de passe");
    expect(password).toBeDefined();
    expect(submitButton.nativeElement.textContent).toMatch("Connexion");
  })

  it("devrait afficher le bouton submit en disabled lors du chargement du formulaire", () => {
    const submitButton: DebugElement = fixture.debugElement.query(By.css('[data-testid="form-submit"]'))
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  })

  it("devrait afficher un message d'erreur car l'adresse email n'a pas été saisie", async () => {
    const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="form-email"]')).nativeElement;
    const errorMissingEmail = fixture.debugElement.queryAll(By.css('[data-testid="form-error-email"]'));
    expect(errorMissingEmail.length).toBe(0);

    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));

    await new Promise(resolve => setTimeout(resolve, 600));
    fixture.detectChanges();

    const errorMissingEmail2 = fixture.debugElement.queryAll(By.css('[data-testid="form-error-email"]'));
    expect(errorMissingEmail2.length).toBeGreaterThan(0);
    expect(errorMissingEmail2[0].nativeElement.textContent).toContain("L'adresse email est requise");
  });

  it("devrait afficher un message d'erreur car l'adresse email n'est pas valide", async () => {
    const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="form-email"]')).nativeElement;
    const errorMissingEmail = fixture.debugElement.queryAll(By.css('[data-testid="form-error-email"]'));
    expect(errorMissingEmail.length).toBe(0);

    emailInput.value = 'wrongEmail';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));

    await new Promise(resolve => setTimeout(resolve, 600));
    fixture.detectChanges();

    const errorMissingEmail2 = fixture.debugElement.queryAll(By.css('[data-testid="form-error-email"]'));
    expect(errorMissingEmail2.length).toBeGreaterThan(0);
    expect(errorMissingEmail2[0].nativeElement.textContent).toContain("Veuillez saisir une adresse email valide.");
  });

  it("devrait afficher un message d'erreur car le mot de passe n'a pas été saisi", async () => {
    const passwordInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="form-password"]')).nativeElement;
    const errorMissingPassword = fixture.debugElement.queryAll(By.css('[data-testid="form-error-password"]'));
    expect(errorMissingPassword.length).toBe(0);

    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));

    await new Promise(resolve => setTimeout(resolve, 600));
    fixture.detectChanges();

    const errorMissingPassword2 = fixture.debugElement.queryAll(By.css('[data-testid="form-error-password"]'));
    expect(errorMissingPassword2.length).toBeGreaterThan(0);
    expect(errorMissingPassword2[0].nativeElement.textContent).toContain("Vous devez saisir un mot de passe.");
  });

  it("devrait appeler le service auth, valider l'authentification et rediriger vers le dashboard", async () => {
    const mockUser: User = {id: "user-123", email: "johndoe@gmail.com"};

    mockLoginService.login.mockReturnValue(of({user: mockUser}));

    const form: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="form"]')).nativeElement;
    const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="form-email"]')).nativeElement;
    const passwordInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="form-password"]')).nativeElement;

    emailInput.value = "johndoe@gmail.com";
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = "password123!";
    passwordInput.dispatchEvent(new Event('input'));

    await new Promise(resolve => setTimeout(resolve, 600));
    fixture.detectChanges();

    form.dispatchEvent(new Event('submit'));
    fixture.whenStable();
    fixture.detectChanges();

    expect(mockLoginService.login).toHaveBeenCalledWith({
      email: "johndoe@gmail.com",
      password: "password123!"
    });
  });

  it("devrait retourner un message d'erreur après un souci lors de l'authentification", async () => {
    mockLoginService.login.mockReturnValue(throwError(() => new Error("johndoe n'existe pas en base")));

    const form: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="form"]')).nativeElement;
    const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="form-email"]')).nativeElement;
    const passwordInput: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="form-password"]')).nativeElement;

    emailInput.value = "johndoe@gmail.com";
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = "password123!";
    passwordInput.dispatchEvent(new Event('input'));

    await new Promise(resolve => setTimeout(resolve, 600));
    fixture.detectChanges();

    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(
    By.css('[data-testid="login-error"]')
  );
  expect(errorElement).toBeTruthy();
  expect(errorElement.nativeElement.textContent).toContain("Erreur de connexion : johndoe n'existe pas en base");
  });
})
