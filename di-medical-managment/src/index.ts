
import 'reflect-metadata'
import { Server } from './server'
import { ServerI } from './shared/application/Server'
import Container from 'typedi'

class Bootstrap {
  private readonly server: ServerI = Container.get<ServerI>(Server)

  start (): void {
    return this.server.start()
  }
}

new Bootstrap().start()
