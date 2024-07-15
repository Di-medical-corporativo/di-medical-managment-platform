import { ClientCreator } from "../../../../../../src/Contexts/Warehouse/Client/application/Create/ClientCreator";
import { Client } from "../../../../../../src/Contexts/Warehouse/Client/domain/Client";
import { ClientAddress } from "../../../../../../src/Contexts/Warehouse/Client/domain/ClientAddress";
import { ClientId } from "../../../../../../src/Contexts/Warehouse/Client/domain/ClientId";
import { ClientIsActive } from "../../../../../../src/Contexts/Warehouse/Client/domain/ClientIsActive";
import { ClientName } from "../../../../../../src/Contexts/Warehouse/Client/domain/ClientName";
import { ClientRepositoryMock } from "../../../../__mock__/ClientRepositoryMock";

describe("ClientCreator", () => {
  
  let repository: ClientRepositoryMock;
  let clientCreator: ClientCreator

  beforeEach(() => {
    repository = new ClientRepositoryMock();

    clientCreator = new ClientCreator(repository);
  });
  
  test('should create a valid client', async () => {
    const data = {
      id: new ClientId(''),
      name: new ClientName(''),
      address: new ClientAddress('')
    }
    const client = Client.create(data);

    await clientCreator.run(data);

    repository.assertSaveHaveBeenCalledWith(client);
  });
});
