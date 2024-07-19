import { SurveyCreator } from "../../../../../../src/Contexts/Backoffice/Survey/application/Create/SurveyCreator";
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
import { SurveyTitle } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyTitle";
import { SurveyRepositoryMock } from "../../../../__mock__/SurveyRepositoryMock";

describe('SurveyCreator', () => {
  let repository: SurveyRepositoryMock;
 
  let surveyCreator;
  
  beforeAll(() => {
    repository = new SurveyRepositoryMock();

    surveyCreator = new SurveyCreator(repository);
  });
  
  test('should be able to create a valid new survey', async () => {
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

    repository.save(survey);

    repository.assertSaveHaveBeenCalledWith(survey);
  });
});
