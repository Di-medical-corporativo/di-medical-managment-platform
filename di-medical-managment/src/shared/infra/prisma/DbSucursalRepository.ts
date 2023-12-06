import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { SucursalRepository } from '../../application/SucursalRepository'
import { Either, Left, Right } from '../../domain/Either'
import { Sucursal } from '../../domain/Sucursal'
import { ServerError } from '../../domain/errors/Error'
import { ModelToUserDomain } from './ModelToUserDomain'

@Service()
export class DbSucursalRepository implements SucursalRepository {
  private readonly prismaClient = new PrismaClient()

  async createSucursal(sucursal: Sucursal): Promise<Either<ServerError, Sucursal>> {
    try {
      const sucursalCreated = await this.prismaClient.sucursal.create({
        data: {
          name: sucursal.sucursalName,
          address: sucursal.address,
          dimedicalBrand: sucursal.dimedicalBrand,
          phone: sucursal.phone
        }
      })

      sucursal.sucursalId = sucursalCreated.id
      return Right.create(sucursal)
    } catch (error) {
      console.log(error);
      
      return Left.create(ServerError.SERVER_ERROR)
    }

  }
  async updateSucursal(sucursal: Sucursal): Promise<Either<ServerError, Sucursal>> {
    try {
      const updatedSucursal = await this.prismaClient.sucursal.update({
        data: {
          name: sucursal.sucursalName,
          address: sucursal.address,
          dimedicalBrand: sucursal.dimedicalBrand,
          phone: sucursal.phone
        },
        where: {
          id: sucursal.sucursalId
        }
      })

      sucursal.address = updatedSucursal.address
      sucursal.dimedicalBrand = updatedSucursal.dimedicalBrand
      sucursal.phone = updatedSucursal.phone
      sucursal.sucursalName = updatedSucursal.name

      return Right.create(sucursal)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async deleteSucursalById(resourceId: string): Promise<Either<ServerError, void>> {
    try {
      await this.prismaClient.sucursal.delete({
        where: {
          id: resourceId
        }
      })

      return Right.create(undefined)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

  async findSucursalById(sucursalId: string): Promise<Either<ServerError, Sucursal>> {
    try {
      const sucursalById = await this.prismaClient.sucursal.findUnique({
        where: {
          id: sucursalId
        },
        include: {
          user: true
        }
      })
      
      console.log(sucursalById?.user);
      
  
      if (!sucursalById) {
        return Left.create(ServerError.NOT_FOUND)
      }  
      const sucursal = new Sucursal(
        sucursalById.id, 
        sucursalById.name, 
        sucursalById.address,
        sucursalById.phone, 
        sucursalById.dimedicalBrand
      )
      const usersModelToDomain = ModelToUserDomain.fromUsers(sucursalById.user)
      sucursal.employees = usersModelToDomain
      return Right.create(sucursal)
    } catch (error) {
      return Left.create(ServerError.SERVER_ERROR)
    }
  }

}
