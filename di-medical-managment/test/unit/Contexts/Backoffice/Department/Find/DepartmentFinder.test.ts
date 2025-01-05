import { DepartmentCreator } from "../../../../../../src/Contexts/Backoffice/Department/application/Create/DepartmentCreator";
import { DeparmentId } from "../../../../../../src/Contexts/Backoffice/Department/domain/DeparmentId";
import { Department } from "../../../../../../src/Contexts/Backoffice/Department/domain/Department";
import { DepartmentFinder } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentFinder";
import { DepartmentName } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentName";
import { DepartmentNotFound } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentNotFound";
import { DepartmentRepositoryMock } from "../../../../__mock__/DepartmentRepositoryMock";

describe('DeparmentFinder', () => {
  let repository: DepartmentRepositoryMock;

  let departmentFinder: DepartmentFinder;

  beforeEach(() => {
    repository = new DepartmentRepositoryMock();

    departmentFinder = new DepartmentFinder(repository);
  });

  test('should find the department', async () => {
    const data = {
      id: new DeparmentId('dep-1'),
      name: new DepartmentName('1')
    };

    const expected = Department.create(data);

    repository.setReturnValueForSearch(expected);

    const deparment = await departmentFinder.run({
      id: data.id
    });

    expect(deparment).toEqual(expected);
  });

  test('should throw DeparmentNotFound with a non existing department', async () => {
    const data = {
      id: new DeparmentId('dep-1'),
      name: new DepartmentName('1')
    };

    repository.setReturnValueForSearch(null);

    await expect(departmentFinder.run({
      id: data.id
    })).rejects.toThrow(DepartmentNotFound);
  });
});
