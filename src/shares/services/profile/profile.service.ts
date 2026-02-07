import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Apollo, gql } from "apollo-angular";
import { Profile } from "../../interfaces/profile.interface";

const GET_PROFILE = gql`
query GetProfile($userId: String!) {
  getProfile(userId: $userId) {
    id,
    role,
    firstName,
    lastName,
    city,
    birthDay,
    tel
    features {
      featureKey,
      data,
      genericData
    }
  }
}
`;

@Injectable({
  providedIn: 'root',
})

export class ProfileService {
  public constructor(private readonly apollo: Apollo) {}

  public getProfile(userId: string): Observable<Profile | undefined> {
    return this.apollo.query<{getProfile: Profile}>({
      query: GET_PROFILE,
      variables: {userId},
      context: {
        withCredentials: true
      }
    }).pipe(
      map((result) => result.data?.getProfile));
  }
}
