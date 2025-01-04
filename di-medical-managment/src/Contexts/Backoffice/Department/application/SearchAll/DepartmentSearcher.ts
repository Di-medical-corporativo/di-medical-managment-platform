import { Department } from "../../domain/Department";
import { DepartmentRepository } from "../../domain/DepartmentRepository";

export class DepartmentSearcher {
  constructor(
    private repository: DepartmentRepository
  ) {}

  async run() {
    const departments: Department[] = await this.repository.findAll();

    return departments;
  }
}
