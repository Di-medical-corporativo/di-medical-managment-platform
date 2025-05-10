import { Brand } from "./Brand";
import { ProductCode } from "./ProductCode";
import { ProductId } from "./ProductId";
import { ProductImage } from "./ProductImage";
import { ProductName } from "./ProductName";
import { ProductText } from "./ProductText";
import { Tag } from "./Tag";

export class Product {
  constructor(
    private id: ProductId,
    private name: ProductName,
    private brand: Brand,
    private text: ProductText,
    private image: ProductImage,
    private tags: Tag[],
    private code: ProductCode
  ) {}

   public static create(params: {
    id: ProductId,
    name: ProductName,
    brand: Brand,
    text: ProductText,
    image: ProductImage,
    tags: Tag[],
    code: ProductCode
  }): Product {
    return new Product(
      params.id,
      params.name,
      params.brand,
      params.text,
      params.image,
      params.tags,
      params.code
    );
  }

  public static fromPrimitives(params: {
    id: string,
    name: string,
    brand: { id: string; name: string; },
    text: {
    id: string;
    intro: string;
    features: string[],
    benefits: string;
  },
    image: string,
    code: string;
    tags: { id: string; name: string } []
  }): Product {
    return new Product(
      new ProductId(params.id),
      new ProductName(params.name),
      Brand.fromPrimitives(params.brand),
      ProductText.fromPrimitives(params.text),
      new ProductImage(params.image),
      params.tags.map(tag => Tag.fromPrimitives(tag)),
      new ProductCode(params.code)
    );
  }
}
