import { ClientDeleter } from "../../../../../../src/Contexts/Backoffice/Client/application/Delete/ClientDeleter";
import { Client } from "../../../../../../src/Contexts/Backoffice/Client/domain/Client";
import { ClientAddress } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientAddress";
import { ClientId } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientId";
import { ClientName } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientName";
import { ClientNotFound } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientNotFound";
import { ClientRepositoryMock } from "../../../../__mock__/ClientRepositoryMock";

describe('ClientDeleter', () => {
  let repository: ClientRepositoryMock;  

  let clientDeleter: ClientDeleter;

  beforeAll(() => {
    repository = new ClientRepositoryMock();

    clientDeleter = new ClientDeleter(repository);
  });

  test('should delete an existing client', async () => {
    const data = {
      id: new ClientId(''),
      name: new ClientName(''),
      address: new ClientAddress('')
    }
    const client = Client.create(data);

    const id = new ClientId('');

    await clientDeleter.run({
      id
    });

    repository.setReturnForSearch(client);

    repository.assertDeleteHaveBeenCalled(id);
  });

  test('should throw client not found with a non existing client', async () => {
    const id = new ClientId('');

    repository.setReturnForSearch(null);
  
    await expect(clientDeleter.run({
      id
    })).rejects
      .toThrow(ClientNotFound);
  });

});
