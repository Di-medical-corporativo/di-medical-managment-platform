import { RoleDescription } from "../../domain/RoleDescription";
import { RoleId } from "../../domain/RoleId";
import { RoleName } from "../../domain/RoleName";

export class RoleCreator {
  constructor() {}

  async run(params: {
    roleId: RoleId,
    roleName: RoleName,
    roleDescription: RoleDescription
  }) {
    console.log(params)
  }
}
