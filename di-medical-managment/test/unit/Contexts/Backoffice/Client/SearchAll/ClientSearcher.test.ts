import { ClientSearcher } from "../../../../../../src/Contexts/Backoffice/Client/application/SearchAll/ClientSearcher";
import { ClientRepositoryMock } from "../../../../__mock__/ClientRepositoryMock";

describe('ClientSearcher', () => {
  let repository: ClientRepositoryMock;
  let clientSearcher: ClientSearcher;

  beforeAll(() => {
    repository = new ClientRepositoryMock();
    clientSearcher = new ClientSearcher(repository);
  })
  
  test('should get all clients', async () => {
    const clients = await clientSearcher.run();
    
    repository.assertSearchHaveBeenCalled();
  });
});
