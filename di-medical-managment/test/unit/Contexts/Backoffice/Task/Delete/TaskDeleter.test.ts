import { TaskDeleter } from "../../../../../../src/Contexts/Backoffice/Task/application/Delete/TaskDeleter";
import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskDescription } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskDueTo } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDueTo";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskNotFound } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskNotFound";
import { TaskTitle } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskTitle";
import { TaskUser } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskUser";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";

describe('TaskDeleter', () => {
  let taskRepositoryMock: TaskRepositoryMock;

  let taskDeleter: TaskDeleter;
  
  beforeAll(() => {
    taskRepositoryMock = new TaskRepositoryMock();

    taskDeleter = new TaskDeleter(taskRepositoryMock);
  });

  test('should delete an existing task', async () => {
    const id = new TaskId('');
    
    const taskParams = {
      id,
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
    
    taskRepositoryMock.setReturnForSearch(task);

    await taskDeleter.run({
      id    
    });

    taskRepositoryMock.assertDeleteHaveBeenCalledWith(id);
  });

  test('should throw an error if the task does not exists', async () => {
    taskRepositoryMock.setReturnForSearch(null);

    await expect(taskDeleter.run({
      id: new TaskId('')
    })).rejects.toThrow(TaskNotFound);
  });

});
