import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureCard } from './feature-card.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgClass } from '@angular/common';
import { FEATURES_CARDS_TEST_CASES } from '../../../../shares/tests/mocks/feature-cards.mock';

describe(FeatureCard.name, () => {
  let component: FeatureCard;
  let fixture: ComponentFixture<FeatureCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgClass],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCard);
    component = fixture.componentInstance;
  });

  it('Devrait monter le composant', () => {
    expect(component).toBeTruthy();
  });

  FEATURES_CARDS_TEST_CASES.forEach(({ input, expected }) => {
    describe(`Affichage des données type ${input.key}`, () => {
      beforeEach(() => {
        fixture.componentRef.setInput('color', input.color);
        fixture.componentRef.setInput('title', expected.title);
        fixture.componentRef.setInput('icon', expected.icon);
        fixture.componentRef.setInput('data', input.data);
        fixture.componentRef.setInput('details', expected.details);
        fixture.componentRef.setInput('path', expected.path);
        fixture.componentRef.setInput('labelPath', expected.labelPath);
        fixture.detectChanges();
      });
      it(`devrait afficher le titre ${expected.title}`, () => {
        const titleText: DebugElement = fixture.debugElement.query(
          By.css('[data-testid="card-title"]'),
        );

        expect(titleText.nativeElement.textContent).toBe(expected.title);
      });

      it('devrait afficher le code couleur correspondant à la couleur de la feature', () => {
        expect(component['bgClasses']()).toBe(expected.bgColor);
        expect(component['textClasses']()).toBe(expected.textColor);
        expect(component['dataTextClasses']()).toBe(expected.dataColor);
      });

      it("devrait afficher l'icône", () => {
        const icon: DebugElement = fixture.debugElement.query(
          By.css('[data-testid="card-icon"]'),
        );

        expect(icon.nativeElement.textContent).toBe(expected.icon);
      });

      it("devrait afficher les données de la card", () => {
        const dataCard: DebugElement = fixture.debugElement.query(
          By.css('[data-testid="card-data"]'),
        );

        expect(dataCard.nativeElement.textContent).toBe(input.data);
      });

      it("devrait afficher le sous texte", () => {
        const detailsTest: DebugElement = fixture.debugElement.query(
          By.css('[data-testid="card-details"]'),
        );

        if (!expected.details) {
          expect(detailsTest).toBeNull();
        } else {
          expect(detailsTest.nativeElement.textContent).toBe(expected.details);
        }
      });

      it("devrait afficher le path et son label si présent", () => {
        const labelPath: DebugElement = fixture.debugElement.query(By.css('[data-testid="card-label-path"]'));
        const path: DebugElement = fixture.debugElement.query(By.css('[data-testid="card-path"]'));

        if (!expected.path && !expected.labelPath) {
          expect(labelPath).toBeNull();
          expect(path).toBeNull();
        } else {
          expect(labelPath.nativeElement.textContent).toMatch(expected.labelPath);
          expect(path.nativeElement.href).toMatch(expected.path);
        }

      })
    });
  });
});
