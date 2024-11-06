import { PermitAcceptor } from "../../../../../../src/Contexts/Backoffice/Permit/application/Acept/PermitAcceptor";
import { PermitWithNoDecision } from "../../../../../../src/Contexts/Backoffice/Permit/domain/Permit";
import { PermitAdminComment } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitComment";
import { PermitDate } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitDate";
import { PermitId } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitId";
import { PermitNotFound } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitNotFound";
import { PermitReason } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitReason";
import { PermitStatus, PermitStatusList } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitStatus";
import { PermitType } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitType";
import { PermitUser } from "../../../../../../src/Contexts/Backoffice/Permit/domain/PermitUser";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { PermitRepositoryMock } from "../../../../__mock__/PermitRepositoryMock";

describe('PermitDecition', () => {

  let repository: PermitRepositoryMock;

  let permitAcceptor: PermitAcceptor

  beforeEach(() => {
    repository = new PermitRepositoryMock();

    permitAcceptor = new PermitAcceptor(repository);
  });

  test('should accept a valid permit', async () => {
    const dataPermit = {
      id: new PermitId(''),
      type: PermitType.Personal,
      reason: new PermitReason(''),
      user: PermitUser.create({ 
        firstName: new UserFirstName(''),
        id: new UserId(''),
        lastName: new UserLastName('') 
      }),
      createdAt: new PermitDate(''),
      status: new PermitStatus(PermitStatusList.Pending)
    }

    const permit = PermitWithNoDecision.create(dataPermit);

    repository.setReturnForFind(permit);

    const data = {
      id: new PermitId(''),
      comment: new PermitAdminComment(''),
      action: PermitStatusList.Approved
    };

    await permitAcceptor.run(data);

    repository.assertAcceptHaveBeenCalled();
  });

  test('should throw PermitNotFound when trying to find a non existing permit', async () => {

    repository.setReturnForFind(null);

    const data = {
      id: new PermitId(''),
      comment: new PermitAdminComment(''),
      action: PermitStatusList.Approved
    };

    await expect(permitAcceptor.run(data)).rejects.toThrow(PermitNotFound);
  });
});
