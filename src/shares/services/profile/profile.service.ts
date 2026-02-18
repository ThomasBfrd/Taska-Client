import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { Apollo, gql } from "apollo-angular";
import { Profile } from "../../interfaces/profile.interface";
import { ErrorLike } from "@apollo/client";
import { FetchResult } from "../../interfaces/fetch-result.interface";

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

  public getProfile(userId: string): Observable<FetchResult<Profile | undefined>> {
    return this.apollo.query<{getProfile: Profile}>({
      query: GET_PROFILE,
      variables: {userId},
      context: {
        withCredentials: true
      }
    }).pipe(
      map((result: Apollo.QueryResult<{getProfile: Profile}>) => ({
        isLoading: false,
        error: result.error?.message || null,
        data: result.data?.getProfile
      })),
      catchError((error: ErrorLike) => of({
        isLoading: false,
        error: error.message || "Can't get your profile.",
        data: undefined
      }))
    );
  }
}
