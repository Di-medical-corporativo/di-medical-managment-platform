import { User } from "@prisma/client";
import { User as UserDomain } from "../../domain/User";

export class ModelToUserDomain {
  public static fromUsers(usersModel: User[]): UserDomain[] {
    const usersDomain = usersModel.map((user) => {
      return new UserDomain(
        user.id,
        user.firstName,
        user.lastName,
        user.birthDate,
        user.NSS,
        user.job,
        user.picture,
        user.phone,
        user.email,
        user.isActive,
        user.createdAt,
        user.updatedAt
      )
    })

    return usersDomain
  }
}
