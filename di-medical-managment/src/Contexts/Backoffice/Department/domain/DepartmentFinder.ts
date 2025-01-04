import { DeparmentId } from "./DeparmentId";
import { Department } from "./Department";
import { DepartmentNotFound } from "./DepartmentNotFound";
import { DepartmentRepository } from "./DepartmentRepository";

export class DeparmentFinder {
  constructor(
    private repository: DepartmentRepository
  ) {}

  async run(params: {
    id: DeparmentId
  }) {
    const department: Department | null = await this.repository.search(params.id);

    if(department == null) {
      throw new DepartmentNotFound();
    }

    return department;
  }
}
