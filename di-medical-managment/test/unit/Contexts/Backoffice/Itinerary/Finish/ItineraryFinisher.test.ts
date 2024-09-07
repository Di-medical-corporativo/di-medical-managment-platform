import { ItineraryFinisher } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/Finish/ItineraryFinisher";
import { Itinerary } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Itinerary";
import { ItineraryDate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryDate";
import { ItineraryHasActivePoints } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryHasActivePoints";
import { ItineraryId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ItinerarySchedule } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySchedule";
import { ItinerarySucursal } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySucursal";
import { ParcelPoint } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { SucursalId } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalName";
import { StatusList } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { ItineraryRepositoryMock } from "../../../../__mock__/tineraryRepositoryMock";

describe('ItineraryFinisher', () => {

  let repository: ItineraryRepositoryMock;

  let itineraryFinisher: ItineraryFinisher;

  beforeEach(() => {
    repository = new ItineraryRepositoryMock();

    itineraryFinisher = new ItineraryFinisher(repository)
  });

  test('should finish a itinerary', async () => {
    const points = [
      ParcelPoint.fromPrimitives({
        certificate: '',
        client: {
          id: '',
          name: ''
        },
        comment: '',
        hasProblem: false,
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
        status: StatusList.Completed,
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

    await itineraryFinisher.run({
      id: new ItineraryId('')
    });

    repository.assertEndHaveBeenCalled();
  });

  test('should throw ItineraryHasActivePoints if has active points', async () => {
    const points = [
      ParcelPoint.fromPrimitives({
        certificate: '',
        client: {
          id: '',
          name: ''
        },
        comment: '',
        hasProblem: false,
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
        status: StatusList.Progress,
        task: {
          id: '',
          status: StatusList.Progress
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

    await expect(itineraryFinisher.run({
      id: new ItineraryId('')
    })).rejects.toThrow(ItineraryHasActivePoints);
  });
});
