import { SurveyAnswerer } from "../../../../../../src/Contexts/Backoffice/Survey/application/Answer/SurveyAnswerer";
import { SurveyRepositoryMock } from "../../../../__mock__/SurveyRepositoryMock";
import { Response } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Response";
import { Answer, AnswerMultiple, AnswerOpen } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Answer";
import { AnswerId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/AnswerId";
import { AnswerText } from "../../../../../../src/Contexts/Backoffice/Survey/domain/AnswerText";
import { QuestionText } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionText";
import { QuestionId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionId";
import { ResponseId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/ResponseId";
import { SurveyId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyId";
import { Survey } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Survey";
import { QuestionOrder } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionOrder";
import { QuestionType } from "../../../../../../src/Contexts/Backoffice/Survey/domain/QuestionType";
import { Option } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Option";
import { OptionId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/OptionId";
import { OptionOrder } from "../../../../../../src/Contexts/Backoffice/Survey/domain/OptionOrder";
import { OptionValue } from "../../../../../../src/Contexts/Backoffice/Survey/domain/OptionValue";
import { Question } from "../../../../../../src/Contexts/Backoffice/Survey/domain/Question";
import { SurveyTitle } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyTitle";
import { SurveyDescription } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyDescription";
import { SurveyNotFound } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyNotFound";
import { SurveyClosed } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyClosed";

describe('SurveyAnswerer', () => {
  let repository: SurveyRepositoryMock;
  
  let surveyAnswerer: SurveyAnswerer;

  beforeAll(() => {
    repository = new SurveyRepositoryMock();

    surveyAnswerer = new SurveyAnswerer(repository);
  });
  
  test('should answer an active valid survey', async () => {
    const dataQuestion =  { 
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
      answers: answers
    }

    const response = Response.create(data);

    await surveyAnswerer.run(data);

    repository.assertAnswerHaveBeenCalledWith(response);
  });

  test('should throw survey not found if invalid survey', async () => {
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
      answers: answers
    }

    repository.setReturnForSearch(null);

    await expect(surveyAnswerer.run(data))
    .rejects
    .toThrow(SurveyNotFound);
  });
  
  test('should throw survey closed if survey is not available not anymore', async () => {
    const dataQuestion =  { 
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
      answers: answers
    }

    await expect(surveyAnswerer.run(data))
      .rejects
      .toThrow(SurveyClosed);
  });
});
