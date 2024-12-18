import { UserEmail } from "../../../../../src/Contexts/Backoffice/User/domain/UserEmail";
import { UserFirstName } from "../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserJob } from "../../../../../src/Contexts/Backoffice/User/domain/UserJob";
import { UserLastName } from "../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { UserPasswordEncryptor } from "../../../../../src/Contexts/Backoffice/User/domain/UserPasswordEncryptor";
import { AuthenticateUser } from "../../../../../src/Contexts/Shared/application/Auth/AuthenticateUser";
import { UserAuthenticated } from "../../../../../src/Contexts/Shared/domain/UserAuthenticated";
import { UserRepositoryMock } from "../../../__mock__/UserRepositoryMock";

describe('AuthenticateUser', () => {
  let repository: UserRepositoryMock;

  let authenticateUser: AuthenticateUser;

  beforeEach(() => {
    repository = new UserRepositoryMock();

    authenticateUser = new AuthenticateUser(repository);
  });

  test('should validate the email and password of a user', async () => {
    const password = new UserPasswordEncryptor().run('1234');

    const data = {
      id: new UserId(''),
      email: new UserEmail(''),
      firstName: new UserFirstName(''),
      lastName: new UserLastName(''),
      password,
      job: new UserJob(''),
      modules: []
    };

    const user = UserAuthenticated.create(data);

    repository.setReturnForFindByEmail(user);

    await authenticateUser.run({
      email: data.email,
      password: '1234'
    });

    repository.assertFindByEmailHaveBeenCalled();
  });
});
