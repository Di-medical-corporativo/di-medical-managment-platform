
import 'reflect-metadata'
import { Server } from './server'
import { ServerI } from './shared/application/Server'
import Container from 'typedi'
import { setUpContainer } from './shared/infra/dependency-injection'

class Bootstrap {
  private readonly server: ServerI = Container.get<ServerI>(Server)

  async start () {
    const container = await setUpContainer()
    return this.server.start(container)
  }
}

new Bootstrap().start()
