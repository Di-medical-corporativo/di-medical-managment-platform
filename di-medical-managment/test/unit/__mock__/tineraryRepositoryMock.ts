import { Itinerary } from "../../../src/Contexts/Backoffice/Itinerary/domain/Itinerary";
import { ItineraryId } from "../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ItineraryPreview } from "../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryPreview";
import { ItineraryRepository } from "../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryRepository";
import { Point } from "../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { PointId } from "../../../src/Contexts/Backoffice/Itinerary/domain/PointId";

export class ItineraryRepositoryMock implements ItineraryRepository{
  private saveMock: jest.Mock;
  
  private searchAll: jest.Mock;

  private searchMock: jest.Mock;

  private startMock: jest.Mock;

  private endItineraryMock: jest.Mock;

  private findPointMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn()
  
    this.searchAll = jest.fn();

    this.searchMock = jest.fn();

    this.startMock = jest.fn();

    this.endItineraryMock = jest.fn();

    this.findPointMock = jest.fn();
  }

  async findPoint(id: PointId): Promise<Point | null> {
    return this.findPointMock(id);
  }

  async setReturnForPoint(point: Point | null) {
    this.findPointMock.mockReturnValue(point);
  }

  async end(id: ItineraryId) {
    this.endItineraryMock(id);
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

  assertEndHaveBeenCalled() {
    expect(this.endItineraryMock).toHaveBeenCalled();
  }
}
