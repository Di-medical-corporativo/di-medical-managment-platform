import { Worker } from "bullmq";
import { BullConfig } from "./BullConfig";
import { TaskTimeOutProcessor } from "../../application/TimeOut/TaskTimeOutProcessor";
import { TaskId } from "../../domain/TaskId";

export class BullTaskWorker {
  private worker: Worker;
  
  constructor(
    private mqConfig: BullConfig, 
    private queueName: string,
    private taskTimeOutProcessor: TaskTimeOutProcessor 
  ) {
    this.worker = mqConfig.createWorker(queueName, async (job) => {
      const { taskId } = job.data;

      await this.taskTimeOutProcessor.run({
        id: new TaskId(taskId)
      });
    });
  }

  public start() {
    this.worker.on('ready', () => {
      console.log('Worker listening')
    });

    this.worker.on('completed', (job) => {
      console.log('COMPLETED');
    });

    this.worker.on('failed', (job) => {
      console.log('FAILED');
    });
  }
}
