
import { QuestionOption } from '@prisma/client'
import { Option as DomainOption } from '../../domain/Option'

export class ModelToDomainOption {
  public static fromOptions(options: QuestionOption[]) {
   const domainOptions = options.map((option) => {
    return new DomainOption(option.id, option.value, option.order)
   }) 

   return domainOptions
  }

  public static fromOptionsInsights(options: any[]) {
    const domainOptions = options.map((option) => {
     const domainOption = new DomainOption(option.id, option.value, option.order)
     domainOption.totalAnswers = option._count.answerOption
     return domainOption
    }) 
 
    return domainOptions
   }
}
