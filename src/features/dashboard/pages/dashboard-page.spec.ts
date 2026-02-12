import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPage } from './dashboard-page.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { FeatureCard } from '../components/feature-card/feature-card.component';

describe(DashboardPage.name, () => {
  let fixture: ComponentFixture<DashboardPage>;
  let component: DashboardPage;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule, FeatureCard]
    });

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it("devrait monter le composant sans erreur", () => {
    expect(component).toBeTruthy();
  });

  // it("devrait afficher un message d'erreur si les données de l'utilisateur ne sont pas chargées", () => {
  //   const compiled = fixture.debugElement.query(By.css(`[data-testid="empty-message"]`));
  //   expect(compiled.nativeElement.textContent).toMatch("Les données de l'utilisateur n'ont pu être récupérées.");
  // });

  // it("devrait afficher le nombre de cards correspondant aux features autorisées", async () => {
  //   // GIVEN
  //   const userFeatures = [
  //     {
  //       key: "planning",
  //       data: "09h - 18h"
  //     },
  //     {
  //       key: "vacations",
  //       data: "12 jours"
  //     }
  //   ]

  //   WHEN
  //   const cardElements: HTMLElement[] = fixture.nativeElement.querySelectorAll('[data-testid="app-card"]');

  //   // THEN
  //   expect(cardElements.length).toBe(2);
  //   expect(cardElements[0].textContent).toContain("Planning");

  // });
});
