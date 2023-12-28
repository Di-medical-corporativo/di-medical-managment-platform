import { Service } from 'typedi'
import { ImageUploadService } from '../../application/ImageUploadService'
import serviceAccount from './serviceAccountKey.json'
import * as admin from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'di-medical-del-sur.appspot.com'
})

@Service()
export class FirebaseStorageService implements ImageUploadService {
  private storage = admin.storage().bucket()

  public async upload(bufferFile: any, destination: string): Promise<any> {
    const fileDestination = `${destination}/${uuidv4()}`
    const fileRef = this.storage.file(fileDestination)
    const fileStream = fileRef.createWriteStream({
      metadata: {
        contentType: 'image/png'
      }
    })
    
    fileStream.on('error', () => {
      console.log('ERROR');
    })

    fileStream.on('finish', async () => {
    })

    fileStream.end(bufferFile);
    const imageUrl = await fileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' })
    return imageUrl
  }
}
