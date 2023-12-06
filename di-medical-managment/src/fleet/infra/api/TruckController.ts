import 'reflect-metadata'

import { JsonController, Post, Body, Param, Res, Get, UseBefore, Put, Delete, OnUndefined } from 'routing-controllers'
import { Service } from 'typedi'
import { Response, response } from 'express'
import { IsAuthenticated } from '../../../auth/infra/middlewares/IsAuthenticated'
import { CreateTruckDto } from '../dto/CreateTruckDto'
import { TruckService } from '../../application/TruckService'
import { CreateIncidentDto } from '../dto/CreateIncidentDto'
import { UpdateTruckDto } from '../dto/UpdateTruckDto'

@JsonController('/truck')
@Service()
export class TruckRestController {
  constructor (
    private truckService: TruckService
  ) {}

  @Post('/new')
  public async createTruck (@Body() truck: CreateTruckDto, @Res() response: Response) {
    const truckOrError = await this.truckService.createTruck(truck)
    if(truckOrError.isLeft()) {
      response.status(truckOrError.error.status)
      return truckOrError.error
    }
    return truckOrError.value
  }

  @Get('/:truckId')
  public async getTruckById (@Param('truckId') truckId: string, @Res() response: Response) {
    const truckOrError = await this.truckService.getTruckById(truckId)
    if(truckOrError.isLeft()) {
      response.status(truckOrError.error.status)
      return truckOrError.error
    }
    return truckOrError.value
  }

  @Put('/:id/incident')
  public async addIncident (
    @Param('id') truckId: string,
    @Body() incident: CreateIncidentDto,
    @Res() response: Response
  ) {
    const truckOrError = await this.truckService.addIncidentToTruck(truckId, incident)
    if(truckOrError.isLeft()) {
      response.status(truckOrError.error.status)
      return truckOrError.error
    }

    return truckOrError.value
  }

  @Delete('/:truckId/incident/:incidentId')
  public async removeIncident (
    @Param('truckId') truckId: string,
    @Param('incidentId') incidentId: string,
    @Res() response: Response
  ) {
    const truckOrError = await this.truckService.removeIncident(truckId, incidentId)
    if(truckOrError.isLeft()) {
      response.status(truckOrError.error.status)
      return truckOrError.error
    }
    return truckOrError.value
  }

  @Put('/:truckId')
  public async updateTruck(
    @Param('truckId') truckId: string,
    @Body() truckToUpdate: UpdateTruckDto ,
    @Res() response: Response
  ){
    const truckOrError = await this.truckService.updateTruck(truckId, truckToUpdate)
    if(truckOrError.isLeft()) {
      response.status(truckOrError.error.status)
      return truckOrError.error
    }

    return truckOrError.value
  }

  @Delete('/:truckId')
  @OnUndefined(200)
  public async deleteTruck(
    @Param('truckId') truckId: string,
    @Res() response: Response
  ) {
    const truckDeletedOrError = await this.truckService.deleteTruck(truckId)

    if(truckDeletedOrError.isLeft()) {
      response.status(truckDeletedOrError.error.status)
      return truckDeletedOrError.error
    }

    return truckDeletedOrError.value
  }
 }
