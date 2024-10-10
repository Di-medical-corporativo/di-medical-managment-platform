import { ItineraryImageGenerator } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/ItineraryImage/ItineraryImageGenerator";
import { Itinerary } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Itinerary";
import { ItineraryDate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryDate";
import { ItineraryId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ItinerarySchedule } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySchedule";
import { ItinerarySucursal } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySucursal";
import { ParcelPoint } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { PointStatusList } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointStatus";
import { SucursalId } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalName";
import { StatusList } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { ImageGeneratorMock } from "../../../../__mock__/ImageGeneratorMock";
import { ItineraryRepositoryMock } from "../../../../__mock__/tineraryRepositoryMock";

describe('ItineraryImageGenerator', () => {
  let repository: ItineraryRepositoryMock;
  
  let imageGenerator: ImageGeneratorMock;

  let itineraryImageGenerator: ItineraryImageGenerator;

  beforeEach(() => {

    repository = new ItineraryRepositoryMock();

    imageGenerator = new ImageGeneratorMock();

    itineraryImageGenerator = new ItineraryImageGenerator(
      repository,
      imageGenerator
    );
  });

  test('should generate an image from itinerary', async () => {
    const points = [
      ParcelPoint.fromPrimitives({
        certificate: '',
        client: {
          id: '',
          name: ''
        },
        comment: '',
        hasProblem: true,
        id: '',
        invoice: [
          {
            id: '',
            number: ''
          }
        ],
        itineraryId: '',
        observation: '',
        ssa: '',
        status: PointStatusList.PointWithProblem,
        task: {
          id: '',
          status: StatusList.Completed
        },
         userAssigned: {
          firstName: '',
          id: '',
          lastName: ''
         }
      })
    ];

    const itinerary = Itinerary.create({
      createdAt: new ItineraryDate(''),
      id: new ItineraryId(''),
      points,
      scheduleDate: new ItinerarySchedule(''),
      sucursal: ItinerarySucursal.create({
        id: new SucursalId(''),
        name: new SucursalName('')
      })
    });

    repository.setReturnForSearch(itinerary);
    
    await itineraryImageGenerator.run({
      id: new ItineraryId('')
    });

    imageGenerator.assertGenerateHaveBeenCalled();
  });
});
