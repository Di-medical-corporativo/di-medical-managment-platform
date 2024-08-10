import { SurveyResultsDisplayer } from "../../../../../../src/Contexts/Backoffice/Survey/application/Results/SurveyResultsDisplayer";
import { SurveyId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyNotFound } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyNotFound";
import { SurveyRepositoryMock } from "../../../../__mock__/SurveyRepositoryMock";

describe('SurveyResultsDisplayer', () => {
  let repository: SurveyRepositoryMock;
  
  let surveyResultsDisplayer: SurveyResultsDisplayer;
  
  beforeAll(() => {
    repository = new SurveyRepositoryMock();
    
    surveyResultsDisplayer = new SurveyResultsDisplayer(repository);
  });

  test('should get all the responses from a survey', async () => {
    const id = new SurveyId('');

    await surveyResultsDisplayer.run({
      id
    });
    
    repository.assertResultsHaveBeenCalledWith(id);
  });

  test('should throw SurveyNotFound if trying to get a non existing survey', async () => {
    const id = new SurveyId('');

    repository.setReturnForResults(null);

    await expect(surveyResultsDisplayer.run({
      id
    })).rejects.toThrow(
      SurveyNotFound
    );
  });


});
