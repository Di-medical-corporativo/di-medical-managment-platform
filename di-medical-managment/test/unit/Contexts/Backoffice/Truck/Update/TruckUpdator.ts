import { TruckUpdator } from "../../../../../../src/Contexts/Backoffice/Truck/application/Update/TruckUpdator";
import { Truck } from "../../../../../../src/Contexts/Backoffice/Truck/domain/Truck";
import { TruckBrand } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckBrand";
import { TruckId } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckId";
import { TruckModel } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckModel";
import { TruckNotFound } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckNotFound";
import { TruckPlate } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckPlate";
import { TruckRepository } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckRepository";
import { TruckRepositoryMock } from "../../../../__mock__/TruckRepositoryMock";

describe('TruckUpdator', () => {
  let truckUpdator: TruckUpdator;
  let repository: TruckRepositoryMock;

  beforeAll(() => {
    repository = new TruckRepositoryMock();
    truckUpdator = new TruckUpdator(repository);
  });

  it('should update a valid truck', async () => {
    const data = {
      id: new TruckId('fc30f0f9-0294-44c0-93e5-01a9ec2446ed'),
      plate: new TruckPlate(''),
      model: new TruckModel(''),
      brand: new TruckBrand('')
    }
    
    const truck = Truck.create(data);

    await truckUpdator.run(data);

    repository.assertUpdateHaveBeenCalledWith(truck);
  });

  it('should throw if truck not found', async () => {
    const data = {
      id: new TruckId('ab30f0f9-0294-44c0-93e5-01a9ec2446ed'),
      plate: new TruckPlate(''),
      model: new TruckModel(''),
      brand: new TruckBrand('')
    }
    
    await expect(truckUpdator.run(data)).rejects.toThrow(TruckNotFound);
  });

});
