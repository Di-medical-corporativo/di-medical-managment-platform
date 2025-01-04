import { DeparmentId } from "../../domain/DeparmentId";
import { DepartmentFinder } from "../../domain/DepartmentFinder";
import { DepartmentRepository } from "../../domain/DepartmentRepository";

export class DepartmentDeleter {
  private departmentFinder: DepartmentFinder;

  constructor(
    private repository: DepartmentRepository
  ) {
    this.departmentFinder = new DepartmentFinder(repository);
  }

  async run(params: {
    id: DeparmentId
  }) {
    await this.ensureDepartmentExists(params.id);

    await this.repository.delete(params.id);
  }

  async ensureDepartmentExists(id: DeparmentId) {
    await this.departmentFinder.run({
      id: id
    });
  }
}
