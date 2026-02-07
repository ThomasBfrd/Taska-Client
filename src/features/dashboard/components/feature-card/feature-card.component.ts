import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
} from '@angular/core';
import { CardColor } from '../../../../shares/types/card-color.type';

@Component({
  selector: 'feature-card',
  templateUrl: './feature-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass]
})

export class FeatureCard {
  public readonly title: InputSignal<string | undefined> = input.required<string | undefined>();
  public readonly icon: InputSignal<string | undefined> = input.required<string | undefined>();
  public readonly details: InputSignal<string | undefined> = input.required<string | undefined>();
  public readonly path: InputSignal<string | undefined> = input.required<string | undefined>();
  public readonly labelPath: InputSignal<string | undefined> = input.required<string | undefined>();
  public readonly color: InputSignal<string | undefined> = input.required<string | undefined>();
  public readonly data: InputSignal<Array<string> | undefined> = input.required<Array<string> | undefined>();

  private readonly COLOR_CLASSES: Record<CardColor, { bg: string; text: string; data: string }> = {
    'sky': { bg: 'bg-sky-900/8', text: 'text-sky-400', data: 'text-sky-500' },
    'orange': { bg: 'bg-orange-900/8', text: 'text-orange-400', data: 'text-orange-500' },
    'green': { bg: 'bg-green-900/8', text: 'text-green-400', data: 'text-green-500' },
    'indigo': { bg: 'bg-indigo-900/8', text: 'text-indigo-400', data: 'text-indigo-500' },
    'rose': { bg: 'bg-rose-900/8', text: 'text-rose-400', data: 'text-rose-500' },
    'gray': { bg: 'bg-gray-900/8', text: 'text-gray-400', data: 'text-gray-500' },
  };

  protected readonly bgClasses = computed(() => this.COLOR_CLASSES[this.color() as CardColor].bg);
  protected readonly textClasses = computed(() => this.COLOR_CLASSES[this.color() as CardColor].text);
  protected readonly dataTextClasses = computed(() => this.COLOR_CLASSES[this.color() as CardColor].data);
}
