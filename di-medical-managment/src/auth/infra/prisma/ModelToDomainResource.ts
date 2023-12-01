import { Resource } from '@prisma/client'
import { Resource as ResourceDomain } from '../../domain/Resource'

export class ModelToDomainResource {
  public static from (resources: Resource[] | undefined): ResourceDomain[] {
    return resources!.map((resource) => new ResourceDomain(
      resource.id,
      resource.name,
      resource.description
    ))
  }
}
