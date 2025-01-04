import { DepartmentCreator } from "../../../../../../src/Contexts/Backoffice/Department/application/Create/DepartmentCreator";
import { DeparmentId } from "../../../../../../src/Contexts/Backoffice/Department/domain/DeparmentId";
import { DepartmentName } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentName";
import { DepartmentRepository } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentRepository";
import { DepartmentRepositoryMock } from "../../../../__mock__/DepartmentRepositoryMock";

describe('DepartmentCreator', () => {
  let repository: DepartmentRepositoryMock;

  let departmentCreator: DepartmentCreator;

  beforeEach(() => {
    repository = new DepartmentRepositoryMock();

    departmentCreator = new DepartmentCreator(repository);
  });

  test('should create a valid Department', async () => {
    const data = {
      id: new DeparmentId(''),
      name: new DepartmentName('')
    };

    await departmentCreator.run(data);

    repository.assertSaveHaveBeenCalled();
  });
});
