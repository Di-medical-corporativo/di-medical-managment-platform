import { DepartmentDeleter } from "../../../../../../src/Contexts/Backoffice/Department/application/Delete/DepartmentDeleter";
import { DeparmentId } from "../../../../../../src/Contexts/Backoffice/Department/domain/DeparmentId";
import { Department } from "../../../../../../src/Contexts/Backoffice/Department/domain/Department";
import { DepartmentName } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentName";
import { DepartmentNotFound } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentNotFound";
import { DepartmentRepositoryMock } from "../../../../__mock__/DepartmentRepositoryMock";

describe('DepartmentDeleter', () => {
  let repository: DepartmentRepositoryMock;

  let departmentDeleter: DepartmentDeleter;

  beforeEach(() => {
    repository = new DepartmentRepositoryMock();

    departmentDeleter = new DepartmentDeleter(repository);
  });

  test('should delete an existing department', async () => {
    const data = {
      id: new DeparmentId('dep-1'),
      name: new DepartmentName('1')
    };

    const expected = Department.create(data);
    
    repository.setReturnValueForSearch(expected);

    await departmentDeleter.run({
      id: data.id,
    });

    repository.assertDeletehHaveBeenCalled();
  });

  test('should throw DepartmentNotFound if trying to delete a non existing department ', async () => {
    const data = {
      id: new DeparmentId('dep-1'),
    };

    repository.setReturnValueForSearch(null);

    await expect(departmentDeleter.run({
      id: data.id,
    })).rejects.toThrow(DepartmentNotFound);
  });
});
