import { UserAuthenticated } from "../../../../Shared/domain/UserAuthenticated";
import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { User } from "../../domain/User";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class PrismaUserRepository implements UserRepository {
  async save(user: User, password: UserPassword): Promise<void> {
    const userPlain = user.toPrimitives();
    const passwordPlain = password.toPrimitives();

    await prisma.user.create({
      data: {
        id: userPlain.id,
        role: userPlain.role,
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
        ],
        isActive: true
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
      role: userDB.role,
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

  async findAll(): Promise<User[]> {
    const usersDB = await prisma.user.findMany({
      include: {
        sucursal: true
      },
      where: {
        isActive: true
      }
    });

    const users: User[] = usersDB.map(u => User.fromPrimitives({
      createdAt: u.createdAt.toISOString(),
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      id: u.id,
      job: u.job,
      phone: u.phone,
      role: u.role,
      sucursal: {
        sucursalAddress: u.sucursal.address,
        sucursalId: u.sucursal.id,
        sucursalName: u.sucursal.name,
        sucursalPhone: u.sucursal.phone
      } 
    }));

    return users;
  }

  async update(user: User, password: UserPassword): Promise<void> {
    const userPlain = user.toPrimitives();

    await prisma.user.update({
      where: {
        id: userPlain.id
      },
      data: {
        email: userPlain.email,
        firstName: userPlain.firstName,
        lastName: userPlain.lastName,
        job: userPlain.job,
        phone: userPlain.phone,
        role: userPlain.role,
        sucursal: {
          connect: {
            id: userPlain.sucursal.id
          }
        },
        login: {
          update: {
            passwordHash: password.toPrimitives().hash,
            passwordSalt: password.toPrimitives().salt
          }
        }
      }
    });
  }

  async delete(id: UserId): Promise<void> {
    await prisma.user.update({
      where: {
        id: id.toString()
      },
      data: {
        isActive: false,
        login: {
          delete: true
        }
      }
    });
  }

  async findByEmail(email: UserEmail): Promise<UserAuthenticated | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: email.toString()
      },
      include: {
        login: true
      }
    });
    
    if(!user) return null;

    const userAuthenticated = UserAuthenticated.fromPrimitives({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      password: {
        hash: user.login?.passwordHash!,
        salt: user.login?.passwordSalt!
      }
    });

    return userAuthenticated;
  }
}
