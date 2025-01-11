import { AttendanceRepository } from "../../domain/AttendanceRepository";
import { Justification } from "../../domain/Justification";
import { JustificationId } from "../../domain/JustificationId";
import { JustificationNotFound } from "../../domain/JustificationNotFound";

export class JustificationFinder {
  constructor(
    private repository: AttendanceRepository
  ) {}

  async run(params: {
    justificationId: JustificationId
  }) {
    const justification: Justification | null = await this.repository.findJustification(params.justificationId);

    if(justification == null) {
      throw new JustificationNotFound();
    }

    return justification;
  }
}
