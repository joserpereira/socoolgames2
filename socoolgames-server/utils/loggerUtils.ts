const logger = require('@joserpereira/lazuli-labs-logger')

export class Logger {
  private context: string;

  constructor(context?: string) {
    this.context = context || "App";
  }
    debug(message: string): void {
        console.debug(message)
        logger.debug(message)
    };

    log(message: string): void {
        console.log(message)
        logger.info(message)
    };

    info(message: string): void {
        console.info(message)
        logger.info(message)
    };

    error(message: string): void {
        console.error(message)
        logger.error(message)
    };

}
