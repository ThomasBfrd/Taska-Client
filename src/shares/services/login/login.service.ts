import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { LoginData } from '../../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {
    this.initializeAuth();
  }

  private currentUserSignal: WritableSignal<User | null> = signal<User | null>(null);
  public currentUser: Signal<User | null> = this.currentUserSignal.asReadonly();
  public isAuthenticated: Signal<boolean> = computed(() => this.currentUser() !== null);

  private initializeAuth() {
    const userId: string | null = localStorage.getItem('userId');
    const userEmail: string | null = localStorage.getItem('userEmail');

    if (userId && userEmail) {
      this.currentUserSignal.set({ id: userId, email: userEmail });
    }
  }

  public login(userBody: LoginData): Observable<User> {
    return this.httpClient
      .post<User>(
        'http://localhost:3000/auth/login',
        {
          email: userBody.email,
          password: userBody.password,
        },
        { withCredentials: true },
      )
      .pipe(
        map((user: User) => user),
        shareReplay(),
        tap((user: User) => {
          this.currentUserSignal.set(user);
          localStorage.setItem('userId', user.id);
          localStorage.setItem('userEmail', user.email);

          this.router.navigate(['/dashboard']);
        }),
      );
  }

  public logout(reason?: string, value?: string) {
    localStorage.clear();

    this.currentUserSignal.set(null);

    if (reason && value ) {
      return this.router.navigate(['/login'], {
        state: { reason: value },
      });
    }

    return this.router.navigate(['/login']);
  }
}
