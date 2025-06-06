import { Server } from "./server";

export class WebApiBackendApp {
  server?: Server;
  
  async start() {
    const port = process.env.PORT_WEB || '4000';

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
