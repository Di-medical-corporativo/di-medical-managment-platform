import { AxiosError } from 'axios'
import { api } from 'src/boot/axios'
import { Either, Left, Right } from 'src/entities/Either'
import { Truck } from 'src/entities/Truck'

export interface TruckFacadeI {
  createTruck(truck: Truck): Promise<Either<string, Truck>>
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
      console.log(data);
      return Right.create(truckToCreate)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }
}
