import 'reflect-metadata'

import { Body, Get, JsonController, Post } from 'routing-controllers'
import { Service } from 'typedi'
import { CreateItineraryDto } from '../dto/CreateItinearyDto'
import { ItineraryService } from '../../application/ItineraryService';

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
}
