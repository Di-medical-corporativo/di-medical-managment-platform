import { Truck } from "../../../../../../src/Contexts/Backoffice/Truck/domain/Truck";
import { TruckFinder } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckFinder";
import { TruckId } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckId";
import { TruckNotFound } from "../../../../../../src/Contexts/Backoffice/Truck/domain/TruckNotFound";
import { TruckRepositoryMock } from "../../../../__mock__/TruckRepositoryMock";

describe('TruckFinder', () => {
  let truckFinder: TruckFinder;

  let repository: TruckRepositoryMock;

  beforeAll(() => {
    repository = new TruckRepositoryMock();
  
    truckFinder = new TruckFinder(repository);
  });


  it('should return a truck if one is found', async () => {
    const truckExpected = Truck.fromPrimities({
      "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
      "plate": "12345",
      "model": "model",
      "brand": "brand"
    });


    const id = "fc30f0f9-0294-44c0-93e5-01a9ec2446ed";

    const truck = await truckFinder.run({ id: new TruckId("fc30f0f9-0294-44c0-93e5-01a9ec2446ed") });

    repository.assertSearchHaveBeenCalledWith(id);
  
    repository.assertSearchReturnTruck();
  
    expect(truck).toEqual(truckExpected);
  });

    
  it('should throw TruckNotFound if search a non existing truck', async () => {
    const id = "ab30f0f9-0294-44c0-93e5-01a9ec2446ed";
    
    await expect(truckFinder.run({ id: new TruckId(id) }))
      .rejects.toThrow(TruckNotFound);
  });

});
