
import { ItinerarySearcher } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/SearchAll/ItinerarySearcher";
import { ItineraryRepositoryMock } from "../../../../__mock__/tineraryRepositoryMock";

describe("ItinerarySearcher", () => {
  
  let repository: ItineraryRepositoryMock;

  let itinerarySearcher: ItinerarySearcher;

  beforeEach(() => {
    repository = new ItineraryRepositoryMock();

    itinerarySearcher = new ItinerarySearcher(repository);
  });
  
  test('should call itinerarySearcher with month and year', async() => {
     await itinerarySearcher.run({
      month: 1,
      year: 2024
     });

     repository.assertFindAllHaveBeenCalled();
  });

});
