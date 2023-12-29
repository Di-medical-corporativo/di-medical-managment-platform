import { AxiosError } from "axios"
import { api } from "src/boot/axios"
import { Credentials } from "src/entities/Credentials"
import { Either, Left, Right } from "src/entities/Either"
import { PaginatedResult } from "src/entities/PaginatedResult"
import { Resource } from "src/entities/Resource"
import { User } from "src/entities/User"

export interface UserFacadeI {
  login(credentials: Credentials): Promise<Either<string, User>>
  registerUser(user: User): Promise<Either<string, User>>
  getAllUsersPaginated(page: number): Promise<Either<string, PaginatedResult<User>>>
  checkAuth(token: string): Promise<Either<string, User>>
}

export class UserFacade implements UserFacadeI {
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
      console.log(error);
      
      const axiosError: AxiosError = error as AxiosError
      const data = axiosError.response?.data as { message: string }
      return Left.create(data.message)
    }
  }
  

}
