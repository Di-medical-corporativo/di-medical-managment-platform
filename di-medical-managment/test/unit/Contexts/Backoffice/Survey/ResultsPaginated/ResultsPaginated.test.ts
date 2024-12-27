import { ResultsPaginator } from "../../../../../../src/Contexts/Backoffice/Survey/application/ResultsPaginate/ResultsPaginator";
import { SurveyId } from "../../../../../../src/Contexts/Backoffice/Survey/domain/SurveyId";
import { SurveyRepositoryMock } from "../../../../__mock__/SurveyRepositoryMock";

describe('ResultsPaginated', () => {
  let repository: SurveyRepositoryMock;
  
  let resultsPaginator: ResultsPaginator;

  beforeEach(() => {
    repository = new SurveyRepositoryMock();

    resultsPaginator = new ResultsPaginator(repository); 
  });

  test('should give the results of a survey individualdy', async () => {
    await resultsPaginator.run({
      position: 1,
      surveyId: new SurveyId('')
    });
  });
});
