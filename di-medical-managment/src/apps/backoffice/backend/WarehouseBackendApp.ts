import { glob } from "glob";
import container from "./dependency-injection";
import { Server } from "./server";

export class WarehouseBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '3000';

    this.server = new Server(port);
    
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    
    return this.server?.stop();
  }
}
