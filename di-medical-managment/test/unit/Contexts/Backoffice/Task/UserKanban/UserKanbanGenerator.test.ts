import { UserKanbanGenerator } from "../../../../../../src/Contexts/Backoffice/Task/application/UserKanban/UserKanbanGenerator";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";

describe('UserKanbanGenerator', () => {
  let repository: TaskRepositoryMock;

  let userKanbanGenerator: UserKanbanGenerator;

  beforeEach(() => {
    repository = new TaskRepositoryMock();

    userKanbanGenerator = new UserKanbanGenerator(repository);
  });

  test('should get the kanban of an specific user', async () => {
    repository.setReturnValueForKanban();
    
    await userKanbanGenerator.run({
      id: new UserId('')
    });

    repository.assertKanbanHaveBeenCalled();
  });
});
