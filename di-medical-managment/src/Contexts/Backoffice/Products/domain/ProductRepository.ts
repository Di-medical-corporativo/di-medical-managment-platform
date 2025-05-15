import { Brand } from "./Brand";
import { Tag } from "./Tag";
import { TagId } from "./TagId";

export interface ProductRepository {
  findAllTags(): Promise<Tag[]>
  
  createTag(tag: Tag): Promise<void>
  
  findTag(id: TagId): Promise<null | Tag>
  
  deleteTag(id: TagId): Promise<void>

  findAllBrands(): Promise<Brand[]>
} 
