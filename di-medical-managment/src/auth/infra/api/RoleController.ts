import 'reflect-metadata'

import { JsonController, Post, Body, Param, Put, Get, Res, Delete, UseBefore } from 'routing-controllers'
import { Service } from 'typedi'
import { RoleService } from '../../application/RoleService'
import { CreateRoleDto } from '../dto/CreateRoleDto'
import { UpdateRoleDto } from '../dto/UpdateRoleDto'
import { Response, response } from 'express'
import { IsAuthenticated } from '../middlewares/IsAuthenticated'

@JsonController('/roles')
@Service()
export class RoleRestController {
  constructor (
    private roleService: RoleService
  ) {}

  @Post('/new')
  public async createRole (@Body() role: CreateRoleDto, @Res() response: Response) {
    const roleOrError = await this.roleService.createRole(role)
    if(roleOrError.isLeft()) {
      response.status(roleOrError.error.status)
      return roleOrError.error
    }
    return roleOrError.value
  }

  @Put('/:id/update')
  public async updateRole (@Body() role: UpdateRoleDto, @Param('id') roleId: string, @Res() response: Response) {
    const roleOrError = await this.roleService.updateRole(role, roleId)
    if(roleOrError.isLeft()){
      response.status(roleOrError.error.status)
      return roleOrError.error
    }

    return roleOrError.value
  }

  @Get('/:id')
  public async getById (@Param('id') roleId: string, @Res() response: Response) {
    const roleOrError = await this.roleService.findById(roleId)
    if(roleOrError.isLeft()){
      response.status(roleOrError.error.status)
      return roleOrError.error
    }

    return roleOrError.value
  }

  @Delete('/:id/delete')
  public async deleteById (@Param('id') roleId: string, @Res() response: Response) {
    const roleIdOrError = await this.roleService.deleteRoleById(roleId)
    if(roleIdOrError.isLeft()){
      response.status(roleIdOrError.error.status)
      return roleIdOrError.error
    }

    return roleIdOrError.value
  }

  @Get()
  public async getAllRoles() {
    const rolesOrError = await this.roleService.getAllRoles()
    if(rolesOrError.isLeft()) {
      response.status(rolesOrError.error.status)
      return rolesOrError.error
    }

    return rolesOrError.value
  }
}
