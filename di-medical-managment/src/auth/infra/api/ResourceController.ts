import 'reflect-metadata'
import { JsonController, Post, Body, Param, Put, Get, Res, Delete, OnUndefined, UseBefore } from 'routing-controllers'
import { Service } from 'typedi'
import { Response } from 'express'
import { CreateResourceDto } from '../dto/CreateResourceDto'
import { ResourceService } from '../../application/ResourceService'
import { UpdateResourceDto } from '../dto/UpdateResourceDto'
import { IsAuthenticated } from '../middlewares/IsAuthenticated'

@JsonController('/resource')
@UseBefore(IsAuthenticated)
@Service()
export class ResourceRestController {
  constructor (
    private resourceService: ResourceService
  ) {}

  @Post('/new')
  public async createResource (@Body() resource: CreateResourceDto, @Res() response: Response) {
    const viewCreated = await this.resourceService.createResource(resource)
    if(viewCreated.isLeft()){
      response.status(viewCreated.error.status)
      return viewCreated.error
    }

    response.status(201)
    return viewCreated.value
  }

  @Get('/:id')
  public async getResourceById (@Param('id') resourceId: string, @Res() response: Response ) {
    const resourceById = await this.resourceService.findResourceById(resourceId)
    if(resourceById.isLeft()) {
      response.status(resourceById.error.status)
      return resourceById.error
    }

    return resourceById.value
  }

  @Put('/:id')
  public async updateResourceById (
    @Param('id') resourceId: string, 
    @Body() resourceToUpdate: UpdateResourceDto, 
    @Res() response: Response
    ) {
    const updatedView = await this.resourceService.updateResource(resourceId, resourceToUpdate)

    if(updatedView.isLeft()) {
      response.status(updatedView.error.status)
      return updatedView.error
    }

    return updatedView.value
  }

  @Delete('/:id')
  @OnUndefined(200)
  public async deleteResourceById(
    @Param('id') resourceId: string,
    @Res() response: Response 
  ) {
    const deletedView = await this.resourceService.deleteResourceById(resourceId)

    if(deletedView.isLeft()) {
      response.status(deletedView.error.status)
      return deletedView.error
    }
    return deletedView.value
  }
}
