import { Sucursal } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/Sucursal";
import { SucursalAddress } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalAddress";
import { SucursalId } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalName";
import { SucursalPhone } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalPhone";
import { TaskCreator } from "../../../../../../src/Contexts/Backoffice/Task/application/Create/TaskCreator";
import { Task } from "../../../../../../src/Contexts/Backoffice/Task/domain/Task";
import { TaskDescription } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDescription";
import { TaskDueTo } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskDueTo";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskTitle } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskTitle";
import { TaskUser } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskUser";
import { User } from "../../../../../../src/Contexts/Backoffice/User/domain/User";
import { UserDate } from "../../../../../../src/Contexts/Backoffice/User/domain/UserDate";
import { UserEmail } from "../../../../../../src/Contexts/Backoffice/User/domain/UserEmail";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { Role } from "../../../../../../src/Contexts/Backoffice/User/domain/UserIsAdmin";
import { UserJob } from "../../../../../../src/Contexts/Backoffice/User/domain/UserJob";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { UserNotFound } from "../../../../../../src/Contexts/Backoffice/User/domain/UserNotFound";
import { UserPhone } from "../../../../../../src/Contexts/Backoffice/User/domain/UserPhone";
import { userRole } from "../../../../../../src/Contexts/Shared/domain/roles/Roles";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";
import { TaskSchedulerMock } from "../../../../__mock__/TaskSchedulerMock";
import { UserRepositoryMock } from "../../../../__mock__/UserRepositoryMock";

describe('TaskCreator', () => {
  let taskCreator: TaskCreator;
  
  let repository: TaskRepositoryMock;

  let userRepository: UserRepositoryMock;
  
  let taskScheduler: TaskSchedulerMock;
  beforeAll(() => {
    repository = new TaskRepositoryMock();

    userRepository = new UserRepositoryMock();

    taskScheduler = new TaskSchedulerMock();

    taskCreator = new TaskCreator(repository, userRepository, taskScheduler);
  });

  test('should create a valid task with an existing user' , async () => {
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

    const user = User.create({
      createdAt: new UserDate(''),
      email: new UserEmail(''),
      firstName: new UserFirstName(''),
      id: new UserId(''),
      job: new UserJob(''),
      lastName: new UserLastName(''),
      phone: new UserPhone(''),
      role: new Role(userRole),
      sucursal: Sucursal.create({
        address: new SucursalAddress(''),
        id: new SucursalId(''),
        name: new SucursalName(''),
        phone: new SucursalPhone('')
      })
    })

    userRepository.setReturnForSearch(user);

    const task = Task.create(taskParams);

    await taskCreator.run({
      description: taskParams.description,
      dueTo: taskParams.dueTo,
      id: taskParams.id,
      title: taskParams.title,
      userId: new UserId('')
    });

    repository.assertSaveHaveBeenCalledWith(task);
  });

  test('should throw user not found with a non existing user', async () => {
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
    
    userRepository.setReturnForSearch(null);

    const task = Task.create(taskParams);

    await expect(taskCreator.run({
      description: taskParams.description,
      dueTo: taskParams.dueTo,
      id: taskParams.id,
      title: taskParams.title,
      userId: new UserId('')
    })).rejects.toThrow(UserNotFound);
  });
});
