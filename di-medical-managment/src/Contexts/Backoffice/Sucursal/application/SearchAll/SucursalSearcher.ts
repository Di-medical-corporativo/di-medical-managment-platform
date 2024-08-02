import { SucursalRepository } from "../../domain/SucursalRepository";

export class SucursalSearcher {
  constructor(
    private repository: SucursalRepository
  ) {}

  async run() {
    const branches = await this.repository.findAll();

    return branches;
  }
}
