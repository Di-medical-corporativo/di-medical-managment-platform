import { ItineraryRepository } from "../../domain/ItineraryRepository";

export class ItineraryPreviewer {
  constructor(
    private repository: ItineraryRepository 
  ) {}
}
