import { Technical } from "../domain/Technical";
import { TechnicalBrand } from "./TechnicalBrand";
import { TechnicalBrandId } from "./TechnicalBrandId";
import { TechnicalCode } from "./TechnicalCode";

export interface TechnicalRepository {
  searchAll(
    page: number,
    searchTerm: string
  ): Promise<{ technical: Technical[], totalPages: number }>
  createBrand(brand: TechnicalBrand): Promise<void>
}
