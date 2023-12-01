import 'reflect-metadata'

import { Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Res, UseBefore } from 'routing-controllers'
import { Service } from 'typedi'
import { IsAuthenticated } from '../../../auth/infra/middlewares/IsAuthenticated'
import { CreateClientDto } from '../dto/CreateClientDto'
import { Response, response } from 'express'
import { ClientService } from '../../application/ClientService'
import { UpdateClientDto } from '../dto/UpdateClientDto'

@JsonController('/clients')
@Service()
@UseBefore(IsAuthenticated)
export class ClientRestController {

  constructor(
    private clientService: ClientService
  ) {}

  @Post('/new')
  public async createClient(
    @Body() clientToCreate: CreateClientDto,
    @Res() response: Response
  ) {
    const clientCreatedOrError = await this.clientService.createClient(clientToCreate)
    if(clientCreatedOrError.isLeft()) {
      response.status(clientCreatedOrError.error.status)
      return clientCreatedOrError.error
    }

    return clientCreatedOrError.value
  }

  @Get('/:clientId')
  public async getClientById(
    @Param('clientId') clientId: string,
    @Res() response: Response
  ) {
    const clientByIdOrError = await this.clientService.getClientById(clientId)

    if(clientByIdOrError.isLeft()) {
      response.status(clientByIdOrError.error.status)
      return clientByIdOrError.error
    }

    return clientByIdOrError.value
  }

  @Put('/:clientId')
  public async updateClientById(
    @Param('clientId') clientId: string,
    @Body() clientToUpdate: UpdateClientDto,
    @Res() response: Response
  ) {
    const clientUpdatedOrError = await this.clientService.updateClientById(clientId, clientToUpdate)
    if(clientUpdatedOrError.isLeft()) {
      response.status(clientUpdatedOrError.error.status)
      return clientUpdatedOrError.error
    }

    return clientUpdatedOrError.value
  }

  @Delete('/:clientId')
  @OnUndefined(200)
  public async deleteClientById(
    @Param('clientId') clientId: string,
    @Res() response: Response
  ) {
    const clientDeleteOrError = await this.clientService.deleteClientById(clientId)
    if(clientDeleteOrError.isLeft()) {
      response.status(clientDeleteOrError.error.status)
      return clientDeleteOrError.error
    }

    return clientDeleteOrError.value
  }
}
