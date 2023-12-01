import { View, ViewByResource } from '@prisma/client'
import { View as DomainView } from '../../domain/View'

export class ModelToDomainView {
  public static from (views: View[] | undefined): DomainView[] {
    return views!.map((view) => new DomainView(
      view.id, 
      view.name,
      view.slug, 
      view.description
    ))
  }
}
