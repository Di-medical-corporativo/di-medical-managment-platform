import 'reflect-metadata'

import { JsonController, Post, Body, Param, Put, Get, Res, Delete, OnUndefined, UseBefore } from 'routing-controllers'
import { Service } from 'typedi'
import { ViewService } from '../../application/ViewService'
import { CreateViewDto } from '../dto/CreateViewDto'
import { Response, response } from 'express'
import { UpdateViewDto } from '../dto/UpdateViewDto'
import { IsAuthenticated } from '../middlewares/IsAuthenticated'

@JsonController('/views')
@Service()
export class ViewRestController {
  constructor (
    private viewService: ViewService
  ) {}

  @Post('/new')
  public async createView (@Body() view: CreateViewDto, @Res() response: Response) {
    const slug = view.name.toLowerCase().split(' ')
    const slugFormated = slug.join('_')
    view.slug = slugFormated

    const viewCreated = await this.viewService.createView(view)
    if(viewCreated.isLeft()){
      response.status(viewCreated.error.status)
      return viewCreated.error
    }

    response.status(201)
    return viewCreated.value
  }

  @Get('/:slug')
  public async getViewBySlug (@Param('slug') slug: string, @Res() response: Response ) {
    const viewBySlug = await this.viewService.findViewBySlug(slug)
    if(viewBySlug.isLeft()) {
      response.status(viewBySlug.error.status)
      return viewBySlug.error
    }

    return viewBySlug.value
  }

  @Put('/:id')
  public async updateViewById (
    @Param('id') id: string, 
    @Body() viewToUpdate:UpdateViewDto, 
    @Res() response: Response
    ) {
    const updatedView = await this.viewService.updateViewById(id, viewToUpdate)

    if(updatedView.isLeft()) {
      response.status(updatedView.error.status)
      return updatedView.error
    }

    return updatedView.value
  }

  @Delete('/:id')
  @OnUndefined(200)
  public async deleteViewById(
    @Param('id') id: string
  ) {
    const deletedView = await this.viewService.deleteViewById(id)

    if(deletedView.isLeft()) {
      response.status(deletedView.error.status)
      return deletedView.error
    }
    return deletedView.value
  }
}
