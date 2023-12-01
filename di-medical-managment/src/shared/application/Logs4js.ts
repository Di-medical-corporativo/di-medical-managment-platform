import { Service } from 'typedi'
import { LoggerI } from './LoggerInterface'
import * as log4js from 'log4js'

@Service()
export class Logger implements LoggerI {
  readonly logger: log4js.Logger
  constructor () {
    log4js.configure({
      appenders: { out: { type: 'stdout' } },
      categories: {
        default: { appenders: ['out'], level: 'info' }
      }
    })
    this.logger = log4js.getLogger()
  }

  trace (message: string): void {
    return this.logger.trace(message)
  }

  warning (message: string): void {
    return this.logger.warn(message)
  }

  debug (message: string): void {
    return this.logger.debug(message)
  }

  error (message: string): void {
    return this.logger.error(message)
  }

  info (message: string): void {
    return this.logger.info(message)
  }

  fatal (message: string): void {
    return this.logger.fatal(message)
  }
}
