export class QuestionType {
  constructor(
    private _questionTypeId: string | undefined,
    private _type: string
  ) {}

  get questionTypeId(): string | undefined {
    return this._questionTypeId;
  }

  set questionTypeId(value: string | undefined) {
    this._questionTypeId = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
