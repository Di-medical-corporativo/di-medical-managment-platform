import { SurveyTerminator } from "../../../../../../src/Contexts/Backoffice/Survey/application/Close/SurveyTerminator";
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
import { SurveyRepositoryMock } from "../../../../__mock__/SurveyRepositoryMock";

describe('SurveyTerminator', () => {
  let repository: SurveyRepositoryMock;
  
  let surveyTerminator: SurveyTerminator;

  beforeAll(() => {
    repository = new SurveyRepositoryMock();

    surveyTerminator = new SurveyTerminator(repository);
  });
  
  test('should close an existing survey ', async () => {
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
    
    const id = new SurveyId('');

    repository.setReturnForSearch(survey);

    await surveyTerminator.run({ survey: id });

    repository.assertCloseHaveBeenCalledWith(data.id);
  });

  test('should throw SurveyNotFound if trying to close a non existing survey', async () => {
    const id = new SurveyId('');

    repository.setReturnForSearch(null);

    await expect(surveyTerminator.run({ survey: id })).rejects.toThrow(SurveyNotFound);
  });
});
