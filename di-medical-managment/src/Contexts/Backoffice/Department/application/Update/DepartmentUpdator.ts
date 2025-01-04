import { DeparmentId } from "../../domain/DeparmentId";
import { Department } from "../../domain/Department";
import { DepartmentFinder } from "../../domain/DepartmentFinder";
import { DepartmentName } from "../../domain/DepartmentName";
import { DepartmentRepository } from "../../domain/DepartmentRepository";

export class DepartmentUpdator {
  private departmentFinder: DepartmentFinder;

  constructor(
    private repository: DepartmentRepository
  ) {
    this.departmentFinder = new DepartmentFinder(repository);
  }

  async run(params: {
    name: DepartmentName,
    id: DeparmentId
  }) {
    const deparment: Department = await this.departmentFinder.run({
      id: params.id
    });

    deparment.updateName(params.name);

    await this.repository.update(deparment);
  }
}
