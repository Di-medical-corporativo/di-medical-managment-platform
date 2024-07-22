import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { AnswerOption } from "../../domain/AnswerOption";
import { Option } from "../../domain/Option";
import { Question } from "../../domain/Question";
import { Response } from "../../domain/Response";
import { Survey } from "../../domain/Survey";
import { SurveyDescription } from "../../domain/SurveyDescription";
import { SurveyId } from "../../domain/SurveyId";
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

  async answer(response: Response): Promise<void> {
    const responsePlain = response.toPrimitives();

    interface Answer {
      id: string;
      questionId: string;
      answer: string;
      option: AnswerOption[];
    }

    await prisma.surveyResponse.create({
      data: {
        id: responsePlain.id,
        surveyId: responsePlain.surveyId,
        answers: {
          create: responsePlain.answers.map(a => {
            let answer: Answer = {
              id: a.id,
              questionId: a.questionId,
              answer: '',
              option: []
            };

            if(a.answerText) answer.answer = a.answerText

            if(a.option) answer.option.push(a.option);

            return {
              id: answer.id,
              answer: answer.answer,
              question: {
                connect: { id: answer.questionId }
              },
              answerOption: {
                create: answer.option.map(o => ({ 
                  option: { connect: { id: a.option.optionId } }, 
                  answerOptionId: a.option.id
                }))
              }
            };
          })
        }
      }
    });
  }

  async search(id: SurveyId): Promise<Survey | null> {
    const surveyDB = await prisma.survey.findFirst({
      where: {
        id: id.toString()
      },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });

    if(!surveyDB) {
      return null;
    }

    const questions = surveyDB.questions.map(q => {
      let question: {
        id: string;
        text: string;
        type: string;
        order: number;
        options: { id: string; value: string; order: number }[]
      } = {
        id: q.id,
        text: q.text,
        type: q.type,
        order: q.order,
        options: []
      }

      if(q.type == 'open') {
        return question;
      }

      let options = q.options.map(o => ({
        id: o.id,
        value: o.value,
        order: o.order
      }));

      question.options = options;
      
      return question;
    });

    const survey = Survey.fromPrimitives({
      id: surveyDB.id,
      description: surveyDB.description,
      isActive: surveyDB.active,
      title: surveyDB.title,
      questions: questions
    });

    return survey;
  }
}
