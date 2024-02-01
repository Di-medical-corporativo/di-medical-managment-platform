import { AnswerQuestion } from './AnswerQuestion';
import { Option } from './Option';
import { QuestionType } from './QuestionType'
export class Question {
  private _type: QuestionType
  private _typeId: string
  private _options: Option[] = []
  private _totalAnswers = 0
  private _answers: AnswerQuestion[]
  constructor(
    private _questionId: string | undefined,
    private _text: string,
    private _order: number
  ) {}

  get questionId(): string | undefined {
    return this._questionId;
  }

  set questionId(value: string | undefined) {
    this._questionId = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  get type() {
    return this._type
  }

  set type(type: QuestionType) {
    this._type = type
  }

  get options() {
    return this._options
  }

  set options(options: Option[]) {
    this._options = options
  }

  get typeId() {
    return this._typeId
  }

  set typeId(id: string) {
    this._typeId = id
  }

  set totalAnswers(total: number) {
    this._totalAnswers = total
  }

  get totalAnswers() {
    return this._totalAnswers
  }

  public get answers() {
    return this._answers
  }

  public set answers(answers: AnswerQuestion[]) {
    this._answers = answers
  }
}
