import prisma from "../../../../Shared/infra/persistence/PrismaDbConnection";
import { PointId } from "../../../Itinerary/domain/PointId";
import { AnswerOption } from "../../domain/AnswerOption";
import { QuestionResult, QuestionResultMultiple, QuestionResultOpen } from "../../domain/QuestionResult";
import { Response } from "../../domain/Response";
import { ResponsePoint } from "../../domain/ResponsePoint";
import { Survey } from "../../domain/Survey";
import { SurveyId } from "../../domain/SurveyId";
import { SurveyPreview } from "../../domain/SurveyPreview";
import { SurveyRepository } from "../../domain/SurveyRepository";
import { SurveyResponse } from "../../domain/SurveyResponse";
import { SurveyResult } from "../../domain/SurveyResult";
import { SurveyTotalAnswers } from "../../domain/SurveyTotalAnswers";

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

            if (a.answerText) answer.answer = a.answerText

            if (a.option) answer.option.push(a.option);

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

    if (!surveyDB) {
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

      if (q.type == 'open') {
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

  async findAll(): Promise<SurveyPreview[]> {
    const surveysDB = await prisma.survey.findMany({
      include: {
        _count: {
          select: {
            responses: true
          }
        }
      }
    });

    const surveys = surveysDB.map(s => SurveyPreview.fromPrimitives({
      id: s.id,
      description: s.description,
      totalAnswers: s._count.responses,
      title: s.title,
      isActive: s.active
    }));

    return surveys;
  }

  async close(id: SurveyId): Promise<void> {
    await prisma.survey.update({
      where: {
        id: id.toString()
      },
      data: {
        active: false
      }
    });
  }

  async open(id: SurveyId): Promise<void> {
    await prisma.survey.update({
      where: {
        id: id.toString()
      },
      data: {
        active: true
      }
    });
  }

  async results(id: SurveyId): Promise<SurveyResult | null> {
    const surveyDB = await prisma.survey.findFirst({
      where: {
        id: id.toString()
      },
      include: {
        questions: {
          orderBy: {
            order: "asc"
          },
          include: {
            _count: {
              select: {
                answers: true
              }
            },
            answers: {
              select: {
                answer: true
              }
            },
            options: {
              orderBy: {
                order: "asc"
              },
              include: {
                _count: {
                  select: { answerOption: true }
                }
              }
            }
          }
        },
        _count: {
          select: {
            responses: true
          }
        }
      }
    });

    if (!surveyDB) {
      return null;
    }

    const summaryPerQuestion: QuestionResult[] = surveyDB.questions.map(question => {
      if (question.type == 'open') {
        return QuestionResultOpen.fromPrimitives({
          id: question.id,
          question: question.text,
          response: question.answers.map(a => a.answer)
        });
      }

      return QuestionResultMultiple.fromPrimitives({
        id: question.id,
        question: question.text,
        responses: question.options.map(option => ({
          optionText: option.value,
          optionTotal: option._count.answerOption,
          questionTotal: question._count.answers
        }))
      })
    });

    const surveyResult = SurveyResult.create({
      id,
      total: new SurveyTotalAnswers(surveyDB._count.responses),
      results: summaryPerQuestion
    });


    return surveyResult;
  }

  async answerPoint(response: Response, pointId: PointId): Promise<void> {
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
        point: {
          connect: {
            id: pointId.toString()
          }
        },
        answers: {
          create: responsePlain.answers.map(a => {
            let answer: Answer = {
              id: a.id,
              questionId: a.questionId,
              answer: '',
              option: []
            };

            if (a.answerText) answer.answer = a.answerText

            if (a.option) answer.option.push(a.option);

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
              },
              
            };
          })
        }
      }
    });
  }

  async resultsPaginated(surveyId: SurveyId, position: number): Promise<{ answers: SurveyResponse[]; total: number; }> {
    const skip = position - 1;

    const totalAnswers = await prisma.surveyResponse.count({
      where: {
        surveyId: surveyId.toString()
      }
    });

    const answerDB = await prisma.surveyResponse.findFirst({
      where: {
        surveyId: surveyId.toString()
      },
      skip,
      orderBy: {
        id: 'asc'
      },
      include: {
        point: {
          include: {
            itinerary: {
              select: {
                scheduleDate: true
              }
            },
            invoices: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        survey: {
          select: {
            description: true,
            title: true
          }
        },
        answers: {
          include: {
            question: {
              select: {
                text: true,
                type: true,
                id: true,
                order: true
              }
            },
            answerOption: {
              include: {
                option: {
                  select: {
                    value: true
                  }
                }
              }
            }
          },
          orderBy: {
            question: {
              order: 'asc'
            }
          }
        }
      }
    });

    if(!answerDB) {
      return { answers: [], total: totalAnswers }
    }

  
    const surveResponse: SurveyResponse = SurveyResponse.fromPrimitives({
      belongsToPoint: false,
      surveyDescription: answerDB.survey.description,
      surveyTitle: answerDB.survey.title,
      answers: answerDB.answers.map(a => {
        const data = {
          questionId: a.questionId,
          questionText: a.question.text,
          questionType: a.question.type,
          surveyResponse: ''
        };

        if(a.question.type == 'open') {
          data.surveyResponse = a.answer
        } else {
          data.surveyResponse = a.answerOption[0].option.value;
        }

        return data;
      })
    });


    if(answerDB.point) {
      let point: ResponsePoint;

      point = ResponsePoint.fromPrimitives({
        id: answerDB.point.id,
        invoices: answerDB.point.invoices.map(i => ({ id: i.invoceId, number: i.invoiceNumber })),
        itinerarySchedule: answerDB.point.itinerary.scheduleDate.toISOString(),
        userAssigned: {
          firstName: answerDB.point.user.firstName,
          id: answerDB.point.user.id,
          lastName: answerDB.point.user.lastName
        }
      });

      surveResponse.setPoint(point);
    }
    
    return { answers: [surveResponse], total: totalAnswers };
  }
}
