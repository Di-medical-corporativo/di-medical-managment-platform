import { TruckRepository } from "../../domain/TruckRepository";

export class TruckSearcher {
  constructor(
    private repository: TruckRepository
  ) {}

  async run() {
    const trucks = await this.repository.findAll();

    return trucks;
  }
}
