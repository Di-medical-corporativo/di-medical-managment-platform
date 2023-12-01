import { Resource } from "./Resource"

export class Role {
  private _resources: Resource[]
  constructor (
    private _roleId: string | undefined,
    private _name: string,
    private _description: string
  ) { }

  public get roleId (): string | undefined {
    return this._roleId
  }

  public set roleId (roleId: string) {
    this._roleId = roleId
  }

  public get name (): string {
    return this._name
  }

  public set name (name: string) {
    this._name = name
  }

  public get description (): string {
    return this._description
  }

  public set description (description: string) {
    this._description = description
  }

  public get resources () {
    return this._resources
  }

  public set resources (resources: Resource[]) {
    this._resources = resources
  }
}
