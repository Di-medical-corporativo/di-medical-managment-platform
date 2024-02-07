import { AnswerOption } from './AnswerOption';
import { Option } from './Option';
import { Question } from './Question';

export class AnswerQuestion {
  private _answer: string | undefined;
  private _option: Option | undefined;
  private _question!: Question
  constructor(
    private _answerId: string | undefined,
    private _responseId: string | undefined,
    private _questionId: string
  ) {}

  get answerId(): string | undefined {
    return this._answerId;
  }

  set answerId(value: string | undefined) {
    this._answerId = value;
  }

  get responseId(): string | undefined {
    return this._responseId;
  }

  set responseId(value: string | undefined) {
    this._responseId = value;
  }

  get questionId(): string {
    return this._questionId;
  }

  set questionId(value: string) {
    this._questionId = value;
  }

  get answer(): string | undefined {
    return this._answer;
  }

  set answer(value: string | undefined) {
    this._answer = value;
  }

  get option(): Option | undefined {
    return this._option;
  }

  set option(value: Option | undefined) {
    this._option = value;
  }

  get question() {
    return this._question
  }

  set question(question: Question) {
    this._question = question
  }
}
