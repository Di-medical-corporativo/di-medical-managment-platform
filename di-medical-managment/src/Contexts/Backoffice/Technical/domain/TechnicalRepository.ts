import { Technical } from "../domain/Technical";

export interface TechnicalRepository {
  searchAll(): Promise<Technical[]>
}
