import { Credentials } from "src/entities/Credentials";
import { Either, Left, Right } from "src/entities/Either";
import { User } from "src/entities/User";
import { ApiFacadeI } from "./ApiFacadeInterface";
import axios, { api } from "src/boot/axios";
import { AxiosError } from "axios";
import { Resource } from "src/entities/Resource";
import { Sucursal } from "src/entities/Sucursal";
import { Role } from "src/entities/Role";
import { PaginatedResult } from "src/entities/PaginatedResult";
import { Client } from "src/entities/Client";
import { Truck } from "src/entities/Truck";

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
        user._updatedAt
      )

      domainUser.token = token
      domainUser.resources = domainResources

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
        user._updatedAt
      )

      domainUser.token = token
      domainUser.resources = domainResources

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

      return Right.create(sucursal)

    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async getRoles(): Promise<Either<string, Role[]>> {
    try {
      const { data } = await api.get('/roles')
      const domainRoles = data.map((role: { _roleId: string | undefined; _name: string; _description: string; }) => new Role(role._roleId, role._name, role._description))
      return Right.create(domainRoles)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async getBranches(): Promise<Either<string, Sucursal[]>> {
    try {
      const { data } = await api.get('/sucursal')

      const domainBranches = data.map((branch: {
        _sucursalId: string | undefined;
        _sucursalName: string;
        _address: string;
        _phone: string;
        _dimedicalBrand: string;
      }) => new Sucursal(branch._sucursalId, branch._sucursalName, branch._address, branch._phone, branch._dimedicalBrand))
      return Right.create(domainBranches)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async registerUser(user: User): Promise<Either<string, User>> {
    try {
      const userFormData = new FormData()
      userFormData.append('file', user.picture)
      userFormData.append('firstName', user.firstName)
      userFormData.append('lastName', user.lastName)
      userFormData.append('birthDate', user.birthDate.toISOString())
      userFormData.append('nss', user.nss)
      userFormData.append('job', user.job)
      userFormData.append('phone', user.phone)
      userFormData.append('email', user.email)
      userFormData.append('sucursalId', user.sucursal?.id!)
      userFormData.append('password', user.password)
      user.roles.map(role => userFormData.append('roles[]', role.roleId!))
      const { data } = await api.post('/auth/new', userFormData)
      const { _userId } = data
      user.userId = _userId
      return Right.create(user)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async getAllUsersPaginated(page: number): Promise<Either<string, PaginatedResult<User>>> {
    try {
      const { data } = await api.get('/user', {
        params: {
          page
        }
      })

      const resultsDomain = data._results.map((result: { 
        _userId: string | undefined; 
        _firstName: string; 
        _lastName: string; 
        _birthDate: Date; 
        _nss: string; 
        _job: string; 
        _picture: string | File; 
        _phone: string; 
        _email: string; 
        _isActive: boolean; 
        _createdAt: Date; 
        _updatedAt: Date; 
      }) => new User(
        result._userId, 
        result._firstName, 
        result._lastName, 
        result._birthDate, 
        result._nss, 
        result._job, 
        result._picture, 
        result._phone, 
        result._email, 
        result._isActive, 
        result._createdAt, 
        result._updatedAt
        ))

      return Right.create(new PaginatedResult<User>(resultsDomain, data._pages))
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async registerClient(client: Client): Promise<Either<string, Client>> {
    try {
      const { data } = await api.post('/clients/new', {
        name: client.name,
        address: client.address
      })
      console.log(data)
      return Right.create(client)
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async getAllClientsPaginated(page: number): Promise<Either<string, PaginatedResult<Client>>> {
    try {
      const { data } = await api.get('/clients', {
        params: {
          page
        }
      })

      const resultsDomain = data._results.map((client: { _clientId: string | undefined; _name: string; _address: string; _isActive: boolean; }) => {
        return new Client(client._clientId, client._name, client._address, client._isActive)
      })

      return Right.create(new PaginatedResult<Client>(resultsDomain, data._pages))
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }

  async createTruck(truck: Truck): Promise<Either<string, Truck>> {
    throw new Error()
  }
}
