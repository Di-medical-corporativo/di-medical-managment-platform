import nodeHtmlToImage from "node-html-to-image";
import { ImageGenerator } from "../../domain/ImageGenerator";
import { ItineraryFinder } from "../../domain/ItineraryFinder";
import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryRepository } from "../../domain/ItineraryRepository";
import { ItineraryTableImageTemplate } from "../../domain/ItineraryTableImageTemplate";

export class ItineraryImageGenerator {
  private itineraryFinder: ItineraryFinder;

  constructor(
    private repository: ItineraryRepository,
    private imageGenerator: ImageGenerator
  ) {
    this.itineraryFinder = new ItineraryFinder(repository);
  }

  async run(params: {
    id: ItineraryId
  }) {
    console.log(this.imageGenerator)
    const itinerary = await this.itineraryFinder.run({
      id: params.id
    });
    
    const template = ItineraryTableImageTemplate.fromItinerary(itinerary);

    const image: Buffer = await this.imageGenerator.generate(template);
     
    return image;
  }
}
