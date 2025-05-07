import { TextBenefit } from "./TextBenefit";
import { TextFeature } from "./TextFeature";
import { TextId } from "./TextId";
import { TextIntro } from "./TextIntro";

export class ProductText {
  constructor(
    private textId: TextId,
    private intro: TextIntro,
    private features: TextFeature[],
    private benefits: TextBenefit,
  ) {}

  static fromPrimitives(params: {
    id: string;
    intro: string;
    features: string[],
    benefits: string;
  }) {
    return new ProductText(
      new TextId(params.id),
      new TextIntro(params.intro),
      params.features.map(f => new TextFeature(f)),
      new TextBenefit(params.benefits)
    );
  }

  static create(params: {
    id: TextId,
    intro: TextIntro,
    features: TextFeature[],
    benefits: TextBenefit
  }) {
    return new ProductText(
      params.id,
      params.intro,
      params.features,
      params.benefits
    );
  }

  toPrimitives() {
    return {
      id: this.textId.toString(),
      intro: this.intro.toString(),
      features: this.features.map(f => f.toString()),
      benefits: this.benefits.toString()
    }
  }
}
