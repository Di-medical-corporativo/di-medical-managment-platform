export class ItineraryHasActivePoints extends Error {
  constructor() {
    super('The itinerary has in-progress points'); 
  }
}
