import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { Profile } from '../../interfaces/profile.interface';
import { ApolloTestingController, ApolloTestingModule, Operation } from 'apollo-angular/testing';
import { firstValueFrom } from 'rxjs';
import { GraphQLError } from 'graphql';

const profileMock: Profile = {
  role: 'employee',
  firstName: 'John',
  lastName: 'Doe',
  city: 'Paris',
  birthDay: '1994-06-12',
  tel: '0000000000',
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
    const userId = '01';
    const promise = firstValueFrom(service.getProfile(userId));

    const op = controller.expectOne('GetProfile');
    expect(op.operation.variables['userId']).toBe(userId);

    op.flush({ data: { getProfile: profileMock } });

    const profile = await promise;
    expect(profile).toEqual(profileMock);
    expect(profile?.firstName).toBe('John');
  });

  it('devrait retourner une erreur lors de la récupération du profil"', async () => {
    const promise = firstValueFrom(service.getProfile('999'));

    const op = controller.expectOne('GetProfile');
    op.graphqlErrors([new GraphQLError('Utilisateur non trouvé')]);

    await expect(promise).rejects.toThrow('Utilisateur non trouvé');
  });
});
