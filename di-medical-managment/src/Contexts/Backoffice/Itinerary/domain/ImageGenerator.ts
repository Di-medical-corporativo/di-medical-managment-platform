export interface ImageGenerator {
  generate(template: string): Promise<Buffer>;
}
