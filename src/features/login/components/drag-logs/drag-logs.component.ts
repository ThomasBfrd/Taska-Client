import { Component, computed, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { LoginData } from '../../../../shares/interfaces/login-data.interface'
import { NgClass } from '@angular/common';

export type ROLE = 'employee' | 'manager';

@Component({
  selector: 'app-drag-logs',
  templateUrl: './drag-logs.component.html',
  styleUrl: './drags-logs.components.css',
  imports: [CdkDrag, NgClass],
})
export class DragLogs {

  public readonly accounts: InputSignal<Record<string, LoginData>> = input<Record<string, LoginData>>({});

  protected readonly dragPosition: {x: number; y: number} = {x: 100, y: -30};

  protected readonly checkedValue: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly selectedRole: Signal<ROLE> = computed(() => {
    const checkedValue: boolean = this.checkedValue();

    return !checkedValue ? 'employee' : 'manager';
  });

  protected readonly filteredAccounts: Signal<Record<string, LoginData>> = computed(() => {
    const selectedRole: ROLE = this.selectedRole();
    const accounts: Record<string, LoginData> = this.accounts();

    return { [selectedRole]: accounts[selectedRole] };
  })

  protected Object: ObjectConstructor = Object;

  protected toggleRole(event: Event): void {
    const isChecked: boolean = (event.target as HTMLInputElement).checked;

    this.checkedValue.set(isChecked);
  }

}
