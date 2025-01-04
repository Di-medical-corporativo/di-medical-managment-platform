import { TaskTimeOutProcessor } from "../../../../../../src/Contexts/Backoffice/Task/application/TimeOut/TaskTimeOutProcessor";
import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { StatusList } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";

describe('TaskTimeOutProcessor', () => {
  let repository: TaskRepositoryMock;

  let taskTimeOutProcessor: TaskTimeOutProcessor;

  beforeEach(() => {
    repository = new TaskRepositoryMock();

    taskTimeOutProcessor = new TaskTimeOutProcessor(repository);

    jest.clearAllMocks();
  });
  
  test('should update status to overdue only if the task is not done yet', async () => {
    const task = Task.fromPrimitives({
      description: '',
      dueTo: new Date('2024-08-17 02:50:00').toISOString(),
      id: '',
      status: StatusList.Progress,
      title: '',
      userAssigned: {
        firstName: '',
        id: '',
        lastName: ''
      },
      isPoint: false,
      department: {
        id: '',
        name: ''
      }
    });

    repository.setReturnForSearch(task);

    await taskTimeOutProcessor.run({
      id: new TaskId('')
    });

    repository.assertTimeOutHaveBeenCalled();
  });

  test('should not update the status of the task if the task is completed', async () => {
    const task = Task.fromPrimitives({
      description: '',
      dueTo: new Date('2024-08-17 02:50:00').toISOString(),
      id: '',
      status: StatusList.Completed,
      title: '',
      userAssigned: {
        firstName: '',
        id: '',
        lastName: ''
      },
      isPoint: false,
      department: {
        id: '',
        name: ''
      }
    });

    repository.setReturnForSearch(task);
  
    await taskTimeOutProcessor.run({
      id: new TaskId('')
    });

    repository.assertTimeOutNotCalled();
  });
});
