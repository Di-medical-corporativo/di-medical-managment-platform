
import { QuestionOption } from '@prisma/client'
import { Option as DomainOption } from '../../domain/Option'

export class ModelToDomainOption {
  public static fromOptions(options: QuestionOption[]) {
   const domainOptions = options.map((option) => {
    return new DomainOption(option.id, option.value, option.order)
   }) 

   return domainOptions
  }
}
