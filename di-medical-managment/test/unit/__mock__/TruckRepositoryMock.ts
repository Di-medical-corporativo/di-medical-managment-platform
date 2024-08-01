import { Incident } from "../../../src/Contexts/Backoffice/Truck/domain/Incident";
import { IncidentDate } from "../../../src/Contexts/Backoffice/Truck/domain/IncidentDate";
import { IncidentId } from "../../../src/Contexts/Backoffice/Truck/domain/IncidentId";
import { Truck } from "../../../src/Contexts/Backoffice/Truck/domain/Truck";
import { TruckId } from "../../../src/Contexts/Backoffice/Truck/domain/TruckId";
import { TruckRepository } from "../../../src/Contexts/Backoffice/Truck/domain/TruckRepository";

export class TruckRepositoryMock implements TruckRepository {
  private saveMock: jest.Mock;
  
  private searchMock: jest.Mock;
  
  private searchIncidentMock: jest.Mock;
  
  private updateMock: jest.Mock;
  
  private saveIncidentMock: jest.Mock;
  
  private removeIncidentMock: jest.Mock;

  private findAllMock: jest.Mock;

  private findAllIncidentsMock: jest.Mock;

  private truck = Truck.fromPrimities({
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "plate": "12345",
    "model": "model",
    "brand": "brand"
  });

  private incident = Incident.fromPrimitives({
    "id": "e3b51eb6-05ad-4a76-8497-d782d5f0aa20",
    "description": "test",
    "startDate": "2023-07-02T14:30:00.123Z",
    "truckId": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "isActive": true,
    "finishDate": "2023-07-02T14:30:00.123Z"
  });

  constructor() {
    this.saveMock = jest.fn();

    this.updateMock = jest.fn();

    this.findAllMock = jest.fn();

    this.findAllIncidentsMock = jest.fn();
    
    this.searchMock = jest.fn().mockImplementation((id) => {
      const trucks: Truck[] = [];

      trucks.push(this.truck);

      const foundTruck = trucks.find(truck => truck.toPrimitives().id === id);

      return foundTruck || null;
    });


    this.searchIncidentMock = jest.fn().mockImplementation((id) => {
      const incidents: Incident[] = [];

      incidents.push(this.incident);

      const foundIncident = incidents.find(incident => incident.toPrimitives().id === id.toString());

      return foundIncident || null;
    });
    
    this.saveIncidentMock = jest.fn();

    this.removeIncidentMock = jest.fn();
  }

  async findAll(): Promise<Truck[]> {
    return this.findAllMock();
  }

  findAllIncidents(truckId: TruckId): Promise<Incident[]> {
    return this.findAllIncidentsMock();
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

  async searchIncident(id: IncidentId): Promise<Incident | null> {
    return this.searchIncidentMock(id);
  }

  async removeIncident(data: { id: IncidentId; finishDate: IncidentDate; }): Promise<void> {
    this.removeIncidentMock(data);
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

  assertRemoveIncidentHaveBeenCalledWith(expected: { id: IncidentId; finishDate: IncidentDate; }) {
    expect(this.removeIncidentMock).toHaveBeenCalledWith(expected);
  }
}
