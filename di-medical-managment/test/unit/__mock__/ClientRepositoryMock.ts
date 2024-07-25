import { Client } from "../../../src/Contexts/Backoffice/Client/domain/Client";
import { ClientId } from "../../../src/Contexts/Backoffice/Client/domain/ClientId";
import { ClientRepository } from "../../../src/Contexts/Backoffice/Client/domain/ClientRepository";

export class ClientRepositoryMock implements ClientRepository {
  private saveMock: jest.Mock;
  private searchMock: jest.Mock;
  private updateMock: jest.Mock;
  private findAllMock: jest.Mock;
  private deleteMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
    this.searchMock = jest.fn();
    this.updateMock = jest.fn();
    this.findAllMock = jest.fn();
    this.deleteMock = jest.fn();
  }
  
  async save(client: Client): Promise<void> {
    this.saveMock(client);
  }

  async search(term: ClientId): Promise<Client | null> {
    return this.searchMock(term);
  }

  async update(client: Client): Promise<void> {
    this.updateMock(client);
  }

  findAll(): Promise<Client[]> {
    return this.findAllMock();
  }

  async delete(id: ClientId) {
    this.deleteMock(id);
  }

  assertSaveHaveBeenCalledWith(expected: Client): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSearchHaveBeenCalledWith(term: ClientId): void {
    expect(this.searchMock).toHaveBeenCalledWith(term);
  }

  assertUpdateHaveBeenCalledWith(client: Client): void {
    expect(this.updateMock).toHaveBeenCalledWith(client);
  }

  assertSearchHaveBeenCalled() {
    expect(this.findAllMock).toHaveBeenCalled();
  }

  assertDeleteHaveBeenCalled(expected: ClientId) {
    expect(this.deleteMock).toHaveBeenCalledWith(expected);
  }

  setReturnForSearch(returnValue: Client | null): void {
    this.searchMock.mockReturnValue(returnValue);
  }

  setReturnForUpdate(returnValue: void): void {
    this.updateMock.mockReturnValue(returnValue);
  }
}
