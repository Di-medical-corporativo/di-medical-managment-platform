import { Technical } from "../domain/Technical";
import { TechnicalBrand } from "./TechnicalBrand";
import { TechnicalBrandId } from "./TechnicalBrandId";
import { TechnicalCode } from "./TechnicalCode";
import { TechnicalId } from "./TechnicalId";

export interface TechnicalRepository {
  searchAll(
    page: number,
    searchTerm: string
  ): Promise<{ technical: Technical[], totalPages: number }>
  createBrand(brand: TechnicalBrand): Promise<void>
  findAllBrands(): Promise<TechnicalBrand[]>
  searchBrand(id: TechnicalBrandId): Promise<TechnicalBrand | null>
  create(technical: Technical): Promise<void>
  findById(id: TechnicalId): Promise<Technical | null>
  delete(id: TechnicalId): Promise<void>;
}
