import { ItineraryReporter } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/Report/ItineraryReporter";
import { Itinerary } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Itinerary";
import { ItineraryDate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryDate";
import { ItineraryId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ItineraryNotFound } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryNotFound";
import { ItinerarySchedule } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySchedule";
import { ItinerarySucursal } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySucursal";
import { ParcelPoint } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { PointStatusList } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointStatus";
import { SucursalId } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalName";
import { StatusList } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { ItineraryRepositoryMock } from "../../../../__mock__/tineraryRepositoryMock";

describe('ItineraryReporter', () => {

  let repository: ItineraryRepositoryMock;

  let itineraryReporter: ItineraryReporter;

  beforeEach(() => {
    repository = new ItineraryRepositoryMock();

    itineraryReporter = new ItineraryReporter(repository);
  });

  test('should give the report of a finished itinerary', async () => {
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

    const report = await itineraryReporter.run({
      id: new ItineraryId('')
    });

    const { totalPoints, totalFailedPoints, totalSuccededPoints } = report.toPrimitives();
    
    expect(totalPoints).toBe(points.length);

    expect(totalFailedPoints).toBe(1);

    expect(totalSuccededPoints).toBe(0);
  });

  test('should throw ItineraryNotFound if searching for a non existing itinerary', async () => {

    repository.setReturnForSearch(null);

    await expect(itineraryReporter.run({
      id: new ItineraryId('')
    })).rejects.toThrow(ItineraryNotFound);
  });
});
