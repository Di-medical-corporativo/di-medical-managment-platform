import { UserPermitsFinder } from "../../../../../../src/Contexts/Backoffice/Permit/application/UserPermits/UserPermitsFinder";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { PermitRepositoryMock } from "../../../../__mock__/PermitRepositoryMock";

describe('UserPermitsFinder', () => {

  let userPermitsFinder: UserPermitsFinder;

  let repository: PermitRepositoryMock;

  beforeEach(() => {
    repository = new PermitRepositoryMock();

    userPermitsFinder = new UserPermitsFinder(repository);
  });

  test('should retrieve all the permits of a user filtered by month', async () => {
    await userPermitsFinder.run({
      id: new UserId(''),
      year: 2024,
      month: 3
    });

    repository.assertFindByUserHaveBeenCalled();
  });
});
