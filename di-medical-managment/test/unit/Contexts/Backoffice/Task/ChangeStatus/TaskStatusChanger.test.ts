import { TaskStatusChanger } from "../../../../../../src/Contexts/Backoffice/Task/application/ChangeStatus/TaskStatusChanger";
import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskAlreadyCompleted } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskAlreadyCompleted";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { StatusList } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { TaskRepositoryMock } from "../../../../../../test/unit/__mock__/TaskRepositoryMock";
import { TaskSchedulerMock } from "../../../../../../test/unit/__mock__/TaskSchedulerMock";

describe('TaskStatusChanger', () => {
  let repository: TaskRepositoryMock;

  let taskStatusChanger: TaskStatusChanger;
  
  let taskScheduler: TaskSchedulerMock;

  beforeEach(() => {
    repository = new TaskRepositoryMock();

    taskScheduler = new TaskSchedulerMock();

    taskStatusChanger = new TaskStatusChanger(repository, taskScheduler);
  });
  
  test('should change to in-progress when task is assigned', async  () => {
    const task = Task.fromPrimitives({
      description: '',
      dueTo: new Date('2024-08-17 02:50:00').toISOString(),
      id: '',
      status: StatusList.Assigned,
      title: '',
      userAssigned: {
        firstName: '',
        id: '',
        lastName: ''
      }
    });

    repository.setReturnForSearch(task);
    
    await taskStatusChanger.run({
      id: new TaskId('')
    });

    expect(task.toPrimitives().status).toBe(StatusList.Progress);

    taskScheduler.asseretRemoveNotHaveBeenCalled();
  });

  test('should change to completed when task is in-progress', async () => {
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
      }
    });

    repository.setReturnForSearch(task);
    
    await taskStatusChanger.run({
      id: new TaskId('')
    });

    expect(task.toPrimitives().status).toBe(StatusList.Completed);
  });

  test('should throw taskAlreadyCompleted when trying to change the status of a completed task', async () => {
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
      }
    });

    repository.setReturnForSearch(task);
    
    await expect(taskStatusChanger.run({
      id: new TaskId('')
    })).rejects.toThrow(TaskAlreadyCompleted);
  });

  test('should call taskScheduler when the task changes to completed to remove from queue event', async () => {
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
      }
    });

    repository.setReturnForSearch(task);
    
    await taskStatusChanger.run({
      id: new TaskId('')
    });
    
    taskScheduler.assertRemoveHaveBeenCalled();
  });
});
