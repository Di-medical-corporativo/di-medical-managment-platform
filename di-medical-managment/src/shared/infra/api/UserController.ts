import 'reflect-metadata'
import { JsonController, Body, Param, Put, Get, Res, Delete, OnUndefined, QueryParams } from 'routing-controllers'
import { Service } from 'typedi'
import { Response, response } from 'express'
import { UserService } from '../../application/UserService'
import { UpdateUserDto } from '../dto/UpdateUserDto'
import { IsAuthenticated } from '../../../auth/infra/middlewares/IsAuthenticated'
import { PaginationDto } from '../dto/PaginationDto'

@JsonController('/user')
@Service()
export class UserRestController {
  constructor (
    private userService: UserService
  ) {}
  
  @Get()
  public async getUsersPaginated(
    @QueryParams() query: PaginationDto,
    @Res() response: Response
  ) {
    const users = await this.userService.getUsersPaginated(query.page)

    if(users.isLeft()) {
      response.status(users.error.status)
      return users.error
    }

    return users.value
  }

 @Get('/:id')
 public async getUserById(@Param('id') userId: string, @Res() response: Response){
  const userOrError = await this.userService.findUserById(userId)

  if(userOrError.isLeft()) {
    response.status(userOrError.error.status)
    return userOrError.error
  }

  return userOrError.value
 }

 @Put('/:id/update')
 public async updateUserById(
  @Body() userToUpdate: UpdateUserDto,
  @Param('id') userId: string,
  @Res() response: Response
  ) {
  const updateUserOrError = await this.userService.updateUser(userToUpdate, userId)
  
  if(updateUserOrError.isLeft()) {
    response.status(updateUserOrError.error.status)
    return updateUserOrError.error
  }

  return updateUserOrError.value
 }

 @Delete('/:id')
 @OnUndefined(200)
 public async deleteUserById (@Param('id') userId: string) {
  const deletedUserOrError = await this.userService.deleteUserById(userId)

  if(deletedUserOrError.isLeft()) {
    response.status(deletedUserOrError.error.status)
    return deletedUserOrError.error
  }

  return deletedUserOrError.value
 }
}
