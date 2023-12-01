export interface LoggerI {
  trace: (message: string) => void
  warning: (message: string) => void
  debug: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
  fatal: (message: string) => void
}
