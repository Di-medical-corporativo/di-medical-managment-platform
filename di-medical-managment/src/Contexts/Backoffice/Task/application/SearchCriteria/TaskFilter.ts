import { DeparmentId } from "../../../Department/domain/DeparmentId";
import { UserId } from "../../../User/domain/UserId";
import { TaskRepository } from "../../domain/TaskRepository";
import { StatusList } from "../../domain/TaskStatus";

export class TaskFilter {
  constructor(
    private taskRepository: TaskRepository
  ) {}

  async run(params: {
    departmentId?: DeparmentId,
    asignedTo?: UserId,
    asignedBy?: UserId,
    status?: StatusList,
    startOfMonth: Date,
    endOfMonth: Date
  }) {
    const tasks = await this.taskRepository.searchFilter(
      {
        departmentId: params.departmentId,
        asignedTo: params.asignedTo,
        asignedBy: params.asignedBy,
        status: params.status as StatusList,
        startMonth: params.startOfMonth,
        endMonth: params.endOfMonth
      }
    );

    return tasks;
  }
}
