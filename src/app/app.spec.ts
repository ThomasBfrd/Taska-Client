import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, Router } from '@angular/router';
import { DashboardPage } from '../features/dashboard/pages/dashboard-page.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({ selector: 'dashboard-page', template: '', standalone: true })
class DashboardPageStub {}

describe(App.name, () => {
  let fixture: ComponentFixture<App>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '', component: DashboardPageStub }])],
    });

    fixture = TestBed.createComponent(App);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
    await fixture.whenStable();
  });

  it("devrait build l'application", () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('devrait afficher la route par défaut qui est le Dashboard', async () => {
    await router.navigate(['/']);
    fixture.detectChanges(); // Ajoutez ceci
    await fixture.whenStable();
    expect(location.path()).toBe('');
  });
});
