import { Queue } from "bullmq";
import { TaskId } from "../../domain/TaskId";
import { TaskScheduler } from "../../domain/TaskScheduler";
import e from "express";

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

  async reschedule(taskId: TaskId, dueTo: Date): Promise<void> {
    const id = taskId.toString();

    const now = new Date();

    const delay = dueTo.getTime() - now.getTime();

    const job = await this.queue.getJob(id);

    if(job) {
      const jobData = job.data;
      
      const jobOptions = job.opts;

      await job.remove();

      await this.queue.add(job.name, jobData, {
        ...jobOptions,
        delay
      });
    } else {
      await this.schedule(
        taskId,
        dueTo
      );
    }
  }

  async remove(taskId: TaskId): Promise<void> {
    const id = taskId.toString();

    const job = await this.queue.getJob(id);

    if(job) await job.remove();
  }
}
