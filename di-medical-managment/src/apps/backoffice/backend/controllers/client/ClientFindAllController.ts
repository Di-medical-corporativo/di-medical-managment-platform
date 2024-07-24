import { ClientSearcher } from "../../../../../Contexts/Backoffice/Client/application/SearchAll/ClientSearcher";
import { Request, Response } from 'express'; 

export class ClientFindAllController {
  constructor(
    private clientSearcher: ClientSearcher
  ) {}

  async run(req: Request, res: Response) {    
    try {
      const clients = await this.clientSearcher.run();

      res.status(200).render('clients/client', {
        clients: clients.map(c => c.toPrimitives())
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
