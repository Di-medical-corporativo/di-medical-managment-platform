import { ModuleCreator } from "../../../../../src/Contexts/Shared/application/ModuleCreator";
import { Module } from "../../../../../src/Contexts/Shared/domain/Module";
import { ModuleId } from "../../../../../src/Contexts/Shared/domain/ModuleId";
import { ModuleName } from "../../../../../src/Contexts/Shared/domain/ModuleName";
import { ModuleRepository } from "../../../../../src/Contexts/Shared/domain/ModuleRepository";
import { ModuleRepositoryMock } from "../../../__mock__/ModuleRepositoryMock";

describe('ModuleCreator', () => {
  let repository: ModuleRepositoryMock;

  let moduleCreator: ModuleCreator; 

  beforeEach(() => {
    repository = new ModuleRepositoryMock();
    
    moduleCreator = new ModuleCreator(repository);
  });

  test('should create a module', async () => {
    const params = {
      id: new ModuleId(''),
      name: new ModuleName('')
    };

    const module = Module.create(params);

    await moduleCreator.run(params);

    repository.assertHaveBeenCalledSave(module);
  });
});
