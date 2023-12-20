import { Credentials } from "src/entities/Credentials";
import { Either, Left, Right } from "src/entities/Either";
import { User } from "src/entities/User";
import { ApiFacadeI } from "./ApiFacadeInterface";
import { api } from "src/boot/axios";
import { AxiosError } from "axios";
import { Resource } from "src/entities/Resource";
import { Sucursal } from "src/entities/Sucursal";

export class ApiFacade implements ApiFacadeI {
  async login(credentials: Credentials): Promise<Either<string, User>> {
    try {
      const { data } = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      })
      
      const { resources, user, token } = data
      
      const domainResources = resources.map((resource: { _id: string; _name: string; _description: string; }) => new Resource(
        resource._name,
        resource._description
      ))

      const domainUser = new User(
        user._userId,
        user._firstName,
        user._lastName,
        user._birthDate,
        user._nss,
        user._job,
        user._picture,
        user._phone,
        user._email,
        user._isActive,
        user._createdAt,
        user._updatedAt,
        token,
        domainResources
      )
      return Right.create(domainUser)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async checkAuth(tokenToTest: string): Promise<Either<string, User>> {
    try {
      const { data } = await api.post('/auth/checkAuth', {
        value: tokenToTest
      })

      const { resources, user, token } = data
      const domainResources = resources.map((resource: { _id: string; _name: string; _description: string; }) => new Resource(
        resource._name,
        resource._description
      ))
      
      const domainUser = new User(
        user._userId,
        user._firstName,
        user._lastName,
        user._birthDate,
        user._nss,
        user._job,
        user._picture,
        user._phone,
        user._email,
        user._isActive,
        user._createdAt,
        user._updatedAt,
        token,
        domainResources
      )
      
      return Right.create(domainUser)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async registerSucursal(sucursal: Sucursal): Promise<Either<string, Sucursal>> {
    try {
      const { data } = await api.post('/sucursal/new', {
        name: sucursal.name,
        address: sucursal.address,
        dimedicalBrand: sucursal.dimedicalBrand,
        phone: sucursal.phone
      })

      console.log(data);
      return Right.create(sucursal)

    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }
}
