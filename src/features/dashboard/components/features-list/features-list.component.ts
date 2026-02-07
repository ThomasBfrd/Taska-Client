import { Component, input, InputSignal } from '@angular/core';
import { FeatureCard } from '../feature-card/feature-card.component';
import { CARDS } from '../../../../shares/config/card-config';
import { ProfileFeature } from '../../../../shares/interfaces/profile-feature.interface';

@Component({
  selector: 'app-features-list',
  imports: [FeatureCard],
  templateUrl: './features-list.component.html',
})
export class FeaturesList {
  public readonly features: InputSignal<Array<ProfileFeature>> =
    input.required<Array<ProfileFeature>>();
  public readonly sectionTitle: InputSignal<string> = input.required<string>();

  protected getConfig(key: string) {
    return CARDS[key];
  }
}
