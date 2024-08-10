import { QuestionId } from "./QuestionId";
import { QuestionMultipleResponse } from "./QuestionMultipleResponse";
import { QuestionOpenResponse } from "./QuestionOpenResponses";
import { QuestionText } from "./QuestionText";

export abstract class QuestionResult {
  constructor(
    protected id: QuestionId,
    protected question: QuestionText
  ) {}

  abstract toPrimitives():  any;
}

export class QuestionResultOpen extends QuestionResult {
  constructor(
    id: QuestionId,
    question: QuestionText,
    private response: QuestionOpenResponse[]
  ) {
    super(id, question);
  }

  static fromPrimitives(params: {
    id: string;
    question: string;
    response: string[]
  }) {
    return new QuestionResultOpen(
      new QuestionId(params.id),
      new QuestionText(params.question),
      params.response.map(r => new QuestionOpenResponse(r))
    )
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      question: this.question.toString(),
      response: this.response.map(r => r.toString()),
      type: 'open'
    }
  }
}

export class QuestionResultMultiple extends QuestionResult {
  constructor(
    id: QuestionId,
    question: QuestionText,
    private responses: QuestionMultipleResponse[]
  ) {
    super(id, question);
  }

  static fromPrimitives(params: {
    id: string;
    question: string;
    responses: {
      optionText: string;
      optionTotal: number;
      questionTotal: number;
    }[]
  }) {
    return new QuestionResultMultiple(
      new QuestionId(params.id),
      new QuestionText(params.question),
      params.responses.map(r => QuestionMultipleResponse.fromPrimitives({
        optionText: r.optionText,
        optionTotal: r.optionTotal,
        questionTotal: r.questionTotal
      }))
    )
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      question: this.question.toString(),
      responses: this.responses.map(r => r.toPrimitives()),
      type: 'multiple'
    }
  }
}
