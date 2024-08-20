import { Queue, Worker } from "bullmq";

export class BullConfig {

  private connection = {
    host: 'localhost',
    port: 6379
  }
  
  public static createQueue(queueName: string) {
    return new Queue(queueName, {
      connection: {
        host: 'localhost',
        port: 6379
      }
    })
  }

  public createWorker(queueName: string, handler: (job: any) => Promise<void>) {
    return new Worker(queueName, handler, {
      connection: this.connection
    });
  }
}
