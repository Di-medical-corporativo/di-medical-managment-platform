import { Inject, Service } from 'typedi'
import { DbSucursalRepository } from '../infra/prisma/DbSucursalRepository'
import { SucursalRepository } from './SucursalRepository'
import { Either, Left, Right } from '../domain/Either'
import { BaseError, ServerError } from '../domain/errors/Error'
import { Sucursal } from '../domain/Sucursal'
import { RoleNotFound, UnknowError } from '../../auth/domain/Errors'
import { CreateSucursalDto } from '../infra/dto/CreateSucursalDto'
import { UpdateSucursalDto } from '../infra/dto/UpdateSucursalDto'

@Service()
export class SucursalService {
  constructor(
    @Inject(() => DbSucursalRepository)
    private readonly sucursalRepository: SucursalRepository
  ) {}
  
  public async createSucursal (sucursalToCreate: CreateSucursalDto): Promise<Either<BaseError, Sucursal>> {
    const sucursal = new Sucursal(
      undefined, 
      sucursalToCreate.name, 
      sucursalToCreate.address, 
      sucursalToCreate.phone,
      sucursalToCreate.dimedicalBrand
    )

    const sucursalCreated: Either<ServerError, Sucursal> = await 
      this
      .sucursalRepository
      .createSucursal(sucursal)

    if(sucursalCreated.isLeft()) {
      return this.unfoldError(sucursalCreated.error)
    }

    return sucursalCreated

  }

  public async findSucursalById (id: string): Promise<Either<BaseError, Sucursal>> {
    const viewBySlugOrError = await this.sucursalRepository.findSucursalById(id)

    if(viewBySlugOrError.isLeft()) {
      return this.unfoldError(viewBySlugOrError.error)
    }
  
    return viewBySlugOrError
  }

  public async updateSucursal (sucursalId: string, sucursalToUpdate: UpdateSucursalDto): Promise<Either<BaseError, Sucursal>> {
    const sucursal = await this.findSucursalById(sucursalId)

    if(sucursal.isLeft()) {
      return sucursal
    }

    if(sucursalToUpdate.address) {
      sucursal.value.address = sucursalToUpdate.address
    }

    if(sucursalToUpdate.dimedicalBrand) {
      sucursal.value.dimedicalBrand = sucursalToUpdate.dimedicalBrand
    }

    if(sucursalToUpdate.name) {
      sucursal.value.sucursalName = sucursalToUpdate.name
    }

    if(sucursalToUpdate.phone) {
      sucursal.value.phone = sucursalToUpdate.phone
    }

    const updatedSucursal = await this.sucursalRepository.updateSucursal(sucursal.value)

    if(updatedSucursal.isLeft()) {
      return this.unfoldError(updatedSucursal.error)
    }

    return updatedSucursal

  }

  public async deleteSucursalById (sucarsalId: string) {
    const sucursal = await this.findSucursalById(sucarsalId)
    console.log(sucursal);
    
    if(sucursal.isLeft()){
      return sucursal
    }

    const deleted = await this.sucursalRepository.deleteSucursalById(sucarsalId)
    if(deleted.isLeft()) {
      return this.unfoldError(deleted.error)
    }

    return Right.create(undefined)
  }

  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new RoleNotFound())
      default:
        return Left.create(new UnknowError())
    }
  }
}
