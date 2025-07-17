import { TechnicalBrand } from "./TechnicalBrand";
import { TechnicalCode } from "./TechnicalCode";
import { TechnicalId } from "./TechnicalId";
import { TechnicalImage } from "./TechnicalImage";
import { TechnicalName } from "./TechnicalName";

export class Technical {
  constructor(
    private id: TechnicalId,
    private name: TechnicalName,
    private brand: TechnicalBrand,
    private codes:  TechnicalCode[],
    private imageUrl: TechnicalImage
  ) {}

  public static create(params: {
    id: TechnicalId;
    name: TechnicalName;
    brand: TechnicalBrand;
    codes: TechnicalCode[];
    imageUrl: TechnicalImage;
  }): Technical {
    return new Technical(
      params.id,
      params.name,
      params.brand,
      params.codes,
      params.imageUrl
    );
  }

  public toPrimitives(): {
    id: string;
    name: string;
    brand: {
      id: string;
      name: string;
    };
    codes: string[];
    imageUrl: string;
  } {
    return {
      id: this.id.value,
      name: this.name.value,
      brand: this.brand.toPrimitives(),
      codes: this.codes.map(code => code.value),
      imageUrl: this.imageUrl.value
    };
  }

   public static fromPrimitives(params: {
    id: string;
    name: string;
    brand: {
      id: string;
      name: string;
    };
    codes: string[];
    imageUrl: string;
  }): Technical {
    return new Technical(
      new TechnicalId(params.id),
      new TechnicalName(params.name),
      TechnicalBrand.fromPrimitives(params.brand),
      params.codes.map(code => new TechnicalCode(code)),
      new TechnicalImage(params.imageUrl)
    );
  }
  
}
