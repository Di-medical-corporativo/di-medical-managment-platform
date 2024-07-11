import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Sucursal } from "../../../Sucursal/domain/Sucursal";
import { User } from "../../domain/User";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class PrismaUserRepository implements UserRepository {
  
  async save(user: User, password: UserPassword): Promise<void> {
    const userPlain = user.toPrimitives();

    const passwordPlain = password.toPrimitives();
    
    await prisma.user.create({
      data: {
        id: userPlain.id,
        admin: userPlain.isAdmin,
        createdAt: userPlain.createdAt,
        firstName: userPlain.firstName,
        lastName: userPlain.lastName,
        email: userPlain.email,
        job: userPlain.job,
        phone: userPlain.phone,
        isActive: true,
        sucursal: {
          connect: {
            id: userPlain.sucursal.id
          }
        },
        login: {
          create: {
            id: userPlain.id,
            email: userPlain.email,
            passwordHash: passwordPlain.hash,
            passwordSalt: passwordPlain.salt
          }
        }
      }
    });
  }

  async search(term: string): Promise<User | null> {
    const userDB = await prisma.user.findFirst({
      where: {
        OR: [
          {
            id: term
          },
          {
            email: term
          }
        ]
      },
      include: {
        sucursal: true
      }
    });

    if(!userDB) {
      return null
    };

    const user = User.fromPrimitives({
      id: userDB.id,
      createdAt: userDB.createdAt.toISOString(),
      email:userDB.email,
      firstName: userDB.firstName,
      isAdmin: userDB.admin,
      job: userDB.job,
      lastName: userDB.lastName,
      phone: userDB.phone,
      sucursal: {
        sucursalId: userDB.sucursal.id,
        sucursalName: userDB.sucursal.name,
        sucursalAddress: userDB.sucursal.address,
        sucursalPhone: userDB.sucursal.phone
      }
    });

    return user;
  }
}
