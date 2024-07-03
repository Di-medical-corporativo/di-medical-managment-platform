import { PrismaClient } from "@prisma/client";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class PrismaUserRepository implements UserRepository {
  private readonly prismaClient = new PrismaClient();

  async save(user: User): Promise<void> {
    const userPlain = user.toPrimitives();
    await this.prismaClient.user.create({
      data: {
        id: userPlain.id,
        admin: userPlain.isAdmin,
        createdAt: userPlain.createdAt,
        firstName: userPlain.firstName,
        lastName: userPlain.lastName,
        email: userPlain.email,
        job: userPlain.job,
        phone: userPlain.phone,
        isActive: true
      }
    });
  }
}
