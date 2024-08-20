import { Queue } from "bullmq";
import { TaskId } from "../../domain/TaskId";
import { TaskScheduler } from "../../domain/TaskScheduler";

export class BullTaskScheduler implements TaskScheduler {
  constructor(
    private queue: Queue
  ) {}

  async schedule(taskId: TaskId, dueTo: Date): Promise<void> {
    const id = taskId.toString();

    const now = new Date();

    const delay = dueTo.getTime() - now.getTime();

    if(delay > 0) {
      await this.queue.add(id, { taskId: id }, { delay, jobId: id });    
    } else {
      await this.queue.add(id, { taskId: id }, { jobId: id });    
    }
  }
}
