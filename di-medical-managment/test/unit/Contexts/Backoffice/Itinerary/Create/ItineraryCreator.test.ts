import { ClientId } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientId";
import { ClientName } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientName";
import { ItineraryCreator } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/Create/ItineraryCreator";
import { Invoice } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Invoice";
import { InvoiceId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/InvoiceId";
import { InvoiceNumber } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/InvoiceNumber";
import { Itinerary } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Itinerary";
import { ItineraryDate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryDate";
import { ItineraryId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ItinerarySchedule } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySchedule";
import { ItinerarySucursal } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySucursal";
import { Point, RoutePoint } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { PointCertificate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { PointClient } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointClient";
import { PointComment } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointComment";
import { PointId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointId";
import { PointObservation } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointObservation";
import { PointSSA } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointSSA";
import { PointStatus } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointStatus";
import { PointSurvey } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointSurvey";
import { PointTask } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointTask";
import { PointUser } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointUser";
import { Sucursal } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/Sucursal";
import { SucursalAddress } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalAddress";
import { SucursalId } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalName";
import { SucursalPhone } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalPhone";
import { SurveyId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyTitle } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyTitle";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskStatus } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { ClientRepositoryMock } from "../../../../__mock__/ClientRepositoryMock";
import { SucursalRepositoryMock } from "../../../../__mock__/SucursalRepositoryMock";
import { SurveyRepositoryMock } from "../../../../__mock__/SurveyRepositoryMock";
import { TaskRepositoryMock } from "../../../../__mock__/TaskRepositoryMock";
import { TaskSchedulerMock } from "../../../../__mock__/TaskSchedulerMock";
import { ItineraryRepositoryMock } from "../../../../__mock__/tineraryRepositoryMock";
import { UserRepositoryMock } from "../../../../__mock__/UserRepositoryMock";

describe("ItineraryCreator", () => {
  
  let repository: ItineraryRepositoryMock;
  
  let sucursalRepository: SucursalRepositoryMock;

  let clientRepository: ClientRepositoryMock;

  let userRepository: UserRepositoryMock;
  
  let taskRepository: TaskRepositoryMock;

  let taskScheduler: TaskSchedulerMock;

  let itineraryCreator: ItineraryCreator;

  let surveyRepository: SurveyRepositoryMock;

  beforeEach(() => {
    repository = new ItineraryRepositoryMock();

    sucursalRepository = new SucursalRepositoryMock();

    clientRepository = new ClientRepositoryMock();

    userRepository = new UserRepositoryMock();

    taskRepository = new TaskRepositoryMock();

    taskScheduler = new TaskSchedulerMock();

    surveyRepository = new SurveyRepositoryMock();

    itineraryCreator = new ItineraryCreator(
      repository,
      sucursalRepository,
      clientRepository,
      userRepository,
      taskRepository,
      taskScheduler,
      surveyRepository
    );
  });
  
  test('should create a valid itinerary', async () => {
    const points: Point[] = [
      RoutePoint.create({
        id: new PointId(''),
        itineraryId: new ItineraryId(''),
        client: PointClient.create({ id: new ClientId(''), name: new ClientName('') }),
        userAssigned: PointUser.create({ id: new UserId(''), firstName: new UserFirstName(''), lastName: new UserLastName('') }),
        invoice: [
          Invoice.create({ id: new InvoiceId(''), number: new InvoiceNumber('') })
        ],
        comment: new PointComment(''),
        observation: new PointObservation(''),
        certificate: new PointCertificate(''),
        ssa: new PointSSA(''),
        status: new PointStatus(''),
        task: PointTask.create({ id: new TaskId(''), status: new TaskStatus('') }),
        survey: PointSurvey.create({ id: new SurveyId(''), title: new SurveyTitle('') })
      })
    ];

    const sucursal = Sucursal.create({
      id: new SucursalId(''),
      address: new SucursalAddress(''),
      name: new SucursalName(''),
      phone: new SucursalPhone('')
    });

    sucursalRepository.setReturnForSearch(sucursal);

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

    await itineraryCreator.run({
      createdAt: new ItineraryDate(''),
      id: new ItineraryId(''),
      points,
      scheduleDate: new ItinerarySchedule(''),
      sucursal: new SucursalId('') 
    });

    repository.assertSaveHaveBeenCalledWith(itinerary);
  });
});
