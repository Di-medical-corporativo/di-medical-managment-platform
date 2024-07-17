import { TruckIncidentRemover } from "../../../../../../src/Contexts/Backoffice/Truck/application/RemoveIncident/TruckIncidentRemover";
import { IncidentDate } from "../../../../../../src/Contexts/Backoffice/Truck/domain/IncidentDate";
import { IncidentId } from "../../../../../../src/Contexts/Backoffice/Truck/domain/IncidentId";
import { TruckRepositoryMock } from "../../../../__mock__/TruckRepositoryMock";

describe('TruckIncidentRemover', () => {

  let repository: TruckRepositoryMock;
  
  let truckIncidentRemover: TruckIncidentRemover;

  beforeAll(() => {
    repository = new TruckRepositoryMock();

    truckIncidentRemover = new TruckIncidentRemover(repository);
  });

  test('should remove an existing incident', async () => {
    const data = {
      id: new IncidentId('e3b51eb6-05ad-4a76-8497-d782d5f0aa20'),
      finishDate: new IncidentDate('2023-07-02 14:30:00.123')
    }

    await truckIncidentRemover.run(data);

    repository.assertRemoveIncidentHaveBeenCalledWith(data);
  });
});
