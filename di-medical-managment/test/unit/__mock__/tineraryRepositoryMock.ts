import { ItineraryCreator } from "../../../src/Contexts/Backoffice/Itinerary/application/Create/ItineraryCreator";
import { Itinerary } from "../../../src/Contexts/Backoffice/Itinerary/domain/Itinerary";
import { ItineraryId } from "../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ItineraryPreview } from "../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryPreview";
import { ItineraryRepository } from "../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryRepository";

export class ItineraryRepositoryMock implements ItineraryRepository{
  private saveMock: jest.Mock;
  
  private searchAll: jest.Mock;

  private searchMock: jest.Mock;

  private startMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn()
  
    this.searchAll = jest.fn();

    this.searchMock = jest.fn();

    this.startMock = jest.fn();
  }

  async start(id: ItineraryId): Promise<void> {
    this.startMock(id);
  }

  async findAll(): Promise<ItineraryPreview[]> {
    return this.searchAll();
  }

  async search(id: ItineraryId): Promise<Itinerary | null> {
    return this.searchMock(id);
  }

  setReturnForSearch(itinerary: Itinerary | null) {
    this.searchMock.mockReturnValue(itinerary);
  }
  
  async save(itinerary: Itinerary): Promise<void> {
    this.saveMock(itinerary);
  }

  assertFindAllHaveBeenCalled() {
    expect(this.searchAll).toHaveBeenCalled();
  }

  assertSaveHaveBeenCalledWith(expected: Itinerary) {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSaveHaveBeenCalled() {
    expect(this.saveMock).toHaveBeenCalled();
  }
}
