import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskDescription } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskDueTo } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDueTo";
import { TaskFinder } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskFinder";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
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
    const taskParams = {
      id: new TaskId(''),
      title: new TaskTitle(''),
      description: new TaskDescription(''),
      userAssigned: TaskUser.create({ 
        id: new UserId(''), 
        firstName: new UserFirstName(''),
        lastName: new UserLastName('') 
      }),
      dueTo: new TaskDueTo(new Date().toISOString())
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
