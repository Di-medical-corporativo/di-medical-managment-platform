import { ClientId } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientId";
import { ClientName } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientName";
import { Invoice } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Invoice";
import { InvoiceId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/InvoiceId";
import { InvoiceNumber } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/InvoiceNumber";
import { ItineraryId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { CollectPoint, Point, RoutePoint } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { PointCertificate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { PointClient } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointClient";
import { PointComment } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointComment";
import { PointId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointId";
import { PointNotFound } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointNotFound";
import { PointObservation } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointObservation";
import { PointSSA } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointSSA";
import { PointStatus } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointStatus";
import { PointSurvey } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointSurvey";
import { PointTask } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointTask";
import { PointUser } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointUser";
import { SurveyAnswererPoint } from "../../../../../../src/Contexts/Backoffice/Survey/application/AnswerPoint/SurveyAnswererPoint";
import { Answer, AnswerOpen } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Answer";
import { AnswerId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/AnswerId";
import { AnswerText } from "../../../../../../src/Contexts/Backoffice/Survey/domain/AnswerText";
import { Question } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Question";
import { QuestionId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionId";
import { QuestionOrder } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionOrder";
import { QuestionText } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionText";
import { QuestionType } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionType";
import { ResponseId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/ResponseId";
import { Survey } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Survey";
import { SurveyClosed } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyClosed";
import { SurveyDescription } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyDescription";
import { SurveyId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyNotFound } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyNotFound";
import { SurveyTitle } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyTitle";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskStatus } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { SurveyRepositoryMock } from "../../../../__mock__/SurveyRepositoryMock";
import { ItineraryRepositoryMock } from "../../../../__mock__/tineraryRepositoryMock";

describe('SurveyAnswererPoint', () => {
  let repository: SurveyRepositoryMock;

  let surveyAnswererPoint: SurveyAnswererPoint;

  let itineraryRepository: ItineraryRepositoryMock;

  beforeAll(() => {
    repository = new SurveyRepositoryMock();

    itineraryRepository = new ItineraryRepositoryMock();

    surveyAnswererPoint = new SurveyAnswererPoint(repository, itineraryRepository);
  });

  test('should throw survey not found if trying to answer a non existing survey', async () => {
    repository.setReturnForSearch(null);

    const answers: Answer[] = [
      AnswerOpen.create({
        id: new AnswerId('d20e57b1-7fe5-4234-89e8-46ae4af9d574'),
        answerText: new AnswerText('Hey there'),
        questionId: new QuestionId('84b100e7-8efe-4f6b-9e91-99099df18c4c')
      })
    ]

    const data = {
      id: new ResponseId('03c3547d-ba50-4af3-93af-ddca07792c71'),
      surveyId: new SurveyId('52f2bbe9-28fb-40cb-b7eb-7be38e2750df'),
      answers: answers,
      pointId: new PointId('')
    };

    await expect(surveyAnswererPoint.run(data)).rejects.toThrow(SurveyNotFound);
  });

  test('should throw survey close if the survey is not open to answers', async () => {
    const dataQuestion = {
      id: new QuestionId('84b100e7-8efe-4f6b-9e91-99099df18c4c'),
      text: new QuestionText('test question'),
      order: new QuestionOrder(1),
      type: new QuestionType('open'),
      options: []
    }

    const question = Question.create(dataQuestion);

    const surveyData = {
      id: new SurveyId('52f2bbe9-28fb-40cb-b7eb-7be38e2750df'),
      title: new SurveyTitle('Test survey'),
      description: new SurveyDescription('This is a test question'),
      questions: [question]
    };

    const survey = Survey.create(surveyData);

    survey.stopAcceptingAnswers();

    repository.setReturnForSearch(survey);

    const answers: Answer[] = [
      AnswerOpen.create({
        id: new AnswerId('d20e57b1-7fe5-4234-89e8-46ae4af9d574'),
        answerText: new AnswerText('Hey there'),
        questionId: new QuestionId('84b100e7-8efe-4f6b-9e91-99099df18c4c')
      })
    ]

    const data = {
      id: new ResponseId('03c3547d-ba50-4af3-93af-ddca07792c71'),
      surveyId: new SurveyId('52f2bbe9-28fb-40cb-b7eb-7be38e2750df'),
      answers: answers,
      pointId: new PointId('')
    }

    await expect(surveyAnswererPoint.run(data)).rejects.toThrow(SurveyClosed);
  });

  test('should throw PointNotFound if trying to answer for a non existing point', async () => {
    const dataQuestion = {
      id: new QuestionId('84b100e7-8efe-4f6b-9e91-99099df18c4c'),
      text: new QuestionText('test question'),
      order: new QuestionOrder(1),
      type: new QuestionType('open'),
      options: []
    }

    const question = Question.create(dataQuestion);

    const surveyData = {
      id: new SurveyId('52f2bbe9-28fb-40cb-b7eb-7be38e2750df'),
      title: new SurveyTitle('Test survey'),
      description: new SurveyDescription('This is a test question'),
      questions: [question]
    };

    const survey = Survey.create(surveyData);

    repository.setReturnForSearch(survey);

    const answers: Answer[] = [
      AnswerOpen.create({
        id: new AnswerId('d20e57b1-7fe5-4234-89e8-46ae4af9d574'),
        answerText: new AnswerText('Hey there'),
        questionId: new QuestionId('84b100e7-8efe-4f6b-9e91-99099df18c4c')
      })
    ]

    const data = {
      id: new ResponseId('03c3547d-ba50-4af3-93af-ddca07792c71'),
      surveyId: new SurveyId('52f2bbe9-28fb-40cb-b7eb-7be38e2750df'),
      answers: answers,
      pointId: new PointId('')
    }

    const point = CollectPoint.create({
      certificate: new PointCertificate(''),
      client: PointClient.create({ id: new ClientId(''), name: new ClientName('') }),
      comment: new PointComment(''),
      id: new PointId(''),
      invoice: [Invoice.create({ id: new InvoiceId(''), number: new InvoiceNumber('') })],
      itineraryId: new ItineraryId(''),
      observation: new PointObservation(''),
      ssa: new PointSSA(''),
      status: new PointStatus(''),
      survey: PointSurvey.create({ id: new SurveyId(''), title: new SurveyTitle('') }),
      task: PointTask.create({ id: new TaskId(''), status: new TaskStatus('') }),
      userAssigned: PointUser.create({ firstName: new UserFirstName(''), id: new UserId(''), lastName: new UserLastName('') })
    })

    itineraryRepository.setReturnForPoint(null);

    await expect(surveyAnswererPoint.run(data)).rejects.toThrow(PointNotFound);
  });

  test('should give a response for an open survey succesfully', async () => {
    const dataQuestion = {
      id: new QuestionId('84b100e7-8efe-4f6b-9e91-99099df18c4c'),
      text: new QuestionText('test question'),
      order: new QuestionOrder(1),
      type: new QuestionType('open'),
      options: []
    }

    const question = Question.create(dataQuestion);

    const surveyData = {
      id: new SurveyId('52f2bbe9-28fb-40cb-b7eb-7be38e2750df'),
      title: new SurveyTitle('Test survey'),
      description: new SurveyDescription('This is a test question'),
      questions: [question]
    };

    const survey = Survey.create(surveyData);

    repository.setReturnForSearch(survey);

    const answers: Answer[] = [
      AnswerOpen.create({
        id: new AnswerId('d20e57b1-7fe5-4234-89e8-46ae4af9d574'),
        answerText: new AnswerText('Hey there'),
        questionId: new QuestionId('84b100e7-8efe-4f6b-9e91-99099df18c4c')
      })
    ];

    const point = CollectPoint.create({
      certificate: new PointCertificate(''),
      client: PointClient.create({ id: new ClientId(''), name: new ClientName('') }),
      comment: new PointComment(''),
      id: new PointId(''),
      invoice: [Invoice.create({ id: new InvoiceId(''), number: new InvoiceNumber('') })],
      itineraryId: new ItineraryId(''),
      observation: new PointObservation(''),
      ssa: new PointSSA(''),
      status: new PointStatus(''),
      survey: PointSurvey.create({ id: new SurveyId(''), title: new SurveyTitle('') }),
      task: PointTask.create({ id: new TaskId(''), status: new TaskStatus('') }),
      userAssigned: PointUser.create({ firstName: new UserFirstName(''), id: new UserId(''), lastName: new UserLastName('') })
    })

    itineraryRepository.setReturnForPoint(point);

    const data = {
      id: new ResponseId('03c3547d-ba50-4af3-93af-ddca07792c71'),
      surveyId: new SurveyId('52f2bbe9-28fb-40cb-b7eb-7be38e2750df'),
      answers: answers,
      pointId: new PointId('')
    }

    await surveyAnswererPoint.run(data);

    repository.assertAnswerPointHaveBeenCalled();
  });
})
