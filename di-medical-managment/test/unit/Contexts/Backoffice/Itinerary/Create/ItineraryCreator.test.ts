
import { Client } from "../../../../../../src/Contexts/Backoffice/Client/domain/Client";
import { ClientAddress } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientAddress";
import { ClientId } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientId";
import { ClientName } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientName";
import { ClientNotFound } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientNotFound";
import { ItineraryCreator } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/Create/ItineraryCreator";
import { Invoice } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Invoice";
import { InvoiceId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/InvoiceId";
import { InvoiceNumber } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/InvoiceNumber";
import { ItineraryDate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryDate";
import { ItineraryId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ItinerarySchedule } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItinerarySchedule";
import { CollectPoint, Point, RoutePoint } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { PointCertificate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { PointClient } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointClient";
import { PointComment } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointComment";
import { PointId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointId";
import { PointObservation } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointObservation";
import { PointSSA } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointSSA";
import { PointStatus } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointStatus";
import { PointSurvey } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointSurvey";
import { PointTask } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointTask";
import { PointType, PointTypes } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointType";
import { PointUser } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointUser";
import { Sucursal } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/Sucursal";
import { SucursalAddress } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalAddress";
import { SucursalId } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalName";
import { SucursalPhone } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalPhone";
import { Option } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Option";
import { OptionId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/OptionId";
import { OptionOrder } from "../../../../../../src/Contexts/Backoffice/Survey/domain/OptionOrder";
import { OptionValue } from "../../../../../../src/Contexts/Backoffice/Survey/domain/OptionValue";
import { Question } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Question";
import { QuestionId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionId";
import { QuestionOrder } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionOrder";
import { QuestionText } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionText";
import { QuestionType } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionType";
import { Survey } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Survey";
import { SurveyDescription } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyDescription";
import { SurveyId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyNotFound } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyNotFound";
import { SurveyTitle } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyTitle";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { StatusList, TaskStatus } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { User } from "../../../../../../src/Contexts/Backoffice/User/domain/User";
import { UserDate } from "../../../../../../src/Contexts/Backoffice/User/domain/UserDate";
import { UserEmail } from "../../../../../../src/Contexts/Backoffice/User/domain/UserEmail";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { Role } from "../../../../../../src/Contexts/Backoffice/User/domain/UserIsAdmin";
import { UserJob } from "../../../../../../src/Contexts/Backoffice/User/domain/UserJob";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { UserNotFound } from "../../../../../../src/Contexts/Backoffice/User/domain/UserNotFound";
import { UserPhone } from "../../../../../../src/Contexts/Backoffice/User/domain/UserPhone";
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
    const points = [
      {
        clientId: new ClientId(''),
        userId: new UserId(''),
        invoices: [
          "123-123"
        ],
        comment: new PointComment(''),
        observation: new PointObservation(''),
        certificate: new PointCertificate(''),
        ssa: new PointSSA(''),
        surveyId: new SurveyId(''),
        type: new PointType(PointTypes.Collect)
      },
      {
        clientId: new ClientId(''),
        userId: new UserId(''),
        invoices: [
          "123-123"
        ],
        comment: new PointComment(''),
        observation: new PointObservation(''),
        certificate: new PointCertificate(''),
        ssa: new PointSSA(''),
        type: new PointType(PointTypes.Parcel)
      }
    ];

    const sucursal = Sucursal.create({
      id: new SucursalId(''),
      address: new SucursalAddress(''),
      name: new SucursalName(''),
      phone: new SucursalPhone('')
    });

    sucursalRepository.setReturnForSearch(sucursal);

    const user = User.create({
      createdAt: new UserDate(''),
      email: new UserEmail(''),
      firstName: new UserFirstName(''),
      id: new UserId(''),
      job: new UserJob(''),
      lastName: new UserLastName(''),
      phone: new UserPhone(''),
      role: new Role(''),
      sucursal
    });

    userRepository.setReturnForSearch(user);

    const client = Client.create({
      id: new ClientId(''),
      name: new ClientName(''),
      address: new ClientAddress('')
    });

    clientRepository.setReturnForSearch(client);

    const dataQuestion =  { 
      id: new QuestionId(''), 
      text: new QuestionText(''), 
      order: new QuestionOrder(1), 
      type: new QuestionType(''), 
      options: [Option.create({ id: new OptionId(''), order: new OptionOrder(1), value: new OptionValue('') })] 
    }
    
    const question = Question.create(dataQuestion);

    const data = {
      id: new SurveyId(''),
      title: new SurveyTitle(''),
      description: new SurveyDescription(''),
      questions: [question]
    };

    const survey = Survey.create(data);

    surveyRepository.setReturnForSearch(survey);
    
    await itineraryCreator.run({
      createdAt: new ItineraryDate(''),
      points,
      scheduleDate: new ItinerarySchedule(new Date().toISOString()),
      sucursal: new SucursalId('') 
    });

    repository.assertSaveHaveBeenCalled();
  });

  test('should throw clientNotfound if the client assigned to point cannot be found', async () => {
    const points = [
      {
        clientId: new ClientId(''),
        userId: new UserId(''),
        invoices: [
          "123-123"
        ],
        comment: new PointComment(''),
        observation: new PointObservation(''),
        certificate: new PointCertificate(''),
        ssa: new PointSSA(''),
        surveyId: new SurveyId(''),
        type: new PointType(PointTypes.Collect)
      }
    ];

    const sucursal = Sucursal.create({
      id: new SucursalId(''),
      address: new SucursalAddress(''),
      name: new SucursalName(''),
      phone: new SucursalPhone('')
    });

    sucursalRepository.setReturnForSearch(sucursal);

    const user = User.create({
      createdAt: new UserDate(''),
      email: new UserEmail(''),
      firstName: new UserFirstName(''),
      id: new UserId(''),
      job: new UserJob(''),
      lastName: new UserLastName(''),
      phone: new UserPhone(''),
      role: new Role(''),
      sucursal
    });

    userRepository.setReturnForSearch(user);

    clientRepository.setReturnForSearch(null);

    const dataQuestion =  { 
      id: new QuestionId(''), 
      text: new QuestionText(''), 
      order: new QuestionOrder(1), 
      type: new QuestionType(''), 
      options: [Option.create({ id: new OptionId(''), order: new OptionOrder(1), value: new OptionValue('') })] 
    }
    
    const question = Question.create(dataQuestion);

    const data = {
      id: new SurveyId(''),
      title: new SurveyTitle(''),
      description: new SurveyDescription(''),
      questions: [question]
    };

    const survey = Survey.create(data);

    surveyRepository.setReturnForSearch(survey);
    
    const pointsForTest = [
      CollectPoint.create({
        comment: new PointComment(''),
        observation: new PointObservation(''),
        certificate: new PointCertificate(''),
        ssa: new PointSSA(''),
        status: new PointStatus(StatusList.Assigned),
        client: PointClient.create({ id: new ClientId(''), name: new ClientName('') }),
        id: new PointId(''),
        invoice: [ Invoice.create({ id: new InvoiceId(''), number: new InvoiceNumber('') }) ],
        itineraryId: new ItineraryId(''),
        survey: PointSurvey.create({ id: new SurveyId(''), title: new SurveyTitle('') }),
        task: PointTask.create({ id: new TaskId(''), status: new TaskStatus(StatusList.Assigned) }),
        userAssigned: PointUser.create({ firstName: new UserFirstName(''), lastName: new UserLastName(''), id: new UserId('__mock__') })
      })
    ]

    await expect(itineraryCreator.run({
      createdAt: new ItineraryDate(''),
      points,
      scheduleDate: new ItinerarySchedule(''),
      sucursal: new SucursalId('') 
    })).rejects.toThrow(ClientNotFound);
  });

  test('should throw userNotFound if the user assigned to point cannot be found', async () => {
    const points = [
      {
        clientId: new ClientId(''),
        userId: new UserId(''),
        invoices: [
          "123-123"
        ],
        comment: new PointComment(''),
        observation: new PointObservation(''),
        certificate: new PointCertificate(''),
        ssa: new PointSSA(''),
        surveyId: new SurveyId(''),
        type: new PointType(PointTypes.Collect)
      }
    ];

    const sucursal = Sucursal.create({
      id: new SucursalId(''),
      address: new SucursalAddress(''),
      name: new SucursalName(''),
      phone: new SucursalPhone('')
    });

    sucursalRepository.setReturnForSearch(sucursal);

    userRepository.setReturnForSearch(null);

    const client = Client.create({
      id: new ClientId(''),
      name: new ClientName(''),
      address: new ClientAddress('')
    });

    clientRepository.setReturnForSearch(client);

    const dataQuestion =  { 
      id: new QuestionId(''), 
      text: new QuestionText(''), 
      order: new QuestionOrder(1), 
      type: new QuestionType(''), 
      options: [Option.create({ id: new OptionId(''), order: new OptionOrder(1), value: new OptionValue('') })] 
    }
    
    const question = Question.create(dataQuestion);

    const data = {
      id: new SurveyId(''),
      title: new SurveyTitle(''),
      description: new SurveyDescription(''),
      questions: [question]
    };

    const survey = Survey.create(data);

    surveyRepository.setReturnForSearch(survey);
    
    const pointsForTest = [
      CollectPoint.create({
        comment: new PointComment(''),
        observation: new PointObservation(''),
        certificate: new PointCertificate(''),
        ssa: new PointSSA(''),
        status: new PointStatus(StatusList.Assigned),
        client: PointClient.create({ id: new ClientId(''), name: new ClientName('') }),
        id: new PointId(''),
        invoice: [ Invoice.create({ id: new InvoiceId(''), number: new InvoiceNumber('') }) ],
        itineraryId: new ItineraryId(''),
        survey: PointSurvey.create({ id: new SurveyId(''), title: new SurveyTitle('') }),
        task: PointTask.create({ id: new TaskId(''), status: new TaskStatus(StatusList.Assigned) }),
        userAssigned: PointUser.create({ firstName: new UserFirstName(''), lastName: new UserLastName(''), id: new UserId('__mock__') })
      })
    ]

    await expect(itineraryCreator.run({
      createdAt: new ItineraryDate(''),
      points,
      scheduleDate: new ItinerarySchedule(new Date().toISOString()),
      sucursal: new SucursalId('') 
    })).rejects.toThrow(UserNotFound);
  });

  test('should throw surveyNotFound if the survey assigned to point cannot be found', async () => {
    const points = [
      {
        clientId: new ClientId(''),
        userId: new UserId(''),
        invoices: [
          "123-123"
        ],
        comment: new PointComment(''),
        observation: new PointObservation(''),
        certificate: new PointCertificate(''),
        ssa: new PointSSA(''),
        surveyId: new SurveyId(''),
        type: new PointType(PointTypes.Collect)
      },
      {
        clientId: new ClientId(''),
        userId: new UserId(''),
        invoices: [
          "123-123"
        ],
        comment: new PointComment(''),
        observation: new PointObservation(''),
        certificate: new PointCertificate(''),
        ssa: new PointSSA(''),
        type: new PointType(PointTypes.Parcel)
      }
    ];

    const sucursal = Sucursal.create({
      id: new SucursalId(''),
      address: new SucursalAddress(''),
      name: new SucursalName(''),
      phone: new SucursalPhone('')
    });

    sucursalRepository.setReturnForSearch(sucursal);

    const user = User.create({
      createdAt: new UserDate(''),
      email: new UserEmail(''),
      firstName: new UserFirstName(''),
      id: new UserId(''),
      job: new UserJob(''),
      lastName: new UserLastName(''),
      phone: new UserPhone(''),
      role: new Role(''),
      sucursal
    });

    userRepository.setReturnForSearch(user);

    const client = Client.create({
      id: new ClientId(''),
      name: new ClientName(''),
      address: new ClientAddress('')
    });

    clientRepository.setReturnForSearch(client);

    surveyRepository.setReturnForSearch(null);
    
    await expect(itineraryCreator.run({
      createdAt: new ItineraryDate(''),
      points,
      scheduleDate: new ItinerarySchedule(new Date().toISOString()),
      sucursal: new SucursalId('') 
    })).rejects.toThrow(SurveyNotFound);

  });
});
