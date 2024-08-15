import { TaskCreator } from "../../../../../../src/Contexts/Backoffice/Task/application/Create/TaskCreator";
import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskDescription } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskDueTo } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDueTo";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskTitle } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskTitle";
import { TaskUser } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskUser";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";

describe('TaskCreator', () => {
  let taskCreator: TaskCreator;
  
  let repository: TaskRepositoryMock;

  beforeAll(() => {
    repository = new TaskRepositoryMock();

    taskCreator = new TaskCreator(repository);
  });

  test('should create a valid task', async () => {
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

    await taskCreator.run(taskParams);

    repository.assertSaveHaveBeenCalledWith(task);
  });
});
