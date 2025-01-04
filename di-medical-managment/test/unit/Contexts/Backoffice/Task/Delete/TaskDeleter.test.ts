import { DeparmentId } from "../../../../../../src/Contexts/Backoffice/Department/domain/DeparmentId";
import { Department } from "../../../../../../src/Contexts/Backoffice/Department/domain/Department";
import { DepartmentName } from "../../../../../../src/Contexts/Backoffice/Department/domain/DepartmentName";
import { TaskDeleter } from "../../../../../../src/Contexts/Backoffice/Task/application/Delete/TaskDeleter";
import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskDescription } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskDueTo } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDueTo";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskIsPoint } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskIsPoint";
import { TaskNotFound } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskNotFound";
import { TaskTitle } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskTitle";
import { TaskUser } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskUser";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";
import { TaskSchedulerMock } from "../../../../__mock__/TaskSchedulerMock";

describe('TaskDeleter', () => {
  let taskRepositoryMock: TaskRepositoryMock;

  let taskDeleter: TaskDeleter;

  let taskScheduler: TaskSchedulerMock;

  beforeEach(() => {
    taskRepositoryMock = new TaskRepositoryMock();

    taskScheduler = new TaskSchedulerMock();

    taskDeleter = new TaskDeleter(taskRepositoryMock, taskScheduler);
  });

  test('should delete an existing task', async () => {
    const id = new TaskId('');

    const departmentData = {
      id: new DeparmentId('dep-1'),
      name: new DepartmentName('1')
    };

    const department = Department.create(departmentData);

    const taskParams = {
      id,
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

    taskRepositoryMock.setReturnForSearch(task);

    await taskDeleter.run({
      id
    });

    taskRepositoryMock.assertDeleteHaveBeenCalledWith(id);

    taskScheduler.assertRemoveHaveBeenCalled();
  });

  test('should throw an error if the task does not exists', async () => {
    taskRepositoryMock.setReturnForSearch(null);

    await expect(taskDeleter.run({
      id: new TaskId('')
    })).rejects.toThrow(TaskNotFound);

    taskScheduler.asseretRemoveNotHaveBeenCalled();
  });
});
