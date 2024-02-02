import 'reflect-metadata'

import { Body, Get, JsonController, Param, Post, Put, QueryParams, Res } from 'routing-controllers'
import { Service } from 'typedi'
import { CreateItineraryDto } from '../dto/CreateItinearyDto'
import { ItineraryService } from '../../application/ItineraryService';
import { PaginationDto } from '../../../shared/infra/dto/PaginationDto';
import { Response } from 'express';
import { UpdatePoinDto } from '../dto/UpdatePointDto';

@JsonController('/itinerary')
@Service()
export class ItineraryRestController {

  constructor(
    private itineraryService: ItineraryService
  ) {}

  @Post('/new')
  public async createItinerary(
    @Body() itineryToCreate: CreateItineraryDto,
    @Res() response: Response
  ) {
    const itineraryOrError = await this.itineraryService.createItinerary(itineryToCreate)
    if(itineraryOrError.isLeft()) {
      response.status(itineraryOrError.error.status)
      return itineraryOrError.error
    }

    return itineraryOrError.value
  }

  @Get()
  public async getItineraryPaginated(
    @QueryParams() query: PaginationDto,
    @Res() response: Response
  ) {
    const itinerariesOrError = await this.itineraryService.getItineraryPaginated(query.page)

    if(itinerariesOrError.isLeft()) {
      response.status(itinerariesOrError.error.status)
      return itinerariesOrError.error
    }

    return itinerariesOrError.value
  }

  @Get('/:itineraryId')
  public async getItineraryById(
    @Param('itineraryId') itineraryId: string,
    @Res() response: Response
  ) {
    const itineraryOrError = await this.itineraryService.getItineraryById(itineraryId)

    if(itineraryOrError.isLeft()) {
      response.status(itineraryOrError.error.status)
      return itineraryOrError.error
    }

    return itineraryOrError.value
  }

  @Get('/point/:pointId')
  public async getPointById (
    @Param('pointId') pointId: string,
    @Res() response: Response
  ) {
    const pointOrError = await this.itineraryService.getPointById(pointId)

    if(pointOrError.isLeft()) {
      response.status(pointOrError.error.status)
      return pointOrError.error
    }

    return pointOrError.value
  }

  @Put('/point/:pointId')
  public async updatePointById(
    @Param('pointId') pointId: string,
    @Body() updatePointDto: UpdatePoinDto,
    @Res() response: Response
  ) {
    const pointUpdateOrError = await this.itineraryService.updatePointById(pointId, updatePointDto)
    console.log(updatePointDto)
    if(pointUpdateOrError.isLeft()) {
      response.status(pointUpdateOrError.error.status)
      return pointUpdateOrError.error
    }

    return pointUpdateOrError.value
  }
}
