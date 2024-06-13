import { RoleDescription } from "./RoleDescription";
import { RoleId } from "./RoleId";
import { RoleName } from "./RoleName";

export class Role {
  constructor(
    private roleId: RoleId,
    private roleName: RoleName,
    private roleDescription: RoleDescription
  ) {}

  static create(roleId: RoleId, roleName: RoleName, roleDescription: RoleDescription): Role {
    return new Role(roleId, roleName, roleDescription);
  }

  public toPrimitives() {
    return {
      roleId: this.roleId.toString(),
      roleName: this.roleName.toString(),
      roleDescription: this.roleDescription.toString()
    };
  }
}
