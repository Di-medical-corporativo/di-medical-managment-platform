import { Inject, Service } from 'typedi'
import { CreateItineraryDto } from '../infra/dto/CreateItinearyDto'
import { Either, Left, Right } from '../../shared/domain/Either'
import { BaseError } from '../../shared/domain/errors/Error'
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
    private readonly truckService: TruckService
  ) {}

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
          invoice.description,
          new Date(),
          new Date()
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

      const point = new Point(
        undefined,
        clientOrError.value,
        userAssignedOrerror.value,
        truckOrError.value,
        invoices,
        new Date(),
        new Date()
      )

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
      sucursalOrError.value,
      new Date(),
      new Date()
    )

    itinerary.points = unfoldedPoints

    const itineraryCreatedOrError = await this.itineraryRepository.createItinerary(itinerary)
    console.log(itineraryCreatedOrError);
    
    return Right.create(itinerary)
  }
}
