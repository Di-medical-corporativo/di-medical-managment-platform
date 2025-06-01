import { Request, Response } from "express";
import { ClientSearcher } from "../../../../../Contexts/Backoffice/Client/application/SearchAll/ClientSearcher";
import { Client } from "../../../../../Contexts/Backoffice/Client/domain/Client";

export class ClientFindAllJsonController {
  constructor(
    private clientSearcher: ClientSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const clients: Client[] = await this.clientSearcher.run();

      const primitives = clients.map(c => c.toPrimitives());

      return res.status(200).json(primitives);
    } catch (error) {
      return res.status(500).json({
        message: "Ocurrio un error, contacta soporte"
      });
    }
  }
}
