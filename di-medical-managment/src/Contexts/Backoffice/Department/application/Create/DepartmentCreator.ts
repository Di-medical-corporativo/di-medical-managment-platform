import { DeparmentId } from "../../domain/DeparmentId";
import { Department } from "../../domain/Department";
import { DepartmentName } from "../../domain/DepartmentName";
import { DepartmentRepository } from "../../domain/DepartmentRepository";

export class DepartmentCreator {
  constructor(
    private repository: DepartmentRepository
  ) {}

  async run(params: {
    id: DeparmentId,
    name: DepartmentName
  }) {
    const deparment = Department.create(params);

    await this.repository.save(deparment);
  }
}
