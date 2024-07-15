import { Client } from "../../../src/Contexts/Warehouse/Client/domain/Client";
import { ClientRepository } from "../../../src/Contexts/Warehouse/Client/domain/ClientRepository";

export class ClientRepositoryMock implements ClientRepository {
  private saveMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
  }
  
  async save(client: Client): Promise<void> {
    this.saveMock(client);
  }

  assertSaveHaveBeenCalledWith(expected: Client): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }
}
