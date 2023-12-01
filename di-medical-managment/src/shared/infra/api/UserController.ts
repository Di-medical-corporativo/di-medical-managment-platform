import 'reflect-metadata'
import { JsonController, Post, Body, Param, Put, Get, Res, Delete, OnUndefined, Params, UseBefore } from 'routing-controllers'
import { Service } from 'typedi'
import { Response, response } from 'express'
import { UserService } from '../../application/UserService'
import { UpdateUserDto } from '../dto/UpdateUserDto'
import { IsAuthenticated } from '../../../auth/infra/middlewares/IsAuthenticated'

@JsonController('/user')
@UseBefore(IsAuthenticated)
@Service()
export class UserRestController {
  constructor (
    private userService: UserService
  ) {}

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
