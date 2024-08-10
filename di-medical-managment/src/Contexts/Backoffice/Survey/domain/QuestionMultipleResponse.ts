import { OptionResultPercentage } from "./OptionResultPercentage";
import { OptionResultTotal } from "./OptionResultTotal";
import { OptionValue } from "./OptionValue";
import { QuestionTotalAnswer } from "./QuestionTotalAnswer";

export class QuestionMultipleResponse {
  private optionPercentage: OptionResultPercentage;
  constructor(
    private optionText: OptionValue,
    private optionTotal: OptionResultTotal,
    private questionTotal: QuestionTotalAnswer
  ) {
    this.optionPercentage = this.calculatePercenate();
  }

  private calculatePercenate() {
    let percentage;
    if(this.optionTotal.value == 0 || this.questionTotal.value == 0) {
      percentage = 0;
    } else {
      percentage = Number(((this.optionTotal.value / this.questionTotal.value) * 100).toFixed(1));
    }
    
    return new OptionResultPercentage(percentage);

  }

  static fromPrimitives(params: {
    optionText: string;
    optionTotal: number,
    questionTotal: number
  }) {
    return new QuestionMultipleResponse(
      new OptionValue(params.optionText),
      new OptionResultTotal(params.optionTotal),
      new QuestionTotalAnswer(params.questionTotal)
    );
  }

  toPrimitives() {
    return {
      optionText: this.optionText.toString(),
      optionTotal: this.optionTotal.value,
      optionPercentage: this.optionPercentage.value
    }
  }
}
