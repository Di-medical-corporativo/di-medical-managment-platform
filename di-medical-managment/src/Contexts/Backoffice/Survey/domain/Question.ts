import { QuestionId } from "./QuestionId";
import { QuestionOrder } from "./QuestionOrder";
import { QuestionText } from "./QuestionText";
import { Option } from "./Option";
import { QuestionType } from "./QuestionType";

export class Question {
  constructor(
    private id: QuestionId,
    private text: QuestionText,
    private order: QuestionOrder,
    private type: QuestionType,
    private options: Option[]
  ) {}

  static create(params: {
    id: QuestionId;
    text: QuestionText;
    order: QuestionOrder;
    type: QuestionType;
    options: Option[];
  }) {
    return new Question(
      params.id,
      params.text,
      params.order,
      params.type,
      params.options
    );
  }

  static fromPrimitives(params: {
    id: string;
    text: string;
    order: number;
    type: string;
    options: {
      id: string;
      value: string;
      order: number;
    }[]
  }) {
    return new Question(
      new QuestionId(params.id),
      new QuestionText(params.text),
      new QuestionOrder(params.order),
      new QuestionType(params.type),
      params.options.map(op => Option.fromPrimitives(op))
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      text: this.text.toString(),
      order: this.order.value,
      type: this.type.toString(),
      options: this.options.map(op => op.toPrimitives())
    }
  }
}
