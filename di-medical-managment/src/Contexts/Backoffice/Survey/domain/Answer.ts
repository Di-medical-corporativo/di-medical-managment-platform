import { AnswerId } from "./AnswerId";
import { QuestionText } from "./QuestionText";
import { AnswerText } from "./AnswerText";
import { QuestionId } from "./QuestionId";
import { AnswerOption } from "./AnswerOption";

export abstract class Answer {
  constructor(
    protected id: AnswerId,
    protected question: QuestionText,
    protected questionid: QuestionId
  ) {}

  abstract toPrimitives(): any;
}

export class AnswerOpen extends Answer {
  constructor(
    id: AnswerId,
    question: QuestionText,
    questionId: QuestionId,
    private answerText: AnswerText
  ) {
    super(id, question, questionId);
  }

  static create(params: {
    id: AnswerId,
    question: QuestionText,
    questionId: QuestionId,
    answerText: AnswerText
  }) {
    return new AnswerOpen(
      params.id,
      params.question,
      params.questionId,
      params.answerText
    );
  }
  
  static fromPrimitives(params: {
    id: string;
    question: string;
    answerText: string;
    questionId: string;
  }) {
    return new AnswerOpen(
      new AnswerId(params.id),
      new QuestionText(params.question),
      new QuestionId(params.questionId),
      new AnswerText(params.answerText)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      question: this.question.toString(),
      questionId: this.questionid.toString(),
      answerText: this.answerText.toString()
    }
  }
}

export class AnswerMultiple extends Answer {
  constructor(
    id: AnswerId,
    question: QuestionText,
    questionId: QuestionId,
    private option: AnswerOption
  ) {
    super(id, question, questionId);
  }

  static create(params: {
    id: AnswerId,
    question: QuestionText,
    option: AnswerOption
    questionId: QuestionId
  }) {
    return new AnswerMultiple(
      params.id,
      params.question,
      params.questionId,
      params.option
    );
  }

  static fromPrimitives(params: {
    id: string;
    question: string;
    questionId: string;
    option: {
      id: string;
      optionId: string;
    }
  }) {
    return new AnswerMultiple(
      new AnswerId(params.id),
      new QuestionText(params.question),
      new QuestionId(params.questionId),
      AnswerOption.fromPrimitives(params.option)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      question: this.question.toString(),
      questionId: this.questionid.toString(),
      option: this.option.toPrimitives()
    }
  }


}
