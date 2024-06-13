
import 'reflect-metadata'
import { Server } from './server'
import { ServerI } from './shared/application/Server'
import Container from 'typedi'
import { setUpContainer } from './shared/infra/dependency-injection'

class Bootstrap {
  async start () {
    const container = await setUpContainer();
    const server: ServerI = new Server(container); 
    return server.start();
  }
}

new Bootstrap().start();
