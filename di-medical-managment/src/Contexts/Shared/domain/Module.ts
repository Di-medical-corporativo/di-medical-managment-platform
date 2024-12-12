import { ModuleId } from "./ModuleId";
import { ModuleName } from "./ModuleName";

export class Module {
  constructor(
    private id: ModuleId,
    private name: ModuleName
  ) {}

  public static fromPrimitives(primitives: { id: string; name: string }): Module {
    return new Module(new ModuleId(primitives.id), new ModuleName(primitives.name));
  }

  public static create(params: {
    id: ModuleId, name: ModuleName
  }): Module {
    return new Module(params.id, params.name);
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }
}
