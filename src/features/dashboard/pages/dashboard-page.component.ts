import { ChangeDetectionStrategy, Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ProfileService } from '../../../shares/services/profile/profile.service';
import { Profile } from '../../../shares/interfaces/profile.interface';
import { LoginService } from '../../../shares/services/login/login.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeaturesList } from '../components/features-list/features-list.component';
import { ProfileFeature } from '../../../shares/interfaces/profile-feature.interface';

export interface ProfileAndFeatures {
  profile: Profile | undefined;
  features: Array<ProfileFeature> | undefined;
}

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturesList],
})
export class DashboardPage {
  protected profile: Signal<Profile | undefined> = signal<Profile | undefined>(undefined);

  protected readonly privateData: Signal<Array<ProfileFeature>> = computed(() => {
    return this.profile()?.features.filter((profileFeature: ProfileFeature) => !profileFeature.genericData) ?? []
  });

  protected readonly genericData: Signal<Array<ProfileFeature>> = computed(() => {
    return this.profile()?.features.filter((profileFeature: ProfileFeature) => profileFeature.genericData) ?? []
  });

  public constructor(
    private readonly profileService: ProfileService,
    private readonly loginService: LoginService) {
    const userId = this.loginService.currentUser()?.id;

    if (userId) {
      this.profile = toSignal(this.profileService.getProfile(userId));
    }
  }
}
