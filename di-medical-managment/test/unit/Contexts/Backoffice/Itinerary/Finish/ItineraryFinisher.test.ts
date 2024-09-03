import { ClientId } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientId";
import { ItineraryFinisher } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/Finish/ItineraryFinisher";
import { Itinerary } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Itinerary";
import { ItineraryDate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryDate";
import { ItineraryId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ItinerarySchedule } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySchedule";
import { ItinerarySucursal } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySucursal";
import { ParcelPoint, RoutePoint } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { PointCertificate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { PointClient } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointClient";
import { PointComment } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointComment";
import { PointObservation } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointObservation";
import { PointSSA } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointSSA";
import { PointType, PointTypes } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointType";
import { SucursalId } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalName";
import { SurveyId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyId";
import { StatusList } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { ItineraryRepositoryMock } from "../../../../__mock__/tineraryRepositoryMock";

describe('ItineraryFinisher', () => {

  let repository: ItineraryRepositoryMock;

  let itineraryFinisher: ItineraryFinisher;

  beforeEach(() => {
    repository = new ItineraryRepositoryMock();

    itineraryFinisher = new ItineraryFinisher(repository);

  });

  test('should end a itinerary', async () => {
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

    await itineraryFinisher.run({
      id: new ItineraryId('')
    });

    repository.assertEndHaveBeenCalled();
  });
});
