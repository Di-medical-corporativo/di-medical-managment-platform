import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryRepository } from "../../domain/ItineraryRepository";
import { ItineraryDate } from "../../domain/ItineraryDate";
import { ItinerarySchedule } from "../../domain/ItinerarySchedule";
import { CollectPoint, ParcelPoint, Point, RoutePoint } from "../../domain/Point";
import { SucursalRepository } from "../../../Sucursal/domain/SucursalRepository";
import { SucursalId } from "../../../Sucursal/domain/SucursalId";
import { SucursalFinder } from "../../../Sucursal/domain/SucursalFinder";
import { SurveyId } from "../../../Survey/domain/SurveyId";
import { PointType, PointTypes } from "../../domain/PointType";
import { TaskId } from "../../../Task/domain/TaskId";
import { PointStatus } from "../../domain/PointStatus";
import { PointSSA } from "../../domain/PointSSA";
import { PointId } from "../../domain/PointId";
import { PointCertificate } from "../../domain/PointCertificate";
import { PointClient } from "../../domain/PointClient";
import { ClientId } from "../../../Client/domain/ClientId";
import { ClientName } from "../../../Client/domain/ClientName";
import { PointComment } from "../../domain/PointComment";
import { Invoice } from "../../domain/Invoice";
import { InvoiceId } from "../../domain/InvoiceId";
import { InvoiceNumber } from "../../domain/InvoiceNumber";
import { PointObservation } from "../../domain/PointObservation";
import { UserId } from "../../../User/domain/UserId";
import { PointSurvey } from "../../domain/PointSurvey";
import { SurveyTitle } from "../../../Survey/domain/SurveyTitle";
import { PointTask } from "../../domain/PointTask";
import { StatusList, TaskStatus } from "../../../Task/domain/TaskStatus";
import { UserFirstName } from "../../../User/domain/UserFirstName";
import { UserLastName } from "../../../User/domain/UserLastName";
import { PointUser } from "../../domain/PointUser";
import { v4 as uuid } from "uuid";
import { ClientRepository } from "../../../Client/domain/ClientRepository";
import { ClientFinder } from "../../../Client/domain/ClientFinder";
import { UserFinder } from "../../../User/domain/UserFinder";
import { UserRepository } from "../../../User/domain/UserRepository";
import { TaskRepository } from "../../../Task/domain/TaskRepository";
import { TaskCreator } from "../../../Task/application/Create/TaskCreator";
import { TaskScheduler } from "../../../Task/domain/TaskScheduler";
import { TaskDescription } from "../../../Task/domain/TaskDescription";
import { TaskDueTo } from "../../../Task/domain/TaskDueTo";
import { TaskTitle } from "../../../Task/domain/TaskTitle";
import { SurveyFinder } from "../../../Survey/domain/SurveyFinder";
import { SurveyRepository } from "../../../Survey/domain/SurveyRepository";


export class ItineraryCreator {
  private sucursalFinder: SucursalFinder;

  private clientFinder: ClientFinder;

  private userFinder: UserFinder;

  private taskCreator: TaskCreator;
  
  private surveyFinder: SurveyFinder;

  constructor(
    private repository: ItineraryRepository,
    private sucursalRepository: SucursalRepository,
    private clientRepository: ClientRepository,
    private userRepository: UserRepository,
    private taskRepository: TaskRepository,
    private taskScheduler: TaskScheduler,
    private surveyRepository: SurveyRepository
  ) {
    this.sucursalFinder = new SucursalFinder(sucursalRepository);
  
    this.clientFinder = new ClientFinder(clientRepository);
  
    this.userFinder = new UserFinder(userRepository);
  
    this.taskCreator = new TaskCreator(taskRepository, userRepository, taskScheduler);
    
    this.surveyFinder = new SurveyFinder(surveyRepository);
  }

  async run(params: {
    sucursal: SucursalId,
    points: {
      clientId: ClientId;
      userId: UserId;
      invoices: string[],
      comment: PointComment;
      observation: PointObservation;
      certificate: PointCertificate;
      ssa: PointSSA;
      status: PointStatus;
      taskId: TaskId;
      type: PointType;
      surveyId?: SurveyId;
    }[],
    createdAt: ItineraryDate,
    scheduleDate: ItinerarySchedule    
  }) {
    const itineraryId = new ItineraryId(uuid());

    const pointsPromises = params.points.map(async (point) => {
      const client = await this.clientFinder.run({
        id: point.clientId
      });

      const user = await this.userFinder.run(point.userId.toString());

      const { firstName, lastName, id: userId } = user.toPrimitives();

      const { id, name } = client.toPrimitives();

      const task = {
        id: new TaskId(uuid()),
        description: new TaskDescription(''),
        dueTo: new TaskDueTo(''),
        userId: point.userId,
        title: new TaskTitle('')
      }

      await this.taskCreator.run(task);

      if(point.type.isCollect()) {
        return CollectPoint.create({
          id: new PointId(uuid()),
          certificate: point.certificate,
          client: PointClient.create({ id: new ClientId(id), name: new ClientName(name) }),
          comment: point.comment,
          invoice: point.invoices.map((inv: string) => Invoice.create({ id: new InvoiceId(uuid()), number: new InvoiceNumber(inv) })),
          itineraryId,
          observation: point.observation,
          ssa: point.ssa,
          status: point.status,
          survey: PointSurvey.create({ id: new SurveyId(''), title: new SurveyTitle('') }),
          task: PointTask.create({ id: task.id, status: new TaskStatus(StatusList.Assigned)}),
          userAssigned: PointUser.create({ firstName: new UserFirstName(firstName), id: new UserId(userId), lastName: new UserLastName(lastName) })
        });
      } else if(point.type.isRoute()) {
        return RoutePoint.create({
          id: new PointId(uuid()),
          certificate: point.certificate,
          client: PointClient.create({ id: new ClientId(id), name: new ClientName(name) }),
          comment: point.comment,
          invoice: point.invoices.map((inv: string) => Invoice.create({ id: new InvoiceId(uuid()), number: new InvoiceNumber(inv) })),
          itineraryId,
          observation: point.observation,
          ssa: point.ssa,
          status: point.status,
          survey: PointSurvey.create({ id: new SurveyId(''), title: new SurveyTitle('') }),
          task: PointTask.create({ id: task.id, status: new TaskStatus(StatusList.Assigned)}),
          userAssigned: PointUser.create({ firstName: new UserFirstName(firstName), id: new UserId(userId), lastName: new UserLastName(lastName) })
        });
      } else {
        return ParcelPoint.create({
          id: new PointId(uuid()),
          certificate: point.certificate,
          client: PointClient.create({ id: new ClientId(id), name: new ClientName(name) }),
          comment: point.comment,
          invoice: point.invoices.map((inv) => Invoice.create({ id: new InvoiceId(uuid()), number: new InvoiceNumber(inv) })),
          itineraryId,
          observation: point.observation,
          ssa: point.ssa,
          status: point.status,
          task: PointTask.create({ id: task.id, status: new TaskStatus(StatusList.Assigned)}),
          userAssigned: PointUser.create({ firstName: new UserFirstName(firstName), id: new UserId(userId), lastName: new UserLastName(lastName) })
        });
      }
    });

    const sucursal = await this.sucursalFinder.run({
      id: params.sucursal
    }); 

    const { name, id } = sucursal.toPrimitives();


    await this.repository.save(itinerary);
  }
}
