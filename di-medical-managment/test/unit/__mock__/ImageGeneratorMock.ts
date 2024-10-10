import { ImageGenerator } from "../../../src/Contexts/Backoffice/Itinerary/domain/ImageGenerator";

export class ImageGeneratorMock implements ImageGenerator {
  private generateMock: jest.Mock;

  constructor() {
    this.generateMock = jest.fn();  
  }

  async generate(template: string): Promise<Buffer> {
    return this.generateMock(template);
  }

  assertGenerateHaveBeenCalled() {
    expect(this.generateMock).toHaveBeenCalled();
  }
}
