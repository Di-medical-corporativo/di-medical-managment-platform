import { SurveyDescription } from "./SurveyDescription";
import { SurveyId } from "./SurveyId";
import { SurveyIsActive } from "./SurveyIsActive";
import { Question } from "./Question";
import { SurveyTitle } from "./SurveyTitle";

export class Survey {
  constructor(
    private id: SurveyId,
    private title: SurveyTitle,
    private description: SurveyDescription,
    private isActive: SurveyIsActive,
    private questions: Question[]
  ) {}

  public static create(params: {
    id: SurveyId,
    title: SurveyTitle,
    description: SurveyDescription,
    questions: Question[]
  }) {
    return new Survey(
      params.id,
      params.title,
      params.description,
      new SurveyIsActive(true),
      params.questions
    );
  }

  public static fromPrimitives(params: {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    questions: {
      id: string;
      text: string;
      order: number;
      type: string;
      options: {
        id: string;
        value: string;
        order: number;
      }[]
    }[]
  }) {

    return new Survey(
      new SurveyId(params.id),
      new SurveyTitle(params.title),
      new SurveyDescription(params.description),
      new SurveyIsActive(params.isActive),
      params.questions.map((q) => Question.fromPrimitives(q))
    );
  }

  public toPrimitives() {
    return {
      id: this.id.toString(),
      title: this.title.toString(),
      description: this.description.toString(),
      isActive: this.isActive.value,
      questions: this.questions.map(q => q.toPrimitives())
    }
  }
}
