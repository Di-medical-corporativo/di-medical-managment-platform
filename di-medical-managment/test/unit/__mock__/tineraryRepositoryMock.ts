import { ItineraryCreator } from "../../../src/Contexts/Backoffice/Itinerary/application/Create/ItineraryCreator";
import { Itinerary } from "../../../src/Contexts/Backoffice/Itinerary/domain/Itinerary";
import { ItineraryRepository } from "../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryRepository";

export class ItineraryRepositoryMock implements ItineraryRepository{
  private saveMock: jest.Mock;
  
  constructor() {
    this.saveMock = jest.fn()
  }
  
  async save(itinerary: Itinerary): Promise<void> {
    this.saveMock(itinerary);
  }

  assertSaveHaveBeenCalledWith(expected: Itinerary) {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSaveHaveBeenCalled() {
    expect(this.saveMock).toHaveBeenCalled();
  }
}
