import { PermitCreator } from "../../../../../../src/Contexts/Backoffice/Permit/application/Create/PermitCreator";
import { PermitDate } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitDate";
import { PermitId } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitId";
import { PermitReason } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitReason";
import { PermitType } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitType";
import { PermitUser } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitUser";
import { PermitRepositoryMock } from "../../../../__mock__/PermitRepositoryMock";
import { v4 as uuid } from "uuid";


describe('PermitCreator', () => {
  let permitCreator: PermitCreator;
  
  let repository: PermitRepositoryMock = new PermitRepositoryMock();

  beforeEach(() => {
    permitCreator = new PermitCreator(repository);
  });

  test('should create a new permit', async () => {
    let data = {
      id: new  PermitId(''),
      reason: new PermitReason(''),
      type: PermitType.Personal,
      user: PermitUser.fromPrimitives({
        firstName: '',
        id: '',
        lastName: ''
      }),
      createdAt: new PermitDate('')
    }

    await permitCreator.run(data);

    repository.assertSaveHaveBeenCalled();
  });
});
