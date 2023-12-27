import 'reflect-metadata'

import { JsonController, Post, Body, Param, Res, Get, UseBefore, UploadedFile, OnUndefined } from 'routing-controllers'
import { Service } from 'typedi'
import { Response, response } from 'express'
import { CreateUserDto } from '../dto/CreateUserDto'
import { UserService } from '../../../shared/application/UserService'
import { LoginUserDto } from '../dto/LoginUserDto'
import { IsAuthenticated } from '../middlewares/IsAuthenticated'
import { CheckTokenDto } from '../dto/CheckTokenDto'
import { FirebaseStorageService } from '../../../shared/infra/imageUpload/FirebaseStorage'
import { SharpProcessor } from '../../../shared/infra/imageModifier/Sharp'
import { UserExits } from '../../domain/Errors'

@JsonController('/auth')
@Service()
export class AuthRestController {
  constructor(
    private userService: UserService,
    private imageUploadService: FirebaseStorageService,
    private imageProcessing: SharpProcessor
  ) { }

  @Post('/new')
  @OnUndefined(201)
  public async createUser(
    @Body() user: CreateUserDto,
    @Res() response: Response,
    @UploadedFile("file") file: any,
  ) {
    const userExits = await this.userService.findUserByEmail(user.email)

    if (userExits.isRight()) {
      return new UserExits()
    }

    const resizeImage = await this.imageProcessing.resize(file as Buffer, 250, 250)
    if (resizeImage.isLeft()) {
      return resizeImage.error
    }
      
    const userImageUrl = await this.imageUploadService.upload(resizeImage.value)
    const userOrError = await this.userService.createUser(user, userImageUrl[0])
    
    if (userOrError.isLeft()) {
      response.status(userOrError.error.status)
      return userOrError.error
    }
    return userOrError.value
  }

  @Post('/login')
  public async login(@Body() credentials: LoginUserDto, @Res() response: Response) {
    const authCredentials = await this.userService.loginUser(credentials)
    if (authCredentials.isLeft()) {
      response.status(authCredentials.error.status)
      return authCredentials.error
    }

    return authCredentials.value
  }

  @Get('/:userId/resources')
  public async getResourcesByUser(@Param('userId') userId: string) {
    const resourcesOrError = await this.userService.resourcesByUser(userId)

    if (resourcesOrError.isLeft()) {
      response.status(resourcesOrError.error.status)
      return resourcesOrError.error
    }

    return resourcesOrError.value
  }

  @Post('/checkAuth')
  public async checkToken(
    @Body() token: CheckTokenDto,
    @Res() response: Response
  ) {
    const tokenValid = await this.userService.checkAuth(token)
    if (tokenValid.isLeft()) {
      response.status(tokenValid.error.status)
      return tokenValid.error
    }
    return tokenValid.value
  }
}
