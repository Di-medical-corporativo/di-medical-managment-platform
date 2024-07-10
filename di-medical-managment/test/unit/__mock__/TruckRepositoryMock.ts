import { Truck } from "../../../src/Contexts/Warehouse/Truck/domain/Truck";
import { TruckRepository } from "../../../src/Contexts/Warehouse/Truck/domain/TruckRepository";

export class TruckRepositoryMock implements TruckRepository {
  private saveMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
  }

  async save(truck: Truck): Promise<void> {
    this.saveMock(truck);    
  }

  assertSaveHaveBeenCalledWith(expected: Truck): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }
}
