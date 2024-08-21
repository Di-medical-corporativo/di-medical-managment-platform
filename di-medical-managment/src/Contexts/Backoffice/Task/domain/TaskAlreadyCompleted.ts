export class TaskAlreadyCompleted extends Error {
  constructor() {
    super('The task was already completed');
  }
}
