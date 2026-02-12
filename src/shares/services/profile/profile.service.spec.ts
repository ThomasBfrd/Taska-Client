import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { Profile } from '../../interfaces/profile.interface';
import {
  ApolloTestingController,
  ApolloTestingModule,
  TestOperation,
} from 'apollo-angular/testing';
import { firstValueFrom } from 'rxjs';
import { GraphQLError } from 'graphql';
import { FetchResult } from '../../interfaces/fetch-result.interface';

const profileDataMock: Profile = {
  id: '1d',
  role: 'employee',
  firstName: 'John',
  lastName: 'Doe',
  city: 'Paris',
  birthDay: '1994-06-12',
  tel: '0000000000',
  features: [],
};

describe(ProfileService.name, () => {
  let service: ProfileService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [ProfileService],
    });

    service = TestBed.inject(ProfileService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('devrait build le service sans erreurs', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer le profil utilisateur', async () => {
    const userId: string = '01';
    const promise: Promise<FetchResult<Profile | undefined>> = firstValueFrom(service.getProfile(userId));

    const op: TestOperation<{[key: string]: any}> = controller.expectOne('GetProfile');
    expect(op.operation.variables['userId']).toBe(userId);

    op.flush({ data: { getProfile: profileDataMock } });

    await expect(promise).resolves.toEqual({
      data: profileDataMock,
      error: null,
      isLoading: false
    });
  });

  it('devrait retourner une erreur lors de la récupération du profil"', async () => {
    const promise: Promise<FetchResult<Profile | undefined>> = firstValueFrom(service.getProfile('999'));

    const op: TestOperation<{[key: string]: any}> = controller.expectOne('GetProfile');
    op.graphqlErrors([new GraphQLError('Utilisateur non trouvé')]);

    await expect(promise).resolves.toEqual({
      data: undefined,
      error: "Utilisateur non trouvé",
      isLoading: false,
    });
  });
});
