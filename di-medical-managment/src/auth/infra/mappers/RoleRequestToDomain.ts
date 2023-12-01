import { Role } from "../../domain/Role";

export class RoleRequestToDomain {
  public static of(roleName: string, roleDescription: string) {
    return new Role(undefined, roleName, roleDescription)
  }
}
