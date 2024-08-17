import { TaskUpdator } from "../../../../../../src/Contexts/Backoffice/Task/application/Update/TaskUpdator";
import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskDescription } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskDueTo } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDueTo";
import { TaskFinder } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskFinder";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskNotFound } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskNotFound";
import { StatusList } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { TaskTitle } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskTitle";
import { TaskUser } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskUser";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";

describe('TaskUpdator', () => {
  let repository: TaskRepositoryMock;

  let taskUpdator: TaskUpdator;
  
  beforeAll(() => {
    repository = new TaskRepositoryMock();

    taskUpdator = new TaskUpdator(repository);
  });

  test('with an overdue task and giving more time to do it, should update the date and status to in-progress', async () => {
    const task = Task.fromPrimitives({
      description: '',
      dueTo: new Date('2024-08-17 02:50:00').toISOString(),
      id: '',
      status: StatusList.PastDue,
      title: '',
      userAssigned: {
        firstName: '',
        id: '',
        lastName: ''
      }
    });

    repository.setReturnForSearch(task);

    const id = new TaskId('')

    const newDate = new Date('2024-08-18 02:50:00').toISOString();
    await taskUpdator.run({
      id,
      description: new TaskDescription(''),
      dueTo: new TaskDueTo(newDate),
      title: new TaskTitle('')
    });

    const plainTask = task.toPrimitives();

    expect(plainTask.dueTo).toBe(newDate.toString());

    expect(plainTask.status).toBe(StatusList.Progress);
  });
});
