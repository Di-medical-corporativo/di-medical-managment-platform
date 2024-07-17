import { TruckIncidentAdder } from "../../../../../../src/Contexts/Backoffice/Truck/application/AddIncident/TruckIncidentAdder";
import { Incident } from "../../../../../../src/Contexts/Backoffice/Truck/domain/Incident";
import { IncidentDate } from "../../../../../../src/Contexts/Backoffice/Truck/domain/IncidentDate";
import { IncidentDescription } from "../../../../../../src/Contexts/Backoffice/Truck/domain/IncidentDescription";
import { IncidentId } from "../../../../../../src/Contexts/Backoffice/Truck/domain/IncidentId";
import { TruckId } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckId";
import { TruckNotFound } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckNotFound";
import { TruckRepositoryMock } from "../../../../__mock__/TruckRepositoryMock";

describe('Add a new incident', () => {
  let repository: TruckRepositoryMock;
  let truckIncidentAdder: TruckIncidentAdder;

  beforeAll(() => {
    repository = new TruckRepositoryMock();
    truckIncidentAdder = new TruckIncidentAdder(repository);
  });

  test('should be able to add a new incident to an existing truck', async () => {
    const incidentPlain = {
      id: new IncidentId('e3b51eb6-05ad-4a76-8497-d782d5f0aa20'),
      description: new IncidentDescription(''),
      startDate: new IncidentDate(''),
      truckId: new TruckId('fc30f0f9-0294-44c0-93e5-01a9ec2446ed')
    }
    
    const incident = Incident.create(incidentPlain);

    await truckIncidentAdder.run(incidentPlain);

    repository.assertSaveIncidentHaveWith(incident);
  });

  test('should throw truckNotFound if search a non existing truck', async () => {
    const incidentPlain = {
      id: new IncidentId('e3b51eb6-05ad-4a76-8497-d782d5f0aa20'),
      description: new IncidentDescription(''),
      startDate: new IncidentDate(''),
      truckId: new TruckId('fake-id')
    }
    
    await expect(truckIncidentAdder.run(incidentPlain))
      .rejects.toThrow(TruckNotFound);
  });
});
