import { ClientFinder } from "../../../Client/domain/ClientFinder";
import { ClientId } from "../../../Client/domain/ClientId";
import { ClientRepository } from "../../../Client/domain/ClientRepository";
import { SurveyFinder } from "../../../Survey/domain/SurveyFinder";
import { SurveyId } from "../../../Survey/domain/SurveyId";
import { SurveyRepository } from "../../../Survey/domain/SurveyRepository";
import { TaskCreator } from "../../../Task/application/Create/TaskCreator";
import { TaskDescription } from "../../../Task/domain/TaskDescription";
import { TaskDueTo } from "../../../Task/domain/TaskDueTo";
import { TaskId } from "../../../Task/domain/TaskId";
import { TaskIsPoint } from "../../../Task/domain/TaskIsPoint";
import { TaskRepository } from "../../../Task/domain/TaskRepository";
import { TaskScheduler } from "../../../Task/domain/TaskScheduler";
import { StatusList, TaskStatus } from "../../../Task/domain/TaskStatus";
import { TaskTitle } from "../../../Task/domain/TaskTitle";
import { UserFinder } from "../../../User/domain/UserFinder";
import { UserId } from "../../../User/domain/UserId";
import { UserRepository } from "../../../User/domain/UserRepository";
import { Invoice } from "../../domain/Invoice";
import { InvoiceId } from "../../domain/InvoiceId";
import { ItineraryFinder } from "../../domain/ItineraryFinder";
import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryRepository } from "../../domain/ItineraryRepository";
import { ItinerarySchedule } from "../../domain/ItinerarySchedule";
import { PointCertificate } from "../../domain/PointCertificate";
import { PointClient } from "../../domain/PointClient";
import { PointComment } from "../../domain/PointComment";
import { PointId } from "../../domain/PointId";
import { PointObservation } from "../../domain/PointObservation";
import { PointSSA } from "../../domain/PointSSA";
import { PointStatus } from "../../domain/PointStatus";
import { PointTask } from "../../domain/PointTask";
import { PointType } from "../../domain/PointType";
import { v4 as uuid } from "uuid";
import { PointUser } from "../../domain/PointUser";
import { UserFirstName } from "../../../User/domain/UserFirstName";
import { UserLastName } from "../../../User/domain/UserLastName";
import { PointSurvey } from "../../domain/PointSurvey";
import { Survey } from "../../../Survey/domain/Survey";
import { ClientName } from "../../../Client/domain/ClientName";
import { InvoiceNumber } from "../../domain/InvoiceNumber";
import { SurveyTitle } from "../../../Survey/domain/SurveyTitle";
import { CollectPoint, ParcelPoint, Point, RoutePoint } from "../../domain/Point";

export class PointAdder {
  private itineraryFinder: ItineraryFinder;

  private clientFinder: ClientFinder;

  private userFinder: UserFinder;

  private taskCreator: TaskCreator;
  
  private surveyFinder: SurveyFinder;

  constructor(
    private repository: ItineraryRepository,
    private clientRepository: ClientRepository,
    private userRepository: UserRepository,
    private taskRepository: TaskRepository,
    private taskScheduler: TaskScheduler,
    private surveyRepository: SurveyRepository
  ) {
    this.itineraryFinder = new ItineraryFinder(repository);

    this.clientFinder = new ClientFinder(clientRepository);
  
    this.userFinder = new UserFinder(userRepository);
  
    this.taskCreator = new TaskCreator(taskRepository, userRepository, taskScheduler);
    
    this.surveyFinder = new SurveyFinder(surveyRepository);
  }

  async run(params: {
      itineraryId: ItineraryId, 
      scheduleDate: ItinerarySchedule,
      points: {
        clientId: ClientId;
        userId: UserId;
        invoices: string[],
        comment: PointComment;
        observation: PointObservation;
        certificate: PointCertificate;
        ssa: PointSSA;
        type: PointType;
        surveyId?: SurveyId;
      }[]
    }
  ) {
    await this.ensureItineraryExists(params.itineraryId);

    const pointsPromises = params.points.map(async (point) => {

      const pointId = new PointId(uuid());

      const clientToDeliver = await this.clientFinder.run({
        id: point.clientId
      });

      const userAssigedToPoint = await this.userFinder.run(point.userId.toString());

      const { firstName, lastName, id: userId } = userAssigedToPoint.toPrimitives();

      const { id, name } = clientToDeliver.toPrimitives();

      const formattedDate = params.scheduleDate.format();

      const descriptionHTMLForTaskTemplate = `
        <p>Esta tarea pertence a la ruta del ${formattedDate}</p>
        <p></p>
        <p>Es un punto de tipo: <strong>${point.type.getValue()}</strong> </p>
        <p></p>
        <p>No olvides que para terminar el punto que se te fue asignado debes acceder al siguiente enlace: </p>
        <p></p>
        <p><a href="/backoffice/itinerary/point/${pointId}/end" rel="noopener noreferrer" target="_blank">Enlace</a></p>
      `
      
      const titleForTask = `Punto tipo: ${point.type.getValue()}, itinerario: ${formattedDate}`;

      const taskForPoint = {
        id: new TaskId(uuid()),
        description: new TaskDescription(descriptionHTMLForTaskTemplate),
        dueTo: new TaskDueTo(params.scheduleDate.toString()),
        userId: point.userId,
        title: new TaskTitle(titleForTask),
        isPoint: new TaskIsPoint(true)
      }

      await this.taskCreator.runForPoint(taskForPoint);

      const status = StatusList.Assigned;

      let pointData = {
          id: pointId,
          certificate: point.certificate,
          client: PointClient.create({ id: new ClientId(id), name: new ClientName(name) }),
          comment: point.comment,
          invoice: point.invoices.map((inv: string) => 
            Invoice.create({ id: new InvoiceId(uuid()), number: new InvoiceNumber(inv) })
          ),
          itineraryId: params.itineraryId,
          observation: point.observation,
          ssa: point.ssa,
          status: new PointStatus(status),
          task: PointTask.create({ id: taskForPoint.id, status: new TaskStatus(status)}),
          userAssigned: PointUser.create({ 
            firstName: new UserFirstName(firstName), 
            id: new UserId(userId), 
            lastName: new UserLastName(lastName) 
          })
      }

      let surveyForPoint: Survey;

      let survey: PointSurvey;

      if(point.type.isCollect() || point.type.isRoute()) {
        surveyForPoint = await this.surveyFinder.run({ id: point.surveyId! });
        
        const { id: surveyId, title: surveyName } = surveyForPoint.toPrimitives();
      
        survey =  PointSurvey.create({ 
          id: new SurveyId(surveyId), 
          title: new SurveyTitle(surveyName) 
        });
      }

      if(point.type.isCollect()) {
        return CollectPoint.create({ 
          ...pointData, 
          survey: survey!
        });
      } else if(point.type.isRoute()) {
        return RoutePoint.create({ 
          ...pointData, 
          survey: survey!
        });
      } else {
        return ParcelPoint.create(pointData);
      }
    });

    const points: Point[] = await Promise.all(pointsPromises);

    await this.repository.addPointsToItinerary(
      params.itineraryId,
      points
    );
  }

  private async ensureItineraryExists(id: ItineraryId) {
    await this.itineraryFinder.run({
      id
    });
  }
}
