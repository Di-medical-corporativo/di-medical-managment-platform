import 'reflect-metadata'

import { Body, Get, JsonController, Post, QueryParams, Res } from 'routing-controllers'
import { Service } from 'typedi'
import { CreateItineraryDto } from '../dto/CreateItinearyDto'
import { ItineraryService } from '../../application/ItineraryService';
import { PaginationDto } from '../../../shared/infra/dto/PaginationDto';
import { Response } from 'express';

@JsonController('/itinerary')
@Service()
export class ItineraryRestController {

  constructor(
    private itineraryService: ItineraryService
  ) {}

  @Post('/new')
  public async createItinerary(
    @Body() itineryToCreate: CreateItineraryDto
  ) {
    const itineraryOrError = await this.itineraryService.createItinerary(itineryToCreate)
    if(itineraryOrError.isLeft()) {
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
      return itinerariesOrError.error
    }

    return itinerariesOrError.value
  }
}
