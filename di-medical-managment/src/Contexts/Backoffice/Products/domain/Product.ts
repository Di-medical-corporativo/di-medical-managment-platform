import { Brand } from "./Brand";
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
    private tags: Tag[]
  ) {}
}
