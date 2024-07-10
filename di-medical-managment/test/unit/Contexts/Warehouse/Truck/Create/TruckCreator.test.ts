import { TruckCreator } from "../../../../../../src/Contexts/Warehouse/Truck/application/Create/TruckCreator";
import { Truck } from "../../../../../../src/Contexts/Warehouse/Truck/domain/Truck";
import { TruckBrand } from "../../../../../../src/Contexts/Warehouse/Truck/domain/TruckBrand";
import { TruckId } from "../../../../../../src/Contexts/Warehouse/Truck/domain/TruckId";
import { TruckModel } from "../../../../../../src/Contexts/Warehouse/Truck/domain/TruckModel";
import { TruckPlate } from "../../../../../../src/Contexts/Warehouse/Truck/domain/TruckPlate";
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
