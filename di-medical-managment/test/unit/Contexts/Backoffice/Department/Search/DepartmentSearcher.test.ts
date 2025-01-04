import { DepartmentSearcher } from "../../../../../../src/Contexts/Backoffice/Department/application/SearchAll/DepartmentSearcher";
import { DepartmentRepositoryMock } from "../../../../__mock__/DepartmentRepositoryMock";

describe('DepartmentSearcher', () => {
  let repository: DepartmentRepositoryMock;

  let departmentSearcher: DepartmentSearcher;

  beforeEach(() => {
    repository = new DepartmentRepositoryMock();

    departmentSearcher = new DepartmentSearcher(repository);
  });

  test('should get all departments', async () => {
    await departmentSearcher.run();

    repository.assertSearchHaveBeenCalled();
  });
});
