import { Sucursal } from "../../../src/Contexts/Backoffice/Sucursal/domain/Sucursal";
import { SucursalId } from "../../../src/Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalRepository } from "../../../src/Contexts/Backoffice/Sucursal/domain/SucursalRepository";

export class SucursalRepositoryMock implements SucursalRepository {
  private findAllMock: jest.Mock;

  private saveMock: jest.Mock;

  private searchMock: jest.Mock;

  private updateMock: jest.Mock;
  
  constructor() {
    this.findAllMock = jest.fn();

    this.saveMock = jest.fn();

    this.searchMock = jest.fn();

    this.updateMock = jest.fn();
  }
  
  async findAll(): Promise<Sucursal[]> {
    return this.findAllMock();
  }

  async save(sucursal: Sucursal): Promise<void> {
    this.saveMock(sucursal);
  }

  async search(id: SucursalId): Promise<Sucursal | null> {
    return this.searchMock(id);
  }

  async update(sucursal: Sucursal): Promise<void> {
    this.updateMock(sucursal);
  }

  setReturnForSearch(sucursal: Sucursal | null) {
    this.searchMock.mockReturnValue(sucursal);
  }
}
