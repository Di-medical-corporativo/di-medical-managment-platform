export interface ImageUploadService {
  upload(bufferFile: any, destination: string): Promise<any>
}
