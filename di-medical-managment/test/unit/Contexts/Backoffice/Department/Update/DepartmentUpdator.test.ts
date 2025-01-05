import { DepartmentUpdator } from "../../../../../../src/Contexts/Backoffice/Department/application/Update/DepartmentUpdator";
import { DeparmentId } from "../../../../../../src/Contexts/Backoffice/Department/domain/DeparmentId";
import { Department } from "../../../../../../src/Contexts/Backoffice/Department/domain/Department";
import { DepartmentName } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentName";
import { DepartmentNotFound } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentNotFound";
import { DepartmentRepositoryMock } from "../../../../__mock__/DepartmentRepositoryMock";

describe('DepartmentUpdator', () => {
  let repository: DepartmentRepositoryMock;

  let departmentUpdator: DepartmentUpdator;

  beforeEach(() => {
    repository = new DepartmentRepositoryMock();

    departmentUpdator = new DepartmentUpdator(repository);
  });

  test('should update the name of deparment', async () => {
    const data = {
      id: new DeparmentId('dep-1'),
      name: new DepartmentName('1')
    };

    const expected = Department.create(data);
    
    repository.setReturnValueForSearch(expected);

    const newName = new DepartmentName('test');

    await departmentUpdator.run({
      id: data.id,
      name: newName
    });

    repository.assertUpdateHaveBeenCalled();
  });

  test('should throw DepartmentNotFound if trying to update a non existing department ', async () => {
    const data = {
      id: new DeparmentId('dep-1'),
      name: new DepartmentName('1')
    };

    repository.setReturnValueForSearch(null);

    await expect(departmentUpdator.run({
      id: data.id,
      name: data.name
    })).rejects.toThrow(DepartmentNotFound);
  });
});
