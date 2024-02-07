import { Inject, Service } from 'typedi'
import { CreateItineraryDto } from '../infra/dto/CreateItinearyDto'
import { Either, Left, Right } from '../../shared/domain/Either'
import { BaseError, ServerError } from '../../shared/domain/errors/Error'
import { Itinerary } from '../domain/Itinerary'
import { DbItineraryRepository } from '../infra/prisma/DbItineraryRepository'
import { ItineraryRepository } from './ItineraryRepository'
import { SucursalService } from '../../shared/application/SucursalService'
import { UnknowError } from '../../auth/domain/Errors'
import { Invoice } from '../domain/Invoice'
import { Point } from '../domain/Point'
import { ClientService } from './ClientService'
import { UserService } from '../../shared/application/UserService'
import { TruckService } from './TruckService'
import { NotFound } from '../domain/Errors'
import { SurveyService } from '../../survey/application/SurveyService'
import { UpdatePoinDto } from '../infra/dto/UpdatePointDto'

@Service()
export class ItineraryService {
  constructor (
    @Inject(() => DbItineraryRepository)
    private readonly itineraryRepository: ItineraryRepository,
    @Inject(() => SucursalService)
    private readonly sucursalService: SucursalService,
    @Inject(() => ClientService)
    private readonly clientService: ClientService,
    @Inject(() => UserService)
    private readonly userService: UserService,
    @Inject(() => TruckService)
    private readonly truckService: TruckService,
    @Inject(() => SurveyService)
    private readonly surveyService: SurveyService
  ) {}

  public async getItineraryPaginated(page: number) {
    const itinerariesOrError = await this.itineraryRepository.getItineraryPaginated(page)

    if(itinerariesOrError.isLeft()) {
      return this.unfoldError(itinerariesOrError.error)
    }

    return itinerariesOrError
  }

  public async getPointById(pointId: string) {
    const pointOrError = await this.itineraryRepository.getPointById(pointId)
    
    if(pointOrError.isLeft()) {
      return this.unfoldError(pointOrError.error)
    }

    return pointOrError
  }

  public async createItinerary (itineraryToCreate: CreateItineraryDto): Promise<Either<BaseError, Itinerary>> {
    const sucursalOrError = await this.sucursalService.findSucursalById(itineraryToCreate.sucursalId)
    if(sucursalOrError.isLeft()) {
      return sucursalOrError
    }

    const pointsPromise = itineraryToCreate.points.map(async (pointToCreate) => {
      const invoices = pointToCreate.invoices.map((invoice) => 
        new Invoice(
          undefined, 
          invoice.invoiceNumber, 
          invoice.description ? invoice.description : 'Sin Descripción'
          )
      )

      const clientOrError = await this.clientService.getClientById(pointToCreate.clientId)
      if(clientOrError.isLeft()) {
        return clientOrError
      }

      const userAssignedOrerror = await this.userService.findUserById(pointToCreate.assignedUserId)
      if(userAssignedOrerror.isLeft()) {
        return userAssignedOrerror
      }

      const truckOrError = await this.truckService.getTruckById(pointToCreate.truckId)

      if(truckOrError.isLeft()) {
        return truckOrError
      }

      let surveyOrError
      if(pointToCreate.surveyId){
        surveyOrError = await this.surveyService.getSurveyById(pointToCreate.surveyId)

        if(surveyOrError.isLeft()) {
          return surveyOrError
        }
      }

      const point = new Point(
        undefined
      )
      point.client = clientOrError.value
      point.invoices = invoices
      point.assignedDriver = userAssignedOrerror.value
      point.truck = truckOrError.value
      if(pointToCreate.surveyId) {
        const surveyOrError = await this.surveyService.getSurveyById(pointToCreate.surveyId)
        
        if(surveyOrError.isLeft()) {
          return surveyOrError
        }

        point.survey = surveyOrError.value
      }

      return Right.create(point)
    })

    const points = await Promise.all(pointsPromise)
    const includesErrorCreatingPoints = points.find((point) => point.isLeft())

    if(includesErrorCreatingPoints?.isLeft()) {
      return includesErrorCreatingPoints
    }

    const createdPointsFolded = points.filter((point) => point.isRight())
    const unfoldedPoints: Point[] = []
    
    createdPointsFolded.forEach((folded) => {
      if(folded.isRight()) {
        unfoldedPoints.push(folded.value)
      }
    })

    const itinerary = new Itinerary(
      undefined,
      new Date(),
      new Date(),
      itineraryToCreate.scheduleDate
    )

    itinerary.sucursal = sucursalOrError.value
    itinerary.points = unfoldedPoints
    const itineraryCreatedOrError = await this.itineraryRepository.createItinerary(itinerary)
    
    if(itineraryCreatedOrError.isLeft()) {
      return this.unfoldError(itineraryCreatedOrError.error)
    }
    
    return itineraryCreatedOrError
  }

  public async getItineraryById(itineraryId: string) {
    const itineraryOrError = await this.itineraryRepository.getItineraryById(itineraryId)

    if(itineraryOrError.isLeft()) {
      return this.unfoldError(itineraryOrError.error)
    }

    return itineraryOrError
  }

  public async updatePointById(itineraryId: string, updateItineraryDto: UpdatePoinDto) {
    const pointOrError = await this.getPointById(itineraryId)

    if(pointOrError.isLeft()) {
      return pointOrError
    }

    pointOrError.value.done = true
    if(updateItineraryDto.comment) {
      pointOrError.value.comment = updateItineraryDto.comment
    }

    pointOrError.value.problem = updateItineraryDto.problem
    const updatedPointOrError = await this.itineraryRepository.updatePointById(pointOrError.value)

    if(updatedPointOrError.isLeft()) {
      return this.unfoldError(updatedPointOrError.error)
    }

    return updatedPointOrError
  }

  public async finishItineraryById(itineraryId: string) {
    const itineraryOrError = await this.getItineraryById(itineraryId)
    console.log(itineraryOrError)
    if(itineraryOrError.isLeft()) {
      return itineraryOrError
    }

    const updatedItinerary = await this.itineraryRepository.finishItinerary(itineraryOrError.value)
    
    if(updatedItinerary.isLeft()) {
      return this.unfoldError(updatedItinerary.error)
    }

    return updatedItinerary
  }

  private unfoldError (error: ServerError) {
    switch (error) {
      case ServerError.NETWORK_ERROR:
      case ServerError.SERVER_ERROR:
        return Left.create(new UnknowError())
      case ServerError.NOT_FOUND:
        return Left.create(new NotFound())
      default:
        return Left.create(new UnknowError())
    }
  }
}
