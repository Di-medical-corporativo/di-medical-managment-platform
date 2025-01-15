import nodeHtmlToImage from "node-html-to-image";
import { ImageError } from "../../domain/ImageError";
import { ImageGenerator } from "../../domain/ImageGenerator";

export class PuppeterImageGenerator implements ImageGenerator {
  async generate(template: string): Promise<Buffer> {
    try {
      const image: Buffer = await nodeHtmlToImage({
        html: template,
        type: 'jpeg',
        quality: 80,
        encoding: 'binary',
        transparent: false,
        puppeteerArgs: {
          args: ['--no-sandbox']
        },
        waitUntil: 'networkidle0'
      }) as Buffer;

      return image;
    } catch (error) {
      throw new ImageError();
    }
  }
}
