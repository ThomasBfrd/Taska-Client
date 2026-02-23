import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragLogs } from './drag-logs.component';
import { getByTestId } from '../../../../shares/tests/utils/tests-snippets';
import { ComponentRef, DebugElement } from '@angular/core';

describe(DragLogs.name, () => {
  let component: DragLogs;
  let fixture: ComponentFixture<DragLogs>;
  let componentRef: ComponentRef<DragLogs>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [DragLogs]
    });

    fixture = TestBed.createComponent(DragLogs);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  })

  it('Devrait monter le composant', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(async () => {
    componentRef.setInput('accounts', {
      "employee": { email: "employee@demo.com", password: "test" },
      "manager": { email: "manager@demo.com", password: "test" },
  })

    fixture.detectChanges();
    await fixture.whenStable();
  })

  it('Devrait afficher par défaut les logs employé', () => {
    const toggle: DebugElement = fixture.debugElement.query(getByTestId('toggle-logs'));
    const logs: Array<DebugElement> = fixture.debugElement.queryAll(getByTestId('logs-text'));

    expect(toggle.nativeElement.checked).toEqual(false);
    expect(logs[0].nativeElement.textContent).toMatch("employee@demo.com");
    expect(logs[1].nativeElement.textContent).toMatch("test");
  })

    it('Devrait afficher les logs manager au switch du bouton', async () => {
    const toggle: DebugElement = fixture.debugElement.query(getByTestId('toggle-logs'));
    const logs: Array<DebugElement> = fixture.debugElement.queryAll(getByTestId('logs-text'));

    expect(toggle.nativeElement.checked).toEqual(false);
    expect(logs[0].nativeElement.textContent).toMatch("employee@demo.com");
    expect(logs[1].nativeElement.textContent).toMatch("test");

    toggle.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const toggle2: DebugElement = fixture.debugElement.query(getByTestId('toggle-logs'));
    const logs2: Array<DebugElement> = fixture.debugElement.queryAll(getByTestId('logs-text'));

    expect(toggle2.nativeElement.checked).toEqual(true);
    expect(logs2[0].nativeElement.textContent).toMatch("manager@demo.com");
    expect(logs2[1].nativeElement.textContent).toMatch("test");
  })
});
