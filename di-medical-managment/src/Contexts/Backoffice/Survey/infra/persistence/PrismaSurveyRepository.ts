import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { Survey } from "../../domain/Survey";
import { SurveyRepository } from "../../domain/SurveyRepository";

export class PrismaSurveyRepository implements SurveyRepository {
  async save(survey: Survey): Promise<void> {
    const surveyPlain = survey.toPrimitives();
    
    await prisma.survey.create({
      data: {
        active: surveyPlain.isActive,
        description: surveyPlain.description,
        id: surveyPlain.id,
        title: surveyPlain.title,
        questions: {
          create: surveyPlain.questions.map(q => ({ 
            id: q.id, 
            text: q.text,
            order: q.order,
            type: q.type,
            options: {
              create: q.options.map(o => ({ id: o.id, value: o.value, order: o.order }))
            } 
          }))
        }        
      }
    });
  }
}
