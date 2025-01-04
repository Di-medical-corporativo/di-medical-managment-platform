import { DeparmentId } from "../../../../../../src/Contexts/Backoffice/Department/domain/DeparmentId";
import { Department } from "../../../../../../src/Contexts/Backoffice/Department/domain/Department";
import { DepartmentName } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentName";
import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskDescription } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskDueTo } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDueTo";
import { TaskFinder } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskFinder";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskIsPoint } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskIsPoint";
import { TaskNotFound } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskNotFound";
import { TaskTitle } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskTitle";
import { TaskUser } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskUser";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";

describe('TaskFinder', () => {
  let repository: TaskRepositoryMock;

  let taskFinder: TaskFinder;

  beforeAll(() => {
    repository = new TaskRepositoryMock();

    taskFinder = new TaskFinder(repository);
  });

  test('should find an existing task', async () => {

    const departmentData = {
      id: new DeparmentId('dep-1'),
      name: new DepartmentName('1')
    };

    const department = Department.create(departmentData);

    const taskParams = {
      id: new TaskId(''),
      title: new TaskTitle(''),
      description: new TaskDescription(''),
      userAssigned: TaskUser.create({
        id: new UserId(''),
        firstName: new UserFirstName(''),
        lastName: new UserLastName('')
      }),
      dueTo: new TaskDueTo(new Date().toISOString()),
      isPoint: new TaskIsPoint(false),
      department
    }
    const task = Task.create(taskParams);

    repository.setReturnForSearch(task);

    const id = new TaskId('')

    await taskFinder.run({
      id
    });

    repository.assertSearchHaveBeenCalledWith(id);
  });

  test('should throw TaskNotFound if searching a non existing task', async () => {
    const id = new TaskId('')

    repository.setReturnForSearch(null);

    await expect(taskFinder.run({
      id
    })).rejects.toThrow(TaskNotFound);
  });
});
