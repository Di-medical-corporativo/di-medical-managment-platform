import { Role } from "@prisma/client";
import { Role as DomainRole } from '../../domain/Role'
export class ModelToDomainRole {
  public static from (roles: Role[]): DomainRole[] {
    const domainRoles: DomainRole[] = roles.map( role => new DomainRole(
      role.id,
      role.name,
      role.description
    ) )

    return domainRoles
  }
}
