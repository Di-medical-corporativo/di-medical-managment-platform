import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../shared/domain/criteria/Filter";
import { TaskRepository } from "../../domain/TaskRepository";

export class TaskFinder {
  constructor(
    private taskRepository: TaskRepository
  ) {}

  async run(filters: FiltersPrimitives[], orderBy: string | null, order: string | null) {
    const criteria = Criteria.fromPrimitives(
      filters,
      orderBy,
      order
    )

    console.log(criteria)
    
    const tasks = await this.taskRepository.matching(criteria)
    return tasks
  }

}
