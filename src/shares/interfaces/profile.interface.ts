import { ProfileFeature } from "./profile-feature.interface";


export interface Profile {
  id: string;
  role: string,
  firstName: string,
  lastName: string,
  city: string,
  birthDay: string,
  tel: string,
  features: Array<ProfileFeature>;
}

export interface ProfileQL {
  getProfile: Profile;
}
