import { Option } from "./Option";

export class AnswerOption {
  private _option: Option
  constructor(
    private _answerOptionId: string | undefined,
    private _answerQuestionId: string | undefined,
    private _optionId: string
  ) {}

  get answerOptionId(): string | undefined {
    return this._answerOptionId;
  }

  set answerOptionId(value: string) {
    this._answerOptionId = value;
  }

  get answerQuestionId(): string | undefined {
    return this._answerQuestionId;
  }

  set answerQuestionId(value: string) {
    this._answerQuestionId = value;
  }

  get optionId(): string {
    return this._optionId;
  }

  set optionId(value: string) {
    this._optionId = value;
  }

  get option() {
    return this._option
  }

  set option(option: Option) {
    this._option = option
  }
}
