import { ClientUpdator } from "../../../../../../src/Contexts/Backoffice/Client/application/Update/ClientUpdator";
import { Client } from "../../../../../../src/Contexts/Backoffice/Client/domain/Client";
import { ClientAddress } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientAddress";
import { ClientId } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientId";
import { ClientName } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientName";
import { ClientNotFound } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientNotFound";
import { ClientRepositoryMock } from "../../../../__mock__/ClientRepositoryMock";

describe('ClientUpdator', () => {

  let repository: ClientRepositoryMock;
  let clientUpdator: ClientUpdator;

  beforeAll(() => {
    repository = new ClientRepositoryMock();

    clientUpdator = new ClientUpdator(repository);
  });

  test('should update an existing client', async () => {
    const data = {
      id: new ClientId(''),
      name: new ClientName(''),
      address: new ClientAddress('')
    }

    const client = Client.create(data);

    repository.setReturnForSearch(client);

    await clientUpdator.run(data);
    
    repository.assertUpdateHaveBeenCalledWith(client);
  });

  test('should throw a ClientNotFound if updating a non existing client', async () => {
    const data = {
      id: new ClientId(''),
      name: new ClientName(''),
      address: new ClientAddress('')
    }

    repository.setReturnForSearch(null);

    await expect(clientUpdator.run(data))
      .rejects.toThrow(ClientNotFound);
    
  });
});
