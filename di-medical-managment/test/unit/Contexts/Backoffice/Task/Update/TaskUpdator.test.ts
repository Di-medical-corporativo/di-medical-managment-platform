import { TaskUpdator } from "../../../../../../src/Contexts/Backoffice/Task/application/Update/TaskUpdator";
import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskDescription } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskDueTo } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDueTo";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { StatusList } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { TaskTitle } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskTitle";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";
import { TaskSchedulerMock } from "../../../../__mock__/TaskSchedulerMock";

describe('TaskUpdator', () => {
  let repository: TaskRepositoryMock;

  let taskUpdator: TaskUpdator;

  let taskScheduler: TaskSchedulerMock;
  
  beforeEach(() => {
    repository = new TaskRepositoryMock();

    taskScheduler = new TaskSchedulerMock();

    taskUpdator = new TaskUpdator(repository, taskScheduler);
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
      },
      isPoint: false
    });

    repository.setReturnForSearch(task);

    const id = new TaskId('')

    const now = new Date('2050-12-18T02:50:00Z');

    const formattedDate = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    await taskUpdator.run({
      id,
      description: new TaskDescription(''),
      dueTo: new TaskDueTo(formattedDate),
      title: new TaskTitle('')
    });

    const plainTask = task.toPrimitives();

    expect(plainTask.dueTo).toBe(formattedDate);

    expect(plainTask.status).toBe(StatusList.Progress);
  });

  test('should reschedule a task when they give more time to complete it (Assigned)', async () => {
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
      },
      isPoint: false
    });

    repository.setReturnForSearch(task);

    const id = new TaskId('')

    const now = new Date('2050-12-18T02:50:00Z');

    const formattedDate = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    await taskUpdator.run({
      id,
      description: new TaskDescription(''),
      dueTo: new TaskDueTo(formattedDate),
      title: new TaskTitle('')
    });

    taskScheduler.assertReschedulerHaveBeenCalled();  
  });

  test('should reschedule a task when they give more time to complete it (In-progres)', async () => {
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
      isPoint: false
    });

    repository.setReturnForSearch(task);

    const id = new TaskId('')

    const now = new Date('2050-12-18T02:50:00Z');

    const formattedDate = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    await taskUpdator.run({
      id,
      description: new TaskDescription(''),
      dueTo: new TaskDueTo(formattedDate),
      title: new TaskTitle('')
    });

    taskScheduler.assertReschedulerHaveBeenCalled();  
  });

  test('should reschedule a task when they give more time to complete it (completed)', async () => {
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
      isPoint: false
    });

    repository.setReturnForSearch(task);

    const id = new TaskId('')

    const now = new Date('2050-12-18T02:50:00Z');

    const formattedDate = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    await taskUpdator.run({
      id,
      description: new TaskDescription(''),
      dueTo: new TaskDueTo(formattedDate),
      title: new TaskTitle('')
    });

    taskScheduler.assertReschedulerHaveBeenCalled();  
  });

  test('should not reschedule if when updating the new dueTo date is before the assigned', async () => {
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
      isPoint: false
    });

    repository.setReturnForSearch(task);

    const id = new TaskId('')

    const now = new Date('2023-12-13T02:50:00Z');

    const formattedDate = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    await taskUpdator.run({
      id,
      description: new TaskDescription(''),
      dueTo: new TaskDueTo(formattedDate),
      title: new TaskTitle('')
    });

    taskScheduler.assertRescheduleNotHaveBeenCalled();  
  });

});
