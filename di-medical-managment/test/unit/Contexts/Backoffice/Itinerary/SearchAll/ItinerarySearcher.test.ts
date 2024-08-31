
import { Client } from "../../../../../../src/Contexts/Backoffice/Client/domain/Client";
import { ClientAddress } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientAddress";
import { ClientId } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientId";
import { ClientName } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientName";
import { ClientNotFound } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientNotFound";
import { ItineraryCreator } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/Create/ItineraryCreator";
import { ItinerarySearcher } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/SearchAll/ItinerarySearcher";
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

  let itinerarySearcher: ItinerarySearcher;

  beforeEach(() => {
    repository = new ItineraryRepositoryMock();

    itinerarySearcher = new ItinerarySearcher(repository);
  });
  
  test('should call itinerarySearcher', async() => {
     await itinerarySearcher.run();

     repository.assertFindAllHaveBeenCalled();
  });

});
