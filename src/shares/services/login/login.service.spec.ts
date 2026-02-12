import { TestBed } from "@angular/core/testing";
import { LoginService } from './login.service';
import { User } from '../../interfaces/user.interface';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Mock } from 'vitest';
import { LoginData } from '../../interfaces/login-data.interface';

describe(LoginService.name, () => {
  let service: LoginService;
  let httpClientMock: Partial<HttpClient> & { post: Mock };
  let routerMock: Partial<Router> & { navigate: Mock };

  beforeEach(() => {
    httpClientMock = {
      post: vi.fn(),
    };

    routerMock = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(LoginService);
  });

  it('devrait monter le service sans erreur', () => {
    expect(service).toBeTruthy();
  });

  it("devrait appeler la méthode login et retourner l'id et son adresse email", () => {
    const loginFormMock: LoginData = { email: 'johndoe@test.com', password: 'test123' };
    const mockUser: User = { id: 'id1', email: 'johndoe@test.com' };

    httpClientMock.post.mockReturnValue(of(mockUser));

    service.login(loginFormMock).subscribe((result: User) => {
      expect(result).toEqual(mockUser);
      expect(httpClientMock.post).toHaveBeenCalled();
    });
  });

  it('devrait appeler la méthode login et retourner une erreur', () => {
    const loginFormMock: LoginData = { email: 'johndoe@test.com', password: 'test123' };
    const errorResponse: Error = new Error('Identifiants incorrects');

    httpClientMock.post.mockReturnValue(throwError(() => errorResponse));

    service.login(loginFormMock).subscribe({
      next: () => {},
      error: (error: Error) => {
        expect(error).toBe(errorResponse);
      },
    });
  });
});
