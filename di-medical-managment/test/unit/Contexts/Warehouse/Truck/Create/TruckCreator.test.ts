import { TruckCreator } from "../../../../../../src/Contexts/Backoffice/Truck/application/Create/TruckCreator";
import { Truck } from "../../../../../../src/Contexts/Backoffice/Truck/domain/Truck";
import { TruckBrand } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckBrand";
import { TruckId } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckId";
import { TruckModel } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckModel";
import { TruckPlate } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckPlate";
import { TruckRepositoryMock } from "../../../../__mock__/TruckRepositoryMock";

describe('TrukCreator', () => {
  let truckCreator: TruckCreator;
  let repository: TruckRepositoryMock;

  beforeAll(() => {
    repository = new TruckRepositoryMock();
    truckCreator = new TruckCreator(repository);
  });

  it('should create a valid truck', async () => {
    
    const data = {
      id: new TruckId(''),
      plate: new TruckPlate(''),
      model: new TruckModel(''),
      brand: new TruckBrand('')
    }

    const truck = Truck.create(data)

    await truckCreator.run(data);
    
    repository.assertSaveHaveBeenCalledWith(truck);
  });
});
