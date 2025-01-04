import { DeparmentId } from "./DeparmentId";
import { DepartmentName } from "./DepartmentName";

export class Department {
  constructor(
    private id: DeparmentId,
    private name: DepartmentName
  ) {}

  public updateName(name: DepartmentName) {
    this.name = name;
  }

  static fromPrimitives(params: {
    id: string;
    name: string;
  }) {
    return new Department(
      new DeparmentId(params.id),
      new DepartmentName(params.name)
    );
  }

  static create(params: {
    id: DeparmentId;
    name: DepartmentName
  }) {
    return new Department(
      params.id,
      params.name
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.toString()
    }
  }
}
