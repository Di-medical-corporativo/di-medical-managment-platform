import { Tag } from "./Tag";

export interface ProductRepository {
  findAllTags(): Promise<Tag[]>
} 
