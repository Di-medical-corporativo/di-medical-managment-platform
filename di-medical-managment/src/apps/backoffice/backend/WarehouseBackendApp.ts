import container from "./dependency-injection";
import { Server } from "./server";
import { BullTaskWorker } from "../../../Contexts/Backoffice/Task/infra/BullMQ/BullTaskWorker";

export class WarehouseBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '3000';

    this.server = new Server(port);
    
    const taskWorker: BullTaskWorker = container.get('Contexts.Backoffice.Task.infra.BullMQ.BullTaskWorker');

    taskWorker.start();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    
    return this.server?.stop();
  }
}
