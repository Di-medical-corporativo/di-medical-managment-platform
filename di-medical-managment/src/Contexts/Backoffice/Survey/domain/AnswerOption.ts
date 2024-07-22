import { AnswerOptionId } from "./AnswerOptionId";
import { OptionId } from "./OptionId";

export class AnswerOption {
  constructor(
    private id: AnswerOptionId,
    private optionId: OptionId,
  ) {}

 static create(params: {
  id: AnswerOptionId,
  optionId: OptionId
 }) {
  return new AnswerOption(
    params.id,
    params.optionId
  );
 }

 static fromPrimitives(params: {
  id: string;
  optionId: string;
 }) {
  return new AnswerOption(
    new AnswerOptionId(params.id),
    new OptionId(params.optionId)
  );
 }

 toPrimitives() {
  return {
    id: this.id.toString(),
    optionId: this.optionId.toString()
  }
 }
}
