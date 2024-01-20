export class QuestionType {
  constructor(
    private _questionTypeId: string,
    private _type: string
  ) {}

  get questionTypeId(): string {
    return this._questionTypeId;
  }

  set questionTypeId(value: string) {
    this._questionTypeId = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
