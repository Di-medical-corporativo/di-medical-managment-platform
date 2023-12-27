import 'reflect-metadata'
import { JsonController, Post, Body, Param, Put, Get, Res, Delete, OnUndefined, UseBefore } from 'routing-controllers'
import { Service } from 'typedi'
import { Response, response } from 'express'
import { CreateSucursalDto } from '../dto/CreateSucursalDto'
import { SucursalService } from '../../application/SucursalService'
import { UpdateSucursalDto } from '../dto/UpdateSucursalDto'
import { IsAuthenticated } from '../../../auth/infra/middlewares/IsAuthenticated'

@JsonController('/sucursal')
@Service()
export class SucursalRestController {
  constructor(
    private sucursalService: SucursalService
  ) {}

  @Post('/new')
  public async createSucursal(@Body() sucursal: CreateSucursalDto, @Res() response: Response) {
    const sucursalCreated = await this.sucursalService.createSucursal(sucursal)

    if(sucursalCreated.isLeft()) {
      response.status(sucursalCreated.error.status)
      return sucursalCreated.error
    }

    return sucursalCreated.value
  }

  @Put('/:id/update')
  public async updateSucursal(
    @Body() sucursal: UpdateSucursalDto,
    @Param('id') sucursalId: string, 
    @Res() response: Response
  ) {
    const sucursalUpdatedOrError = await this.sucursalService.updateSucursal(
      sucursalId, 
      sucursal
    )

    if(sucursalUpdatedOrError.isLeft()) {
      response.status(sucursalUpdatedOrError.error.status)
      return sucursalUpdatedOrError.error
    }
    return sucursalUpdatedOrError.value
  }

  @Get('/:id')
  public async getSucursalById(
    @Param('id') sucursalId: string,
    @Res() response: Response
  ) {
    const sucursalOrError = await this.sucursalService.findSucursalById(sucursalId)

    if(sucursalOrError.isLeft()) {
      response.status(sucursalOrError.error.status)
      return sucursalOrError.error
    }

    return sucursalOrError.value
  }

  @Delete('/:id')
  @OnUndefined(200)
  public async deleteSucursalById(
    @Param('id') id: string,
    @Res() response: Response
  ) {
    const deletedView = await this.sucursalService.deleteSucursalById(id)
    if(deletedView.isLeft()) {
      response.status(deletedView.error.status)
      return deletedView.error
    }
    return deletedView.value
  }


  @Get()
  public async getAllSucursal() {
    const sucursalList = await this.sucursalService.getAllSucursal()
    if(sucursalList.isLeft()) {
      response.status(sucursalList.error.status)
      return sucursalList.error
    }

    return sucursalList.value
  }
}
