import { Incident } from "../../../src/Contexts/Warehouse/Truck/domain/Incident";
import { Truck } from "../../../src/Contexts/Warehouse/Truck/domain/Truck";
import { TruckRepository } from "../../../src/Contexts/Warehouse/Truck/domain/TruckRepository";

export class TruckRepositoryMock implements TruckRepository {
  private saveMock: jest.Mock;
  private searchMock: jest.Mock;
  private updateMock: jest.Mock;
  private saveIncidentMock: jest.Mock;

  private truck = Truck.fromPrimities({
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "plate": "12345",
    "model": "model",
    "brand": "brand"
  });

  constructor() {
    this.saveMock = jest.fn();

    this.updateMock = jest.fn();
    
    this.searchMock = jest.fn().mockImplementation((id) => {
      const trucks: Truck[] = [];

      trucks.push(this.truck);

      const foundTruck = trucks.find(truck => truck.toPrimitives().id === id);

      return foundTruck || null;
    });
    
    this.saveIncidentMock = jest.fn();
  }

  async save(truck: Truck): Promise<void> {
    this.saveMock(truck);    
  }

  async search(term: string): Promise<Truck | null> {
    return this.searchMock(term);
  }

  async update(truck: Truck): Promise<void> {
    this.updateMock(truck);
  }

  async saveIncident(incident: Incident): Promise<void> {
    this.saveIncidentMock(incident);
  }

  assertSaveHaveBeenCalledWith(expected: Truck): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertUpdateHaveBeenCalledWith(expected: Truck): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSearchHaveBeenCalledWith(expected: string): void {
    expect(this.searchMock).toHaveBeenCalledWith(expected);
  }

  assertSearchReturnTruck(): void {
    expect(this.searchMock).toHaveReturnedWith(this.truck);
  }

  assertSaveIncidentHaveWith(expected: Incident) {
    expect(this.saveIncidentMock).toHaveBeenCalledWith(expected);
  }
}
