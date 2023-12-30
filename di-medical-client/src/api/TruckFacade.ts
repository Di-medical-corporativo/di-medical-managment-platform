import { AxiosError } from 'axios'
import { api } from 'src/boot/axios'
import { Either, Left, Right } from 'src/entities/Either'
import { PaginatedResult } from 'src/entities/PaginatedResult'
import { Truck } from 'src/entities/Truck'

export interface TruckFacadeI {
  createTruck(truck: Truck): Promise<Either<string, Truck>>
  getTrucksPaginated(page: number): Promise<Either<string, PaginatedResult<Truck>>>
}

export class TruckFacade implements TruckFacadeI {
  async createTruck(truckToCreate: Truck): Promise<Either<string, Truck>> {
    try {
      const truckFormData = new FormData()
      truckFormData.append('file', truckToCreate.picture)
      truckFormData.append('model', truckToCreate.model)
      truckFormData.append('brand', truckToCreate.brand)
      truckFormData.append('plates', truckToCreate.plates)
      const { data } = await api.post('/truck/new', truckFormData)
      return Right.create(truckToCreate)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async getTrucksPaginated(page: number): Promise<Either<string, PaginatedResult<Truck>>> {
    try {
      const { data } = await api.get('/truck', {
        params: {
          page
        }
      })

      const trucksDomain = data._results.map((result: { 
        _truckId: string | undefined; 
        _plates: string; 
        _model: string; 
        _brand: string; 
        _picture: string | File; 
        _isActive: boolean 
      }) => new Truck(
        result._truckId,
        result._plates,
        result._model,
        result._brand,
        result._picture,
        result._isActive
      ))

      return Right.create(new PaginatedResult<Truck>(trucksDomain, data._pages))
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }
}
